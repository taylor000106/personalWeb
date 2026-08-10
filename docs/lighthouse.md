# Lighthouse 实测记录

> **真实跑分，非模拟数据。**  
> 目标站：生产环境 [https://yywtaylor.cyou](https://yywtaylor.cyou)  
> 工具：Lighthouse CLI `12.8.2` + Chrome headless  
> 形态：`mobile`（Lighthouse 默认）  
> 类目：Performance / Accessibility / Best Practices / SEO  
> 最近一次：2026-08-10（UTC `09:46`–`09:47`）

原始 JSON：`docs/lighthouse-raw/{home,assistant,lab}.json`。

## 总分（最新）

| 页面         | URL          | Performance | Accessibility | Best Practices |     SEO |
| ------------ | ------------ | ----------: | ------------: | -------------: | ------: |
| 首页         | `/`          |      **95** |        **96** |         **96** | **100** |
| AI Assistant | `/assistant` |      **99** |        **96** |         **96** | **100** |
| Lab          | `/lab`       |      **48** |        **95** |         **93** | **100** |

## 关键指标（摘录）

| 页面         | LCP   | CLS   | TBT    | FCP   | Speed Index |
| ------------ | ----- | ----- | ------ | ----- | ----------- |
| `/`          | 2.6 s | 0     | 70 ms  | 1.4 s | 3.4 s       |
| `/assistant` | 1.2 s | 0     | 100 ms | 1.0 s | 2.9 s       |
| `/lab`       | 3.7 s | 0.029 | 5.0 s  | 2.4 s | 8.8 s       |

## 与上次对比（同日更早一次 · UTC ~07:49）

| 页面         | Perf 前 → 后 | 备注                                  |
| ------------ | ------------ | ------------------------------------- |
| `/`          | 96 → **95**  | LCP 2.3s → 2.6s，正常波动             |
| `/assistant` | 100 → **99** | 仍接近满分                            |
| `/lab`       | 62 → **48**  | 仍被 TBT（~5s）拖累，实验集合页波动大 |

## 解读（诚实）

- **首页 / Assistant**：移动端四维仍健康；分数会随网络与主线程抖动 ±1～数分，属正常。
- **Lab**：SEO / A11y / Best Practices 仍高，Performance 不作为作品集首屏 KPI。
- 首页 Web Vitals 区：**会话级** `next/web-vitals` + **本表 Lighthouse 归档**；口径不同。

## 复跑

```bash
npx lighthouse https://yywtaylor.cyou/ --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/lighthouse-raw/home.json --chrome-flags="--headless"
npx lighthouse https://yywtaylor.cyou/assistant --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/lighthouse-raw/assistant.json --chrome-flags="--headless"
npx lighthouse https://yywtaylor.cyou/lab --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/lighthouse-raw/lab.json --chrome-flags="--headless"
```
