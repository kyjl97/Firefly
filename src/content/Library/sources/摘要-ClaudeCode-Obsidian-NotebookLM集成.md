---
title: "Claude Code + Obsidian + NotebookLM 集成方案"
type: source
tags: [claude-code, obsidian, notebooklm, 知识管理, 集成方案]
sources: ["01-输入/02-get笔记/Notes/2026-05-26/memo@🔄 Claude Code + Obsidian + NotebookLM：打造零成本AI增强型个人知识库_134.md"]
last_updated: 2026-05-29
---

## 核心摘要
- **零Token成本方案**：通过 Claude Code 技术将 NotebookLM 的 AI 功能无缝集成到 Obsidian 笔记系统，完全利用 NotebookLM 免费功能，无需额外支付 API 费用
- **技术架构**：Claude Code（中枢控制器）+ Obsidian（知识存储）+ NotebookLM（AI 深度研究）+ Agent Skill 插件（功能桥接）
- **部署步骤**：安装 Python + notebooklm-py 工具 → 安装 Obsidian BRAT 插件和智能体插件（cloudud/agent client）→ 配置 NotebookLM 连接（notebooklm login + skill install）
- **核心功能**：Deep Research（15分钟文献搜索生成研究报告/PPT）、多格式内容生成（测试题/音频/图表）、基于笔记的知识问答
- **风险提示**：第三方工具可能被谷歌封禁 API 访问、需保持 Python 环境稳定、笔记内容会上传至 NotebookLM 服务器

## 关联连接
- [[Claude_Code]] — 中枢控制工具，解析指令并调用 NotebookLM
- [[NotebookLM]] — AI 深度研究与内容生成平台
- [[Obsidian]] — 本地笔记管理系统，知识存储与交互界面
- [[AI_Knowledge_Management]] — AI 知识管理新范式的实践案例
