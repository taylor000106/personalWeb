/** Site identity — product homepage, not a resume dump */
export const profile = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Taylor",
  roleZh: "前端开发工程师",
  roleEn: "Frontend Engineer",
  taglineZh: "独立开发现代 Web 产品，探索前端工程与 AI 应用",
  taglineEn:
    "Independently building modern web products — frontend engineering & AI apps.",
  location: "南京 / 远程可协作",
  github: "https://github.com/taylor000106/personalWeb",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  /** Positioning chips — not a skills wall */
  signals: [
    { id: "product", zh: "产品工程", en: "Product Engineering" },
    { id: "ai", zh: "AI 应用", en: "AI Applications" },
    { id: "systems", zh: "前端架构", en: "Frontend Systems" },
  ],
} as const;
