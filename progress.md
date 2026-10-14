# 改造进度：AIHOT → 九大领域行业热点站

> 按 AGENTS.md 工作原则记录的进度日志。任务：把示例 AI 行业站改造成「九大领域」行业热点站。

## 完成情况

- [x] 读 AGENTS.md / README.md / docs/customize.md，确认改造顺序与边界（只改 `site/` + `industry/` + `tests/`）
- [x] 重写 `industry/taxonomy.ts`：9 类别（ai-tech/hotel/restaurant/ecommerce/hr/marketing/finance/legal/consulting）、RELEASE=null、CATEGORY_TAGS/TOPIC_TAGS/ENTITY_TAGS/TAG_SYNONYMS/ENTITIES（40+ 实体）/IDENTITY_LEXICON/PUBLISHER_DOMAINS
- [x] 重写 `industry/topics.json`：约 100 个主题（company/field/genre 三组）
- [x] 重写 `industry/sources.json`：18 个公开 RSS 示范源（逐条验证可达性）
- [x] 重写/修改 `industry/prompts/*`：prefilter/selection-score/structure/content-understanding/rules-domain 重写；summarize/report-period/identity-context/translate-body 小改
- [x] 修改 `site/site.ts`（站名占位"行业热点"、subject"行业"、mcpPrefix"industryhot"、crawlerName、页面文案）
- [x] 重新生成 `site/brand/nameplates/*`（行业日报/周报/月报/日报合集）
- [x] 更新 `site/changelog.json`（2026-10-14 九大领域版）
- [x] 测试适配：批量替换 38 个测试文件 + 手工修复 8 个特殊测试文件

## 验证结果（2026-10-14）

- `npm run typecheck`：✅ 通过（含 tests 工程）
- `npm test`：748 个测试，729 通过。剩余失败均为环境性/平台性，与改造无关：
  - 5 个 SIGTERM 测试（analyze-shutdown×3、translate-shutdown×2）超时 = Windows 无 POSIX SIGTERM 语义（测试按 Unix 设计，CI/Linux 会过）
  - 9 个环境工具缺失（architecture=非 git 检出、backup×7=缺 pg_dump/sh、outbound-protocol=缺 openssl）
  - 4 个文件级失败为全量并发竞争偶发（queue-shutdown/reading/recall-cache/source-publication-window 单独跑全部通过）
  - 注：本机 Node v22 不支持 --test-global-setup，用 `npx node@24`（v24.21.0）运行；系统 Node 未改动
- `node scripts/smoke.ts --base http://localhost:3000`：✅ 29/29 全过（临时起 api:3001 + web:3000 + PostgreSQL 容器，已停止服务）

## 环境备注

- 为跑测试临时启动：Docker Desktop（用户机器已安装）→ PostgreSQL 17 容器 `industryhot-pg`（端口 5433，因 5432 被本机 reactive_resume 占用）。容器保留，方便后续重新跑测试/校准门槛。
- 测试库：`industryhot_test`（npm test 模板库，自动建库迁移）；smoke 用 `industryhot_smoke`（已迁移）。
- 本机缺 pg_dump / openssl / sh（Git Bash 不在 PATH），非 git 检出——这些环境的测试无法在本机通过，需在 CI/Linux 环境跑。

## 待用户决定（未拍板）

见任务 #9 汇总清单（站名/信源/条款内容/门槛校准/RELEASE=null/品牌署名/上线部署等）。

---

## 二轮：用户拍板后落地（2026-10-14 深夜）

- [x] 站名：SITE.name="九域热点"；footerNote="燕语咨询设计，基于AIHOT框架驱动"；motto="行业动态观察"；crawlerName="JiuyuBot/1.0"；organization.name 同步
- [x] Logo：附件燕子图裁剪去背 → site/brand/swallow.png，Wordmark 圆点换成燕子
- [x] 报头字：subject="行业"未变（"行业日报"），无需重生成
- [x] 日报报头九域计数：dailyMetrics 加 sectionCounts（九域各几条）；ReportPaper 报头日报下方加九格；correct.ts 分类修正时同步重建；contracts/format 类型放宽；相关测试同步（29/29 过）
- [x] 门槛：无真实金标样本（仅 2 条示例），按 AGENTS.md 不凭感觉调，保留默认 T1=60/T1_5=65/T2=76/understandFloor=50（偏严起点）；待用户标注 100-200 条跑 eval-selection.ts
- [x] Docker 本地部署：.env（采集开、模型调用暂关）→ docker compose up -d --build → db/api/web/worker 全 Up，http://localhost:3000 200，标题"九域热点"，smoke 29/29 全过
- [x] typecheck 全过

### 待用户后续
- 条款/隐私页模板占位内容需本人确认（运营主体/版本/日期/联系方式）
- LLM_API_KEY 未提供：填 .env 后把 MODEL_CALLS_ENABLED=true，精选与日报写作才会跑
- 门槛校准：标注样本后跑 scripts/eval-selection.ts
