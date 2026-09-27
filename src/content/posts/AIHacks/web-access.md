---
title: web-access技能
published: 2026-03-26
tags:
  - skill
  - Agent
  - AI
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_f1to39f1to39f1to.webp
---

## 前言

过去的 AI 联网超 "死板"：要么用搜索引擎瞎找非公开内容，要么打不开需要登录的动态网页，还得单独给 AI 登各个平台，开多个网页就卡，踩过的坑下次还踩，甚至会跟人抢浏览器控制权，用着特别费劲。



最近发现了 [Web Access](https://github.com/eze-is/web-access) 这个 Skill，能把 AI Agent 的联网、操作浏览器的能力直接拉满。它用的是**你自己已经登录的 Chrome**，不管是查信息、扒内容，还是交互操作，都能自动搞定，兼容 Claude Code、OpenClaw 等主流 AI Agent，普通人也能轻松上手。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_f1to39f1to39f1to.webp)

今天把实测体验和常用话术整理出来分享给大家。




## 前置配置

Chrome 地址栏打开

```
chrome://inspect/#remote-debugging
```

勾选 `Allow remote debugging for this browser instance` 即可。


## 安装方法

**让 Claude 自动安装**

```
帮我安装这个 skill：https://github.com/eze-is/web-access
```

Agent 会自动下载配置，搞定环境依赖，不需要你手动折腾。


## 快速上手

先检查配置：

```bash
bash ~/.claude/skills/web-access/scripts/check-deps.sh
```

### 单任务模式

单个任务开一个 tab 就能搞定：

```
调用 Web Access，在小红书上搜索 XX 相关信息，总结近期风评
```

### 多Agent并行调研（最强功能）

这是 Web Access 最香的用法 —— **开多个子Agent，同时在不同平台开多个标签页并行抓取**，几分钟就能搞定别人大半天的调研工作量。

给你两个直接能用的话术模板：

**通用多平台搜索：**
```
帮我用 web-access 开 5 个子Agent，分别调研小红书、微博、知乎、B站、GitHub，每个子Agent搜索"Claude Code"，提取最热的前 10 条内容总结观点，最后汇总给我
```

**科技博主选题：**
```
帮我用 web-access 开 5 个子Agent，分别去：
1. 小红书 → 搜索"AI工具"、"AI编程"、"Claude"，找5个讨论度高的选题
2. 知乎 → 搜索"AI"，找5个大家提问多、讨论多的问题当选题
3. GitHub Trending → 找最近5个最火的AI相关开源项目
4. B站 → 看AI区热门，找5个播放高的选题方向
5. Hacker News → 看首页热门，找5个国外科技圈关注的话题

最后汇总成「今日AI选题TOP25」，给每个选题加一句一句话推荐
```


## 使用体验

以上，总体工具用下来了，我感觉它主要是对于**信息采集调研**是非常有帮助的。开五个子Agent同时爬五个平台，一会儿功夫就给你汇总好了，效率提升不是一点半点。



但是你让它自动发布内容，这个还是感觉有点不靠谱。毕竟每个网站的编辑器结构千奇百怪，找不准按钮就发不出去，而且真发错了也麻烦，发布这一步还是自己点一下发送更稳妥。


## 总结

Web Access 解决了 Claude Code 原生联网工具的几个痛点：

1. **复用已有登录态** —— 不用给 AI 重新登录，你浏览器存的 cookie 直接用
2. **真正的并行抓取** —— 多个子Agent开多个tab同时干活，快很多
3. **不抢控制权** —— 都在后台标签页操作，你该干嘛干嘛
4. **自动沉淀经验** —— 踩过一次坑下次就会了，越用越快

如果你经常需要 AI 帮你上网调研、扒数据，非常值得一试。毕竟，用 AI 帮你并行开几十个网页找资料，这种体验用过一次就回不去了。


## 参考资料

- [Web Access 原作者介绍文章](https://mp.weixin.qq.com/s/rps5YVB6TchT9npAaIWKCw)
- [GitHub 仓库](https://github.com/eze-is/web-access)
