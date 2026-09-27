---
title: AI画板实战
published: 2026-08-12
tags:
  - excalidraw
  - mcp
  - ai
  - agent
  - 可视化
  - skill
category: AIHacks
draft: false
pinned: false
image: /images/posts/excalidraw-mcp/cover-excalidraw-mcp.png
---

你有没有想过，让 AI 不只是"生成一段代码"或"输出一张图片"，而是直接在一块画布上，像人一样一笔一笔把图画出来，画完还能自己截图检查、修布局、重新排列？这就是 mcp_excalidraw 做的事——一个给 AI Agent 准备的 Excalidraw 画布工作台，GitHub 上已经 2200+ star。

我实际装下来用了一整天，从零画到导出 Obsidian 原生格式，体验是：它把"AI 画图"从"一次性生成一张图"升级成了"AI 拥有一块持续的画布"。这篇文章不讲虚的，只讲怎么装、怎么用、以及它能帮你解决什么实际问题。

![](/images/posts/excalidraw-mcp/cover-excalidraw-mcp.png)

### 它解决了什么问题

先说你最可能遇到的痛点：平时让 AI 画架构图、流程图，得到的往往是一张"死图"——生成完就定型了，想改一个节点、调一个箭头位置，只能重新生成，改起来非常痛苦。

mcp_excalidraw 的思路完全不同。它跑一个本地画布服务（`http://127.0.0.1:3000`），AI 通过 CLI 或 MCP 协议在上面做**元素级操作**：新建一个矩形、移动一个节点、改个颜色、加条箭头。改图像改代码一样精准，而不是推倒重来。

更关键的是它让 AI **看得见自己的作品**。AI 画完可以截图自查，发现文字溢出、图形重叠，就自己修正，直到画好为止。这个"画 → 看 → 改"的闭环，是它和其他一次性生成工具最本质的区别。

### 和官方 Excalidraw MCP 的区别

Excalidraw 官方也有一个 MCP，但定位完全不同。官方版是"对话内一次性出图"（prompt in, diagram out），适合在聊天里快速画个示意图；而 mcp_excalidraw 是给**编程型 Agent** 用的持续画布工作台——支持元素级增删改查、布局对齐、命名快照、Mermaid 转图、`.excalidraw` 文件导出导入。

一句话总结：官方 MCP 让 AI 在聊天里展示图，这个项目让 AI 拥有一块能反复编辑的画布。对做博客、做文档、做项目交付的人来说，后者实用得多。

### 安装：零配置，无需 API Key

这是它最让我惊喜的地方。对比 Excalidraw+ 的官方 MCP（要付费工作区、要申请 API key），这个开源项目**完全免费、纯本地运行、不需要任何密钥**。只需要 Node.js 20 以上（你电脑上基本都有）。

安装 skill 到你的 Agent 目录：

```bash
# 装到当前 Agent 的 skills 目录（Claude Code / Codex 都支持）
npx -y mcp-excalidraw-server install-skill --dir <你的skills目录>

# 或者按平台快捷安装
npx -y mcp-excalidraw-server install-skill          # Claude Code
npx -y mcp-excalidraw-server install-skill --target codex   # Codex
```

装好后，第一次运行画图命令会自动启动本地画布服务：

```bash
npx -y mcp-excalidraw-server start
```

然后浏览器打开 `http://127.0.0.1:3000`，就能看到那块 AI 即将开始作画的画布了。整个安装过程零配置文件、零密钥，这是我实测最顺的一次。

### 核心用法：一个例子看懂

装好之后，让 AI 画一张"内容创作工作流"图，AI 会分步执行——你可以亲眼在左侧浏览器画布上看着它一笔一笔画出来。

第一步，创建中心节点和三个环节：

```bash
echo '[
  {"id":"hub","type":"rectangle","x":300,"y":200,"width":260,"height":90,
   "text":"AI 内容创作工作流","backgroundColor":"#a5d8ff"},
  {"id":"s1","type":"rectangle","x":700,"y":60,"width":220,"height":70,
   "text":"1. 选题","backgroundColor":"#b2f2bb"}
]' | npx -y mcp-excalidraw-server add
```

第二步，AI 截图自查，确认布局和文字没问题：

```bash
npx -y mcp-excalidraw-server describe     # 结构化描述当前场景
npx -y mcp-excalidraw-server screenshot --out diagram.png   # 截图看实际效果
```

第三步，把成果导出成文件。重点来了——**支持 Obsidian 原生格式**：

```bash
# 普通 .excalidraw 文件
npx -y mcp-excalidraw-server export --out docs/architecture.excalidraw

# Obsidian Excalidraw 插件原生格式（.md 结尾即可）
npx -y mcp-excalidraw-server export --out 你的笔记库/diagrams/架构图.excalidraw.md
```

导出到 `.excalidraw.md` 的文件，在 Obsidian 里用 Excalidraw 插件打开就是原生可编辑的画布，没有兼容模式警告，还能反向导入继续改。

### 画布级操作一览

CLI 提供的能力很完整，我实测常用的有这些：

| 命令 | 作用 |
| --- | --- |
| `add` / `apply` | 批量创建元素 / 一次性多操作（增改删） |
| `describe` / `screenshot` | AI 自查：读场景描述、截图看效果 |
| `query` / `get` / `update` / `delete` | 元素级增删改查 |
| `arrange align/group/duplicate` | 布局：对齐、编组、复制 |
| `export` / `import` | 文件导出导入（支持 Obsidian 格式） |
| `mermaid` | Mermaid 代码直接转画布图 |
| `snapshot save/restore` | 命名快照，改坏了能回滚 |

画布数据存在内存里，重启服务会清空——所以画完记得 `export` 保存，或者用 `snapshot` 做阶段备份。

### 实测中的两个小坑

第一，**浏览器标签页要开着**。截图自查（`screenshot`）和 Mermaid 转图依赖浏览器渲染，画布页 `http://127.0.0.1:3000` 要保持一个打开的标签页，AI 才能"看见"自己画的图。只画图和导出则不需要。

第二，**数据在内存，重启即失**。画布服务重启会清空所有元素，所以养成随手 `export` 的习惯。也正因如此，它很适合"画完导出到仓库"这种工作流——图作为仓库里的 `.excalidraw` 文件版本化管理，架构变了再 `import` 回来改。

### 适合谁用

如果你的工作流符合下面任何一条，这个项目值得一试：

- 写技术博客/文档，需要大量架构图、流程图，希望图能跟着代码一起版本管理
- 用 Obsidian 做知识库，想在里面维护可编辑的可视化笔记
- 用 Claude Code / Codex 这类编程 Agent，想让 AI 直接产出可编辑的图表交付物
- 团队协作时，希望多个人（或多 Agent）在同一块画布上并发操作

### 项目信息

- 项目地址：`github.com/yctimlin/mcp_excalidraw`
- 许可协议：MIT，完全开源免费
- 依赖：Node.js ≥ 20（无需 API Key、无需付费）
- 运行方式：本地画布服务 + CLI / MCP / REST 三种接口

我装完之后最大的感受是：AI 工具圈正在从"AI 生成内容给你看"走向"AI 直接在你的工作环境里干活"。mcp_excalidraw 就是这种趋势里一个很典型的例子——它不给你一张图，而是给你一块 AI 能持续作画的画布。
