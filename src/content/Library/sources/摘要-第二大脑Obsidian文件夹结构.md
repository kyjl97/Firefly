---
title: "第二大脑 × Obsidian：落地文件夹结构"
type: source
tags: [obsidian, 知识管理, 文件夹结构, 第二大脑, AI可读性]
sources: ["01-输入/02-get笔记/Notes/2026-05-27/memo@第二大脑 × Obsidian：落地文件夹结构_86.md"]
last_updated: 2026-05-29
---

## 核心摘要
- **设计原则**：每个文件夹配说明书（AI 能"懂你"的前提）、输出（给自己）vs 成果（给别人）标准不同、AI 可读性（frontmatter 标注 type/summary）、中央大脑（README.md 工作流说明书）、Git 版本控制兜底
- **顶层结构**：00_Inbox（临时收件箱）→ 01_Input（外部信息）→ 02_Wiki（AI 拆解的结构化知识）→ 03_Output（个人思考）→ 04_Tasks（项目过程管理）→ 05_Outcomes（对外交付）→ 06_Skills（可复用 AI 技能）→ 07_Archive（归档）→ .system（系统文件：schema.md / style_guide.md / persona.md）
- **三个日常操作**：摄取（Ingest）— 新资料 → AI 按 schema 拆解 → 生成 Wiki 页面 → 更新 index/log；问答（Query）— 基于 Wiki 提问 → AI 回答并标注来源；审查（Lint）— 定期让 AI 扫描 Wiki 找矛盾/过时/孤立页面
- **关键文件**：README.md（中央大脑，AI 每次干活先读）、_folder_guide.md（文件夹说明书）、schema.md（AI 加工规则，含 Wiki 标准结构和 frontmatter 规范）、persona.md（个人画像：价值观/目标/行为模式/风格偏好/恐惧回避）
- **Frontmatter 规范**：type 字段区分 AI 生成内容（concept/entity/comparison）和用户原创内容（input/output/outcome）

## 关联连接
- [[Obsidian]] — 知识管理工具载体
- [[AI_Knowledge_Management]] — AI 知识管理新范式的落地结构
- [[Lolm_Wiki_Framework]] — 与 Karpathy 的 wiki 框架理念一致
- [[知识同步工作流]] — 摄取/问答/审查三操作的工作流
- [[碎片知识系统化]] — 从碎片到结构化知识的方法论
