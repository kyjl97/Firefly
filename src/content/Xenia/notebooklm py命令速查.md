---
title: NotebookLM-py 命令速查手册
date: 2026-05-29
tags: [notebooklm, cli, 工具, 参考手册]
description: notebooklm-py 非官方 Python 库的完整命令参考，覆盖登录、笔记本管理、源文件、信息图、报告、音视频等全部功能。
---

## 基本信息

- **包名**: `notebooklm-py`
- **安装**: `pip install notebooklm-py`
- **GitHub**: https://github.com/teng-lin/notebooklm-py
- **前提**: 需要 Google 账号登录，需要代理访问 Google 服务

---

## 环境准备

```bash
# 设置代理（Clash 默认端口）
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890

# Windows PowerShell
$env:HTTP_PROXY = "http://127.0.0.1:7890"
$env:HTTPS_PROXY = "http://127.0.0.1:7890"
```

---

## 1. 认证登录

```bash
# 首次登录（会打开浏览器让你登录 Google）
notebooklm login

# 查看认证状态
notebooklm status

# 清除认证
notebooklm auth clear
```

---

## 2. 笔记本管理

```bash
# 列出所有笔记本
notebooklm list

# 创建笔记本
notebooklm create "笔记本名称"

# 删除笔记本（支持部分ID匹配）
notebooklm delete <notebook-id>

# 重命名笔记本
notebooklm rename <notebook-id> "新名称"

# 设置当前笔记本（后续命令可省略 -n）
notebooklm use <notebook-id>

# 查看当前上下文
notebooklm status

# 清除当前上下文
notebooklm clear

# 获取笔记本摘要
notebooklm summary -n <notebook-id>

# 导出笔记本元数据
notebooklm metadata -n <notebook-id>
```

> **提示**: 笔记本 ID 支持部分前缀匹配，例如 `abc` 可以匹配 `abc123...`

---

## 3. 源文件管理

```bash
# 添加 URL 源文件（自动检测类型）
notebooklm source add "https://example.com" -n <notebook-id>

# 添加本地文件
notebooklm source add "./document.md" -n <notebook-id>

# 添加内联文本（作为源文件）
notebooklm source add "这是一段文本内容" --title "自定义标题" -n <notebook-id>

# 添加 YouTube 视频
notebooklm source add "https://youtube.com/watch?v=xxx" -n <notebook-id>

# 指定类型添加
notebooklm source add "内容" --type text --title "标题" -n <notebook-id>

# 列出所有源文件
notebooklm source list -n <notebook-id>

# 列出源文件（JSON 格式，适合程序处理）
notebooklm source list -n <notebook-id> --json

# 获取源文件全文
notebooklm source fulltext <source-id> -n <notebook-id>

# 删除源文件
notebooklm source delete <source-id> -n <notebook-id>

# 按标题删除源文件
notebooklm source delete-by-title "源文件标题" -n <notebook-id>

# 重命名源文件
notebooklm source rename <source-id> "新标题" -n <notebook-id>

# 刷新源文件
notebooklm source refresh <source-id> -n <notebook-id>

# 检查过期源文件
notebooklm source stale -n <notebook-id>

# 等待源文件处理完成
notebooklm source wait <source-id> -n <notebook-id>

# 获取源文件指南
notebooklm source guide -n <notebook-id>
```

---

## 4. 聊天对话

```bash
# 向笔记本提问
notebooklm ask "你的问题"

# 指定笔记本提问
notebooklm ask "你的问题" -n <notebook-id>

# 配置聊天人设
notebooklm configure

# 查看对话历史
notebooklm history

# 保存对话为笔记
notebooklm history --save
```

---

## 5. 笔记管理

```bash
# 创建笔记
notebooklm note create "笔记内容"

# 列出所有笔记
notebooklm note list -n <notebook-id>

# 获取笔记详情
notebooklm note get <note-id> -n <notebook-id>

# 重命名笔记
notebooklm note rename <note-id> "新名称" -n <notebook-id>

# 删除笔记
notebooklm note delete <note-id> -n <notebook-id>

# 保存聊天记录为笔记
notebooklm note save -n <notebook-id>
```

---

## 6. 生成内容（Artifact）

### 6.1 信息图（Infographic）

```bash
# 生成信息图
notebooklm generate infographic -n <notebook-id>

# 中文信息图（重要：语言代码是 zh_Hans 不是 zh）
notebooklm generate infographic --language zh_Hans -n <notebook-id>

# 指定方向和详细程度
notebooklm generate infographic --orientation portrait --detail detailed -n <notebook-id>

# 指定风格
notebooklm generate infographic --style bento-grid -n <notebook-id>

# 带描述的生成
notebooklm generate infographic "包含统计数据和关键发现" -n <notebook-id>

# 等待完成
notebooklm generate infographic --language zh_Hans --wait -n <notebook-id>
```

**可选参数**:
- `--orientation`: `landscape` | `portrait` | `square`
- `--detail`: `concise` | `standard` | `detailed`
- `--style`: `auto` | `sketch-note` | `professional` | `bento-grid` | `editorial` | `instructional` | `bricks` | `clay` | `anime` | `kawaii` | `scientific`
- `--language`: 语言代码（见下方语言列表）
- `--wait / --no-wait`: 是否等待完成
- `--retry N`: 速率限制时重试次数
- `--json`: JSON 输出

### 6.2 音频（Audio Overview）

```bash
# 生成播客风格音频
notebooklm generate audio -n <notebook-id>

# 指定语言
notebooklm generate audio --language zh_Hans -n <notebook-id>

# 等待完成
notebooklm generate audio --wait -n <notebook-id>
```

### 6.3 视频（Video）

```bash
# 生成视频概述
notebooklm generate video -n <notebook-id>

# 电影级视频
notebooklm generate cinematic-video -n <notebook-id>
```

### 6.4 幻灯片（Slide Deck）

```bash
# 生成幻灯片
notebooklm generate slide-deck -n <notebook-id>

# 修订单张幻灯片
notebooklm revise-slide <artifact-id> -n <notebook-id>
```

### 6.5 测验（Quiz）

```bash
# 生成测验
notebooklm generate quiz -n <notebook-id>

# 生成闪卡
notebooklm generate flashcards -n <notebook-id>
```

### 6.6 思维导图（Mind Map）

```bash
# 生成思维导图
notebooklm generate mind-map -n <notebook-id>
```

### 6.7 数据表格（Data Table）

```bash
# 生成数据表格
notebooklm generate data-table -n <notebook-id>
```

### 6.8 报告（Report）

```bash
# 生成报告（可指定类型）
notebooklm generate report -n <notebook-id>

# 报告类型: briefing-doc, study-guide, blog-post, custom
notebooklm generate report --type study-guide -n <notebook-id>
```

---

## 7. 下载内容

```bash
# 下载信息图
notebooklm download infographic -n <notebook-id>
notebooklm download infographic "输出路径/文件名.png" -n <notebook-id>
notebooklm download infographic --all ./infographic/ -n <notebook-id>

# 下载音频
notebooklm download audio -n <notebook-id>

# 下载视频
notebooklm download video -n <notebook-id>

# 下载幻灯片（PDF 或 PPTX）
notebooklm download slide-deck -n <notebook-id>

# 下载报告
notebooklm download report -n <notebook-id>

# 下载思维导图（JSON）
notebooklm download mind-map -n <notebook-id>

# 下载数据表格（CSV）
notebooklm download data-table -n <notebook-id>

# 下载测验
notebooklm download quiz -n <notebook-id>

# 下载闪卡
notebooklm download flashcards -n <notebook-id>
```

**下载选项**:
- `--latest`: 下载最新（默认）
- `--earliest`: 下载最早
- `--all`: 下载全部
- `--name "标题"`: 按标题筛选（模糊匹配）
- `--artifact <id>`: 按 ID 选择
- `--force`: 覆盖已有文件
- `--no-clobber`: 文件存在则跳过
- `--dry-run`: 预览不下载
- `--json`: JSON 输出

---

## 8. Artifact 管理

```bash
# 列出所有 artifact
notebooklm artifact list -n <notebook-id>

# 获取 artifact 详情
notebooklm artifact get <artifact-id> -n <notebook-id>

# 重命名 artifact
notebooklm artifact rename <artifact-id> "新名称" -n <notebook-id>

# 删除 artifact
notebooklm artifact delete <artifact-id> -n <notebook-id>

# 查看建议
notebooklm artifact suggestions -n <notebook-id>

# 等待 artifact 完成
notebooklm artifact wait <artifact-id> -n <notebook-id>
```

---

## 9. 分享管理

```bash
# 添加协作者
notebooklm share add <email> -n <notebook-id>

# 设置公开访问
notebooklm share public -n <notebook-id>

# 查看分享状态
notebooklm share status -n <notebook-id>

# 移除协作者
notebooklm share remove <email> -n <notebook-id>

# 更新分享设置
notebooklm share update -n <notebook-id>

# 查看访问级别
notebooklm share view-level -n <notebook-id>
```

---

## 10. 研究功能

```bash
# 启动研究
notebooklm source add "研究主题" --type research -n <notebook-id>

# 查看研究状态
notebooklm research status -n <notebook-id>

# 等待研究完成
notebooklm research wait -n <notebook-id>
```

---

## 11. 语言代码

```
en          English（英语）
zh_Hans     简体中文
zh_Hant     繁體中文
es          Español（西班牙语）
...更多见 notebooklm language list
```

> **注意**: 中文简体代码是 `zh_Hans`，不是 `zh`！

查看所有支持的语言：
```bash
notebooklm language list
```

---

## 12. 输出格式

大多数命令支持 `--json` 参数，方便程序化处理：

```bash
notebooklm list --json
notebooklm source list -n <notebook-id> --json
notebooklm artifact list -n <notebook-id> --json
```

---

## 13. 常见问题

### 代理问题
NotebookLM 是 Google 服务，国内需要代理。确保设置 `HTTP_PROXY` 和 `HTTPS_PROXY` 环境变量。

### Windows 编码问题
CLI 在 Windows 终端可能因 GBK 编码导致 emoji 显示崩溃，不影响功能。用 `--json` 输出可避免此问题。

### 速率限制
频繁操作可能触发 Google 速率限制，使用 `--retry N` 参数自动重试。

### 部分 ID 匹配
笔记本 ID 和 artifact ID 都支持前缀匹配，输入前几位即可。

---

## 14. 快速参考卡片

```
notebooklm login                    # 登录
notebooklm list                     # 列出笔记本
notebooklm create "名称"             # 创建笔记本
notebooklm use <id>                 # 切换笔记本
notebooklm source add <url> -n <id> # 添加源文件
notebooklm source list -n <id>      # 列出源文件
notebooklm ask "问题" -n <id>       # 提问
notebooklm generate infographic --language zh_Hans -n <id>  # 中文信息图
notebooklm download infographic "output.png" -n <id>        # 下载信息图
notebooklm artifact list -n <id>    # 列出所有生成物
notebooklm artifact get <aid> -n <id>  # 查看详情
```
