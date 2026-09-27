---
title: "get-to-obsidian"
type: entity
tags: [obsidian插件, 同步, 开源]
sources: [01-输入/04-选题/get-to-obsidian.md, 01-输入/07-Daily/未命名.md]
last_updated: 2026-05-27
---

## 定义

get-to-obsidian 是一个开源 Obsidian 插件，用于将 Get笔记（biji.com）的内容自动同步到 Obsidian vault 中。

## 核心能力/特点

- 增量同步：每次只拉取新增内容，不重复写入
- 独立文件：每条笔记生成一个 Markdown 文件
- 元数据保留：标题、时间、标签写入 Frontmatter，支持 Dataview 查询
- 后台自动同步：配合浏览器自动化组件可实现无感知同步
- 安装方式：通过 BRAT 插件安装，需额外安装 Playwright（`npx playwright@1.43.1 install`）
- 下载渠道：GitHub 源码、迅雷网盘、夸克网盘

## 关联连接

- [[Get笔记]] — 数据来源方
- [[Obsidian]] — 目标笔记平台
- [[知识同步工作流]] — 所属的方法论框架
- [[摘要-Get笔记同步到Obsidian]] — 来源引用
- [[摘要-Get笔记同步工具下载链接]] — 下载渠道补充
