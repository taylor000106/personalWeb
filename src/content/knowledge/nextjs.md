# 为什么选 Next.js

## 选型理由

1. App Router + Server Components：首页作品集 SEO 友好，动效/粒子下沉为 Client Island。
2. Route Handlers：同一仓库完成 JWT 鉴权、CRUD、SSE。
3. standalone + Docker：适合 VPS 自托管部署。
4. 与我的 React / 工程化方向一致，适合作为跳槽作品集。

## 本站做法

- 内容层 content/ 与 UI 分离
- Zod 校验 + bcrypt + 登录限流
- Lab 静态 HTML demo 不打进主包
