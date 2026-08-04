export type ArticleItem = {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  tags: string[];
  /** Soft link: assistant or lab for now */
  href: string;
  status: "live" | "soon";
};

/** Lightweight article entry points — full CMS later */
export const articles: ArticleItem[] = [
  {
    id: "why-nextjs",
    title: "为什么这个站选 Next.js",
    titleEn: "Why Next.js for this platform",
    summary: "App Router、全栈一体部署，与作品集 + AI 入口的匹配。",
    summaryEn: "App Router and full-stack deploy for portfolio + AI entry.",
    tags: ["Next.js", "Architecture"],
    href: "/assistant",
    status: "live",
  },
  {
    id: "ai-frontend",
    title: "前端视角的 AI 流式交互",
    titleEn: "Streaming AI UX from a frontend view",
    summary: "SSE / WebSocket、中断重连与对话态，在 ChatAI 与本站助手中的实践。",
    summaryEn:
      "SSE/WebSocket, cancel/retry, and chat state in ChatAI and this assistant.",
    tags: ["AI", "SSE"],
    href: "/assistant",
    status: "live",
  },
  {
    id: "eng-practice",
    title: "个人站上的工程化取舍",
    titleEn: "Engineering trade-offs on a personal platform",
    summary: "校验、鉴权、CI、测试：小体量如何仍按生产规范落地。",
    summaryEn: "Validation, auth, CI, tests — production habits at small scale.",
    tags: ["Engineering", "CI"],
    href: "/lab",
    status: "soon",
  },
];
