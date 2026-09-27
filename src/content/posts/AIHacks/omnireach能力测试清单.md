---
title: Omni全网搜索
published: 2026-08-06
description: 一个把 web 搜索和多平台读取整合成一条命令的 CLI + Agent Skill，重点补齐微信公众号、B站、YouTube 这类"登录墙内"内容的搜索与抓取能力。
tags:
- ai
- agent
- omnireach
- 搜索
- 自动化
category: AIHacks
draft: false
pinned: false
image: 
---

omnireach 是一个"全网通搜索"的 CLI + Agent Skill。下面按「解决的问题 → 安装方式 → 能力与使用示例 → 避坑指南 → 原理说明」的顺序，把它讲清楚。

## 1. 解决的问题

用中转站、或者装不上 Anthropic 原生 WebSearch 的 Agent 用户，最大的痛点是：AI 搜不到"登录墙内"的中文互联网内容——微信公众号文章、B 站视频、小红书笔记、抖音……这些恰恰是中文用户每天真正在看的东西。

omnireach 把 **web 搜索 + 多平台读取** 整合到一条命令里，覆盖：

- 零配置源：`web` / `hackernews` / `youtube` / `github` / `rss` / **微信公众号** / **B 站**
- 需桥接的 heavy 源：`google` / `reddit` / `twitter` / `xiaohongshu` / `tiktok` / `douyin`

它对外只暴露一个统一的 JSON schema（含 `query / ts / results[{source, title, url, content, score, engagement, raw}] / errors`），让 Agent 拿到结构化结果后直接接着干活，不用为每个平台写一套适配。

一句话：**让 AI agent 能搜到微信公众号，并且顺手把 B 站、YouTube 也一起搜了。**

## 2. 安装方式

你不需要自己敲命令——直接把下面这句话丢给你的 AI 助手，让它去装：

```
帮我安装一下 omnireach，项目地址：https://github.com/Daily-AC/omnireach
```

AI 实际会执行的安装命令是：

```bash
pipx install omnireach && omnireach init
```

`init` 会写好默认配置并打印"源解锁指引"。装完之后，上面那 7 个零配置源立刻可用，微信公众号和 B 站搜索开箱即用，不用配任何 API key。

## 3. 能力与使用示例

### 3.1 它都能干什么

- **零配置、装完即用**：微信公众号（搜狗后端）、B 站（官方 search API）、YouTube（yt-dlp 后端）、HackerNews、GitHub、RSS、普通 web 搜索。
- **Heavy 源（需桥接）**：Google、Reddit、Twitter/X、小红书、TikTok、抖音。
- **抓取全文**：`fetch` 可抓普通网页（内置 http 后端，约 12 万字的 Markdown），微信公众号登录态全文需 OpenCLI。
- **字幕 / 媒体解析**：`media` 可拉取 YouTube、B 站视频的字幕，整理成文字稿（下一节讲原理）。

下面所有示例，都是**给 AI 的自然语言提示词**——你复制给助手，它去调 CLI 实测，把结果带回来。

### 3.2 使用示例（提示词直接复制）

在 B 站搜教程（已实测 ✅，返回 10 条结果）：

```
帮我在 B 站搜一下"大模型教程"相关的视频，把标题、UP 主和链接整理出来
```

在 YouTube 搜教程（已实测 ✅，返回 10 条结果）：

```
帮我在 YouTube 上搜一下 "Claude Code tutorial"，列出前几条结果的标题和链接
```

在微信公众号里搜文章（已实测 ✅，返回 10 条结果，搜狗后端零配置）：

```
帮我在微信公众号里搜一下"AI 编程"相关的文章，给我标题和链接，按相关度排
```

提取某个 YouTube 视频的字幕并转成文字稿（已实测 ✅，产出 5 个文件）：

```
帮我提取这个 YouTube 视频的字幕并整理成可读的文字稿：
https://www.youtube.com/watch?v=xxxxxxxxxxx
```

限定多个平台一起搜：

```
帮我在 Twitter 和 Reddit 上搜一下 "anyrouter 跑路" 相关的讨论，把高赞内容列出来
```

在抖音搜热门（需桥接 + 本机登录**抖音网页版**，已实测搜索可用）：

```
帮我用 omnireach 在抖音上搜一下"Obsidian 教程"相关的热门视频，把标题、作者和链接整理出来
```

> 注意：抖音的 `media` 视频**下载**当前会被 Chrome 的 App-Bound Encryption 卡死（直接 `media download` 会失败），需要用 cookie 文件绕过——见第 4 节第 5 条。

> 提示：heavy 源（Twitter / Reddit / 小红书等）在桥接好之前会搜不到，见第 4 节避坑指南。

## 4. 避坑指南

**操作之后，先确认插件/桥接装好，否则 heavy 源搜不到。**

1. **Chrome 原生桥扩展（必看）**：要搜 Google、Reddit、Twitter、小红书、TikTok、抖音，需要先在 Chrome 加载 omnireach 的原生桥扩展，并保持对应平台的登录态。流程：
   ```bash
   omnireach bridge install
   ```
   它会在本地写入扩展目录。然后打开 `chrome://extensions` → 右上角「开发者模式」→「加载已解压的扩展程序」，选中那个目录即可。装好后本机实测 6 个 heavy 源全部 `ok: true`（extension 0.2.8 已连接）。

   > 补充一个抖音专属坑：**抖音 App 登录 ≠ 网页登录**。桥接读到的是 Chrome 里的抖音网页端登录态，所以必须在同一套 Chrome 里打开 `douyin.com` 用「扫码 / 验证码」登录（确认右上角是头像而非"登录"按钮），只登了 App 没用。本机实测：光登 App 时桥接报"未登录"，用 Chrome 打开网页版扫码登录后才正常搜出结果。

2. **微信公众号登录态全文**：普通网页全文用内置 `http` 后端就能抓；但 `mp.weixin.qq.com` 的登录态全文需要 OpenCLI：
   ```bash
   npm i -g github:Daily-AC/OpenCLI
   ```

3. **语义增强可选**：给微信公众号 / B 站搜索启用语义增强，可配 `EXA_API_KEY`（`omnireach setup exa`）。不配也能用，只是少了语义排序。

4. **别把提示词写成命令**：你面向 AI 时用自然语言（见第 3 节）；只有让你"自己装环境"时才用上面的 `bash` 代码块。

5. **抖音视频下载被 App-Bound Encryption 卡死（重点坑）**：想用 `media download` 把抖音视频存到本地时，Chrome 127+ 的 **App-Bound Encryption（ABE）** 会直接让下载失败，而且两种报错的切换很迷惑：
   - **Chrome 开着** → `Could not copy Chrome cookie database`（yt-dlp #7271，cookie 数据库被 Chrome 锁住）；
   - **Chrome 关了** → `Failed to decrypt with DPAPI`（yt-dlp #10927，ABE 禁止第三方进程解密）；
   - 装 `comtypes` / `pywin32` **也救不了** ABE，这是 Chrome 的加密策略，不是缺依赖。

   绕过办法（实测可用）：用 Chrome 扩展（如 *Get cookies.txt LOCALLY* 或 *Cookie-Editor*）把抖音登录态导出成 Netscape 格式的 `cookies.txt`，然后直接交给系统里自带的 `yt-dlp`：
   ```bash
   yt-dlp --cookies "D:/data/Today/douyin_cookies.txt" --no-playlist -o "%(id)s.%(ext)s" "<视频分享链接>"
   ```
   > 注意：omnireach 自带的 venv **不自带 yt-dlp**，它实际调用的是系统 `C:\Users\Administrator\AppData\Local\Programs\Python\Python314\Scripts\yt-dlp`（版本 2026.03.17）。所以绕过 ABE 时，直接用系统的这个 yt-dlp + cookie 文件最稳，Chrome 开或关都不影响。

## 5. 原理说明（以 B 站 / YouTube 字幕为例）

omnireach 在 B 站、YouTube 上的能力，底层主要依赖 **yt-dlp**（本机已确认在 PATH 中）。

- **搜索**：B 站走官方 search API，YouTube 走 yt-dlp，都不启动浏览器、零配置。
- **字幕拉取**：yt-dlp 直接请求平台字幕接口，**不启动浏览器**。YouTube 走 timedtext 接口；B 站走字幕 / 弹幕接口，返回 `srt` / `vtt`。
- **B 站字幕的坑**：未登录时只能拿到 **弹幕转写（danmaku）** 字幕，质量较差；登录后才能拿到 **AI 生成的中文字幕（ai-zh）**。要拿 AI 字幕，需要给 yt-dlp 传 cookie 文件（例如 `yt-dlp --cookies <file>`）。这一点在本机实测 Cherry Studio V2 那期 B 站视频时验证过——用 cookie 才能下到 `ai-zh` 字幕，否则只有弹幕。
- **产物整理**：`media` 解析后产出 `metadata.json` / `subtitle.vtt` / `transcript.json` / `transcript.md` / `manifest.json`。长字幕直接写本地文件，**不挤占对话上下文**，AI 按需读取。

### 5.1 抖音相关的两个底层限制（踩坑后补充）

- **App-Bound Encryption（ABE，Chrome 127+）**：Chrome 把 cookie 数据库和 DPAPI 解密都"绑定"到了 Chrome 自身进程。第三方工具（包括 yt-dlp 读 Chrome cookie）要么拿不到锁（Chrome 开着），要么解不出密（Chrome 关着）。这不是 omnireach 的 bug，是 Chrome 的安全策略。**唯一稳的本地绕过**是手动导出 cookie 文件再用 `--cookies` 喂给 yt-dlp（见第 4 节第 5 条）。
- **抖音搜索没有时间过滤**：omnireach 的抖音搜索不支持"最近一周 / 最近一月"这种时间区间参数，只能靠默认排序近似。要限定时间窗口，得在提示词里靠排序 + 人工筛，或者后续自己用结果的发布时间来过滤。
- **抖音"登录墙"曾误判**：早期版本的服务脚本（`service-worker.js`）里有一段登录态正则，会把已登录的网页会话误判成"未登录"而弹登录墙。本机实测遇到过：明明 Chrome 网页版已登录，桥接却报未登录；后来定位是正则匹配过严，修正后正常。如果遇到"明明登录了还让登录"，先确认网页端确实登录（右上角是头像），再看是不是又踩到这个正则坑。

简单说：omnireach 把"登录墙内"的搜索和字幕抓取，封装成了 Agent 一句自然语言就能调用的能力——而你真正要做的，只是先确认桥接插件装好、抖音网页版登录态到位、以及下载视频时绕过 ABE。
