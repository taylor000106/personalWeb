/** Site identity — product homepage, not a resume dump */
export const profile = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Taylor",
  roleZh: "前端开发工程师",
  roleEn: "Frontend Engineer",
  taglineEn: "Building modern web applications with Vue, React and AI.",
  location: "南京 / 远程可协作",
  github: "https://github.com/taylor000106/personalWeb",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
} as const;
