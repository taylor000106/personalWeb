export type ProjectMedia = {
  src: string;
  caption?: string;
};

export type EngineeringPractice = {
  performance: string[];
  testing: string[];
  deployment: string[];
  security: string[];
};

export type ProjectItem = {
  /** URL slug, e.g. personal-web */
  id: string;
  title: string;
  titleEn?: string;
  period: string;
  /** One-line positioning (homepage + detail intro) */
  summary: string;
  /** 1–2 bullets on homepage only */
  highlights: string[];
  /** Core tech tags */
  stack: string[];
  /** Why these architecture choices */
  architecture: string[];
  /** Problem + scenario */
  background: string;
  /** Real technical problems faced */
  challenge: string[];
  /** First-person ownership — what I owned */
  contribution: string[];
  /** Perf / test / deploy / security */
  engineering: EngineeringPractice;
  links?: { label: string; href: string }[];
  /** Hero / Featured cover */
  cover?: string;
  /** Extra screenshots on detail page (not duplicated as cover) */
  gallery?: ProjectMedia[];
  accent: string;
  featured: boolean;
  live?: boolean;
  archive?: boolean;
};

export const projects: ProjectItem[] = [
  {
    id: "personal-web",
    title: "Personal AI Knowledge Platform",
    titleEn: "本站 · AI 知识与工程平台",
    period: "2026 — Present",
    summary: "可上线的前端技术平台：Portfolio、Engineering Lab、AI 知识助手与私人面板。",
    highlights: ["Next.js 全栈 + SSE AI 助手闭环", "Docker / Actions 生产部署"],
    stack: ["Next.js 15", "React 19", "TypeScript", "SQLite", "Docker", "SSE"],
    architecture: [
      "App Router：公开站（Portfolio / Lab / Assistant）与私人 Dashboard 分界，静态内容优先 Server Component，重交互下沉客户端。",
      "SQLite + Repository：个人体量不引入 CMS/Prisma，内容走 Git（src/content），私有数据走文件库，边界清晰可讲。",
      "AI：Markdown 知识库 + 本地混合检索 + SSE；无 Key 可演示，有 Key 可切 LLM，避免「必须接大模型才能跑」。",
      "鉴权：JWT Cookie + bcrypt + Zod + 限流，按生产站基线做，而不是演示登录。",
    ],
    background:
      "要解决的问题是：如何用一个可部署的站点，同时证明 React/Next 工程能力、AI 应用接入能力，以及前端探索兴趣——而不是再做一个静态简历页。使用场景是招聘方 / 访客在 30 秒内建立技术方向印象，并在详情与助手页追问深度。",
    challenge: [
      "Next.js 应用架构：公开内容、私人 CRUD、Lab Demo、AI SSE 同仓共存，需清晰的路由与 Client/Server 边界，避免整站变大客户端。",
      "AI 知识库检索：中文短问下关键词过粗；用双字切分 + 轻量向量混合，并约束回答范围，减少胡编与越界。",
      "SSE 输出：可中断、可展示来源、本地/LLM 双模式切换，避免被理解成「套壳聊天页」。",
      "Docker 部署：VPS 磁盘与 husky prepare 曾阻断生产构建；通过 HUSKY=0、prune 与诊断日志把重建做成可重复流程。",
    ],
    contribution: [
      "我独立完成产品定位、信息架构与全栈实现（页面、API、鉴权、部署）。",
      "我设计 Featured（轻量）与项目详情（深度）的职责分层，以及 Lab / Assistant 入口。",
      "我实现知识库加载、检索、SSE 问答与可选 LLM/Embedding 接入。",
      "我搭建 ESLint/Prettier/Husky/Vitest/CI，以及 Docker + Nginx + Actions 自动部署。",
    ],
    engineering: {
      performance: [
        "粒子 Canvas dynamic import + 离开首屏暂停，降低主线程占用。",
        "首页 web-vitals 实测展示 LCP/CLS/INP；提供 Bundle Analyzer 脚本。",
      ],
      testing: ["Vitest 覆盖检索/校验等纯逻辑；CI 跑 lint、typecheck、test、format。"],
      deployment: [
        "Next standalone 镜像；GitHub Actions SSH 到 VPS 执行 compose 重建。",
        "部署前 Docker prune / 磁盘检查，降低「磁盘满导致失败」的复发。",
      ],
      security: [
        "强制 bcrypt；登录与 AI 接口限流；Zod 校验输入；Dashboard API 统一 requireApiSession。",
      ],
    },
    links: [
      { label: "GitHub", href: "https://github.com/taylor000106/personalWeb" },
      { label: "AI Assistant", href: "/assistant" },
      { label: "Lab", href: "/lab" },
    ],
    cover: "/projects/personal-ai.webp",
    gallery: [
      { src: "/projects/personal-lab.webp", caption: "Frontend Engineering Lab" },
      {
        src: "/projects/personal-assistant.webp",
        caption: "AI Knowledge Assistant",
      },
    ],
    accent: "#7c3aed",
    featured: true,
    live: true,
  },
  {
    id: "chatai",
    title: "ChatAI Multi-platform Application",
    titleEn: "ChatAI 多端 AI 对话应用",
    period: "2024.07 — 2025.01",
    summary: "面向 C 端的多端 AI 对话产品：小程序 / App / H5 / PC，覆盖流式对话与支付。",
    highlights: ["SSE / WebSocket 流式对话体验", "多端发布与支付链路落地"],
    stack: ["uni-app", "Vue", "SSE", "WebSocket", "Payment", "Electron"],
    architecture: [
      "uni-app 收敛小程序 / App / H5 业务层，减少多端重复实现；PC 用 Vue3 / Electron 延伸同一产品能力。",
      "对话主链路用 SSE / WebSocket：适合「Token 级流式」与断线重连，而不是整段轮询。",
      "登录与支付按端拆适配层（微信 / 支付宝 / Apple Pay），核心会话模型保持一致。",
    ],
    background:
      "晟为数科时期交付。要解决的问题是：让用户在不同端获得一致的 AI 对话与付费体验。使用场景包括移动端快速提问、H5 投放页转化、PC 长会话与 Electron 桌面使用。",
    challenge: [
      "SSE 流式消息渲染：逐 Token 更新列表时的滚动、闪烁与中断后的半包恢复。",
      "长对话性能：消息增多后的列表渲染与历史加载策略，避免卡顿影响输入。",
      "多端状态同步：登录态、会话态与发版节奏不一致时的兼容与回归成本。",
      "支付流程处理：下单、回调、失败重试与端差异（微信内 / App / iOS）下的状态机清晰度。",
    ],
    contribution: [
      "我负责多端对话相关页面开发、联调与上线维护。",
      "我落地流式对话、登录与支付链路中的前端部分，并处理弱网与异常态。",
      "我跟进线上缺陷修复、回归验证，以及首屏 / 核心交互相关的性能优化。",
      "我协助第三方 SDK 接入与按端发版验证，保证核心链路可发布。",
    ],
    engineering: {
      performance: ["关注首屏与对话主路径；减少长列表无谓重绘，优化流式更新策略。"],
      testing: ["按端回归清单覆盖登录、对话、支付主路径；线上问题闭环验证。"],
      deployment: ["多端发版与热更新节奏管理；按端差异发布，降低一次全量翻车风险。"],
      security: ["登录态与支付回调参数校验协作；避免敏感信息落日志与前端明文残留。"],
    },
    links: [{ label: "UI Demo", href: "/demos/chatai-chat.html" }],
    cover: "/projects/chatai.webp",
    accent: "#0e7490",
    featured: true,
  },
  {
    id: "linkwechat",
    title: "Enterprise WeCom SCRM",
    titleEn: "企微 SCRM 智能获客与运营平台",
    period: "2025.05 — Present",
    summary: "ToB 企微营销 SaaS：客户运营、营销任务、数据统计与 AI 托管能力。",
    highlights: ["复杂 ToB 后台与可复用任务组件", "虚拟列表与运营数据体验优化"],
    stack: ["Vue3", "TypeScript", "Element Plus", "Pinia", "Vant"],
    architecture: [
      "PC 运营后台用 Vue3 + TypeScript + Element Plus，复杂表单与表格是主战场。",
      "微信 H5 用 Vant，与后台共享业务概念但交互按移动端重做。",
      "把「多条件周期任务」抽成可复用能力，复用到群发 / 单发 / 朋友圈等模块，而不是每个营销入口复制一套配置。",
    ],
    background:
      "要解决的问题是：企微场景下把客户运营、营销触达、数据统计与员工侧能力收进统一运营系统。使用场景是运营同学配置任务、查看统计，以及员工在企微内完成触达与转化动作。",
    challenge: [
      "复杂表单管理：多条件、多步骤、校验与回显耦合，需要可维护的表单模型而不是页面堆控件。",
      "周期任务配置：时间规则、人群条件、触达渠道组合多，抽共性组件降低复制成本。",
      "数据统计展示：大表格与图表并存时的可读性与滚动性能。",
      "组件复用：群发 / 单发 / 朋友圈等模块需求相近但细节不同，复用边界要分清。",
    ],
    contribution: [
      "我独立承担运营后台与微信 H5 相关模块的需求迭代与线上问题修复。",
      "我封装请求层、通用表单与业务组件，沉淀周期任务等可复用能力。",
      "我负责虚拟列表与统计相关体验优化，提升大数据量表格可用性。",
      "我参与需求评审与联调，并推动 H5 / 协作规范与 AI 辅助代码审查流程。",
    ],
    engineering: {
      performance: ["虚拟列表与表格渲染优化，降低运营页长列表卡顿。"],
      testing: ["关键回归覆盖核心任务配置与发布路径；迁移期对照旧系统交互一致性。"],
      deployment: [
        "跟随产品节奏持续交付后台 / H5；与后端约定接口适配以支撑 .NET→Java 迁移并行。",
      ],
      security: ["权限与菜单可见性按角色控制；表单与接口层统一校验，减少脏数据入库。"],
    },
    cover: "/projects/scrm.webp",
    gallery: [
      {
        src: "/projects/scrm-tasks.webp",
        caption: "营销任务 · 周期状态与筛选",
      },
      {
        src: "/projects/scrm-analytics.webp",
        caption: "数据统计 · 卡片 + ECharts",
      },
      {
        src: "/projects/scrm-customers.webp",
        caption: "客户运营 · 标签与用户列表",
      },
    ],
    accent: "#5b21b6",
    featured: true,
  },
  {
    id: "prm-license",
    title: "PRM · License & Channel Admin",
    titleEn: "授权与渠道管理后台",
    period: "2023.03 — 2024.06",
    summary: "信创授权后台：代理商层级、激活码库存、订单与角色权限。",
    highlights: ["多角色后台与权限路由", "激活码 / 库存数据看板"],
    stack: ["Vue2", "Vuex", "Element-UI", "ECharts"],
    architecture: [
      "按管理员 / 经销商 / 分销商拆分后台视角，同一业务不同权限面。",
      "ECharts 承载激活码发放、库存与终端激活趋势，表格承接代理商明细查询。",
    ],
    background:
      "晟为数科时期交付。要解决的问题是：授权码在代理渠道中的发放、库存与激活闭环，并按角色控制可见数据。使用场景是运营与渠道查看库存、审批发货、管理激活码与客户。",
    challenge: [
      "多角色菜单与数据权限交叉，避免越权看到上级库存。",
      "激活码体量大时的筛选、分页与看板口径一致。",
      "经销商 / 分销商流程差异（发货审批、出库审批）下的表单复用边界。",
    ],
    contribution: [
      "我负责授权管理相关后台模块与看板页面落地。",
      "我实现角色 / 菜单权限相关前端，以及代理商、订单、激活码等主流程页面。",
    ],
    engineering: {
      performance: ["看板图表按区间切换请求，列表分页降低一次渲染压力。"],
      testing: ["按角色回归：管理员 / 经销商 / 分销商主路径。"],
      deployment: ["跟随业务迭代发版后台模块。"],
      security: ["路由与菜单级权限控制，接口层配合角色过滤。"],
    },
    cover: "/projects/prm-license.webp",
    accent: "#334155",
    featured: false,
    archive: true,
  },
  {
    id: "kms-console",
    title: "KMS Console · Device Ops",
    titleEn: "设备与镜像运维控制台",
    period: "2023 — 2024",
    summary: "设备终端运维控制台：设备管理、镜像、KMS 激活与策略权限。",
    highlights: ["设备 / 镜像运维台", "分组策略与权限管控"],
    stack: ["Vue", "Element-UI", "ECharts"],
    architecture: [
      "控制台以设备与镜像为中心，首页看板 + 列表查询构成运维主路径。",
      "权限管控独立模块（策略、分组），与设备详情联动。",
    ],
    background:
      "晟为数科时期交付。要解决的问题是：终端设备的在线状态、分组策略与镜像分发需要统一运维入口。使用场景是运维查看终端、按 IP/机器码检索，并配置激活与权限策略。",
    challenge: [
      "设备列表与详情态较多（在线、分组、时长），查询与详情要保持一致。",
      "镜像管理与 KMS 激活流程跨模块，状态反馈要清晰。",
      "策略 / 权限配置错误成本高，表单校验与确认要稳。",
    ],
    contribution: [
      "我负责控制台相关页面开发与联调（设备、镜像、激活、权限模块）。",
      "我落地首页统计与设备查询表格，保证运维主路径可用。",
    ],
    engineering: {
      performance: ["设备列表分页与条件查询，避免全量拉取。"],
      testing: ["设备查询、详情、策略配置主路径回归。"],
      deployment: ["内网控制台随版本发布。"],
      security: ["权限设置与策略管理限制高风险操作入口。"],
    },
    cover: "/projects/kms-console.webp",
    accent: "#0f766e",
    featured: false,
    archive: true,
  },
  {
    id: "toc-cms",
    title: "ToC CMS · App Catalog Admin",
    titleEn: "应用目录与运营配置后台",
    period: "2023 — 2024",
    summary: "面向终端侧的应用与内容运营：应用上架、分类、轮播、设备与活动码。",
    highlights: ["应用上架与复杂配置表单", "轮播 / 活动码运营能力"],
    stack: ["Vue", "Element-UI"],
    architecture: [
      "以应用列表为中心，表单承载安装参数、注册表、静默安装等系统级配置。",
      "运营侧模块（轮播、热门推荐、活动二维码、消息）与设备管理并列。",
    ],
    background:
      "晟为数科时期交付。要解决的问题是：给终端侧分发应用与运营内容（推荐、轮播、活动），并管理设备与反馈。使用场景是运营配置应用元数据、上架状态，以及活动入口。",
    challenge: [
      "应用配置字段多（安装包、注册表、卸载命令），表单可维护性要求高。",
      "图片 / 安装包上传与预览状态要稳定。",
      "分类、推荐、轮播等多入口共用应用数据，状态（上架）要一致。",
    ],
    contribution: [
      "我负责应用运营后台相关页面与复杂配置表单。",
      "我落地分类、轮播、设备、活动码等运营模块的前端实现。",
    ],
    engineering: {
      performance: ["列表分页；大文件上传进度与失败重试提示。"],
      testing: ["应用编辑、上架开关、轮播配置主路径回归。"],
      deployment: ["随运营后台版本发布。"],
      security: ["角色权限控制菜单；上传类型与大小限制。"],
    },
    cover: "/projects/toc-cms.webp",
    accent: "#1d4ed8",
    featured: false,
    archive: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => p.archive);

export function getProject(slug: string) {
  return projects.find((p) => p.id === slug);
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.id);
}

/** @deprecated use getAllProjectSlugs */
export function getAllProjectIds() {
  return getAllProjectSlugs();
}
