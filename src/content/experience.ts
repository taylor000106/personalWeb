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
      "负责自研企微营销 SaaS 产品前端：运营后台与微信 H5 活动模块的需求迭代、线上修复与体验优化。",
    highlights: [
      "Vue3 + TypeScript + Element Plus + Vant；封装请求层、工具方法与通用表单/业务组件",
      "参与旧系统（.NET → Java）迁移中的前端重构与接口适配，统一校验与交互",
      "独立输出《移动端 H5 / 蓝湖协作开发规范》，沉淀 AI 辅助开发的审查与优化流程",
      "沉淀多条件周期任务通用能力，复用于企微群发、单发、朋友圈等模块",
    ],
  },
  {
    id: "shengwei",
    company: "晟为数科（深圳）科技有限公司",
    role: "Web 前端开发工程师",
    period: "2022.11 — 2025.02",
    summary:
      "参与 AI 对话产品（ChatAI）多端研发：小程序 / App / H5 / PC，覆盖登录、对话、支付等核心链路。",
    highlights: [
      "从 0 到 1 参与项目搭建与核心链路落地，配合第三方 SDK 接入与联调",
      "关注首屏与核心交互性能，推动白屏、首屏渲染等指标优化",
      "封装 uni-app 多端 SSE 能力并发布至插件市场，沉淀流式对话组件方案",
    ],
  },
];
