import { buildVocab, cosineSimilarity, embedText } from "./embed-local";
import { loadKnowledgeChunks, type KnowledgeChunk } from "./knowledge";

export type RetrievalMethod = "hybrid-local" | "hybrid-remote";

export type RetrievalHit = {
  chunk: KnowledgeChunk;
  score: number;
  keywordScore: number;
  vectorScore: number;
};

export type RetrievalResult = {
  hits: RetrievalHit[];
  method: RetrievalMethod;
  maxScore: number;
};

type CorpusIndex = {
  vocab: string[];
  vectors: Float32Array[];
  chunks: KnowledgeChunk[];
};

let corpus: CorpusIndex | null = null;

function getCorpus(): CorpusIndex {
  const chunks = loadKnowledgeChunks();
  if (corpus && corpus.chunks === chunks) return corpus;
  const docs = chunks.map(
    (c) => `${c.title}\n${c.tags.join(" ")}\n${c.aliases.join(" ")}\n${c.text}`,
  );
  const vocab = buildVocab(docs);
  const vectors = docs.map((d) => embedText(d, vocab));
  corpus = { vocab, vectors, chunks };
  return corpus;
}

export function invalidateRetrievalCache() {
  corpus = null;
}

function tokenize(input: string): string[] {
  const lower = input.toLowerCase();
  const latin = lower.match(/[a-z0-9.+#/-]+/g) || [];
  const cjkChars = [...lower].filter((ch) => /[\u4e00-\u9fff]/.test(ch));
  const bigrams: string[] = [];
  for (let i = 0; i < cjkChars.length - 1; i += 1) {
    bigrams.push(cjkChars[i] + cjkChars[i + 1]);
  }
  const unigrams = cjkChars.filter((ch) => "的了是在吗呢啊呀".indexOf(ch) === -1);
  return [...new Set([...latin, ...bigrams, ...unigrams])];
}

function scoreKeyword(queryTokens: string[], chunk: KnowledgeChunk): number {
  const hay =
    `${chunk.title}\n${chunk.tags.join(" ")}\n${chunk.aliases.join(" ")}\n${chunk.text}`.toLowerCase();
  let score = 0;
  for (const token of queryTokens) {
    if (!token) continue;
    if (!hay.includes(token)) continue;
    if (/[a-z0-9]/.test(token)) {
      score += token.length >= 4 ? 4 : 2;
    } else if (token.length >= 2) {
      score += 3;
    } else {
      score += 1;
    }
    if (chunk.title.toLowerCase().includes(token)) score += 2;
    if (chunk.aliases.some((a) => a.toLowerCase().includes(token))) score += 3;
  }
  return score;
}

function rankLocal(question: string): RetrievalHit[] {
  const { vocab, vectors, chunks } = getCorpus();
  const tokens = tokenize(question);
  const qVec = embedText(`${question} ${tokens.join(" ")}`, vocab);

  return chunks
    .map((chunk, i) => {
      const keywordScore = scoreKeyword(tokens, chunk);
      const vectorScore = cosineSimilarity(qVec, vectors[i]);
      const score = keywordScore * 1.2 + vectorScore * 10;
      return { chunk, score, keywordScore, vectorScore };
    })
    .sort((a, b) => b.score - a.score);
}

/** Raw ranking without soft fallback — used for out-of-scope checks */
export function rankKnowledge(question: string): RetrievalHit[] {
  return rankLocal(question);
}

/**
 * Sync hybrid retrieval (keyword + local embedding). Works offline.
 */
export function retrieveDetailed(question: string, topK = 4): RetrievalResult {
  const ranked = rankLocal(question);
  const positive = ranked.filter((x) => x.score > 0.35).slice(0, topK);
  const hits =
    positive.length > 0
      ? positive
      : ranked
          .filter((x) => /about|projects|nextjs/i.test(x.chunk.source))
          .slice(0, topK);

  return {
    hits,
    method: "hybrid-local",
    maxScore: positive[0]?.score ?? 0,
  };
}

export function retrieveChunks(question: string, topK = 4): KnowledgeChunk[] {
  return retrieveDetailed(question, topK).hits.map((h) => h.chunk);
}

export function buildContext(chunks: KnowledgeChunk[]): string {
  if (chunks.length === 0) return "";
  return chunks
    .map((c, i) => `[#${i + 1} ${c.source} / ${c.title}]\n${c.text}`)
    .join("\n\n---\n\n");
}

function remoteEmbedEnabled() {
  return (
    Boolean(process.env.AI_API_KEY?.trim()) &&
    process.env.AI_EMBEDDINGS !== "0" &&
    Boolean(process.env.AI_EMBEDDING_MODEL?.trim())
  );
}

/**
 * Optional remote embeddings (OpenAI-compatible). Falls back to local hybrid.
 * Enable by setting AI_API_KEY; set AI_EMBEDDINGS=0 to force local-only.
 */
export async function retrieveDetailedAsync(
  question: string,
  topK = 4,
): Promise<RetrievalResult> {
  const local = retrieveDetailed(question, topK);
  if (!remoteEmbedEnabled() || !process.env.AI_EMBEDDING_MODEL?.trim()) {
    return local;
  }

  try {
    const apiKey = process.env.AI_API_KEY!.trim();
    const baseUrl = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(
      /\/$/,
      "",
    );
    const model = process.env.AI_EMBEDDING_MODEL.trim();
    const chunks = loadKnowledgeChunks();
    const inputs = [
      question,
      ...chunks.map((c) => `${c.title}\n${c.text}`.slice(0, 2000)),
    ];

    const res = await fetch(`${baseUrl}/embeddings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, input: inputs }),
    });
    if (!res.ok) return local;

    const json = (await res.json()) as {
      data?: Array<{ embedding: number[]; index: number }>;
    };
    const data = (json.data || []).sort((a, b) => a.index - b.index);
    if (data.length < 2) return local;

    const q = data[0].embedding;
    const hits: RetrievalHit[] = chunks.map((chunk, i) => {
      const emb = data[i + 1]?.embedding;
      const vectorScore = emb ? cosineNumber(q, emb) : 0;
      const keywordScore =
        local.hits.find((h) => h.chunk.id === chunk.id)?.keywordScore ?? 0;
      const score = keywordScore * 1.0 + vectorScore * 12;
      return { chunk, score, keywordScore, vectorScore };
    });
    hits.sort((a, b) => b.score - a.score);
    const top = hits.filter((h) => h.score > 0.2).slice(0, topK);
    return {
      hits: top.length > 0 ? top : hits.slice(0, topK),
      method: "hybrid-remote",
      maxScore: top[0]?.score ?? hits[0]?.score ?? 0,
    };
  } catch {
    return local;
  }
}

function cosineNumber(a: number[], b: number[]): number {
  const n = Math.min(a.length, b.length);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < n; i += 1) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb) || 1;
  return dot / denom;
}
