# 一个前端工程师如何部署自己的全栈应用

个人站如果只停在 `localhost`，作品集说服力会少一截。我把本站做成：**改代码 → CI → VPS 上 Docker 跑起来**，让「全栈」不只是同仓写了 API。

## 目标形态

- 应用：Next.js 15（`output: "standalone"`）
- 容器：Docker 镜像，环境变量注入密钥
- 主机：VPS + Nginx 反代
- 流水线：GitHub Actions，push `master` 后构建并部署
- 数据：SQLite 文件挂卷，避免容器一重建库就空

前端工程师独自维护时，优先选 **少移动部件** 的方案，而不是一上来 K8s。

## 我实际踩过的点

### 1. standalone 要和 Docker 对齐

Next standalone 会产出精简 server 目录；镜像里要拷齐 `public`、`.next/static` 等静态资源，否则线上 CSS / 图片 404。

### 2. 密钥不进镜像

`AI_API_KEY`、JWT 密钥、管理员密码只走环境变量 / 服务器侧文件。仓库里保留 `.env.example`，不提交真实 `.env.local`。

### 3. SQLite 要有持久卷

私人 Dashboard（笔记 / 链接）写在 `data/site.db`。若库文件打在镜像层里，每次发版等于重置。挂载宿主机目录或 named volume。

### 4. 磁盘与构建缓存

小 VPS 上反复 `docker build` 容易把磁盘吃满。定期 prune，Actions 里控制缓存策略，比临时手动删文件更稳。

### 5. Nginx 只做边界

TLS、反代、静态 demos（如独立 HTML）放在 Nginx；应用容器专注 Node。职责清晰后排障更快。

## 一条可重复的路径

```text
git push master
  → GitHub Actions 构建 / 测试
  → SSH 到 VPS
  → docker compose pull/build && up
  → 健康检查关键路由
```

你不需要一次做完美的 PaaS；你需要的是：**同一套步骤能第二次、第三次成功**。

## 和前端能力的关系

部署看起来像运维，但对前端求职叙事很关键：

- 证明你会把 Route Handler、鉴权、SSE 真正暴露到公网
- 证明你理解环境变量、静态资源、持久化这些「上线以后才痛」的问题
- 和 Lab、Assistant、Case Study 一起，组成完整的个人技术平台

如果你也想自己托管作品集：先打通 **standalone → Docker → 反代 → 一次成功的发版**，再考虑监控与多机。小而通，比大而不稳更有说服力。
