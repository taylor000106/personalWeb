/**
 * Web performance — targets + practices.
 * Live values appear on the homepage via web-vitals session measurements.
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
    hint: "首屏文案由 Server/静态结构输出；粒子 Canvas dynamic(ssr:false) 延后，避免抢 LCP",
    status: "target",
  },
  {
    id: "cls",
    label: "CLS",
    value: "< 0.1",
    metricKey: "CLS",
    hint: "Hero / 分区固定 min-height 与 aspect-ratio；图片走 next/image 预留尺寸",
    status: "target",
  },
  {
    id: "inp",
    label: "INP",
    value: "< 200ms",
    metricKey: "INP",
    hint: "粒子联动降复杂度、滚动出 Hero 后暂停；重交互下沉到 /lab",
    status: "target",
  },
  {
    id: "bundle",
    label: "Bundle",
    value: "ANALYZE=1",
    hint: "App Router 按路由拆分；framer-motion optimizePackageImports；Lab HTML 不进主包",
    status: "target",
  },
];

export const vitalsPractices = [
  "ParticleCanvas：dynamic import + 移动端减粒子 + 离开首屏暂停",
  "静态 demo / 项目图：Cache-Control + AVIF/WebP",
  "测量：next/web-vitals（LCP/CLS/INP）写入 session，首页实时展示",
  "分析：ANALYZE=1 npm run build 打开 Bundle Analyzer",
] as const;
