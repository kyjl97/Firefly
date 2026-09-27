---
title: opencodex 使用指南
published: 2026-07-24
tags:
  - ai
  - codex
  - claude
  - deepseek
  - agent
  - workflow
  - token
  - api
  - gemini
  - kimi
  - obsidian
  - gpt
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260723232646911.webp
---
Codex 玩家都会遇上同一个棘手痛点：即便开通了 GPT Plus 会员，遇上大型任务，短短一天就会耗尽整周调用额度，后续只能搁置工作，十分耽误进度。另外，很多人手里囤积着各类闲置 Token、各大平台会员余量，白白搁置。

近期我在 GitHub发现了一个叫opencodex的项目，能够让 Codex 接入并调用任意大语言模型。

项目地址：[lidge-jun/opencodex](https://github.com/lidge-jun/opencodex)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260723232646911.webp)


### 它解决的是什么问题

正常情况下，Codex 使用的是 OpenAI 的服务。opencodex 在本机启动一个代理，把 Codex 的请求转成目标服务支持的协议，再将结果返回给 Codex。

```text
Codex CLI / App / SDK → opencodex 本地代理 → 你配置的模型服务
```

这意味着你不必切换不同的编程工具：仍然在熟悉的 Codex 工作流里完成任务，只在需要时切换模型或 provider。

需要注意：代理必须保持运行，才能使用已路由的模型；`ocx stop` 会停止代理，并恢复原生 Codex 配置。

### 开始前，先确认这三件事

- 需要 Node.js 18 或更高版本；Windows 可原生运行，不需要 WSL。
- 云端 provider 通常需要 API Key 或 OAuth 登录；调用费用、可用模型和速率限制由 provider 决定。
- 这是第三方项目，不代表 OpenAI、Anthropic 或其他模型提供商官方支持。尤其是通过代理使用 OAuth 时，应先确认服务条款是否允许。

### 安装与初始化

在终端执行：

```bash
npm install -g @bitkyc08/opencodex
ocx init
ocx start
```

`ocx init` 会引导你写入配置并注入 Codex。启动成功后，可在浏览器打开 `http://localhost:10100`，通过仪表盘添加 provider、查看认证状态和请求日志。

默认端口是 10100；如果已被占用，opencodex 会选择可用端口并更新 Codex 的连接配置，因此不必手动抢占端口。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260723233458065.webp)
### 添加模型服务并路由

最简单的方式是在仪表盘点击 **Add Provider**，选择内置 provider 或填写 OpenAI 兼容端点。常见认证方式包括：

| 类型 | 示例 | 常见认证方式 |
| --- | --- | --- |
| OAuth | Anthropic、xAI、Kimi | OAuth 或 API Key |
| API Key | DeepSeek、OpenRouter、Groq | API Key |
| 本地服务 | Ollama、vLLM、LM Studio | 通常不需要 Key |

配置完成后，可用 `provider/model` 的形式临时指定模型：

```bash
codex -m "anthropic/claude-opus-4-8" "解释这个 stack trace"
codex -m "google/gemini-3-pro" "为 auth.ts 写单元测试"
codex -m "ollama-cloud/glm-5.2" "写一个 SQL migration"
```

具体模型目录取决于你的 provider、账户权限和当时的可用性。与其照抄网上的型号，不如在仪表盘或 `ocx init` 中确认当前可选模型。

### 三种让代理保持可用的方式

| 方式   | 命令                       | 适合场景               |
| ---- | ------------------------ | ------------------ |
| 临时启动 | `ocx start`              | 偶尔测试或短时间使用         |
| 后台服务 | `ocx service install`    | 日常开发，登录后自动运行       |
| 按需启动 | `ocx codex-shim install` | 希望仅在运行 `codex` 时启动 |

如果你主要使用 Codex App，选择后台服务更省心；只偶尔在命令行使用时，按需启动通常更轻量。

### 常用命令

```bash
ocx status                    # 查看代理状态
ocx gui                       # 打开 Web 仪表盘
ocx login <xai|anthropic|kimi>  # OAuth 登录
ocx sync                      # 刷新模型列表并重新注入 Codex
ocx stop                      # 停止代理并恢复原生 Codex 配置
ocx uninstall                 # 移除 service、shim、配置并恢复原生状态
```

卸载前先执行 `ocx uninstall`，再运行 `npm uninstall -g @bitkyc08/opencodex`，避免遗留服务或本地配置。

### 一个更稳妥的使用方式

不要一开始就把所有模型都接进来。先选一个重复出现的任务，例如“用另一种模型做代码审查”或“让本地模型处理不敏感的草稿”，跑通下面这条链路：

```text
添加一个 provider → 完成认证 → 用一条小任务验证 → 查看日志 → 再接入下一个场景
```

这样出了问题时，能区分是模型、认证、网络还是 Codex 注入配置导致的，而不是在一堆 provider 中盲目排查。

### 常见问题

**代理启动不了**

先运行 `ocx status`。如果刚安装就提示 Bun runtime 缺失，通常是 npm 跳过了安装脚本；按项目 README 的说明重新安装，并确认没有使用 `--ignore-scripts` 或 `--omit=optional`。

**模型在 Codex 里不可用**

先确认 provider 已完成认证，再执行 `ocx sync` 刷新模型目录。模型是否出现还受账户权限和 provider 当前返回的目录影响。

**把代理暴露到局域网是否安全**

默认只绑定本机回环地址。除非明确需要远程访问，不要把它改为 `0.0.0.0`；如果必须暴露到局域网，应按文档配置 bearer token，避免管理接口和模型请求被未授权访问。

### ChatGPT 已登录，为什么 Codex 还是不能生图

我实际遇到过一次很容易误判的问题：Codex 可以正常调用 OpenAI 文本模型，`ocx doctor` 也显示 ChatGPT 认证成功，但调用内置生图时仍然报错：

```text
Built-in image generation needs an OpenAI upstream,
but none is configured in opencodex.
```

一开始我以为是当前对话选错了模型，后来确认 Codex 已经选中 OpenAI 模型，问题仍然存在。这说明“文本模型能用”和“图片端点识别到 OpenAI 上游”是两项不同的检查。

先运行诊断：

```bash
ocx doctor
```

如果 `WHAM reachability` 显示 `status=200` 和 `authenticated`，说明 ChatGPT 登录本身有效。接着检查配置文件：

```text
C:\Users\你的用户名\.opencodex\config.json
```

这次故障的配置是：

```json
"openai": {
  "adapter": "openai-responses",
  "baseUrl": "https://chatgpt.com/backend-api/codex",
  "authMode": "oauth"
}
```

在 opencodex 2.7.28 中，图片转发只会把规范的 ChatGPT forward provider 识别为 OpenAI 图片上游。这里的 `authMode` 应改为 `forward`：

```json
"openai": {
  "adapter": "openai-responses",
  "baseUrl": "https://chatgpt.com/backend-api/codex",
  "authMode": "forward"
}
```

保存后重启代理并检查健康状态：

```bash
ocx restart
ocx health --json
```

确认返回 `"ok": true` 后，再调用 Codex 内置生图。本次修改后，原先的 400 错误消失，封面图成功生成。

这个问题最容易踩坑的地方是：ChatGPT 登录有效、OpenAI 文本模型可用，并不代表 `/v1/images/*` 已经找到合法上游。如果看到同样的报错，应同时检查认证状态和 `providers.openai.authMode`，不要只反复切换模型。

### 参考链接

- [项目 README](https://github.com/lidge-jun/opencodex/blob/main/README.zh-CN.md)
- [完整中文文档](https://lidge-jun.github.io/opencodex/zh-cn/)
- [配置参考](https://lidge-jun.github.io/opencodex/zh-cn/reference/configuration/)

**以上，既然看到这里了，如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。**

想了解学习Codex更多相关内容，我做了一个Codex App指南，[点此查看](https://mp.weixin.qq.com/s/F3HS6BUfTDP0h3rFipoJhA)！

感谢你拨冗阅读，山高水长，我们期待下篇文章与你再见。

*\>/ 更多Agent、Obsidian与自动化工作流实操,访问博客：[kyjl97.github.io](https://kyjl97.github.io/)*
