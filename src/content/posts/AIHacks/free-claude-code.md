---
title: Claude免费代理
published: 2026-04-24
tags:
  - NVIDIA
  - API
  - 免费
  - AI
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260424141510353.webp
---
如果你正在寻找免费使用 Claude Code 的方法，那么 **free-claude-code** 这个开源项目绝对值得关注。它能让 Claude Code 完美对接 NVIDIA NIM、OpenRouter、DeepSeek 等多种免费或低成本的大模型服务，同时保留 Claude Code 原生的工程能力。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260424141510353.webp)


## 为什么选择 free-claude-code？

作为 Claude Code 用户，我们都知道它强大的工程能力：上下文管理、记忆系统、Skill 封装、工具调用、Subagent 控制等。但官方 API 价格不菲，国内使用还有各种限制。

**free-claude-code** 完美解决了这个问题：

项目地址：https://github.com/Alishahryar1/free-claude-code

### 核心优势

1. **零成本使用**：直接调用 NVIDIA NIM 免费接口，每分钟 40 次请求，完全够用
2. **完美伪装**：Claude Code 完全无感，以为还在和 Anthropic 官方通信
3. **思考链保留**：GLM、DeepSeek R1 等模型的思考过程完美显示
4. **工具调用救活**：开源模型不规范的 Tool Call 输出，代理自动解析成 Claude 能识别的格式
5. **智能限流**：内置并发控制和 429 退避，避免免费 API 被限流
6. **多 Provider 混搭**：一个配置同时使用不同提供商的模型

### 支持的模型提供商

| 提供商 | 特点 | 推荐模型 |
|--------|------|----------|
| **NVIDIA NIM** | 免费 40 次/分钟，注册即用 | GLM-5.1、MiniMax M2.7、Kimi K2 |
| **OpenRouter** | 几百个模型，含免费款 | deepseek-r1、gpt-oss-120b |
| **DeepSeek** | 价格低，稳定 | deepseek-reasoner、deepseek-chat |
| **LM Studio** | 纯本地，数据不出网 | 本地 GGUF 模型 |
| **llama.cpp** | 完全本地运行 | 本地模型 |

## 配置步骤（2026 年 4 月实测）

### 第一步：准备 NVIDIA API Key

如果没有，先去 [build.nvidia.com](https://build.nvidia.com/settings/api-keys) 申请一个 `nvapi-` 开头的 Key。

### 第二步：克隆项目

```powershell
git clone https://github.com/Alishahryar1/free-claude-code.git
cd free-claude-code
```

### 第三步：安装依赖

这个项目使用 Python，需要先安装 uv：

```powershell
pip install uv
uv sync
```

### 第四步：配置 .env 文件

```env
NVIDIA_NIM_API_KEY="nvapi-你的Key"

# 模型映射：所有 Claude 模型都映射到这里
MODEL_OPUS="nvidia_nim/z-ai/glm-5.1"
MODEL_SONNET="nvidia_nim/z-ai/glm-5.1"
MODEL_HAIKU="nvidia_nim/z-ai/glm-5.1"
MODEL="nvidia_nim/z-ai/glm-5.1"

ENABLE_THINKING=true
PROVIDER_RATE_LIMIT=40
```

### 第五步：启动代理

```powershell
uv run uvicorn server:app --host 0.0.0.0 --port 8082
```

### 第六步：配置 Claude Code

编辑 `C:\Users\Administrator\.claude\settings.json`：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:8082",
    "ANTHROPIC_AUTH_TOKEN": "ccnim"
  }
}
```

### 第七步：运行测试

直接启动 Claude Code：

```powershell
claude
```

然后说 "你好" 测试。

> ⚠️ **重要**：不要在 Claude Code 中使用 `/model minimaxai/minimax-m2.7`！正确方式是直接说话，代理会自动映射到你在 `.env` 中配置的模型。

## 可用模型推荐

根据 `nvidia_nim_models.json`，以下模型都可以免费使用：

| 模型 | 特点 |
|------|------|
| `z-ai/glm-5.1` | 中文理解强，长上下文 |
| `z-ai/glm4.7` | 稳定可靠 |
| `minimaxai/minimax-m2.7` | Coding 速度快 |
| `minimaxai/minimax-m2.5` | 更轻量 |
| `moonshotai/kimi-k2-thinking` | 思考能力强 |
| `stepfun-ai/step-3.5-flash` | 免费额度多 |

## 常见问题

### Q: free-claude-code 和 CC Switch 有什么区别？

| 对比项 | CC Switch | free-claude-code |
|--------|-----------|------------------|
| **实现方式** | 工具辅助配置 | 本地代理服务 |
| **模型映射** | 手动填模型名 | `.env` 统一配置 |
| **请求转换** | 简单替换 | 完整 Anthropic→OpenAI 转换 |
| **工具调用** | 不够稳定 | 启发式解析，更稳定 |
| **调试难度** | 较难排查 | 终端日志清晰 |
| **配置方式** | GUI 界面 | 配置文件 |

**为什么 free-claude-code 成功率更高？**

1. **模型名称格式统一**：CC Switch 需要手动填写模型名，容易填错（如大小写、命名空间），free-claude-code 用 `.env` 统一配置，格式固定
2. **完整的请求转换**：CC Switch 可能只做了简单的模型名替换，而 free-claude-code 做了完整的 API 格式转换（包括 thinking、tool call 等）
3. **无残留配置干扰**：直接修改 `settings.json` 比工具更干净，CC Switch 可能有残留配置影响
4. **社区验证**：free-claude-code 是 GitHub 上最受欢迎的 Claude Code 代理方案，文档详细，问题容易排查

### Q: 一定要用批处理脚本吗？

**不需要！** 配置好 `settings.json` 后，在任意终端运行 `claude` 都会自动走代理。

如果你不想每次手动启动代理，可以创建一个 `启动代理.bat` 双击运行：

```bat
@echo off
cd /d D:\project2026\free-claude-code
start "NVIDIA NIM Proxy" cmd /k ".venv\Scripts\uvicorn.exe server:app --host 0.0.0.0 --port 8082"
```

### Q: 为什么还是报错 "model may not exist"？

检查三点：
1. Claude Code 的 `settings.json` 是否正确设置了 `ANTHROPIC_BASE_URL` 为 `http://localhost:8082`
2. 代理是否正在运行（端口 8082 是否监听）
3. `.env` 中的模型名称是否正确（带命名空间，如 `z-ai/glm-5.1`）

### Q: 免费额度够用吗？

NVIDIA NIM 免费层 40 次/分钟，对于日常开发完全够用。复杂任务建议适当放慢速度。

### Q: 可以同时用多个模型吗？

可以！在 `.env` 中为 `MODEL_OPUS`、`MODEL_SONNET`、`MODEL_HAIKU` 分别设置不同的模型，实现混合使用。

### Q: 切换模型怎么操作？

1. 编辑 `D:\project2026\free-claude-code\.env`
2. 修改 `MODEL` 的值：
   ```env
   MODEL="nvidia_nim/z-ai/glm-5.1"      # GLM-5.1
   MODEL="nvidia_nim/minimaxai/minimax-m2.7"  # MiniMax M2.7
   MODEL="nvidia_nim/moonshotai/kimi-k2-thinking"  # Kimi K2
   ```
3. 重启代理（双击 `启动代理.bat`）

## 总结

**free-claude-code** 可能是目前国内用户免费使用 Claude Code 最丝滑的方案。它完美保留了 Claude Code 强大的工程能力，同时让我们能白嫖 GLM-5.1、MiniMax M2.7 等优质模型。

对于中低复杂度的项目来说，这套方案已经完全够用。省下的订阅费买点啥不香呢？


## 参考资料
- [NVIDIA免费API的申请流程](https://mp.weixin.qq.com/s/A-FwkXui7Wby2zIjAw4sJg)
- [零成本接管 Nvidia 算力的本地部署方案](https://mp.weixin.qq.com/s/WjG8-UV8sGBCR26_MFgzTg)
