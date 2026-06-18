# 个人网站 (yywtaylor.cyou)

Next.js 全栈项目：访客可看粒子动效首页；登录后进入私人面板（笔记 / 链接 / 资料），数据存在 SQLite。

## 本地开发

1. 安装 [Node.js 20+](https://nodejs.org/)
2. 复制环境变量：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，设置 `ADMIN_EMAIL`、`ADMIN_PASSWORD`、`AUTH_SECRET`（随机长字符串）。

3. 安装并启动：

```bash
npm install
npm run dev
```

浏览器打开 http://localhost:3000

### 开发时热重载说明

| 你改的文件 | 需要做什么 |
|------------|------------|
| `src/` 里的页面、组件 | 保存后浏览器**自动刷新** |
| `public/lab/demos/*.html` 等静态文件 | **不用**重启 `npm run dev`，在浏览器按 **F5** 即可 |
| `.env.local`、`next.config.ts` | 必须 **Ctrl+C 停掉再 `npm run dev`** |
| `data/site.db` 数据库 | 不用重启，刷新页面 |

若改 `src` 仍不自动更新：

1. 只保留**一个**终端跑 `npm run dev`（不要开两个端口 3000/3001）
2. 执行 `npm run clean` 后重新 `npm run dev`

## 路由

| 路径 | 说明 |
|------|------|
| `/` | 访客首页（粒子动效） |
| `/login` | 登录页（四角色互动动画） |
| `/lab` | 动效合集（卡片画廊） |
| `/lab/[slug]` | 单个效果详情（演示 + 解析 + 源码） |
| `/dashboard` | 登录后的私人空间 |

## 部署到 Vultr（推荐 Docker）

### 你已有资源

| 组件 | 用途 |
|------|------|
| NameSilo | 域名 `yywtaylor.cyou` |
| Cloudflare | DNS（建议开启 Proxied 橙云 + SSL 灵活或 Full） |
| Vultr 东京 VPS | 跑网站 + 你现有的 3X-UI |
| acme.sh | HTTPS 证书 |

### 还需要准备什么

1. **DNS 记录**（Cloudflare）  
   - `A` 记录：`@` → VPS 公网 IP  
   - `A` 或 `CNAME`：`www` → 同上（可选）  
   - 若网站与子域 `tokyo` 分开：主站用 `@`，代理节点继续用 `tokyo`

2. **服务器软件**（SSH 登录 VPS 后）  
   - Docker + Docker Compose  
   - Nginx（反向代理到本项目的 3000 端口）  
   - 防火墙：开放 80/443，**不要**把 3000 暴露到公网（docker-compose 已绑定 127.0.0.1）

3. **环境变量文件**（VPS 上 `/opt/personal-web/.env`）  

```env
NEXT_PUBLIC_SITE_NAME=Taylor
NEXT_PUBLIC_SITE_URL=https://yywtaylor.cyou
ADMIN_EMAIL=你的邮箱
ADMIN_PASSWORD=强密码
AUTH_SECRET=用 openssl rand -base64 32 生成
```

4. **上传代码**  

```bash
# 本机
scp -r c:\baidunetdiskdownload\personalWeb root@你的VPS_IP:/opt/personal-web
```

5. **在 VPS 构建并运行**  

```bash
cd /opt/personal-web
docker compose up -d --build
```

6. **Nginx**  
   - 参考 `deploy/nginx-site.conf.example`  
   - 证书路径改成你 `acme.sh` 的实际目录  
   - 若只有 `tokyo.yywtaylor.cyou` 的证书，需为主域名再签一张：  
     `acme.sh --issue -d yywtaylor.cyou -d www.yywtaylor.cyou --nginx`

7. **Cloudflare SSL**  
   - 源站有 Let's Encrypt 时，Cloudflare 加密模式选 **Full (strict)** 最佳

### 数据备份

数据库文件：`data/site.db`。定期备份该目录即可。

```bash
tar -czf backup-$(date +%F).tar.gz data/
```

## 安全提示

- 这是**单人站点**：仅 `.env` 里配置的一个账号可登录，无公开注册。  
- 切勿把 `.env` 提交到 Git。  
- `AUTH_SECRET` 与 `ADMIN_PASSWORD` 务必使用强随机值。  
- 3X-UI / Xray 面板与网站建议不同端口、不同路径，并限制面板访问 IP。

## 技术栈

- Next.js 15 App Router  
- SQLite (`better-sqlite3`)  
- JWT Cookie 登录  
- Tailwind CSS 4 + Framer Motion  

## 动效合集（/lab）

新增效果时：

1. 将完整 demo 放到 `public/lab/demos/你的效果.html`
2. 在 `src/data/lab-effects.ts` 的 `labEffects` 数组里追加一条配置（标题、解析、来源链接等）

## 后续可扩展

- `/lab` 分类筛选（效果多了再加）  
- 把「资料」同步到访客首页展示  
- 上传头像（对象存储或 VPS 本地）  
- 博客 Markdown 页面  
- 多因素认证（2FA）
