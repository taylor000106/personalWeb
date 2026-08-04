export type SkillGroup = {
  category: string;
  items: string[];
};

/** 技术能力 — 与简历方向对齐，便于后续增删 */
export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "Vue3",
      "Vue2",
      "React",
      "Next.js",
      "TypeScript",
      "uni-app",
      "Element Plus",
      "Vant",
      "Pinia",
      "Tailwind CSS",
    ],
  },
  {
    category: "Engineering",
    items: [
      "Performance Optimization",
      "CI/CD",
      "Docker",
      "Vite",
      "Electron",
      "多端发版",
      "组件封装",
      "开发规范",
    ],
  },
  {
    category: "AI",
    items: ["SSE", "WebSocket", "LLM API", "流式对话", "AI 辅助研发流程"],
  },
];
