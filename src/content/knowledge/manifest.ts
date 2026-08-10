/** Structured metadata for Markdown knowledge docs */
export type KnowledgeDocMeta = {
  id: string;
  file: string;
  title: string;
  topic: "about" | "projects" | "nextjs" | "performance" | "ai" | "engineering";
  tags: string[];
  /** Extra aliases that boost retrieval for this doc */
  aliases: string[];
};

export const knowledgeManifest: KnowledgeDocMeta[] = [
  {
    id: "about",
    file: "about.md",
    title: "关于我",
    topic: "about",
    tags: ["profile", "experience", "skills"],
    aliases: ["你是谁", "介绍自己", "个人简介", "taylor", "经历", "背景"],
  },
  {
    id: "projects",
    file: "projects.md",
    title: "项目经验",
    topic: "projects",
    tags: ["portfolio", "scrm", "chatai", "saas"],
    aliases: [
      "项目",
      "作品",
      "linkwechat",
      "企微",
      "scrm",
      "chatai",
      "prm",
      "kms",
      "personal-web",
      "本站",
    ],
  },
  {
    id: "nextjs",
    file: "nextjs.md",
    title: "为什么选 Next.js",
    topic: "nextjs",
    tags: ["nextjs", "architecture", "fullstack"],
    aliases: ["next.js", "nextjs", "为什么选", "选型", "app router"],
  },
  {
    id: "performance",
    file: "performance.md",
    title: "性能优化",
    topic: "performance",
    tags: ["performance", "vitals", "virtual-list"],
    aliases: ["性能", "优化", "lcp", "cls", "白屏", "虚拟列表", "首屏"],
  },
  {
    id: "ai",
    file: "ai.md",
    title: "AI 应用经验",
    topic: "ai",
    tags: ["ai", "sse", "streaming", "rag"],
    aliases: ["人工智能", "大模型", "sse", "流式", "embedding", "知识库", "助手"],
  },
];

export function getDocMeta(file: string): KnowledgeDocMeta | undefined {
  return knowledgeManifest.find((d) => d.file === file);
}
