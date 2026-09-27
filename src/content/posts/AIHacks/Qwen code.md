---
title: Qwen code安装与使用
published: 2026-04-14
tags:
  - Agent
  - Qwen
  - Claude
  - 编程助手
  - AI工具
  - 命令行工具
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260414155118952.webp
---

Qwen Code 是基于 Gemini Code 二次开发的**终端 AI 编程助手**，完美搭载**通义千问3.6 Plus 最新编程模型**，支持纯中文交互、代码生成/修复/Git 协作，**免费**提供**每日100次请求**额度完全满足日常开发需求。

**开源地址**：
https://github.com/QwenLM/qwen-code

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260414155118952.webp)

## 一、前置准备

### 1. 环境说明
Qwen Code 依赖 **Node.js 20.0 及以上版本**，必须先安装：
1. 打开官网：https://nodejs.org/
2. 下载 **LTS 版本**（长期稳定版），一路默认安装即可
3. 验证是否安装成功：

按下 `Win + R`，输入 `cmd` 打开终端，执行命令：
   ```cmd
   node -v
   npm -v
   ```

### 2. 关键要求
打开终端时，**必须右键选择「以管理员身份运行」**（否则无法全局安装）。

## 二、安装命令

```cmd
npm install -g @qwen-code/qwen-code@latest
```


### 验证安装
在终端输入：
```cmd
qwen --version
```

显示版本号 = **安装成功**。

## 三、配置API

默认授权或接入阿里云百炼API

**使用 Qwen3.6 Plus 模型** 示例

进入交互界面后，使用命令 `/model` 切换模型：

```
/model qwen3.6-plus
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260414203620949.webp)

### 集成火山MiniMax-M2.5

在 settings.json 中配置 API Key 和模型

参考：[配置说明](https://qwenlm.github.io/qwen-code-docs/zh/users/configuration/model-providers/)   火山API：[点此购买](https://volcengine.com/L/RvxTJNv-DhA/)

配置火山引擎方舟Coding Plan模型MiniMax-M2.5示例

```
{
  "modelProviders": {
    "openai": [
      {
        "id": "minimax-m2.5",
        "name": "MiniMax-M2.5",
        "baseUrl": "https://ark.cn-beijing.volces.com/api/coding/v3",
        "description": "MiniMax-M2.5 via 火山方舟",
        "envKey": "OPENAI_API_KEY"
      }
    ]
  },
  "env": {
    "OPENAI_API_KEY": "your-API"
  },
  "security": {
    "auth": {
      "selectedType": "openai"
    }
  },
  "model": {
    "name": "minimax-m2.5"
  }
}
```

### 集成蚂蚁百灵ling-2.6-1t

详细的教程:[点击查看](https://jieliu.me/posts/aihacks/%E8%9A%82%E8%9A%81%E7%99%BE%E7%81%B5%E5%A4%A7%E6%A8%A1%E5%9E%8B/)

全局启动 bat（推荐）

```
@echo off
title Claude Code - 百灵模型

:: ========== 百灵配置区（修改这里）==========
set ANTHROPIC_BASE_URL=https://api.ant-ling.com/anthropic
set ANTHROPIC_API_KEY=你的百灵API令牌
set ANTHROPIC_MODEL=Ling-2.6-flash
set ANTHROPIC_DEFAULT_OPUS_MODEL=Ling-2.6-flash
set ANTHROPIC_DEFAULT_SONNET_MODEL=Ling-2.6-flash
set ANTHROPIC_DEFAULT_HAIKU_MODEL=Ling-2.6-flash
:: ===========================================

where claude >nul 2>&1 || (echo Claude Code 未安装 & pause & exit /b 1)
claude --dangerously-skip-permissions --model %ANTHROPIC_MODEL%
```

把 bat 放在**项目根目录**，自动加载同目录的 `.env`：

```
@echo off
title Claude Code - 百灵模型
chcp 65001 >nul

:: 加载同目录 .env 文件（如果存在）
if exist ".env" (
    for /f "usebackq tokens=1,* delims==" %%a in (".env") do (
        set "%%a=%%b"
    )
)

:: 兜底：如果 .env 没配置，使用默认值
if not defined ANTHROPIC_BASE_URL set ANTHROPIC_BASE_URL=https://api.ant-ling.com/anthropic
if not defined ANTHROPIC_API_KEY (
    echo [错误] 未找到 ANTHROPIC_API_KEY
    echo 请在 .env 文件或 bat 中配置你的百灵 API 令牌
    pause
    exit /b 1
)
if not defined ANTHROPIC_MODEL set ANTHROPIC_MODEL=Ling-2.6-flash
if not defined ANTHROPIC_DEFAULT_OPUS_MODEL set ANTHROPIC_DEFAULT_OPUS_MODEL=%ANTHROPIC_MODEL%
if not defined ANTHROPIC_DEFAULT_SONNET_MODEL set ANTHROPIC_DEFAULT_SONNET_MODEL=%ANTHROPIC_MODEL%
if not defined ANTHROPIC_DEFAULT_HAIKU_MODEL set ANTHROPIC_DEFAULT_HAIKU_MODEL=%ANTHROPIC_MODEL%

where claude >nul 2>&1 || (echo Claude Code 未安装 & pause & exit /b 1)

echo 当前模型: %ANTHROPIC_MODEL%
claude --dangerously-skip-permissions --model %ANTHROPIC_MODEL%
```

配套 `.env` 文件（放项目根目录）

```
ANTHROPIC_BASE_URL=https://api.ant-ling.com/anthropic
ANTHROPIC_API_KEY=你的百灵API令牌
ANTHROPIC_MODEL=Ling-2.6-flash
ANTHROPIC_DEFAULT_OPUS_MODEL=Ling-2.6-flash
ANTHROPIC_DEFAULT_SONNET_MODEL=Ling-2.6-flash
ANTHROPIC_DEFAULT_HAIKU_MODEL=Ling-2.6-flash
```

记得把 `.env` 加入 `.gitignore`

### 命令启动

```
# 1. 默认启动（建议模式 - 每次操作需确认）
qwen

# 2. 全自动模式（无需确认，自动执行所有操作）
qwen -y
qwen --approval-mode yolo
```

1. 首次启动会提示选择登录方式，**直接选择「Qwen OAuth」**
2. 会自动跳转到浏览器，登录你的通义千问账号（直接用github登录）
3. 登录完成后，返回终端，自动完成认证，**无需手动配置密钥**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260414202107652.webp)


### 启动bat

```
@echo off
chcp 65001 >nul
title Qwen Code

:: 检查 qwen 命令
where qwen >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 qwen 命令，请先安装。
    pause
    exit /b 1
)

:: 直接启动，不显示任何额外信息
qwen -y
```

## 四、自然语言使用

启动工具后，直接输入中文需求即可：
```
帮我写一个Python批量重命名文件的脚本
解释当前项目的代码结构
修复这个文件的报错
生成规范的Git提交注释
```

常用命令：
- `/help`：查看所有功能
- `/quit`：退出工具
- `/clear`：清空终端内容
- `/model`：切换 AI 模型
- `/compress`：压缩上下文，减少 Token 消耗
- `/search`：搜索文件内容
- `/read`：读取指定文件
- `/edit`：编辑当前文件
- `/write`：写入或创建新文件
- `/bash`：执行终端命令
- `/review`：代码审查
- `/test`：运行测试
- `/insight`：从聊天记录中生成个性化


## 五、多子 Agent 并行处理

Qwen Code 支持调用多个**子 Agent（子程序）**并行工作，大幅提升任务处理效率。

### 如何调用多个子 Agent

在任务提示词中明确指示即可：

```
请同时调用 3 个子 Agent，分别处理以下任务：
1. Agent A: 读取 src/pages 目录下的所有 .astro 文件
2. Agent B: 扫描 src/components 目录，找出所有用到某个组件的地方
3. Agent C: 分析 src/content 目录下的所有文章，统计标签使用情况

注意：需要配合 todo_write 来管理跟踪这些并行任务。
```

### 配合 todo_write 管理任务

```javascript
// 同时启动多个任务时，用 todo_write 跟踪进度
{
  "todos": [
    { "id": "1", "content": "任务A：读取文件", "status": "in_progress" },
    { "id": "2", "content": "任务B：扫描组件", "status": "in_progress" },
    { "id": "3", "content": "任务C：统计分析", "status": "in_progress" }
  ]
}
```




