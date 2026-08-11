export type TimelineNode = {
  id: string;
  year: string;
  yearZh?: string;
  title: string;
  titleZh: string;
  keywords: string[];
  note: string;
};

/** Capability timeline — not a traditional resume */
export const timeline: TimelineNode[] = [
  {
    id: "2022",
    year: "2022",
    title: "Enterprise Systems",
    titleZh: "企业后台",
    keywords: ["Vue2", "Element-UI", "ECharts", "权限后台"],
    note: "晟为数科早期 ToB：授权管理、设备运维、应用运营后台。",
  },
  {
    id: "2024",
    year: "2024",
    title: "AI Application",
    titleZh: "AI 应用",
    keywords: ["SSE", "WebSocket", "uni-app", "Payment", "Multi-platform"],
    note: "同司 ChatAI 多端：流式对话、登录支付与多端发布。",
  },
  {
    id: "2025",
    year: "2025",
    title: "SaaS Delivery",
    titleZh: "SaaS 业务交付",
    keywords: ["Vue3", "TypeScript", "SaaS", "企微", "复杂表单"],
    note: "百珏企微 SCRM：运营后台与 H5 活动模块，复杂业务与工程规范落地。",
  },
  {
    id: "present",
    year: "2026 · Present",
    yearZh: "2026 · 至今",
    title: "Independent Product Platform",
    titleZh: "独立产品平台",
    keywords: ["Next.js", "React", "SSE", "AI Assistant", "Docker"],
    note: "独立设计并上线 Taylor Studio：Portfolio、Lab、知识库助手与生产部署闭环。",
  },
];

export const experienceOverview = {
  period: "2022 — Present",
  role: "Frontend Engineer",
} as const;
