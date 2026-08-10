# Lighthouse 实测记录

> **真实跑分，非模拟数据。**  
> 目标站：生产环境 [https://yywtaylor.cyou](https://yywtaylor.cyou)  
> 工具：Lighthouse CLI `12.8.2` + Chrome headless  
> 形态：`mobile`（Lighthouse 默认）  
> 类目：Performance / Accessibility / Best Practices / SEO  
> 时间：2026-08-10（UTC `07:49` 左右）

原始 JSON：`docs/lighthouse-raw/{home,assistant,lab}.json`（可本地复跑覆盖）。

## 总分

| 页面         | URL          | Performance | Accessibility | Best Practices |     SEO |
| ------------ | ------------ | ----------: | ------------: | -------------: | ------: |
| 首页         | `/`          |      **96** |        **96** |         **96** | **100** |
| AI Assistant | `/assistant` |     **100** |        **96** |         **96** | **100** |
| Lab          | `/lab`       |      **62** |        **95** |         **93** | **100** |

## 关键指标（摘录）

| 页面         | LCP   | CLS   | TBT   | FCP   | Speed Index |
| ------------ | ----- | ----- | ----- | ----- | ----------- |
| `/`          | 2.3 s | 0     | 80 ms | 1.2 s | 3.9 s       |
| `/assistant` | 1.1 s | 0     | 50 ms | 0.9 s | 2.8 s       |
| `/lab`       | 1.5 s | 0.029 | 5.5 s | 1.2 s | 8.1 s       |

## 解读（诚实）

- **首页 / Assistant**：移动端四维分数整体健康；首页 LCP 2.3s 仍落在常见「良好」区间附近。
- **Lab**：SEO / A11y / Best Practices 仍高，但 Performance 被 **Total Blocking Time（约 5.5s）** 明显拖累——符合「实验集合页含重交互 / 多 Demo 入口」的预期，**不把它当成作品集首屏 KPI**。
- 本仓库首页 Web Vitals 区同时展示：**会话级** `next/web-vitals`（LCP/CLS/INP）+ **本次 Lighthouse 归档说明**；二者口径不同，勿混为一谈。

## 复跑

```bash
# 需本机 Chrome + npx/本地 lighthouse
npx lighthouse https://yywtaylor.cyou/ --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/lighthouse-raw/home.json --chrome-flags="--headless"
npx lighthouse https://yywtaylor.cyou/assistant --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/lighthouse-raw/assistant.json --chrome-flags="--headless"
npx lighthouse https://yywtaylor.cyou/lab --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/lighthouse-raw/lab.json --chrome-flags="--headless"
```
