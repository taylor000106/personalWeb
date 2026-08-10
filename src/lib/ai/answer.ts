import {
  retrieveDetailed,
  retrieveDetailedAsync,
  rankKnowledge,
  buildContext,
  type RetrievalResult,
} from "./retrieve";
import { loadKnowledgeChunks, type KnowledgeChunk } from "./knowledge";

export type AnswerMode = "local" | "llm";

export type AnswerMeta = {
  mode: AnswerMode;
  retrieval: RetrievalResult["method"] | "intent" | "none";
  sources: Array<{ title: string; source: string }>;
  inScope: boolean;
};

type Intent =
  | "projects"
  | "nextjs"
  | "performance"
  | "ai"
  | "about"
  | "summary"
  | "general"
  | "out_of_scope";

function hasLlmConfig() {
  return Boolean(process.env.AI_API_KEY?.trim());
}

export function getAnswerMode(): AnswerMode {
  return hasLlmConfig() ? "llm" : "local";
}

const SCOPE_HINT =
  /前端|项目|作品|next|vue|react|typescript|ai|性能|优化|sse|docker|lab|简历|经历|工程|技术|部署|本站|personal|chat|scrm|企微|面试|知识库|助手|全栈|组件|虚拟列表|流式|支付|多端|electron|webpack|vite|nginx|github|鉴权|登录/i;

const OOD_HINT =
  /天气|气温|下雨|股市|炒股|基金|彩票|菜谱|做饭|减肥|星座|运势|恋爱|八卦|足球比分|世界杯/i;

function detectIntent(question: string): Intent {
  const q = question.toLowerCase();
  if (OOD_HINT.test(q)) return "out_of_scope";
  if (/三点|三點|总结|總結|简要|簡潔|概括/.test(q)) return "summary";
  if (/next\.?js|为什么选|為何選|选型|選型/.test(q)) return "nextjs";
  if (/性能|效能|优化|優化|lcp|cls|白屏|虚拟列表|虛擬列表/.test(q)) {
    return "performance";
  }
  if (/\bai\b|人工智能|大模型|sse|流式|对话|對話|embedding|知识库|助手/.test(q)) {
    return "ai";
  }
  if (
    /项目|專案|作品|linkwechat|chatai|prm|kms|personal-web|scrm|企微|授权|控制台/.test(q)
  ) {
    return "projects";
  }
  if (/介绍|介紹|你是谁|你是誰|关于你|關於你|经历|經歷|背景/.test(q)) return "about";

  if (!SCOPE_HINT.test(q)) {
    const top = rankKnowledge(question)[0];
    const weak =
      !top || (top.keywordScore < 1 && top.vectorScore < 0.18 && top.score < 2.5);
    if (weak) return "out_of_scope";
  }
  return "general";
}

function sourceText(source: string): string {
  return loadKnowledgeChunks()
    .filter((c) => c.source === source)
    .map((c) => c.text)
    .join("\n\n");
}

function parseH2Sections(markdown: string): { title: string; body: string }[] {
  const parts = markdown.split(/\n(?=##\s+)/);
  const sections: { title: string; body: string }[] = [];
  for (const part of parts) {
    const m = part.match(/^##\s+(.+)\n?([\s\S]*)$/);
    if (!m) continue;
    const title = m[1].trim();
    const body = m[2]
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !/^#\s+/.test(l))
      .join("\n")
      .trim();
    if (title && body) sections.push({ title, body });
  }
  return sections;
}

function bullets(body: string): string[] {
  return body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      if (l.startsWith("-") || /^\d+\./.test(l)) return l.replace(/^\d+\.\s*/, "- ");
      return `- ${l}`;
    });
}

function uniqueSources(chunks: KnowledgeChunk[]) {
  const seen = new Set<string>();
  const out: Array<{ title: string; source: string }> = [];
  for (const c of chunks) {
    const key = `${c.source}:${c.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ title: c.title, source: c.source });
  }
  return out.slice(0, 4);
}

function withSources(answer: string, sources: Array<{ title: string; source: string }>) {
  if (sources.length === 0) return answer;
  const lines = sources.map((s) => `- ${s.title}（${s.source}）`);
  return `${answer.trim()}\n\n---\n**参考知识库**\n${lines.join("\n")}`;
}

function answerOutOfScope(): string {
  return [
    "这个问题超出了我当前知识库的范围。",
    "",
    "我主要回答与本站相关的内容：",
    "- 项目介绍（ChatAI / 企微 SCRM / 本站）",
    "- 为什么选 Next.js",
    "- 性能优化与 Lab 实验",
    "- AI 流式交互与知识助手实现",
    "",
    "换一个前端 / 项目相关的问题试试？",
  ].join("\n");
}

function answerProjects(): string {
  const sections = parseH2Sections(sourceText("projects.md"));
  if (sections.length === 0) return "知识库里暂时没有项目介绍。";

  const lines: string[] = ["我近年主要项目可以这样看：", ""];
  for (const section of sections) {
    if (/早期|授权|渠道|控制台|PRM|KMS|ToC/.test(section.title)) continue;
    lines.push(`**${section.title}**`);
    lines.push(section.body.replace(/\n+/g, " ").trim());
    lines.push("");
  }
  lines.push("想看更短版可以说：「用三点总结」。");
  return lines.join("\n").trim();
}

function answerNextjs(): string {
  const text = sourceText("nextjs.md");
  const points = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^\d+\./.test(l) || l.startsWith("- "));
  const lines: string[] = ["选 Next.js 主要有这些考虑：", ""];
  if (points.length > 0) {
    for (const p of points) lines.push(p.replace(/^\d+\.\s*/, "- "));
  } else {
    lines.push("- 适合作品集 SEO 与全栈一体部署");
  }
  lines.push("");
  lines.push("一句话：既能做展示，也能把鉴权、CRUD、SSE、Docker 部署放进同一工程。");
  return lines.join("\n");
}

function answerByH2(source: string, intro: string): string {
  const sections = parseH2Sections(sourceText(source));
  if (sections.length === 0) return `知识库里暂时没有相关内容（${source}）。`;
  const lines: string[] = [intro, ""];
  for (const section of sections) {
    lines.push(`**${section.title}**`);
    lines.push(...bullets(section.body));
    lines.push("");
  }
  return lines.join("\n").trim();
}

function answerAbout(): string {
  const text = sourceText("about.md")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !/^#/.test(l));
  if (text.length === 0) return "知识库里暂时没有个人介绍。";
  return ["先做一个简短自我介绍：", "", ...text].join("\n");
}

function answerSummary(): string {
  return [
    "三点总结：",
    "",
    "1. **业务交付**：企微 SaaS（SCRM）与 AI 对话产品（ChatAI）多端落地。",
    "2. **技术重心**：Vue/React、SSE 流式对话、虚拟列表与首屏性能。",
    "3. **作品集站点**：用 Next.js 全栈把 Portfolio、Lab、鉴权后台和 AI 助手做成可部署项目。",
  ].join("\n");
}

function answerGeneral(question: string): { text: string; sources: KnowledgeChunk[] } {
  const result = retrieveDetailed(question, 3);
  const chunks = result.hits.map((h) => h.chunk);
  if (chunks.length === 0 || result.maxScore < 0.8) {
    return { text: answerOutOfScope(), sources: [] };
  }

  const source = chunks[0].source;
  if (source === "projects.md") return { text: answerProjects(), sources: chunks };
  if (source === "nextjs.md") return { text: answerNextjs(), sources: chunks };
  if (source === "performance.md") {
    return {
      text: answerByH2("performance.md", "性能优化我主要做过这些："),
      sources: chunks,
    };
  }
  if (source === "ai.md") {
    return {
      text: answerByH2("ai.md", "AI 相关经验可以分成几块："),
      sources: chunks,
    };
  }
  if (source === "about.md") return { text: answerAbout(), sources: chunks };

  const section = parseH2Sections(chunks.map((c) => c.text).join("\n")).slice(0, 3);
  const lines: string[] = ["根据知识库，重点如下：", ""];
  for (const s of section) {
    lines.push(`**${s.title}**`);
    lines.push(...bullets(s.body).slice(0, 6));
    lines.push("");
  }
  return { text: lines.join("\n").trim(), sources: chunks };
}

export function buildLocalAnswer(question: string): {
  text: string;
  meta: AnswerMeta;
} {
  const intent = detectIntent(question);

  if (intent === "out_of_scope") {
    return {
      text: answerOutOfScope(),
      meta: { mode: "local", retrieval: "none", sources: [], inScope: false },
    };
  }

  const intentSource: Record<Exclude<Intent, "general" | "out_of_scope">, string[]> = {
    projects: ["projects.md"],
    nextjs: ["nextjs.md"],
    performance: ["performance.md"],
    ai: ["ai.md"],
    about: ["about.md"],
    summary: ["projects.md", "about.md"],
  };

  let text = "";
  let sources: KnowledgeChunk[] = [];
  let retrieval: AnswerMeta["retrieval"] = "intent";
  let inScope = true;

  switch (intent) {
    case "projects":
      text = answerProjects();
      sources = loadKnowledgeChunks()
        .filter((c) => c.source === "projects.md")
        .slice(0, 3);
      break;
    case "nextjs":
      text = answerNextjs();
      sources = loadKnowledgeChunks()
        .filter((c) => c.source === "nextjs.md")
        .slice(0, 2);
      break;
    case "performance":
      text = answerByH2("performance.md", "性能优化我主要做过这些：");
      sources = loadKnowledgeChunks()
        .filter((c) => c.source === "performance.md")
        .slice(0, 3);
      break;
    case "ai":
      text = answerByH2("ai.md", "AI 相关经验可以分成几块：");
      sources = loadKnowledgeChunks()
        .filter((c) => c.source === "ai.md")
        .slice(0, 3);
      break;
    case "about":
      text = answerAbout();
      sources = loadKnowledgeChunks()
        .filter((c) => c.source === "about.md")
        .slice(0, 2);
      break;
    case "summary":
      text = answerSummary();
      sources = loadKnowledgeChunks()
        .filter((c) => intentSource.summary.includes(c.source))
        .slice(0, 3);
      break;
    default: {
      const general = answerGeneral(question);
      text = general.text;
      sources = general.sources;
      retrieval = retrieveDetailed(question, 3).method;
      inScope = sources.length > 0;
      break;
    }
  }

  const metaSources = uniqueSources(sources);
  return {
    text: inScope ? withSources(text, metaSources) : text,
    meta: {
      mode: "local",
      retrieval: inScope ? retrieval : "none",
      sources: inScope ? metaSources : [],
      inScope,
    },
  };
}

/** @deprecated prefer buildLocalAnswer */
export function localAnswer(question: string): string {
  return buildLocalAnswer(question).text;
}

export async function* streamLocalAnswer(question: string) {
  const { text, meta } = buildLocalAnswer(question);
  yield { type: "meta" as const, meta };
  for (const piece of text.match(/[\s\S]{1,28}/g) || []) {
    yield { type: "text" as const, text: piece };
    await new Promise((r) => setTimeout(r, 6));
  }
}

export async function* streamLlmAnswer(question: string) {
  const intent = detectIntent(question);
  if (intent === "out_of_scope") {
    const { text, meta } = buildLocalAnswer(question);
    yield { type: "meta" as const, meta: { ...meta, mode: "llm" as const } };
    yield { type: "text" as const, text };
    return;
  }

  const retrieval = await retrieveDetailedAsync(question, 5);
  const preferred: Record<string, string[]> = {
    projects: ["projects.md"],
    nextjs: ["nextjs.md", "projects.md"],
    performance: ["performance.md"],
    ai: ["ai.md"],
    about: ["about.md", "projects.md"],
    summary: ["projects.md", "about.md"],
  };
  const all = loadKnowledgeChunks();
  const preferFiles = preferred[intent] || [];
  const chunks =
    preferFiles.length > 0
      ? all.filter((c) => preferFiles.includes(c.source)).slice(0, 8)
      : retrieval.hits.map((h) => h.chunk);

  const context = buildContext(chunks);
  const sources = uniqueSources(chunks);
  const meta: AnswerMeta = {
    mode: "llm",
    retrieval: retrieval.method,
    sources,
    inScope: true,
  };
  yield { type: "meta" as const, meta };

  const apiKey = process.env.AI_API_KEY!.trim();
  const baseUrl = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(
    /\/$/,
    "",
  );
  const model = process.env.AI_MODEL || "gpt-4o-mini";

  const system = [
    "You are Taylor's portfolio AI assistant.",
    "Answer in the same language as the user question.",
    "Use ONLY the provided knowledge context. If missing, say you don't know and stay in scope (frontend / projects / engineering / AI practice).",
    "Be concise. Use short paragraphs and bullet points.",
    "Do not invent employers, metrics, or features not in the context.",
    "Do not dump raw retrieval scores.",
  ].join(" ");

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      stream: true,
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: `Context:\n${context || "(empty)"}\n\nQuestion:\n${question}`,
        },
      ],
    }),
  });

  if (!res.ok || !res.body) {
    const text = await res.text().catch(() => "");
    throw new Error(`LLM request failed: ${res.status} ${text}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") {
        if (sources.length > 0) {
          yield {
            type: "text" as const,
            text: `\n\n---\n**参考知识库**\n${sources.map((s) => `- ${s.title}（${s.source}）`).join("\n")}`,
          };
        }
        return;
      }
      try {
        const json = JSON.parse(data) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const content = json.choices?.[0]?.delta?.content;
        if (content) yield { type: "text" as const, text: content };
      } catch {
        // ignore
      }
    }
  }
}

export async function* streamAnswer(question: string) {
  if (getAnswerMode() === "llm") {
    yield* streamLlmAnswer(question);
  } else {
    yield* streamLocalAnswer(question);
  }
}
