---
title: OB导出PDF与html
published: 2026-08-13
tags:
  - Obsidian
  - PDF
  - HTML
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260813192104476.webp
---
给大家分享两个Obsidian插件，一个可以导出PDF，一个导出了HTML。


### Better Export PDF


调用 Obsidian 内置 Electron 打印引擎，**完全不用 pandoc**

原理：调用 Obsidian 内置 Electron 打印引擎，完全不用 pandoc
核心能力：
PDF 自带书签目录（大纲跳转）、页眉 / 页脚、页码、自定义 CSS、导出预览、批量导出文件夹、支持内部图片嵌入
优点：中文友好、配置简单、坑极少；社区维护稳定
短板：复杂数学公式、极复杂表格渲染弱于 pandoc 方案
适合：日常文档、技术笔记、交付文档（你的 Codex 文档场景完美适配）


### Notes to HTML Pages

导出的页面很好看，支持 Cloud 的风格。但是有一点缺点：它只能导出在 Obsidian 的根目录，会先创建一个文件夹，不能够自定义导出目录。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260813192104476.webp)


### 本次思考
以后，如果遇到一个插件不好用了，网上发现有很多人也遇到了类似的问题，直接让 AI 帮你找找有没有类似的软件。
