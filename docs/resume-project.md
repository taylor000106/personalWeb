# 简历项目描述（personal-web）

> 面向：15k–25k · React / Next.js / AI 应用方向前端
> 可直接粘贴到简历「个人项目」栏，按版面删减亮点条数。

---

## 项目名称

Personal AI Knowledge Platform（个人前端技术平台 / yywtaylor.cyou）

## 技术栈

Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · SQLite · JWT · Zod · Vitest · Docker · Nginx · GitHub Actions · SSE

## 项目介绍

独立设计并实现的「AI 时代前端工程师个人技术平台」：对外是 Developer Portfolio + Frontend Lab + AI Knowledge Assistant，对内是 JWT 鉴权的私人知识面板。完整覆盖从内容架构、全栈接口、工程化到 VPS 生产部署的闭环，用于证明可独立交付现代 Web 产品，而非纯展示页。

## 项目职责

1. 以 App Router 拆分公开站与私人后台：Homepage / Lab / Assistant 与 Dashboard API 边界清晰，Server Component 承载静态内容，重交互客户端隔离。
2. 搭建单账号安全链路：bcrypt 密码、JWT Cookie、Zod 校验、登录与 AI 接口限流、Repository 封装 SQLite CRUD。
3. 实现 AI Knowledge Assistant：结构化 Markdown 知识库、关键词 + 本地轻量向量混合检索、SSE 流式输出；可选接入 OpenAI 兼容 LLM / Embedding。
4. 建设 Frontend Engineering Lab（Animation / Performance / AI / Browser），区分社区灵感与原创实验，补充虚拟列表、SSE、Storage、Web Worker 等可讲解 Demo。
5. 落地工程与性能实践：ESLint / Prettier / Husky / Vitest / CI；粒子 Canvas 延后加载与降载；web-vitals 实测展示；Docker + Nginx + Actions 自动部署。

## 项目亮点

1. **产品级定位**：不是简历翻版站，而是 Portfolio + 实验平台 + AI 能力展示的统一入口，面试可演示完整路径。
2. **全栈可上线**：鉴权、CRUD、限流、活动日志、standalone Docker 部署，具备生产项目基本规范。
3. **AI 应用可讲深**：检索 / 回答边界 / SSE 可中断 / 本地与 LLM 双模式，表述诚实，避免「套壳聊天」质疑。
4. **工程化完整**：从 lint-staged、单测到 CI 阻断部署，体现 React/Next 方向所需工程意识。
5. **性能有证据**：针对 LCP/CLS/INP 做具体优化，并在站点内展示 web-vitals 会话实测与 Bundle Analyzer 能力。

---

## 一句话版本（项目列表用）

Next.js 全栈个人技术平台：Portfolio + Lab + AI 知识助手 + SQLite 后台，含鉴权限流、混合检索 SSE、CI/CD 与 Web Vitals 实测。

## 面试口述提纲（30 秒）

我做了一个可上线的个人前端技术平台。公开侧是作品集、工程实验 Lab 和基于知识库的 AI 助手；私有侧是 JWT + SQLite 的笔记链接面板。AI 部分我做了结构化知识库和本地混合检索，用 SSE 流式输出，也可以接大模型。整站有测试、CI 和 Docker 部署，首页还能看到 Web Vitals 实测，用来证明我能独立把 React/Next 项目按生产标准做完。
