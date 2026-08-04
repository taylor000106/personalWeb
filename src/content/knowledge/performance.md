# 性能优化经验

## ChatAI / 多端

- 关注白屏、首屏渲染、FP/FCP/LCP
- 减少首屏阻塞与重复请求
- SSE 流式对话不阻塞整页

## LinkWeChat

- 执行员工预览：虚拟列表 + 门槛筛选
- 避免一次性渲染过大列表

## 本站（可验证）

- Server Component 承载静态区块；粒子 Canvas `dynamic(ssr:false)`
- 移动端减粒子、滚动离开 Hero 暂停、`prefers-reduced-motion` 降级
- Lab demo iframe 懒加载；静态资源 Cache-Control；图片 AVIF/WebP
- `next/web-vitals` 采集 LCP/CLS/INP，首页 Performance 区展示
- `ANALYZE=1 npm run build` 做 Bundle 分析
- 目标：LCP < 2.5s，CLS < 0.1，INP < 200ms
