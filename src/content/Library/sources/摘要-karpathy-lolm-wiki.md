---
title: "摘要 - 卡帕西 AI 知识管理框架 lolm wiki 解读"
type: source
tags: [AI知识管理, lolm-wiki, Karpathy, Obsidian]
sources: [01-输入/02-get笔记/notes/2026-05-07/memo@卡帕西AI知识管理框架lolm wiki解读：Obsidian搭建实例+三个实用使用建议_37.md]
last_updated: 2026-05-27
---

## 核心摘要

- **框架定义**：Karpathy 推出的 lolm wiki 是一套 AI 知识管理框架，核心为"三种文件、三个操作、三种工具"，门槛低、可复用。
- **三种基础文件**：原始资源（raw resource）存放原始资料；维基文件（wiki）由 AI 从资料中提取实体和概念生成；规则文档（schema）定义 AI 加工规范。
- **三个日常操作**：摄取（ingest）导入新资料生成 wiki；问答（query）基于 wiki 向 AI 提问并标注来源；审查（lint）定期让 AI 扫描 wiki 做体检。
- **三种提效工具**：索引（index）列出全部页面名称和摘要；日志（log）按时间记录每次操作；RAG 检索在页面超 1000 个时使用 BM25+向量混合搜索。
- **三个实用建议**：入门阶段优先使用原始资料（比 wiki 更适合学习）；必须验收 AI 生成内容（不能无脑囤积）；知识库内容需兼顾 AI 阅读需求（index 和 log 设计初衷是供 AI 检索）。
- **核心观点**："流水的 AI 工具，铁打的个人知识库"。

## 关联连接

- [[Karpathy]] — 框架提出者
- [[Lolm_Wiki_Framework]] — 框架概念页面
- [[AI_Knowledge_Management]] — 所属更大范畴
- [[Local_Knowledge_Base_LLM]] — 本地知识库实践相关
