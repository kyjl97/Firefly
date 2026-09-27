---
title: AR使用指南
published: 2026-03-12
tags:
  - skill
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/diaoy.webp
---

### 引言

平时用 AI Agent处理各类网络信息查询真的太闹心了，想要让 AI 去各大平台搜集内容屡屡碰壁。各类平台都有着各式各样的访问限制，挨个调试配置耗费超多时间精力，实在太耽误事。

这款 Agent Reach 完美适配各类 AI 智能代理，专门打通全网各类平台访问壁垒，轻松解决各类网络信息获取难题，大幅简化繁杂配置流程。


**项目地址**https://github.com/Panniantong/Agent-Reach

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/diaoy.webp)

### 安装与更新
```
帮我安装 Agent Reach：https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md
```

```
帮我更新 Agent Reach：https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/update.md
```

所有工具开源、所有API 免费。Cookie 只存在你本地，不上传不外传。代码完全开源，随时可审查，底层工具（yt-dlp、twitter-cli、rdt-cli、Jina Reader 等）定期追踪更新到最新版，你不用自己盯


### 支持的平台

| 平台               | 解锁                         | 怎么配                                                                      |
| ---------------- | -------------------------- | ------------------------------------------------------------------------ |
| 🌐 **网页**        | 阅读任意网页                     | 无需配置                                                                     |
| 📺 **YouTube**   | 字幕提取 + 视频搜索                | 无需配置                                                                     |
| 📡 **RSS**       | 阅读任意 RSS/Atom 源            | 无需配置                                                                     |
| 💬 **微信公众号**     | 搜索 + 阅读公众号文章（全文 Markdown）  | 无需配置                                                                     |
| 📰 **微博**        | 热搜、搜索内容/用户/话题、用户动态、评论      | 无需配置                                                                     |
| 💻 **V2EX**      | 热门帖子、节点帖子、帖子详情+回复、用户信息     | 无需配置                                                                     |
| 🔍 **全网搜索**      | 全网语义搜索                     | 自动配置（MCP 接入，免费无需 Key）                                                    |
| 📦 **GitHub**    | 私有仓库、提 Issue/PR、Fork       | 告诉 Agent「帮我登录 GitHub」                                                    |
| 🐦 **Twitter/X** | 搜索推文、浏览时间线、发推              | 告诉 Agent「帮我配 Twitter」                                                    |
| 📕 **小红书**       | 阅读、搜索、发帖、评论、点赞             | 告诉 Agent「帮我配小红书」                                                         |
| 📺 **B站**        | 本地：字幕提取 + 搜索               | 告诉 Agent「帮我配代理」                                                          |
| 📖 **Reddit**    | 搜索 + 读帖子和评论（通过 rdt-cli）    | 需要登录认证（`rdt login`），详见 [rdt-cli](https://github.com/public-clis/rdt-cli) |
| 🎵 **抖音**        | 视频解析、无水印下载链接获取             | 告诉 Agent「帮我配抖音」                                                          |
| 🎙️ **小宇宙播客**    | 播客音频转文字（Whisper 转录，免费 Key） | 告诉 Agent「帮我配小宇宙播客」                                                       |
| 💼 **LinkedIn**  | Profile 详情、公司页面、职位搜索       | 告诉 Agent「帮我配 LinkedIn」                                                   |
| 📈 **雪球**        | 股票行情、搜索股票、热门帖子、热门股票排行      | 告诉 Agent「帮我配雪球」                                                          |

PS.需要 Cookie 的平台（Twitter、小红书等），**优先使用** Chrome 插件 [Cookie-Editor](https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm) 导出 Cookie，发给 Agent 即可配置。流程统一：浏览器登录 → Cookie-Editor 导出 → 发给 Agent。比扫码更简单可靠。

PS.⚠️ **封号风险提醒：** 使用 Cookie 登录的平台（Twitter、小红书等），通过脚本/API 调用**存在被平台检测并封号的风险**。请务必使用**专用小号**，不要用你的主账号。

### 对应上游工具
每个平台背后是一个独立的上游工具。每个渠道文件只负责检测对应上游工具是否可用

```
channels/
├── web.py          → Jina Reader     ← 可以换成 Firecrawl、Crawl4AI……
├── twitter.py      → twitter-cli       ← 可以换成官方 API……
├── youtube.py      → yt-dlp          ← 可以换成 YouTube API、Whisper……
├── github.py       → gh CLI          ← 可以换成 REST API、PyGithub……
├── bilibili.py     → yt-dlp          ← 可以换成 bilibili-api……
├── reddit.py       → rdt-cli         ← 搜索+阅读，需 Cookie 认证
├── xiaohongshu.py  → mcporter MCP    ← 可以换成其他 XHS 工具……
├── douyin.py       → mcporter MCP    ← 可以换成其他抖音工具……
├── linkedin.py     → linkedin-mcp    ← 可以换成 LinkedIn API……
├── wechat.py       → Exa (+ Camoufox) ← 搜索+阅读微信公众号文章
├── rss.py          → feedparser      ← 可以换成 atoma……
├── exa_search.py   → mcporter MCP    ← 可以换成 Tavily、SerpAPI……
└── __init__.py     → 渠道注册（doctor 检测用）
```

实际的读取和搜索由 Agent 直接调用上游工具完成。

| 场景        | 选型                                                                                | 为什么选它                             |
| --------- | --------------------------------------------------------------------------------- | --------------------------------- |
| 读网页       | [Jina Reader](https://github.com/jina-ai/reader)                                  | 9.8K Star，免费，不需要 API Key          |
| 读推特       | [twitter-cli](https://github.com/public-clis/twitter-cli)                         | 2.1K Star，Cookie 登录，搜索/读推文/时间线/长文 |
| GitHub    | [gh CLI](https://cli.github.com/)                                                 | 官方工具，认证后完整 API 能力                 |
| Reddit    | [rdt-cli](https://github.com/public-clis/rdt-cli)                                 | 304 Star，Cookie 认证，搜索+全文+评论       |
| B站增强      | [bili-cli](https://github.com/public-clis/bilibili-cli)                           | 590 Star，热门/排行/搜索/动态              |
| 小红书       | [xhs-cli](https://github.com/jackwener/xiaohongshu-cli)                           | 1.5K Star，pipx 一行安装，搜索/阅读/评论/发帖   |
| 抖音        | [douyin-mcp-server](https://github.com/yzfly/douyin-mcp-server)                   | MCP 服务，无需登录，视频解析 + 无水印下载          |
| 视频字幕 + 搜索 | [yt-dlp](https://github.com/yt-dlp/yt-dlp)                                        | 154K Star，YouTube + B站 + 1800 站通吃 |
| 搜全网       | [Exa](https://exa.ai/) via [mcporter](https://github.com/nicobailon/mcporter)     | AI 语义搜索，MCP 接入免 Key               |
| 读 RSS     | [feedparser](https://github.com/kurtmckee/feedparser)                             | Python 生态标准选择，2.3K Star           |
| LinkedIn  | [linkedin-scraper-mcp](https://github.com/stickerdaniel/linkedin-mcp-server)      | ⭐1.2K，MCP 服务，浏览器自动化               |
| 微信公众号     | [Exa](https://exa.ai/)（搜索+阅读）+ [Camoufox](https://github.com/daijro/camoufox)（可选） | 零配置搜索+全文阅读，Camoufox 可选增强          |

> 📌 这些都是「当前选型」。不满意？换掉对应文件就行。这正是脚手架的意义。


### 10/16渠道可用

经过完整配置后，实际可用渠道达到10个：

运行这条条命令告诉你哪个通、哪个不通、怎么修
```
agent-reach doctor
```

**✅ 已配置可用（10个）**：
1. Twitter/X - 搜索、时间线、发推全功能可用
2. 小红书 - 搜索和读取笔记可用
3. GitHub - 开箱即用
4. YouTube - 开箱即用
5. B站 - 开箱即用
6. Exa全网搜索 - 开箱即用
7. 微信公众号 - 开箱即用
8. V2EX - 开箱即用
9. RSS订阅 - 开箱即用
10. 任意网页 - 开箱即用

**⚙️ 待配置（6个）**：
- Reddit、LinkedIn、小宇宙、抖音、微博、Truth Social

### 测试话术参考

装完直接让AI执行就行，不用记任何命令

| 平台           | 测试话术                                           |
| ------------ | ---------------------------------------------- |
| 🌐 网页        | 提取这个网页的正文内容：https://example.com                |
| 📺 YouTube   | 提取这个YouTube视频的字幕并总结核心内容                        |
| 📡 RSS       | 订阅这个RSS源并读取最新5篇文章：https://example.com/feed.xml |
| 🔍 全网搜索      | 用语义搜索查一下2026年AI创业公司Top10                       |
| 🐙 GitHub    | 搜Star最高的MCP server开源项目                         |
| 🐦 Twitter/X | 搜索Twitter上关于Claude Code的最新讨论                   |
| 📺 B站        | 帮我搜B站上「OpenClaw教程」相关视频，按播放量列前5个                |
| 📖 Reddit    | 搜索Reddit上关于AI Agent的讨论帖子                       |
| 📕 小红书       | 搜索小红书上关于AI写作的爆款笔记                              |
| 🎵 抖音        | 解析这个抖音视频的无水印下载链接                               |
| 💬 微信公众号     | 搜「AI Agent落地」相关的最新公众号文章                        |
| 📰 微博        | 搜索微博上关于AI的最新热门话题                               |
| 💻 V2EX      | 查看V2EX上关于编程的热门帖子                               |
| 🎙️ 小宇宙播客    | 将这个播客音频转成文字：https://example.com/podcast        |
| 📈 雪球        | 搜索雪球上关于茅台股票的最新讨论                               |
| 💼 LinkedIn  | 搜索LinkedIn上关于AI工程师的职位                          |
### 类似的工具

Agent-Reach 的目标是统一调用各类上游CLI工具，以下是与之相关的工具对比：

| 工具                                                                           | 功能                  | 优势              | 劣势          |
| ---------------------------------------------------------------------------- | ------------------- | --------------- | ----------- |
| **Agent-Reach**                                                              | 统一入口，调用16个平台工具      | 一句话安装、自动配置、统一接口 | 需要配置部分平台的认证 |
| **lark-cli**                                                                 | 飞书IM/文档/表格/日程等      | 官方支持、功能完整       | 仅限飞书生态      |
| **github-cli**                                                               | GitHub仓库/Issue/PR管理 | 官方CLI、功能强大      | 仅限GitHub    |
| **twitter-cli**                                                              | Twitter搜索/发推        | 无需浏览器、后台认证      | 需手动配置Cookie |
| **rdt-cli**                                                                  | Reddit内容抓取          | 支持搜索和读取帖子       | 需登录认证       |
| **xhs-cli**                                                                  | 小红书内容操作             | 支持搜索/发帖/评论      | 需配置Cookie   |
| **MCP Servers**                                                              | 各类平台MCP服务器          | 标准化接口           | 需单独安装配置每个平台 |
| **LangChain Tools**                                                          | AI Agent工具集         | 功能丰富、可编程        | 需要写代码集成     |
| [bb-browser](https://github.com/epiral/bb-browser/blob/main/README.zh-CN.md) |                     |                 |             |
| [x-reader](https://github.com/runesleo/x-reader/blob/main/README.zh-CN.md)   |                     |                 |             |
| [jike-web-cli](https://github.com/doublewater777/jike-web-cli)               |                     |                 |             |
| [wechat-cli](https://github.com/huohuoer/wechat-cli)                         |                     |                 |             |


### 写在最后

**Agent Reach 是一个脚手架（scaffolding），不是框架。**

你给一个新 Agent 装环境的时候，总要花时间去找工具、装依赖、调配置——Twitter 用什么读？Reddit 怎么绕封？YouTube 字幕怎么提取？每次都要重新踩一遍。

Agent Reach 做的事情很简单：**帮你把这些选型和配置的活儿做完了。**

安装完成后，Agent 直接调用上游工具（twitter-cli、rdt-cli、xhs-cli、yt-dlp、mcporter、gh CLI 等），不需要经过 Agent Reach 的包装层。

