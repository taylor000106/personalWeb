export type TimelineNode = {
  id: string;
  year: string;
  title: string;
  keywords: string[];
  note: string;
};

/** Capability timeline — not a traditional resume */
export const timeline: TimelineNode[] = [
  {
    id: "2022",
    year: "2022",
    title: "Enterprise Systems",
    keywords: ["Vue2", "Element-UI", "ECharts", "权限后台"],
    note: "晟为数科早期 ToB：授权管理、设备运维、应用运营后台。",
  },
  {
    id: "2024",
    year: "2024",
    title: "AI Application",
    keywords: ["SSE", "WebSocket", "uni-app", "Payment", "Multi-platform"],
    note: "同司 ChatAI 多端：流式对话、登录支付与多端发布。",
  },
  {
    id: "2025",
    year: "2025",
    title: "SaaS and Modern Stack",
    keywords: ["Vue3", "TypeScript", "SaaS", "React", "Next.js"],
    note: "企微 SCRM 复杂业务；同时向 React / Next.js / AI 平台方向扩展。",
  },
];

export const experienceOverview = {
  period: "2022 — Present",
  role: "Frontend Engineer",
} as const;
