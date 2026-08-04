export type ProjectItem = {
  id: string;
  title: string;
  titleEn?: string;
  period: string;
  summary: string;
  /** Short capability bullets for Featured cards */
  highlights: string[];
  tech: string[];
  links?: { label: string; href: string }[];
  cover?: string;
  accent: string;
  /** Show on homepage Featured */
  featured: boolean;
  /** Mark as the live site visitor is on */
  live?: boolean;
  /** Archive / timeline only */
  archive?: boolean;
};

export const projects: ProjectItem[] = [
  {
    id: "personal-web",
    title: "Personal AI Knowledge Platform",
    titleEn: "本站 · AI 知识与工程平台",
    period: "2026 — Present",
    summary:
      "你正在浏览的站点：Developer Portfolio、Frontend Lab、SQLite 私人面板与 AI Knowledge Assistant；Docker + GitHub Actions 部署到 VPS。",
    highlights: [
      "Next.js 全栈：鉴权、CRUD、SSE AI 助手",
      "工程化：ESLint / Prettier / Husky / Vitest / CI",
      "生产部署：Docker · Nginx · GitHub Actions",
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "SQLite", "Docker", "AI"],
    links: [
      { label: "GitHub", href: "https://github.com/taylor000106/personalWeb" },
      { label: "AI Assistant", href: "/assistant" },
      { label: "Lab", href: "/lab" },
    ],
    cover: "/projects/personal-web.webp",
    accent: "#7c3aed",
    featured: true,
    live: true,
  },
  {
    id: "chatai",
    title: "ChatAI Multi-platform",
    titleEn: "ChatAI 多端 AI 对话",
    period: "2024.07 — 2025.01",
    summary:
      "面向 C 端的 AI 对话产品：小程序 / App / H5 / PC / Electron。覆盖流式对话、登录、支付与多端发布。",
    highlights: [
      "SSE / WebSocket 流式消息、会话态与异常重连",
      "微信 / 支付宝 / Apple Pay 支付链路",
      "uni-app 多端 + Vue3/Electron PC 延伸",
    ],
    tech: ["uni-app", "Vue", "SSE", "WebSocket", "Payment", "Electron"],
    cover: "/projects/chatai-multi.webp",
    accent: "#0e7490",
    featured: true,
  },
  {
    id: "linkwechat",
    title: "Enterprise WeCom SCRM",
    titleEn: "企微 SCRM 智能获客与运营平台",
    period: "2025.05 — Present",
    summary:
      "ToB 企微营销 SaaS：客户运营、营销任务、数据统计、员工小店与 AI 托管。负责 PC 运营后台与 H5 持续迭代。",
    highlights: [
      "复杂 ToB 业务与可复用周期任务组件",
      "虚拟列表、数据统计与运营后台体验",
      "Vue3 + TypeScript 工程化交付",
    ],
    tech: ["Vue3", "TypeScript", "Element Plus", "Pinia", "Vant"],
    cover: "/projects/linkwechat.webp",
    accent: "#5b21b6",
    featured: true,
  },
  {
    id: "prm-kaidashi",
    title: "prm 铠大师 · 授权管理系统",
    period: "2023.03 — 2024.06",
    summary: "信创场景授权管理后台：代理商、客户、订单、权限与 ECharts 看板。",
    highlights: ["Vue2 后台模块与权限路由", "ECharts 多维运营看板"],
    tech: ["Vue2", "Vuex", "Element-UI", "ECharts"],
    cover: "/projects/prm-kaidashi.webp",
    accent: "#334155",
    featured: false,
    archive: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => p.archive);
