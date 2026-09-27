---
title: OpenCli：把任何网站和 AI Agent 都变成 CLI 的工具
published: 2026-03-24
updated: 2026-08-23
tags:
  - cli
  - agent
  - browser
  - 工具推荐
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_ioq7uwioq7uwioq7.webp
---

很早之前我就装过 [OpenCli](https://github.com/jackwener/opencli)，但一直没真正用起来。今天它在我电脑里损坏——`opencli --version` 报 `Cannot find module ... @jackwener/opencli/dist/src/main.js`，但 `where opencli` 还能找到残留 shim 文件。npm 在 Windows 上卸载时偶尔会漏删 shim，这正好触发我重装一遍，顺便把它做的事彻底想明白。

重装之后，我打算用它把 [blog.kyjl97.github.io](https://kyjl97.github.io/Firefly/) 博客封装成 CLI，让粉丝能直接用 `opencli kyjl97 search "AI 工具"` 这种命令查文章——这是这篇文章后半段会展开的实际场景。注意：kyjl97.github.io 现在是我的个人主页（品牌官网），真正的博客在 `blog.kyjl97.github.io`。

OpenCli 解决的是 AI 时代最缺的事：**操作能力**。大模型能写代码、能写文章，但要让 AI「去 B 站查热搜」「在小红书搜笔记」「在知乎看高赞回答」这种真实场景，就必须让 AI 能「操作」——直接复用你本地 Chrome 的登录态，调用已经登录的网站，就像调用 API 一样。

---

## 环境准备

- **Node.js ≥ 20.0.0**
- **已安装 Chrome 浏览器**
- **代理端口能同时支持 http 入站**（如果你用的是 socks5 代理，见末尾「踩坑」章节第 2 条）

## 安装

```bash
npm install -g @jackwener/opencli

# 验证
opencli --version
# → 1.8.6

# 看全部可用命令（130+）
opencli list
```

## 浏览器桥接：让 opencli 复用你的 Chrome 登录态

这一步是 OpenCli 的核心机制——通过轻量级 Chrome 扩展 + 本地 daemon，让你的 Chrome 浏览器成为 AI 的「操作手」。

**1. 安装 Chrome 扩展**

两种方式任选：

- **Chrome Web Store**（推荐）：[OpenCLI](https://chromewebstore.google.com/detail/opencli/ildkmabpimmkaediidaifkhjpohdnifk)
- **手动**：去 GitHub [Releases](https://github.com/jackwener/opencli/releases) 下载 `opencli-extension-v{版本}.zip`，解压后在 `chrome://extensions` 启用「开发者模式」，点「加载已解压的扩展程序」

**2. 验证连接**

```bash
opencli doctor
```

期望输出：

```
[OK] Daemon: running on port 19825 (v1.8.6)
[OK] Extension: connected (v1.0.22)
[OK] Connectivity: connected in 0.7s

Everything looks good!
```

如果三项里任何一项不是 [OK]，跳到末尾「踩坑」章节排查。

---

## 它能做什么：能力三层

OpenCli 的能力分三层，**广度大于深度**——覆盖很多场景，但每个场景做的是「能稳定用」，不是「无所不能」。

### 第一层：内置 130+ 适配器，开箱即用

跑 `opencli list` 看完整列表。三类：

| 类型                 | 模式                 | 代表站点                                                                                                                   |
| ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Browser 适配器**    | 🔐 复用 Chrome 登录态   | 知乎、B 站、小红书、微博、即刻、Twitter/X、Reddit、YouTube、LinkedIn、ChatGPT、Claude、Gemini、NotebookLM、DeepSeek、Kimi、豆包、Jira、Confluence   |
| **Public API 适配器** | 🌐 直接调公开接口，不开浏览器   | HackerNews、arxiv、PubMed、Wikipedia、Yahoo Finance、Binance、DefiLlama、npm、PyPI、Docker Hub、crates.io、Homebrew、StackOverflow |
| **Desktop 应用**     | 通过 CDP 驱动 Electron | Cursor、Codex、Trae CN、Antigravity、ChatGPT 桌面、ChatWise、Qoder、Discord 桌面                                                  |

试用几个感受一下：

```bash
c
opencli zhihu hot -f json
opencli hackernews top        # 走公开 API，无需登录
opencli arxiv search "LLM agent"
opencli chatgpt ask "What's the latest in transformer architecture?"
```

### 第二层：让 AI Agent 直接操作 Chrome

通过 `opencli browser` 命令，AI Agent 可以做浏览器能做的几乎所有事——导航、点击、填表、读内容、截图、拦截网络请求。

20 多个原语命令：

| 类别 | 命令 |
|------|------|
| 导航 | `open`、`back`、`scroll` |
| 读页面 | `state`、`get`、`extract`、`frames` |
| 交互 | `click`、`type`、`fill`、`select`、`hover`、`keys` |
| 等待 | `wait`（等元素/文字/页面跳转） |
| 截图 | `screenshot` |
| 多标签 | `tab list/new/select/close` |
| 网络拦截 | `network`（抓 API 响应） |
| JS | `eval` |

最关键的：**复用你的 Chrome 登录态**。你登录过的网站，AI Agent 直接用，不需要 OAuth 重新授权。这就是为什么 `opencli list` 里 60% 的站点是 🔐 Browser 模式——它们都需要登录后才能拿到个性化数据。

### 第三层：把任意网站封装成你自己的 CLI（重头戏）

这是 OpenCli 最值钱的特性——**写 adapter**。任何网站都能被你封装成 CLI 命令：

```bash
# 1. 让 AI 帮你分析网站结构
opencli browser recon analyze https://你的博客/

# 2. 初始化 adapter 模板
opencli browser recon init kyjl97-blog/latest

# 3. 写 adapter 代码（声明字段、抓取规则、输出格式）
# 4. 验证
opencli browser recon verify kyjl97-blog/latest

# 5. 装上
opencli plugin install file://./kyjl97-blog-plugin
```

或者更省事：让 Codex / Claude Code 装上 `opencli-adapter-author` skill，给它一个 URL，它端到端帮你写完。

装好后可以：

```bash
# 本地用
opencli plugin install file://path/to/plugin

# 给粉丝用：推到 GitHub
opencli plugin install github:你的用户名/kyjl97-blog-plugin

# 粉丝跑
opencli kyjl97 search "AI 工具"
opencli kyjl97 latest --limit 10
opencli kyjl97 post-detail "某篇文章的 slug"
```

---

## 📌 实测适配器速查（2026-08-23 批量测试）

**测试环境**：Windows 11 + Chrome Browser Bridge 扩展 v1.0.22 + Codex 桌面 + Hermes 网关环境 + 代理 7890
**测试方法**：`http_proxy=http://127.0.0.1:7890 opencli <adapter> <command> -f json`，5-300 秒超时
**总览**：34 个适配器测试，**26 PASS / 8 FAIL**

完整测试输出存在 `C:\tmp\opencli-test\`，每个适配器一个 `.txt` 文件。

### ✅ 完全可用（26 个）

| 类型 | 适配器 | 速度 | 备注 |
|------|------|------|------|
| **Public API**（无需登录） | hackernews, arxiv, pubmed, wikipedia, yahoo-finance, binance, defillama, npm, pypi, dockerhub, crates, homebrew, stackoverflow | 2-5 秒 | 全部直接可用，零配置 |
| **通用热榜**（无需登录） | zhihu, weibo, bilibili, v2ex | 2-10 秒 | 热榜数据公开，不用登录 |
| **AI 工具 status** | chatgpt, claude, gemini, kimi, deepseek, doubao, yuanbao, qwen, grok | 6-26 秒 | `status` 命令能拿到账号状态 |

### ❌ 不可用 / 需额外配置（8 个）

| 适配器             | 失败原因                                    | 怎么修         |
| --------------- | --------------------------------------- | ----------- |
| cursor          | 需要手动启动时加 `--remote-debugging-port=9226` | 加启动参数       |
| codex           | 需要 `--remote-debugging-port=9238`       | 加启动参数       |
| trae-cn         | 需要 `--remote-debugging-port=39240`      | 加启动参数       |
| antigravity     | 同上 CDP 端口模式                             | 加启动参数       |
| chatgpt-app     | **macOS only**（osascript 不可用）           | Windows 装不上 |
| chatwise        | 应用未装                                    | 装上才能用       |
| qoder           | 应用未装                                    | 装上才能用       |
| notebooklm list | Chrome 没登录 notebooklm.google.com        | 去登录         |

### ⚠️ AI 工具 ask 命令的实测

上面表格里 AI 工具 `status` 命令能跑通，但**核心 ask 命令**（发问→拿回答）今天单独测了 5 个，结果不乐观：

| 工具 | ask 状态 | 备注 |
|------|---------|------|
| **Doubao**（豆包） | ⚠️ 半成 | 消息发出去了但抓回复抓错（抓到页面 chip 文字） |
| **Grok** | ⚠️ 半成 | 深度推理模式 4-5 分钟才有结果 |
| Kimi | ❌ | 消息提交没验证（adapter bug） |
| Yuanbao | ❌ | 需登录 yuanbao.tencent.com |
| Qwen | ❌ | Promise was collected 错误 |
| ChatGPT / Claude / Gemini | ❌ | Chrome 当前没登录这些 AI |

**结论**：如果想用 opencli 跑 AI 严肃对话，目前**推荐手动打开 Chrome**——opencli ask adapter 还在不稳定状态，简单任务能用、刁钻问题抓不准回复。

---

按用户视角，明确这两点能少走很多弯路。

### 做不了的事

| 限制 | 原因 |
|------|------|
| 绕过 Cloudflare 高级反爬 | 部分网站检测自动化行为（Turnstile、行为分析）会拦 |
| 操作非 Electron 的本地 App | 只支持 Electron 应用通过 CDP 驱动；原生 Windows App（某些 .NET 写的工具）不行 |
| 微信/钉钉桌面客户端 | 只能走网页版（微信公众平台网页版），桌面客户端协议私有 |
| 高频实时轮询 | 单个命令 2-60s 超时设计，不适合做 1 秒级 polling |
| 跨域隔离 iframe 操作受限 | 浏览器安全策略限制 |
| 人脸识别 / 滑块验证码 | 这类验证码无法绕过 |
| 离线/局域网网站 | Browser Bridge 依赖 Chrome 扩展，扩展只对公网网站生效 |

### 能稳定做的事

- 任何有**网页版**的工具（不管登录态多复杂）
- 需要**填表单、点击按钮**的操作
- 抓 API 响应（用 `network` 命令拦截，比读 DOM 更快更准）
- 跑同一网站的**不同账号**（每个账号一个 Chrome profile）
- 给博客/文档站/电商列表页等**结构化网站**写 adapter
- 让 AI Agent 完成「打开网站 → 操作 → 拿结果」的全流程

---

## 后续怎么用：把 blog.kyjl97.github.io 博客封装成 CLI

我的计划（也是这篇文章最值钱的实操部分）：

**第一步：让 Codex 写 adapter**

Codex 已经装好 `opencli-adapter-author` skill（之前 `npx skills add jackwener/opencli -g -y` 装的），直接对它说：

> 用 opencli-adapter-author skill 帮我把 https://kyjl97.github.io/Firefly/ 博客封装成 CLI，命令包括 search、latest、post-detail。

Codex 会自动：

1. 跑 `opencli browser recon analyze` 看博客结构
2. 写 adapter 代码到 `~/.opencli/sites/kyjl97-blog/`
3. 跑 `opencli browser recon verify` 验证
4. 输出 plugin 安装路径

**第二步：本地调试**

```bash
opencli plugin install file://./kyjl97-blog-plugin
opencli kyjl97 search "AI 工具"
opencli kyjl97 latest --limit 5
```

**第三步：推到 GitHub**

把 adapter 推到 `github.com/你的用户名/kyjl97-blog-plugin`，README 写粉丝使用方式。

**第四步：粉丝用**

```bash
opencli plugin install github:你的用户名/kyjl97-blog-plugin
opencli kyjl97 search "..."
```

---

## 集成到 AI Agent

让 OpenCli 成为你 AI 助手（Claude Code / Codex / Cursor 等）的工具。

**方式一：系统提示词**

在 Agent 的系统提示词（如 `.cursorrules`、`.clinerules`）里加：

> You have a tool called opencli. Run `opencli list` to see available commands to browse the web.

**方式二：装官方 skill**（推荐，更智能）

```bash
npx skills add jackwener/opencli -g -y
```

可选 skill：

| Skill | 用途 |
|-------|------|
| `opencli-browser` | 让 Agent 驱动浏览器做任意网页操作 |
| `opencli-adapter-author` | 让 Agent 端到端帮你写新 adapter |
| `opencli-autofix` | 让 Agent 修复失效的 adapter |
| `opencli-usage` | 让 Agent 查 opencli 命令速查 |
| `opencli-browser-sitemap` | 让 Agent 用站点地图导航，避免盲点 |

按需装，**别全装**——`opencli-adapter-author` 是这次封装博客要用的核心。

---

## 踩坑记录（重装时遇到的问题）

如果你 `opencli doctor` 一直报错，按这个顺序排查。

### 坑 1：npm shim 残留但包没装

**症状**：`opencli --version` 报 `Cannot find module ... @jackwener/opencli/dist/src/main.js`，但 `where opencli` 能找到 shim。

**根因**：npm 在 Windows 上卸载时偶尔会漏删 shim 文件（`opencli.cmd`、`opencli.ps1`、裸 `opencli`），导致 shim 引用一个不存在的入口。

**修复**：

```bash
cd C:/Users/Administrator/AppData/Roaming/npm/
rm opencli.cmd opencli.ps1 opencli
npm install -g @jackwener/opencli@latest
```

### 坑 2：doctor 报「daemon not running」但 daemon 实际在跑

**症状**：手动 `curl http://127.0.0.1:19825/status` 返回正常 status，但 `opencli doctor` 一直报 `[MISSING] Daemon`。

**根因**：你的 `http_proxy` 环境变量是 `socks5://...`，但 opencli 用的 undici 6.x ProxyAgent 不支持 socks5 协议，会抛 `Invalid URL protocol`。

**修复**：把 `http_proxy` 改成 `http://`（同端口 7890 兼容，Clash 等代理软件的 mixed port 同时支持 http 和 socks5 入站）：

```bash
http_proxy=http://127.0.0.1:7890 opencli doctor
```

**永久修复**：在 nushell config 的 `proxy set` 函数里把 `socks5://127.0.0.1:7890` 改成 `http://127.0.0.1:7890`。注意：改动后要重开 nushell 终端才会生效。

### 坑 3：`browser` 命令卡死超时

**症状**：`opencli browser work open <url>` 等几十秒没输出。

**根因**：和坑 2 同源——fetch 链崩了，根本没发出请求，只是默默等超时。

**修复**：同坑 2。

### 坑 4：`doctor` 报「Chrome profile 多 / disconnected」

**症状**：`[FAIL] Connectivity: failed (Browser profile "xxx" is not connected)`。

**根因**：你有多个 Chrome profile（比如工作和个人），opencli 不确定用哪个。

**修复**：

```bash
opencli profile list           # 看所有连接的 profile
opencli profile use work       # 选定一个作为默认
```

### 坑 5：PATH 里有大量失效项

这是不限于 opencli 的通用问题——历史工具残留把 PATH 弄乱，会让 shell 启动慢、命令查找困惑。可以用之前的 `clean-path.ps1`（`C:\tmp\clean-path.ps1`）扫一遍。

---

## 一句话总结

**OpenCli 的真正价值不是工具本身，是让你摆脱「每个网站都要在浏览器点点点」的工作流**。装好它，配合 AI Agent，你能用命令行查知乎热榜、抓 arxiv 论文、操作 Cursor IDE——而你的粉丝能用你写的 adapter 直接查你的博客。

对我自己来说，这次重装不只是修一个 bug，而是把 opencli 从「装来玩玩」升级成「真的要用来把 blog.kyjl97.github.io 博客封装成 CLI 给粉丝」。这件事 Codex 已经在做了，doctor 跑通、daemon 健康、扩展连上——万事俱备，只差让 Codex 把 adapter 写出来。

---

## 引用

- 项目地址：<https://github.com/jackwener/opencli>
- 官方文档：<https://opencli.info/docs/>
- 适配器列表：<https://opencli.info/docs/adapters/>
- Browser Bridge 文档：<https://opencli.info/docs/zh/guide/browser-bridge.html>

文章来源：[kyjl97.github.io](https://kyjl97.github.io/)  远程技术支持：[fix.kyjl97.github.io](https://github.com/kyjl97/)
