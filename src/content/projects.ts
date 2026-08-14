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
  /** Chinese display name — primary when locale is zh */
  titleZh?: string;
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
    titleZh: "本站 · AI 知识与工程平台",
    period: "2026 — 至今",
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
        "首页 web-vitals 实测展示 LCP/CLS/INP；Lighthouse 首页：性能 95、无障碍 96、最佳实践 96、SEO 100。",
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
    titleZh: "ChatAI 多端 AI 对话应用",
    period: "2024.07 — 2025.01",
    summary:
      "面向 C 端的多端 AI 对话产品：H5 / 小程序 / App，覆盖 SSE 流式对话、登录与支付。",
    highlights: ["SSE 流式对话接入与多端收流差异处理", "多端登录与微信 / 支付宝支付调起"],
    stack: ["uni-app", "Vue3", "SSE", "Payment"],
    architecture: [
      "uni-app 收敛 H5 / 小程序 / App 业务层，减少多端重复实现；核心会话模型保持一致。",
      "对话主链路用 SSE：按端处理收流差异（如 H5 与小程序分块流），将增量文本拼接到会话消息并更新界面。",
      "登录与支付按端拆适配层（微信小程序 / App 一键登录；微信 / 支付宝调起，签名由服务端完成）。",
    ],
    background:
      "晟为数科时期交付。要解决的问题是：让用户在不同端获得一致的 AI 对话与付费体验。使用场景包括移动端快速提问、H5 投放转化与 App 内长会话。",
    challenge: [
      "SSE 流式输出：不同端收流差异、逐 Token 更新时的滚动与中断后半包恢复。",
      "会话侧基础能力：消息列表、历史会话切换与分页加载，以及发送中状态与异常提示。",
      "多端登录态统一：微信小程序 / App 一键登录后，请求对话与业务接口。",
      "支付前端调起：微信 / 支付宝结果处理与弱网异常态，签名等由服务端完成。",
    ],
    contribution: [
      "我负责 H5 / 小程序 / App 多端 AI 对话核心页：流式输出接入与展示。",
      "我完成会话侧基础能力：消息列表、历史切换与分页、发送中状态与异常提示。",
      "我完成多端登录，并负责微信支付 / 支付宝的前端调起与支付结果处理。",
      "我跟进联调上线、缺陷修复与核心交互相关的回归验证。",
    ],
    engineering: {
      performance: ["关注对话主路径；减少长列表无谓重绘，优化流式更新策略。"],
      testing: ["按端回归清单覆盖登录、对话、支付主路径；线上问题闭环验证。"],
      deployment: ["多端发版节奏管理；按端差异发布，降低一次全量翻车风险。"],
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
    titleZh: "企微 SCRM 智能获客与运营平台",
    period: "2025.05 — 至今",
    summary:
      "ToB 企微营销 SaaS：Web（JS）/ 企微 App（TS）双端；群发与循环营销、SOP、客户画像、AI 质检与话术助手。",
    highlights: [
      "从 0 到 1 落地循环群发 / 朋友圈（周期配置、主子任务、状态协同）",
      "Web/App 双端核心业务 + AI 质检 / 客情 / 话术助手相关前端",
    ],
    stack: ["Vue3", "JavaScript", "TypeScript", "Element Plus", "Pinia", "ECharts"],
    architecture: [
      "PC 运营后台用 Vue3 + JavaScript + Element Plus，复杂表单与表格是主战场；企微 App 用 Vue3 + TypeScript，承载待办、画像、SOP、AI 助手与小店。",
      "把「群发」升级为可周期运营：周期配置（工作日 / 自定义日期去重排序）+ 主/子任务与字段规范化，编辑反显与状态口径前后端对齐。",
      "AI 相关前端：质检、客情分析、企微端话术助手；必要时协同后端做状态兜底与导入校验明细。",
    ],
    background:
      "要解决的问题是：企微场景下把客户运营、营销触达、SOP、AI 接待与数据统计收进统一运营系统。使用场景是运营配置任务与规则，员工在企微 App 内执行触达、查看画像与质检结果。",
    challenge: [
      "复杂表单与周期任务：多条件、多步骤、校验与回显耦合，需要可维护的表单模型与可复用周期组件。",
      "双端一致性：同一需求常同时改 Web + App；对照旧版页面与交互重写，并适配新后端接口联调上线。",
      "大数据量预览：发送范围与员工预览（总客户 / 未流失 / 已流失）需虚拟列表，避免一次渲染卡死。",
      "线上状态收口：朋友圈 / 过期任务截止后仍显示「进行中」等状态协同问题。",
    ],
    contribution: [
      "我从 0 到 1 落地循环群发：周期配置、主子任务编辑与字段规范化；并完善朋友圈 / 循环朋友圈能力，参与过期任务状态收口。",
      "我优化群发发送范围与员工预览；员工列表采用虚拟列表，优化大数据量渲染。",
      "我负责 Web / App 双端核心业务：客户群发、SOP、客户画像、员工小店等可配置模块。",
      "我对照旧版系统完成前端重写与新接口联调；参与 AI 相关前端（质检、客情分析、话术助手），并处理 keep-alive 缓存刷新、表单反显等中后台问题。",
    ],
    engineering: {
      performance: [
        "执行员工预览等：虚拟列表 + 分类筛选，避免一次渲染过大列表。",
        "keep-alive 列表激活刷新、图表空数据防护。",
      ],
      testing: [
        "关键路径回归：任务配置/发布、循环群发编辑反显、过期任务状态、质检相关前端。",
      ],
      deployment: ["跟随产品节奏持续交付 Web/App；适配新后端接口支撑并行上线。"],
      security: [
        "权限与菜单级控制；导入校验失败时协同完善错误明细返回，减少脏数据与误报。",
      ],
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
    titleZh: "授权与渠道管理后台",
    period: "2023.03 — 2024.06",
    summary:
      "授权分销后台：管理员 / 经销商 / 分销商多端，覆盖代理商、订单、激活码与进销存。",
    highlights: ["多角色后台与权限路由", "激活码 / 库存看板与趋势图"],
    stack: ["Vue2", "Vuex", "Element-UI", "ECharts"],
    architecture: [
      "基于若依二次开发；按管理员 / 经销商 / 分销商拆分后台视角，同一业务不同权限面。",
      "ECharts 承载激活码发放、库存与终端激活趋势，表格承接代理商、客户、订单与发货明细。",
    ],
    background:
      "晟为数科时期 ToB 管理后台之一。要解决的问题是：授权码在代理渠道中的发放、库存与激活闭环，并按角色控制可见数据。使用场景是运营与渠道查看库存、审批发货、管理激活码与客户。",
    challenge: [
      "多角色菜单与数据权限交叉，避免越权看到上级库存。",
      "激活码体量大时的筛选、分页与看板口径一致。",
      "经销商 / 分销商流程差异（发货审批、出库审批）下的表单复用边界。",
    ],
    contribution: [
      "我扩展管理员 / 经销商 / 分销商多端页面，覆盖代理商、客户、订单、激活码 / 测试码、发货与进销存、授权证书。",
      "我落地首页看板（激活码与库存等指标及趋势图），并按角色菜单做权限控制。",
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
    titleZh: "设备与镜像运维控制台",
    period: "2023 — 2024",
    summary:
      "设备运维控制台：设备与镜像管理、KMS 激活及设备能力管控（文件共享 / 剪切板 / USB 等）。",
    highlights: ["设备 / 镜像运维与 KMS 激活", "IP / 机器码检索与能力管控"],
    stack: ["Vue2", "Vuex", "Element-UI", "ECharts"],
    architecture: [
      "控制台以设备与镜像为中心，首页看板 + 列表查询构成运维主路径。",
      "设备能力控制（文件共享、剪切板、USB 等）与 KMS 激活、策略权限联动。",
    ],
    background:
      "晟为数科时期 ToB 管理后台之一。要解决的问题是：终端设备的在线状态、镜像分发与能力管控需要统一运维入口。使用场景是运维按 IP/机器码检索终端，并配置激活与设备能力。",
    challenge: [
      "设备列表与详情态较多（在线、分组、时长），查询与详情要保持一致。",
      "镜像管理与 KMS 激活流程跨模块，状态反馈要清晰。",
      "高风险能力开关（USB / 剪切板等）配置错误成本高，表单校验与确认要稳。",
    ],
    contribution: [
      "我负责设备与镜像管理、KMS 激活及设备管控相关页面开发与联调。",
      "我落地 IP / 机器码检索，以及文件共享、剪切板、USB 等设备能力控制。",
    ],
    engineering: {
      performance: ["设备列表分页与条件查询，避免全量拉取。"],
      testing: ["设备查询、详情、激活与能力配置主路径回归。"],
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
    titleZh: "应用目录与运营配置后台",
    period: "2023 — 2024",
    summary:
      "运营 CMS：应用上架与分类、安装包 / 静默安装 / 注册表配置，以及轮播与活动运营。",
    highlights: ["应用上架与静默安装 / 注册表配置", "轮播 / 热门推荐 / 活动二维码"],
    stack: ["Vue2", "Vuex", "Element-UI"],
    architecture: [
      "以应用列表为中心，表单承载安装包上传、静默安装、注册表等系统级配置。",
      "运营侧模块（轮播、热门推荐、活动二维码、消息与问题反馈）与应用目录并列。",
    ],
    background:
      "晟为数科时期 ToB 管理后台之一。要解决的问题是：给终端侧分发应用与运营内容（推荐、轮播、活动），并管理消息与反馈。使用场景是运营配置应用元数据、上架状态，以及活动入口。",
    challenge: [
      "应用配置字段多（安装包、注册表、静默安装），表单可维护性要求高。",
      "图片 / 安装包上传与预览状态要稳定。",
      "分类、推荐、轮播等多入口共用应用数据，状态（上架）要一致。",
    ],
    contribution: [
      "我负责应用列表与分类、安装包上传及静默安装 / 注册表配置相关前端。",
      "我维护轮播、热门推荐、活动二维码、消息与问题反馈等运营功能。",
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

export function getProjectTitles(project: ProjectItem, locale: "zh" | "en") {
  const en = project.title;
  const zh = project.titleZh ?? project.title;
  if (locale === "zh") {
    return { primary: zh, secondary: zh !== en ? en : undefined };
  }
  return {
    primary: en,
    secondary: project.titleZh && project.titleZh !== en ? project.titleZh : undefined,
  };
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.id);
}

/** @deprecated use getAllProjectSlugs */
export function getAllProjectIds() {
  return getAllProjectSlugs();
}
