export type ArticleItem = {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  tags: string[];
  /** Published date display */
  date: string;
  status: "live" | "soon";
  /** Markdown filename under src/content/articles/ */
  file: string;
};

export const articles: ArticleItem[] = [
  {
    id: "vue-to-nextjs",
    title: "从 Vue 到 Next.js：我的前端技术迁移实践",
    titleEn: "From Vue to Next.js: My frontend migration practice",
    summary: "为什么个人平台选 Next.js，以及 Vue 业务经验如何迁到 React 全栈作品集。",
    summaryEn:
      "Why this platform uses Next.js, and how Vue delivery experience maps into a React full-stack portfolio.",
    tags: ["Next.js", "Vue", "Career"],
    date: "2026-08",
    status: "live",
    file: "vue-to-nextjs.md",
  },
  {
    id: "sse-streaming-ai",
    title: "SSE 流式 AI 交互在前端的实现",
    titleEn: "Building streaming AI UX with SSE on the frontend",
    summary: "从 ChatAI 到本站助手：可中断流式输出、对话态与本地/LLM 双模式。",
    summaryEn:
      "From ChatAI to this assistant: cancellable streams, chat state, and local/LLM dual mode.",
    tags: ["AI", "SSE"],
    date: "2026-08",
    status: "live",
    file: "sse-streaming-ai.md",
  },
  {
    id: "deploy-fullstack",
    title: "一个前端工程师如何部署自己的全栈应用",
    titleEn: "How a frontend engineer deploys a full-stack app",
    summary:
      "Next.js standalone、Docker、GitHub Actions 与 VPS：个人站的可重复上线路径。",
    summaryEn:
      "Next.js standalone, Docker, GitHub Actions, and a VPS — a repeatable ship path for a personal platform.",
    tags: ["Docker", "Deploy"],
    date: "2026-08",
    status: "live",
    file: "deploy-fullstack.md",
  },
];

export function getArticle(id: string): ArticleItem | undefined {
  return articles.find((a) => a.id === id);
}

export function getAllArticleIds(): string[] {
  return articles.filter((a) => a.status === "live").map((a) => a.id);
}

export function articleHref(id: string): string {
  return `/articles/${id}`;
}
