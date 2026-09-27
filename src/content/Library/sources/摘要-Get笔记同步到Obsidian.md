---
title: "摘要 - Get笔记同步到Obsidian"
type: source
tags: [get笔记, obsidian, 同步, 知识管理]
sources: [01-输入/04-选题/get-to-obsidian.md]
last_updated: 2026-05-27
---

## 核心摘要

- **项目定位**：get-to-obsidian 是一个将 Get笔记（biji.com）内容同步到 Obsidian 的开源插件
- **Get笔记痛点**：核心理念是"你只管丢，AI 帮你处理"，但长期使用后链接堆积严重，与浏览器收藏夹无异，缺乏真正的知识消化
- **安装方式**：通过 Obsidian 的 BRAT 插件安装（仓库地址：https://github.com/springrain1/get-to-obsidian），安装后需手动执行 `npx playwright@1.43.1 install`
- **同步特性**：支持增量同步（只拉取新增内容）、每条笔记生成独立 Markdown 文件、链接抓取文章/录音转写/AI 摘要均包含在内、标题时间和标签在 Frontmatter 中可配合 Dataview 使用
- **使用建议**：工具链再顺滑也代替不了定期整理，建议每周花时间回顾同步内容——有价值的加标签双链、相关的移到项目目录、不需要的标记已读或删除

## 关联连接

- [[Get笔记]] — 数据来源方，biji.com 服务
- [[get-to-obsidian]] — 同步插件本体
- [[Obsidian]] — 目标笔记平台
- [[知识同步工作流]] — 从外部工具同步到个人知识库的方法论
