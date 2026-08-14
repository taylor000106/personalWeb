export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experiences: ExperienceItem[] = [
  {
    id: "bj-soft",
    company: "南京百珏科技有限公司",
    role: "Web 前端开发工程师",
    period: "2025.05 — 至今",
    summary:
      "双线交付：企微 SCRM 运营平台（Web JS / 企微 App TS）与多地银行营销 H5 活动（通用模板复用 10+）。",
    highlights: [
      "从 0 到 1 落地循环群发 / 朋友圈：周期配置、主子任务、字段规范化与过期任务状态收口",
      "优化群发发送范围与员工预览；虚拟列表支撑大数据量渲染；对照旧版重写并适配新后端联调上线",
      "参与 AI 相关前端：质检、客情分析、企微端话术助手；处理 keep-alive 与表单反显等中后台问题",
      "沉淀通用 H5 活动模板与移动端蓝湖协作规范，支撑扬州、靖江、青岛、苏州、江都、盱眙等地 10+ 银行营销活动",
    ],
  },
  {
    id: "shengwei",
    company: "晟为数科（深圳）科技有限公司",
    role: "Web 前端开发工程师",
    period: "2022.11 — 2025.02",
    summary:
      "两类交付：早期 ToB 管理后台（PRM / KMS / 运营 CMS），以及后期 ChatAI 多端 AI 对话产品。",
    highlights: [
      "ChatAI：负责 H5 / 小程序 / App 对话核心页，SSE 流式接入与多端收流差异处理",
      "完成会话列表 / 历史分页、多端登录，以及微信 / 支付宝前端调起与结果处理",
      "PRM 授权分销后台：扩展管理员 / 经销商 / 分销商多端，覆盖代理商、订单、激活码 / 进销存与看板权限",
      "KMS / CMS：设备镜像与能力管控、应用上架与静默安装 / 注册表配置，以及轮播等运营能力",
    ],
  },
];
