---
title: 在OB中Codex
published: 2026-06-28
tags:
  - codex
  - obsidian
  - ai-workflow
category: AIHacks
draft: true
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/placeholder-codex-obsidian.webp
---
在 Obsidian 中用 Codex，核心思路是让 Codex 作为 AI 协作者，直接读写 Vault 里的 Markdown 笔记。三种接入方式，按场景选。

### 一、三种接入方式

| 方式           | 适合场景       | 集成度 |
| ------------ | ---------- | --- |
| Claudian 插件  | 日常对话、单篇编辑  | ⭐⭐⭐ |
| Vault 直连     | 批量处理、自动化脚本 | ⭐⭐  |
| Obsidian CLI | 终端自动化、批量落库 | ⭐   |

**1. Claudian 插件（推荐）**

安装 Claudian 插件（通过 BRAT 或社区插件市场），在设置中填入 Codex CLI 路径和 API Key，侧边栏即可直接对话、读写当前笔记。

**2. Vault 直连**

把 Codex 工作目录设为 Vault 根目录，终端运行 Codex，用自然语言指令批量整理笔记、生成摘要，结果直接保存回 Vault。

**3. Obsidian CLI 协同**

开启 Obsidian 的 CLI 功能，终端通过 `obsidian read`、`obsidian create` 等命令与 Vault 交互，结合 Codex 实现自动化流程。

### 二、常见场景

**知识库整理**：让 Codex 读取原始笔记，提取核心观点，生成结构化 Markdown 归档。

**内容创作**：读取已有笔记上下文，生成选题表、润色段落、补充代码示例。

**项目文档维护**：在项目目录下维护方案、里程碑、问题清单，自动更新文档。

### 三、注意事项

- **备份优先**：Codex 有文件读写和代码执行能力，初次使用建议备份重要笔记，或限制访问路径。
- **规则沉淀**：把常用指令、格式要求写入 `agents.md`，让 Codex 遵循你的整理逻辑，提升输出质量。
