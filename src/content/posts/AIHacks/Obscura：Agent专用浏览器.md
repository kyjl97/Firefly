---
title: Obscura：Agent专用浏览器
published: 2026-07-02
tags:
  - AI
  - AI工具
  - 自动化
  - 网页抓取
category: AIHacks
draft: false
pinned: false
image:
---
最近看到一个很有意思的开源项目：Obscura。

它不是给人日常上网用的浏览器。它是一个用 Rust 写的无头浏览器，更适合自动化任务、网页抓取和 AI Agent。

传统方案里，很多自动化任务会直接拉起 Chrome，再用 Puppeteer 或 Playwright 去控制它。能用，但重。Chrome 本身就大，启动慢，占内存也高。Obscura 想解决的就是这件事：让程序像浏览器一样打开网页、执行 JavaScript、读取页面内容，但不用真的启动一整个 Chrome。

它的官方介绍里有几个数字很抓人：

- 约 70MB 的二进制文件
- 运行时约 30MB 内存
- 页面加载约 85 毫秒
- 内置追踪器拦截
- 支持 Chrome DevTools Protocol
- 可以被 Puppeteer 和 Playwright 连接

简单说，你电脑上的 Chrome 还照常用；自动化任务里那套笨重的 Chrome，可以考虑交给它。

项目地址：

https://github.com/h4ckf0r0day/obscura


## 它真正有用的地方：让 AI 读网页

现在很多 AI 工作流都有一个共同问题：AI 本身不能稳定地看到网页。

普通 HTTP 请求只能拿到网页源码，但很多现代网站的内容是 JavaScript 渲染出来的。你用 `curl` 抓，可能只看到一堆空壳；真正的正文、按钮、评论、榜单，要等浏览器执行完脚本才出现。

这时候就需要一个“像浏览器一样”的工具。

Obscura 的价值就在这里：它可以打开网页，执行 JavaScript，再把渲染后的 HTML、正文、链接、资源地址交给后面的 AI 处理。

对科技博主来说，这个能力很实用。它不是炫技，它可以直接进入内容生产流程。

## 场景一：自动化选题

每天早上，让 Codex 或其他 Agent 调用 Obscura，去抓几个固定来源：

- Hacker News
- GitHub Trending
- Product Hunt
- AI 工具榜单
- V2EX 科技节点

抓到标题和链接之后，再交给 AI 总结：

- 今天哪些话题反复出现？
- 哪些工具值得看？
- 哪些讨论适合做短视频？
- 哪些只是热闹，但没有内容价值？

这样一来，选题就不再完全靠刷信息流。你可以让工具先跑一遍，自己只做最后判断。

## 场景二：爆款文案分析

做一期视频之前，把 5 到 10 个资料链接丢给脚本。Obscura 负责把网页正文抓下来，AI 再整理成：

- 核心观点
- 可引用数据
- 争议点
- 适合做标题的角度
- 口播大纲

这一步最省时间。

很多人写稿慢，卡的往往是资料整理。资料散在网页、博客、文档、论坛帖子里，手动复制很烦。Obscura 这类工具可以先把资料收拢起来，再让 AI 做第一轮归纳。

最后还是人来判断，但前面的体力活少很多。

## 场景三：公司和产品情报采集

你输入一个公司名，脚本自动访问它的官网、博客、文档、招聘页、GitHub，然后让 AI 生成一份“公司技术画像”。

比如：

- 它在招什么岗位？
- 技术栈是什么？
- 最近发了什么产品？
- 有没有开源项目？
- 适不适合投简历、合作，或者写一期分析？

这类内容很适合科技博主。它不只是搬运新闻，更像是把公开信息重新整理成一个判断。

## 但它不是万能浏览器

Obscura 适合轻量级网页抓取、JS 渲染、CDP 自动化。它不适合替代完整 Chrome。

比如，截图、复杂登录、强交互验证码、像素级页面渲染，这些就不是它的强项。遇到银行、风控很重的网站，或者必须真人交互的网站，还是得回到真实浏览器。

所以更准确的定位是：

Obscura 适合给 AI Agent 当一双轻量级的眼睛。它负责快速打开网页、读取内容、交给 AI 分析。真正需要人判断、登录、交互的地方，还是人来接管。

如果你是做科技内容、AI 工具、自动化工作流的，Obscura 这种项目值得关注。它背后代表的趋势很明确：AI 不只是聊天，它开始需要浏览器、终端、文件系统这些真实工具。

能不能用好 AI，慢慢会变成一个问题：你有没有给它配好手和眼睛。

## 本机已经安装的相关工具

这次顺手查了一下电脑上已经有的同类工具，后续可以按场景选择。

### 轻量网页读取

- Obscura：轻量无头浏览器，适合快速抓网页、执行 JavaScript、提取正文和链接。
- requests / httpx / curl_cffi：适合普通网页请求、接口请求和简单内容抓取。
- BeautifulSoup4：适合解析 HTML，提取标题、链接、正文块。

### 完整浏览器自动化

- Playwright：已经安装，浏览器内核也在本机，可以做页面交互、截图、登录态操作、复杂网页自动化。
- Puppeteer：全局 npm 已安装，适合 Node.js 里的 Chrome 自动化。
- Chrome：本机已安装，可以配合 CDP、Playwright、Puppeteer 或 MCP 工具使用。
- chrome-devtools-mcp：可以让 AI 通过 Chrome DevTools 控制浏览器。
- bb-browser：AI Agent 浏览器自动化工具，可以打开网页、获取快照、点击、填表，也有站点 adapter。

### 社交平台和内容采集

- MediaCrawler：位于 `D:\zed-workspace\MediaCrawler`，支持小红书、抖音、快手、B站、微博、贴吧、知乎等公开信息采集，底层使用 Playwright。
- agent-reach：偏 Agent 联网和平台访问。
- xreach / xfetch：X/Twitter 抓取 CLI，可以搜索、读推文、线程和用户内容。
- jike-web-cli：即刻平台 CLI，位于 `C:\Users\Administrator\pipx\venvs\jike-web-cli`，可以搜索帖子、查看圈子、读取用户和评论，适合抓即刻上的选题和评论素材。

### 反检测和浏览器指纹相关

- camoufox：偏反检测浏览器自动化。
- patchright：Playwright 方向的反检测自动化工具。
- browserforge：浏览器指纹生成相关工具。
- browser_cookie3：读取本机浏览器 Cookie，适合复用登录态。

### 当前没有安装

- Selenium：未安装。
- Scrapy：未安装。

简单记法：

- 抓普通网页：requests / httpx / BeautifulSoup4。
- 抓需要 JS 渲染的网页：Obscura 或 Playwright。
- 要登录、点击、截图：Playwright / Puppeteer / Chrome。
- 抓社交平台公开内容：MediaCrawler、xreach、xfetch。
- 给 AI 操作浏览器：bb-browser、chrome-devtools-mcp。
