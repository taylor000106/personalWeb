/**
 * Lightweight local embedding: bag-of-tokens with unit L2 norm.
 * No API key required; good enough for small curated knowledge bases.
 */

const STOP = new Set("的了是在吗呢啊呀吗么与及和或一个一些".split(""));

export function tokenizeForEmbed(input: string): string[] {
  const lower = input.toLowerCase();
  const latin = lower.match(/[a-z0-9.+#/-]+/g) || [];
  const cjk = [...lower].filter((ch) => /[\u4e00-\u9fff]/.test(ch));
  const bigrams: string[] = [];
  for (let i = 0; i < cjk.length - 1; i += 1) {
    bigrams.push(cjk[i] + cjk[i + 1]);
  }
  const unigrams = cjk.filter((ch) => !STOP.has(ch));
  return [...latin, ...bigrams, ...unigrams].filter(Boolean);
}

export function buildVocab(documents: string[]): string[] {
  const freq = new Map<string, number>();
  for (const doc of documents) {
    for (const token of new Set(tokenizeForEmbed(doc))) {
      freq.set(token, (freq.get(token) || 0) + 1);
    }
  }
  return [...freq.entries()]
    .filter(([, n]) => n >= 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 512)
    .map(([t]) => t);
}

export function embedText(text: string, vocab: string[]): Float32Array {
  const index = new Map(vocab.map((t, i) => [t, i]));
  const vec = new Float32Array(vocab.length);
  const tokens = tokenizeForEmbed(text);
  if (tokens.length === 0) return vec;
  for (const token of tokens) {
    const i = index.get(token);
    if (i === undefined) continue;
    vec[i] += 1;
  }
  // tf log scale
  for (let i = 0; i < vec.length; i += 1) {
    if (vec[i] > 0) vec[i] = 1 + Math.log(vec[i]);
  }
  let norm = 0;
  for (let i = 0; i < vec.length; i += 1) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < vec.length; i += 1) vec[i] /= norm;
  return vec;
}

export function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  const n = Math.min(a.length, b.length);
  let sum = 0;
  for (let i = 0; i < n; i += 1) sum += a[i] * b[i];
  return sum;
}
