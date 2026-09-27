---
title: B站字幕剪藏OB教程
published: 2026-05-04
tags:
  - 博客
category: Technical
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-bili-obsidian-clipper-20260724-001250.webp
---
经常看 B 站学习，想要把课程字幕一键存入 Obsidian 知识库，反复整理复盘？

Bilibili Obsidian Clipper 这款浏览器插件完美解决这个痛点，抓取 B 站视频字幕，预览导出 Markdown，还能借助 Obsidian Local REST API 直接一键写入笔记库。

### 1.安装chrome插件
https://chromewebstore.google.com/detail/bilibili-obsidian-clipper/jokophbofiphenlplmohabdcmalcbenl?utm_source=item-share-cb

首次安装 Chrome 浏览器插件后，打开一个B站视频，点击插件，选择“保存到 Obsidian”
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260721213443852.webp)

随后会打开一个页面chrome-extension://jokophbofiphenlplmohabdcmalcbenl/options.html
我们需要填写一些信息。

### 2.安装Obsidian辅助插件

填写信息之前需要安装一个 Obsidian插件
打开 Obsidian，进入 设置→第三方插件 →社区插件市场，搜索并安装  Local REST API with MCP

> 它的作用是给 Obsidian 开一个本地直连的接口，让浏览器插件或者脚本可以直接把 Markdown 文件写入知识库中，而不是走手动复制粘贴的路。我们给这个插件发请求就可以实现增删改查这样的操作，并且是比较稳定的。

安装好这个插件之后，需要勾选开启Enable non-encrypted (HTTP) server,然后复制那个 API


### 3.填写信息
回到步骤1打开的页面中

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260721214500276.webp)



### 4. 开始使用

我们现在随便打开一个B站视频，然后点一下保存到 Obsidian

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260721215018845.webp)

也可以打开一个 B 站视频，点击插件并选择 AI，右侧侧边会有个 AI 对话。
直接在网页上让AI分析这个视频等

```
https://api.deepseek.com/v1
deepseek-v4-flash
```
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260721220351103.webp)


**以上，既然看到这里了，如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。**

最近我自研一套内容创作Obsidian模板，如果你感兴趣，[点此了解](https://mp.weixin.qq.com/s/5LkcBS6TvwXEGxIMiA-1jQ)

感谢你拨冗阅读，山高水长，我们期待下篇文章与你再见。

*\>/ 更多Agent、Obsidian与自动化工作流实操,访问博客：[kyjl97.github.io](https://kyjl97.github.io/)*
