# Project visuals

| File                                                     | Use                                   |
| -------------------------------------------------------- | ------------------------------------- |
| `personal-ai.webp`                                       | Featured + detail hero（本站首页）    |
| `personal-lab.webp`                                      | Detail gallery                        |
| `personal-assistant.webp`                                | Detail gallery                        |
| `chatai.webp`                                            | Featured + detail hero                |
| `scrm.webp`                                              | Featured + detail hero（logo 已打码） |
| `scrm-tasks.webp`                                        | Detail gallery · 营销任务             |
| `scrm-analytics.webp`                                    | Detail gallery · 数据统计             |
| `scrm-customers.webp`                                    | Detail gallery · 客户运营             |
| `prm-license.webp` / `kms-console.webp` / `toc-cms.webp` | Archive covers                        |

Data fields in `src/content/projects.ts`:

- `cover` → Featured + detail Hero
- `gallery[]` → detail「更多截图」
- architecture diagrams → `ArchitectureDiagrams.tsx`（按 project id 自动展示，每项目最多一张）
