# 简历项目描述（personal-web）

> 面向：15k–25k · React / Next.js / AI 应用方向前端  
> 可直接粘贴到简历「个人项目」栏，按版面删减亮点条数。  
> 性能数字来自生产站 Lighthouse 实测，见 `docs/lighthouse.md`（2026-08-10）。

---

## 项目名称

Personal AI Knowledge Platform（个人前端技术平台 / yywtaylor.cyou）

## 技术栈

Next.js 15 · React 19 · TypeScript · Tailwind CSS · SQLite · JWT · Zod · Vitest · Docker · Nginx · GitHub Actions · SSE

## 项目介绍

独立设计并上线的「AI 时代前端工程师个人技术平台」：对外是 Developer Portfolio、Frontend Lab、AI Knowledge Assistant 与技术文章；对内是 JWT 鉴权的私人 Dashboard（笔记 / 链接）。覆盖内容层、全栈接口、工程化与 VPS Docker 部署闭环，用于证明可独立交付可上线的 Next.js 产品，而非纯展示页。

## 项目职责

1. 用 App Router 拆分公开站与私人后台：Homepage / Lab / Assistant / Articles 与 Dashboard API 边界清晰；Server Component 承载内容，重交互下沉 Client。
2. 搭建单账号安全链路：bcrypt、JWT Cookie、Zod 校验、登录与 AI 限流、SQLite Repository CRUD。
3. 实现 AI Knowledge Assistant：结构化 Markdown 知识库、本地关键词 + 轻量向量混合检索、SSE 流式输出；可配置 `AI_API_KEY` 切换 LLM，无 Key 时本地模式仍可演示。
4. 建设 Case Study 与 Frontend Lab：项目详情含架构示意与截图；Lab 覆盖动效 / 性能 / AI / Browser 实验（含虚拟列表、SSE Demo 等）。
5. 落地工程与部署：ESLint / Prettier / Husky / Vitest / CI；Docker + Nginx + GitHub Actions 自动部署到 VPS。

## 项目亮点

1. **产品级定位**：Portfolio + Lab + 知识库助手 + 文章，面试可现场演示完整路径。
2. **全栈可上线**：鉴权、CRUD、限流、standalone Docker 部署，具备生产项目基本规范。
3. **AI 可讲深**：检索边界、SSE 可中断、推荐问题与可点击引用、本地 / LLM 双模式；表述诚实，避免「套壳聊天」。
4. **工程化完整**：lint-staged、单测、CI 阻断不合格格式 / 测试，再部署。
5. **性能有实测**：生产站 Lighthouse（mobile，2026-08-10 复测）：首页 Performance **95** / A11y **96** / Best Practices **96** / SEO **100**；`/assistant` Performance **99**。Lab 为实验集合页，Performance **48**（TBT 偏高），不作为首屏 KPI。首页另有 `web-vitals` 会话实测 LCP/CLS/INP。

---

## 一句话版本（项目列表用）

Next.js 15 + React 19 全栈个人技术平台：Portfolio + Lab + 知识库 AI 助手（SSE）+ SQLite 后台，含鉴权限流、Docker / Actions 部署；生产 Lighthouse 首页 Performance 95、SEO 100。

## 面试口述提纲（30 秒）

我做了一个已上线的个人前端技术平台。公开侧是作品集、工程 Lab、文章，以及基于 Markdown 知识库的 AI 助手（本地混合检索 + SSE，可切 LLM）；私有侧是 JWT + SQLite 面板。整站有测试、CI 和 Docker 部署。性能上我对生产域名跑过 Lighthouse：首页四维约 95–100，Assistant 性能接近满分；Lab 因为重 Demo 主线程占用更高，我会分开讲优化边界。
