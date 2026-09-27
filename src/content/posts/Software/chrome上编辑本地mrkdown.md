---
title: chrome上编辑本地mrkdown
published: 2026-04-10
tags:
  - chrome插件
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260410181036614.webp
---

平时用 Markdown 写笔记、存文档，总被两个问题困扰：要么打开笨重的专用编辑器占内存，要么拖进浏览器只能看纯文本乱码；尤其是管理 Obsidian 仓库、本地项目文档时，多文件切换来回找路径，效率大打折扣。



这款开源的 Chrome Markdown Editor 插件完美解决了这些问题，让浏览器变身轻量本地编辑器，数据不上云、操作零门槛，Obsidian 用户和开发者都能直接冲！



项目地址：https://github.com/yishu-ziyu/chrome-md-editor

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260410181036614.webp)

## 3步搞定安装
1. 在项目releases下载压缩包

2. 打开 Chrome 扩展页（chrome://extensions/）,开启右上角的 “开发者模式”。

3. 点击 “加载已解压的扩展程序”，然后选择刚才解压出来的 dist 文件夹。



PS.在扩展列表中找到 Markdown Editor，点击“详细信息”，并开启 “允许访问文件网址”（这是拖拽本地文件自动打开功能的前提）


## 快速使用

**编辑现有文件**：直接将本地.md 文件

**选择本地项目目录**：
添加后即可在侧边栏浏览该文件夹下的所有.md 文件，点击即可打开编辑，编辑完之后Ctrl+S保存，新建文件编辑完成后，点击保存按钮，选择本地保存路径即可。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/PixPin_2026-04-10_19-29-48.webp)

如果你是 Obsidian、Logseq 等笔记软件用户，需要快速编辑本地仓库文件；或是开发者经常写技术文档、项目 README，需要实时预览和图表功能；又或是讨厌装臃肿软件，追求浏览器一站式办公的效率党，这款插件绝对值得一试。



开源免费、轻量无广告、隐私安全，3 步安装就能让 Chrome 变身全能本地 Markdown 编辑器，赶紧下载体验，让文档编辑更高效！



我后续会进行二次开发

- 右侧的预览区增加一个，复制到公众号
- 编辑预览效果的CSS尤其是代码块太丑
- 最左边的文件增加一个新建文件