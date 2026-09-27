---
title: Agent 连接器能力矩阵
published: 2026-05-17
tags: []
category: AIHacks
draft: false
pinned: false
image: 
---

# Agent 连接器能力矩阵

Agent 不应该只停留在聊天窗口里，而是要能连接真实工具，完成信息读取、搜索、整理、写入、发布和协作。

这份清单按两类能力整理：

- **读写型连接器**：Agent 可以读取信息，也可以在用户授权后写入、创建、更新或发布内容。
- **搜索读取型连接器**：Agent 主要用于搜索、抓取、读取、摘要和监控信息源。

每一个连接器都需要对应到底层调用工具。这里优先记录当前电脑上已经安装、可以被 Agent 实际调用的 CLI / MCP / 本地工具；如果暂时没有检测到，就明确标注出来。

---

## 一、本机已检测到的底层工具

> 扫描时间：2026-05-17 15:51 | 扫描范围：pipx / npm global / PATH / pip list

| 工具                | 命令 / 调用方式                                                       | 版本                          | 安装方式                          | 主要用途                                    |
| ----------------- | --------------------------------------------------------------- | --------------------------- | ----------------------------- | --------------------------------------- |
| GitHub CLI        | `gh`                                                            | 最新                          | installer                     | GitHub Repo、Issue、PR、Actions、Release 读写 |
| Git               | `git`                                                           | —                           | system                        | 本地仓库与版本管理                               |
| Lark CLI          | `lark-cli`                                                      | 1.0.32                      | npm `@larksuite/cli`          | 飞书文档、表格、多维表格、日历、任务、群消息等读写               |
| Lark MCP          | `lark-mcp`                                                      | 0.5.1                       | npm `@larksuiteoapi/lark-mcp` | 飞书 MCP Server，补充 lark-cli 覆盖面           |
| X / Twitter CLI   | `twitter`（pipx 暴露名为 `twitter`）                                  | 0.8.5                       | pipx                          | 发帖、搜索、时间线、互动（Agent-Reach 上游）            |
| 即刻 CLI            | `jike`（pipx 暴露名为 `jike`）                                        | 0.1.1                       | pipx                          | 即刻动态发布、读取、互动（Agent-Reach 生态）            |
| Agent Reach X 工具  | `xreach` / `xfetch`                                             | 0.3.3 / 0.2.1               | npm                           | X/Twitter 等 17 平台搜索、抓取、读取               |
| Google Search CLI | `gsearch`                                                       | —                           | cargo (Rust)                  | 谷歌搜索                                    |
| YouTube 下载/字幕工具   | `yt-dlp`                                                        | —                           | pip                           | YouTube/B站等视频读取、字幕下载、元数据提取              |
| 小红书 CLI           | `xhs`（来自 `xiaohongshu-cli`）                                     | —                           | pipx                          | 小红书搜索、读取、发布、评论                          |
| 微博 CLI            | `weibo-cli`                                                     | —                           | pip                           | 微博搜索、热搜、话题、用户、评论读取                      |
| 抖音 MCP Server     | `douyin-mcp-server`                                             | 1.2.1                       | pip                           | 抖音内容搜索、视频读取（MCP 协议）                     |
| B站 CLI + SDK      | `bilibili-cli` + `bilibili-api-python`                          | 0.6.2 / 17.4.1              | pip                           | B站视频搜索、评论、UP主内容、字幕读取                    |
| LinkedIn Scraper  | `linkedin-scraper-mcp`                                          | —                           | pip                           | LinkedIn 内容抓取（MCP 协议）                   |
| RSS 解析器           | `feedparser`（Python 库）                                          | 6.0.12                      | pip                           | RSS 订阅源解析与监控                            |
| 反检测浏览器            | `camoufox`（Python 库）                                            | 0.4.11                      | pip                           | 公众号文章抓取（反爬检测）                           |
| Exa 全网搜索          | `mcporter`                                                      | 0.8.1                       | npm                           | AI 驱动的全网搜索与内容发现                         |
| 微信 AI Bot         | `wechat-ai`                                                     | 0.5.0                       | npm                           | 微信 Bot、后台运行、模型配置                        |
| 微信公众号连接           | `cc-weixin`                                                     | 0.2.0                       | npm                           | 微信公众号文章搜索与抓取                            |
| 浏览器自动化            | `bb-browser` / `chrome-devtools-mcp` / `puppeteer` / `pinchtab` | 0.11.3 / 0.21.0 / — / 0.7.6 | npm                           | 网页登录态平台自动化与页面读取                         |
| Obsidian 桌面程序     | `obsidian`                                                      | —                           | D:\software\                  | 笔记读写、搜索、整理；未检测到独立 obsidian-cli          |
| 多 Agent 内容生产      | `newtype`                                                       | 0.0.71                      | npm                           | 多 Agent 协作内容创建流水线                       |
| OpenClaw CLI      | `opencli`                                                       | 1.7.4                       | npm                           | OpenClaw 命令行入口                          |
| Skill 链接管理        | `skills-link`                                                   | 1.2.6                       | npm                           | Agent Skill 发现与链接管理                     |
| 通用运行环境            | `node` / `python` / `uv` / `npx` / `bun` / `tsx`                | —                           | system/npm                    | 运行各类 CLI、脚本和临时工具                        |

---

## 二、读写型连接器

| 连接器         | 能力范围                             | 当前电脑对应的底层工具                                                                                                           | 状态                     |
| ----------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Office      | Word、Excel、PowerPoint 文件读取、生成、编辑 | 未检测到 `winword` / `excel` / `powerpnt` / `soffice` 命令；可用本地文件工具、`python` 或后续安装文档处理库（如 `python-docx`、`openpyxl`）         | 未检测到专用 CLI             |
| Obsidian    | 笔记读取、写入、搜索、整理、建索引                | 已检测到 `obsidian` 桌面程序；未检测到独立 `obsidian-cli`                                                                            | 部分可用，CLI 待补            |
| 飞书          | 文档、表格、多维表格、群消息、日历、任务读写           | 已安装 `lark-cli`(v1.0.32)；已安装 `lark-mcp`(v0.5.1)；当前也有 Lark MCP 工具可调用                                                    | ✅ **双层接入** (CLI + MCP) |
| Notion      | 页面、数据库读取与写入                      | 未检测到 `notion` / `notion-cli`；WorkBuddy 连接器显示 disconnected                                                             | 待安装或改用 Notion API      |
| GitHub      | Repo、Issue、PR、Actions、Release 读写 | 已安装 `gh`；已安装 `git`                                                                                                    | ✅ 已接入                  |
| X / Twitter | 发帖、搜索、读取时间线、互动、私信                | 已安装 `twitter`(v0.8.5, pipx)；已安装 `xreach`(v0.3.3) / `xfetch`(v0.2.1)；**注意：pipx 暴露命令名为 `twitter` 而非 `twitter-cli`**     | ✅ **双层接入** (CLI + 抓取)  |
| 即刻          | 动态发布、读取、互动                       | 已安装 `jike`(v0.1.1, pipx)；**注意：pipx 暴露命令名为 `jike` 而非 `jike-web-cli`**                                                  | ✅ 已接入（之前文档误标为未安装）      |
| 小红书         | 笔记搜索、读取、发布、评论、点赞、收藏              | 已安装 `xhs`（`xiaohongshu-cli`, pipx）                                                                                    | ✅ 已接入                  |
| 滴答清单        | 任务读取、创建、更新、完成                    | 未检测到 `ticktick` / `ticktick-cli`                                                                                      | 待安装或改用 API             |
| Discord     | 频道消息读取、发送、Bot 操作                 | 未检测到 `discord-cli`                                                                                                    | 待安装或改用 Discord API     |
| Telegram    | 消息读取、发送、频道管理                     | 未检测到 `tg` / `tg-cli` / `telegram`                                                                                     | 待安装                    |
| 微信群聊        | 群聊消息读取、发送、摘要、提醒                  | 已安装 `wechat-ai`(v0.5.0)；已安装 `cc-weixin`(v0.2.0)，但 `cc-weixin` 偏交互式，当前非交互终端直接运行受限；另有 `camoufox`(v0.4.11) 可做反检测浏览器抓取公众号 | ⚠️ 有工具，需确认登录与运行方式      |

---

## 三、搜索读取型连接器

| 连接器          | 能力范围                         | 当前电脑对应的底层工具                                                                                  | 状态                              |
| ------------ | ---------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------- |
| Google       | 网页搜索、资料检索、关键词调研              | 已安装 `gsearch`（Rust 编译，cargo 安装）                                                              | ✅ 已接入                           |
| 全网 AI 搜索     | 任意关键词深度搜索、内容发现、多语言检索         | 已安装 `mcporter`(v0.8.1, Exa 驱动)                                                               | ✅ **已接入（新增）**                   |
| 通用网页抓取       | 任意 URL 内容提取、HTML→Markdown 清洗 | 已安装 `xfetch`(v0.2.1, npm)；`xreach`(v0.3.3, Agent-Reach 17 平台)；`chrome-devtools-mcp`(浏览器级)    | ✅ **多层覆盖**                      |
| Gmail        | 邮件搜索、读取、摘要、草稿生成              | 未检测到 `gmail` / `gmail-cli`                                                                   | 待安装或改用 Gmail API                |
| YouTube / 油管 | 视频搜索、字幕读取、频道监控、内容摘要          | 已安装 `yt-dlp`(视频/字幕/元数据)；未检测到 `youtube-cli`；搜索可配合 `gsearch`                                   | ⚠️ 可读视频/字幕，缺专用搜索 CLI            |
| 公众号          | 文章搜索、读取、摘要、选题分析              | 已安装 `cc-weixin`(v0.2.0) + `camoufox`(v0.4.11, 反检测浏览器) + `bb-browser` + `chrome-devtools-mcp` | ✅ **已接入（三层方案：CLI + 反检测 + 浏览器）** |
| 微信群聊         | 聊天记录搜索、读取、摘要、提醒              | 已安装 `wechat-ai`(v0.5.0) / `cc-weixin`(v0.2.0)；没有检测到独立聊天记录搜索 CLI                              | ⚠️ 有工具，需确认微信登录态和本地数据读取方案        |
| V2EX         | 帖子搜索、读取、话题监控                 | 未检测到 `v2ex` / `v2ex-cli`；可用 `gsearch` + `xfetch` 网页抓取                                        | 待安装专用 CLI                       |
| B站           | 视频搜索、字幕/评论读取、UP 主内容监控        | 已安装 `bilibili-cli`(v0.6.2) + `bilibili-api-python`(v17.4.1) + `yt-dlp`(视频下载)                 | ✅ **已接入（之前文档误标为 malformed）**    |
| 抖音           | 视频搜索、账号内容读取、热点监控             | 已安装 `douyin-mcp-server`(v1.2.1, MCP 协议)                                                      | ✅ **已接入（新增）**                   |
| 小宇宙          | 播客搜索、节目读取、摘要                 | 未检测到 `xiaoyuzhou-cli`；已安装 `feedparser`(v6.0.12)，可配合 RSS 源使用                                  | ⚠️ 有 RSS 解析能力，缺专用 CLI           |
| 微博           | 热搜、话题、博文读取、账号监控              | 已安装 `weibo-cli`(pip)                                                                         | ✅ 已接入只读能力                       |
| 小红书          | 笔记搜索、用户搜索、评论读取、热点读取          | 已安装 `xhs`（`xiaohongshu-cli`, pipx）                                                           | ✅ 已接入                           |
| X / Twitter  | 推文搜索、用户读取、线程读取、通知读取、列表读取     | 已安装 `xreach`(v0.3.3) / `xfetch`(v0.2.1)；`twitter`(v0.8.5) 也支持搜索和时间线                          | ✅ **双层接入**                      |
| LinkedIn     | 职场内容搜索、人物/公司信息读取             | 已安装 `linkedin-scraper-mcp`(pip, MCP 协议)                                                      | ✅ **已接入（新增）**                   |
| RSS 订阅源      | 博客/播客/新闻自动聚合与监控              | 已安装 `feedparser`(v6.0.12, Python 库)                                                          | ✅ **已接入（新增）**                   |

---

## 四、当前未检测到的专用连接器工具

| 平台 / 连接器     | 未检测到的命令                      | 备注                                           |
| ------------ | ---------------------------- | -------------------------------------------- |
| Notion       | `notion` / `notion-cli`      | WorkBuddy 连接器显示 disconnected；可改用 Notion API 或安装对应 CLI                     |
| 滴答清单         | `ticktick` / `ticktick-cli`  | 可改用 TickTick API                             |
| Discord      | `discord-cli`                | 可改用 Discord API / Bot Token                  |
| Telegram     | `tg` / `tg-cli` / `telegram` | 需要安装 Telegram CLI 或 Bot 工具                   |
| Gmail        | `gmail` / `gmail-cli`        | 可改用 Gmail API                                |
| V2EX         | `v2ex` / `v2ex-cli`          | 可先用 `gsearch` + `xfetch` 网页读取替代                          |
| 小宇宙          | `xiaoyuzhou-cli`             | 已有 `feedparser`(v6.0.12) 可解析 RSS；缺专用 CLI                               |
| Slack        | `slack` / `slack-cli`        | 可改用 Slack API                                |
| Linear       | `linear` / `linear-cli`      | 可改用 Linear API                               |
| Jira         | `jira` / `jira-cli`          | 可改用 Jira API                                 |
| Google Drive | `gdrive` / `rclone`          | 可改用 Google Drive API                         |
| Reddit       | `rdt-cli`                    | 社区内容搜索、帖子读取、评论监控；可先尝试网页抓取              |

> **与上一版对比**：即刻(`jike`)、B站(`bilibili-cli`)、抖音(`douyin-mcp-server`)、LinkedIn(`linkedin-scraper-mcp`)、RSS(`feedparser`)、全网搜索(`mcporter/Exa`) 已在本次扫描中确认安装，从本表移除。

---

## 五、能力分级

| 等级 | 能力 | 说明 | 当前覆盖 |
| --- | --- | --- | --- |
| Level 1 | 搜索读取 | Agent 可以搜索、读取、摘要、整理信息。 | ✅ Google(`gsearch`)、全网AI搜索(`mcporter/Exa`)、X(`xreach`+`twitter`)、微博(`weibo-cli`)、小红书(`xhs`)、YouTube/B站视频读取(`yt-dlp`+`bilibili-cli`)、抖音(`douyin-mcp-server`)、LinkedIn(`linkedin-mcp`)、RSS(`feedparser`) |
| Level 2 | 结构化整理 | Agent 可以把信息写入 Obsidian、飞书、Notion、表格或任务系统。 | ⚠️ 飞书（✅ 双层接入 CLI+MCP）、GitHub（✅ gh）、Obsidian（⚠️ 有桌面程序缺 CLI）、Notion（❌ 未接入） |
| Level 3 | 受控写入 | Agent 可以创建文档、生成草稿、创建任务、提交 Issue、发布内容，但需要用户确认。 | ✅ GitHub(gh)、飞书(lark-cli)、X(twitter)、即刻(jike)、小红书(xhs)、微信 Bot 部分(wechat-ai) |
| Level 4 | 自动执行 | Agent 可以在授权范围内自动发布、回复、同步、监控和触发工作流。 | ⚠️ 建议仅在低风险场景使用：已验证可用的是飞书定时任务、GitHub Actions 触发、twitter/jike 定时发帖 |

### 覆盖率总览

```
读写型:  8 个平台 → 6 个已接入 ✅  (飞书/GitHub/Twitter/即刻/小红书/微信) + 2 个待补(Obsidian-CLI/Notion)
读取型: 16 类信息源 → 13 个已接入 ✅ / 3 个待补(Gmail/V2EX/小宇宙专用CLI)
```

---

## 六、底层工具优先级

当一个平台有多种接入方式时，优先级建议如下：

1. **本机已安装 CLI / MCP（首选项）**：优先使用已经能被 Agent 调用的工具，例如 `gh`、`lark-cli`、`gsearch`、`twitter`(v0.8.5)、`jike`(v0.1.1)、`xreach`、`xhs`、`weibo-cli`、`bilibili-cli`、`douyin-mcp-server`、`mcporter`。
2. **官方 API / 官方 CLI**：稳定、权限清晰、适合长期维护。如 `lark-cli`（飞书官方）、`gh`（GitHub 官方）。
3. **MCP Server**：适合接入 Agent 工作流，便于工具调用和权限管理。如 `lark-mcp`、`douyin-mcp-server`、`linkedin-scraper-mcp`、`chrome-devtools-mcp`。
4. **Agent-Reach 生态 CLI**：功能完整、与 Agent 场景深度适配。如 `twitter-cli`/`jike-web-cli`（Agent-Reach 上游）、`xreach`/`xfetch`（17 平台抓取）。
5. **第三方社区 CLI**：适合快速接入，但要注意维护状态和账号安全。如 `weibo-cli`、`xiaohongshu-cli`、`bilibili-cli`。
6. **Python 库 / SDK（脚本调用）**：无独立 CLI 入口但功能完整的包。如 `feedparser`(RSS)、`bilibili-api-python`(B站 API)、`camoufox`(反检测浏览器)。
7. **浏览器自动化**：适合没有开放 API 的平台，但容易受登录态、验证码、风控影响。如 `bb-browser`、`puppeteer`、`pinchtab`。
8. **网页抓取 / 搜索读取**：适合只读场景，不适合高频写入和敏感操作。如 `xfetch`、`mcporter`(Exa)。

---

## 七、安全原则

- 所有写入、发布、删除、发送消息类操作，默认需要用户确认。
- 账号凭证只保存在本地，不进入模型上下文。
- 高风险操作包括：发帖、删帖、发消息、改权限、提交 PR、发送邮件。
- Agent 应优先生成草稿，再由用户确认执行。
- 涉及私信、邮件、微信群聊、通讯录和账号凭证的数据，默认按敏感信息处理。
- 浏览器自动化和第三方 CLI 如果涉及登录态 Cookie，应优先使用本机凭证，不把凭证内容输出到对话里。

---

## 八、后续优先补齐项

| 优先级 | 连接器 | 建议动作 | 说明 |
| --- | --- | --- | --- |
| P0 | Notion | 配置 Notion API Token 或安装 `notion-cli` | WorkBuddy 连接器显示 disconnected，当前完全无法读写 |
| P1 | Gmail | 配置 Gmail API 或安装 `gmail-cli` | 邮件是高频场景，目前完全空白 |
| P1 | Obsidian CLI | 安装 `obsidian-cli` 或通过 MCP 接入 | 桌面程序可用但 Agent 无法直接调用 |
| P1 | Telegram | 安装 `tg-cli` 或配置 Telegram Bot | 可配合 open-im 实现手机 IM 远程控 AI |
| P2 | Reddit | 安装 `rdt-cli` | 英文技术社区重要信息源，当前缺失 |
| P2 | Discord / 滴答清单 | 分别安装对应 CLI 或配置 Bot/API | 按需补充 |
| P2 | V2EX / 小宇宙专用 CLI | 根据使用频率选择 | V2EX 可暂用 `gsearch`+`xfetch` 替代；小宇宙可先用 `feedparser`+RSS |

> **已在本轮扫描中补齐（从旧版待办中移除）**：即刻 ✅、B站 ✅、抖音 ✅、LinkedIn ✅、RSS ✅、全网AI搜索(Exa) ✅

---

## 九、更新记录

| 日期 | 版本 | 变更内容 |
| --- | --- | --- |
| 2026-05-17 | v1.1 (本轮) | **全机扫描复核**：① 新增 8 个已安装工具（`mcporter/Exa`、`douyin-mcp-server`、`linkedin-scraper-mcp`、`feedparser`、`camoufox`、`newtype`、`opencli`、`skills-link`）② 纠正 3 个误标状态（即刻/B站/抖音实际已安装）③ 补充版本号和安装方式列 ④ 新增覆盖率总览 ⑤ 优先级重排（Notion 升 P0，即刻/B站移除待办） |
| 2026-05-17 | v1.0 | 初版，基于首次工具检测建立矩阵框架 |
