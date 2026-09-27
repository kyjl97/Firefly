---
title: 5个抓取AI技能
published: 2026-06-06
tags: []
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-claude-code-5-skills-web-scrape-20260606-223341.webp
---
凌晨四点，我让Claude Code帮我扒一个课程网站，文档、视频、自动翻译、加字幕、存进Obsidian，全流程自动跑完。那一刻我意识到一件事，给AI配上正确的Skill，它真的能爬遍全网。

不是夸张，是真的。但关键在于，你得知道什么场景用什么工具。

我试了5个Skill，按从轻到重排个序，你直接拿去用就行。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-claude-code-5-skills-web-scrape-20260606-223341.webp)

### 01. Agent-reach

小红书、X、抖音、YouTube、公众号、Reddit，基本上主流社媒全覆盖了。

Agent-reach是一个开源的AI脚手架，装好CLI工具、配好搜索引擎，你的Agent就能直接访问这些平台的API。不用开浏览器，不用模拟登录，API直接拿数据。

我扒课程网站那次，大头就是靠Agent-reach搞定的。

项目地址在github.com/Panniantong/agent-reach

### 02. Scrapling

公开网页想批量抓数据，又怕被反爬拦住，Scrapling就是干这个的。

它是自适应网页抓取框架，内置三种抓取器，静态的、JS渲染的、反爬隐身的，覆盖从单次请求到全量爬取。最骚的是网页改版之后，它能自动重新定位元素，不会因为你换个页面结构就直接挂掉。

我碰到过Cloudflare拦截的情况，开了隐身抓取器直接过去了，网页改版也不怕失效，真的就是「我自己会适应」。

项目地址在github.com/D4Vinci/Scrapling。

### 03. Browser-use

有些页面需要登录态才能访问，比如后台管理、付费课程、企业内网，这时候API和爬虫都搞不定，得让AI像人一样操作浏览器。

Browser-use就是干这个的，开源的浏览器自动化框架，LLM驱动，你给它一个模型，它自己帮你填表、点击、操作后台。关键是它能复用你Chrome里已登录的状态，不用重新登录。

缺点是每次都要打开浏览器窗口，比较吃资源，但偶尔需要操作登录后的页面，这玩意确实好使。

项目地址在github.com/browser-use/browser-use。

### 04. Claude in Chrome

有时候不是操作复杂，是你就是想盯着它干，或者认证流程特别复杂，怕它搞不定。

Claude in Chrome是Anthropic官方出的浏览器扩展，直接把Claude装进你真实的Chrome，你能亲眼看到它在页面里点击、填写、操作。没有API接口，但胜在直觉，特别适合那些认证步骤多到你自己都头晕的页面。

官网在claude.ai/chrome。

### 05. Web-access

最后一个，也是覆盖面最广的一个。

Web-access是一个开源的Agent联网Skill，从公开搜索到登录后操作全覆盖。它会自动在WebSearch、WebFetch、curl、CDP之间择优选择，你不需要操心该用哪个工具。还能用CDP接管你日常的Chrome，天然带登录态，检索书签和历史也不在话下。

如果说前四个是各自解决一个场景，Web-access就是试图把所有场景打包成一个Skill。

项目地址在github.com/eze-is/web-access。

----

这五个Skill，从轻到重，够用就停，能不开浏览器就别开。

Agent-reach能搞定的，就别开Scrapling。Scrapling能搞定的，就别开Browser-use。浏览器能搞定的，就别上CDP。

轻的快、省资源，重的慢、吃资源，优先级往下走就行。

就像凌晨四点那次，Agent-reach加上Scrapling已经贼爽了，浏览器压根没开过。

记住这个原则，工具才是你的能力延伸，不是你的负担。

---

**参考资料**

- Agent-reach:
github.com/Panniantong/agent-reach
- Scrapling:
github.com/D4Vinci/Scrapling
- Browser-use:
github.com/browser-use/browser-use
- Claude in Chrome:
claude.ai/chrome
- Web-access:
github.com/eze-is/web-access

---
以上，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧！想第一时间收到推送，可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/未命名的设计.webp)
*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*
