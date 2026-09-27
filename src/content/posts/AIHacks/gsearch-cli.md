---
title: Agent谷歌搜索
published: 2026-05-14
tags:
  - CLI
  - Agent
  - AI
  - Search
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260514195541715.webp
---
AI Agent 不能联网真的太蛋疼了。试了五六种搜索工具，没有一个让人省心——要么要配 API Key，要么要跑后台服务，要么结果一塌糊涂。

直到发现 [gsearch-cli](https://github.com/aeroxy/gsearch-cli)。Rust 写的，单二进制，小得离谱，跑起来快得惊人。最妙的是它能直接复用 Gemini CLI 的 OAuth 认证，**零配置，装完就能用**。

现在 Claude Code 终于有真正的谷歌搜索能力了。

![209](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260514195541715.webp)

---

## 安装

**方式一：有 Rust 环境**
```bash
cargo install gsearch-cli
```

**方式二：macOS**
```bash
brew install aeroxy/tap/gsearch
```

装完先登录一次：
```bash
gsearch --login
```

浏览器打开授权页面，点一下确认就完事了。

---

## 怎么用

### 1. 命令行直接用
```bash
gsearch 新加坡天气
```

不用加引号，空格直接搜。

### 2. Claude Code 自然语言调用

这才是终极形态——让 Agent 获得真正的联网能力。

**直接用项目自带的 Skill：**
```bash
# 从源码里复制，或者手动创建
cp gsearch-cli/skill/gsearch/SKILL.md ~/.claude/skills/gsearch/
```

作者已经写好了完整的 Skill，包含：
- 自动触发条件（搜索谷歌、查找资料、需要实时信息）
- 完整的使用流程说明
- 输出格式和引用说明

**配置完就能用！** 下次直接说：
```
帮我搜一下 2026年5月有什么新的AI模型发布
```

Claude Code 会自动识别并调用这个 Skill，不需要写复杂的 System Prompt。

---

## 设计亮点

### 1. 终端 Markdown 自动检测
这个细节特别用心：

```rust
if stdout().is_terminal() {
    termimad::print_text(&formatted);  // 终端输出 → 彩色渲染
} else {
    println!("{}", formatted);          // 文件/管道 → 纯净 Markdown
}
```

**效果：**
- 直接运行 `gsearch xxx` → 看到彩色、粗体、高亮的排版（给人看）
- `gsearch xxx > out.md` → 文件里是纯净 Markdown，没有乱码字符（给程序用）

### 2. 引用来源机制
搜索结果带 Gemini 的 grounding 数据，正文插入 `[1] [2]` 标记，末尾自动列出 Sources 链接。

**注意：不是每次都有 Sources**：
- ✅ 时效性新闻、技术文档、冷门事件 → 有完整引用
- ⚠️ 最新财报、热点新闻 → 可能有注
- ❌ 常识历史内容（如马斯克早年经历）→ Gemini 认为训练数据已有，不联网

---

## 核心原理

这个工具最巧妙的地方在于——**它伪装成了官方的 Gemini CLI**。

### 1. 认证复用
直接读 `~/.gemini/oauth_creds.json`，用的是和 Google 官方 Gemini CLI **完全相同**的 Client ID/Secret。如果你已经登录过 Gemini CLI，装完直接能用。

### 2. 调用内部 API
不走公开的 Gemini API，用的是 **Gemini CLI / Cloud Code 插件的内部端点**：
```
cloudcode-pa.googleapis.com/v1internal:generateContent
```

User-Agent 也伪装成 `GeminiCLI/...`，Google 根本分不清是 gsearch 还是官方客户端。

### 3. 原生联网搜索
调用 Gemini 时开启 `googleSearch` 内置工具，用的是 Gemini 的 Grounded Search 原生能力，不是爬虫，比所有第三方搜索工具都稳。

### 4. 自动维护
- Token 过期前 5 分钟自动刷新
- 自动检测 `HTTPS_PROXY`，忽略证书验证，公司内网也能跑
- 不需要 API Key，不需要 Google Cloud 项目

---

## 源码结构

总共就 4 个文件：
- `main.rs` - 主入口和命令行解析
- `auth.rs` - OAuth 认证和 token 管理
- `api.rs` - Gemini 内部 API 调用
- `grounding.rs` - 搜索结果格式化

MIT 协议开源，随便改。

---

## 最后说两句

不是什么惊天动地的大项目，但它把一个很小的问题解决得特别干净。没有花里胡哨的功能，没有复杂的配置，装完就能用。

对于折腾 AI Agent 的人来说，这玩意儿就是刚需——你的 Agent 终于能真正"上网"了。
