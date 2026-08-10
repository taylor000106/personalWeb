/**
 * Web performance — targets, session vitals, and archived Lighthouse notes.
 * Live LCP/CLS/INP come from next/web-vitals (this browser session).
 * Category scores come from production Lighthouse — see docs/lighthouse.md.
 */
export type VitalMetric = {
  id: string;
  label: string;
  /** Target display, e.g. "< 2.5s" */
  value: string;
  hint: string;
  /** web-vitals metric key when applicable */
  metricKey?: "LCP" | "CLS" | "INP" | "FCP" | "TTFB";
  status: "target" | "measured";
};

export const vitalMetrics: VitalMetric[] = [
  {
    id: "lcp",
    label: "LCP",
    value: "< 2.5s",
    metricKey: "LCP",
    hint: "目标阈值。会话实测见「实测」标签；生产 Lighthouse 首页 LCP 约 2.3s（mobile，2026-08-10）",
    status: "target",
  },
  {
    id: "cls",
    label: "CLS",
    value: "< 0.1",
    metricKey: "CLS",
    hint: "目标阈值。生产 Lighthouse 首页 CLS 为 0（mobile，2026-08-10）",
    status: "target",
  },
  {
    id: "inp",
    label: "INP",
    value: "< 200ms",
    metricKey: "INP",
    hint: "目标阈值；依赖本会话交互后由 web-vitals 采集（Lighthouse 默认报告不含稳定 INP）",
    status: "target",
  },
  {
    id: "bundle",
    label: "Bundle",
    value: "ANALYZE=1",
    hint: "App Router 按路由拆分；Lab HTML 不进主包。分析：ANALYZE=1 npm run build",
    status: "target",
  },
];

/** Production Lighthouse snapshot — real scores only (docs/lighthouse.md) */
export const lighthouseSnapshot = {
  testedAt: "2026-08-10",
  formFactor: "mobile" as const,
  origin: "https://yywtaylor.cyou",
  tool: "Lighthouse CLI 12.8.2",
  pages: [
    {
      path: "/",
      label: "Home",
      performance: 96,
      accessibility: 96,
      bestPractices: 96,
      seo: 100,
    },
    {
      path: "/assistant",
      label: "Assistant",
      performance: 100,
      accessibility: 96,
      bestPractices: 96,
      seo: 100,
    },
    {
      path: "/lab",
      label: "Lab",
      performance: 62,
      accessibility: 95,
      bestPractices: 93,
      seo: 100,
    },
  ],
} as const;

export const vitalsPractices = [
  "ParticleCanvas：dynamic import + 移动端减粒子 + 离开首屏暂停",
  "静态 demo / 项目图：Cache-Control + AVIF/WebP",
  "会话测量：next/web-vitals（LCP/CLS/INP）写入 session，上方卡片展示",
  "生产归档：Lighthouse mobile 四维分数见本区下方表格与 docs/lighthouse.md",
  "分析：ANALYZE=1 npm run build 打开 Bundle Analyzer",
] as const;
