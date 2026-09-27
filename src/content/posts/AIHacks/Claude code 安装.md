---
title: Claude
published: 2026-04-24
tags:
  - Claudecode
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260424220034771.webp
---
这篇文章是我整理的远程安装CC全套SOP文档，今天免费公开分享给大家。不止会手把手教你顺利安装CC，同时还会顺带讲解Obsidian相关配置，全程带大家实操学会 Cloud Code 的完整使用方法，一站式搞定部署与实操，新手也能直接跟着操作，方便大家直接上手使用。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260424220034771.webp)

## 一.安装Claude code

[easy-skills](https://github.com/comeonzhj/easy-skills/releases/tag/v1.0.0)：全自动Claude code安装助手


### Node.js([安装包](https://nodejs.org/en/download/))
```
winget install OpenJS.NodeJS.LTS
```

### Git([安装包](https://git-scm.com/install/windows))
```
winget install Git.Git
```

### Claude Code
```Plain
npm install -g @anthropic-ai/claude-code
```

### skills-link

```
npm i -g skills-link
```

```
skills-link
```

```
https://github.com/kyjl97/skills-manage
```

### 启动命令

```
Claude
```

```
claude --dangerously-skip-permissions
```

一键启动bat

```
@echo off
title Claude Code
where claude >nul 2>&1 || (echo Claude Code 未安装 & pause & exit /b 1)
claude --dangerously-skip-permissions
```


## 二.安装Obsidian
###  [Obsidian安装包]( https://github.com/obsidianmd/obsidian-releases/releases/download/v1.12.7/Obsidian-1.12.7.exe)
```
winget install Git.Git
```

### 拉取仓库模板

```
d: && mkdir project2026 && cd project2026 && git clone https://github.com/kyjl97/obsidian-vault-template.git
```

- https://github.com/kyjl97/obsidian-vault-template
- https://github.com/jason-effi-lab/karpathy-llm-wiki-vault
- https://github.com/iBlinkQ/llm-wiki-obsidian-blink
- https://github.com/iamzhihuix/obsidian-ai-vault-template

一条命令自动搭建Andrej Karpathy 的 LLM Wiki AI 知识库：[查看命令](https://github.com/eleven-net-cn/llm-wiki-starter/blob/main/README.zh-CN.md)


###  Claudian出现报错
```
Claude code在终端使用正常， 但在Obsidian的插件中Claudian对话异常,帮我排除下原因
```


## 三.配置API

#### 1. 获取API key

| Api供应商                                                         | Key创建入口                                                                               | 使用说明                                                                                                                                                                    |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [智谱](https://www.bigmodel.cn/glm-coding?ic=PUCQNADSPM)         | [点此获取](https://bigmodel.cn/usercenter/proj-mgmt/apikeys)                              | [点此查看](https://docs.bigmodel.cn/cn/guide/develop/claude)                                                                                                                |
| [火山](https://volcengine.com/L/HKZkyHHHJ0k/)                    | [点此获取](https://console.volcengine.com/ark/region:ark+cn-beijing/apikey?apikey=%7B%7D) | [点此查看](https://www.volcengine.com/docs/82379/1928261?lang=zh)                                                                                                           |
| [MiniMax](https://platform.minimaxi.com/subscribe/coding-plan) | [点此获取](https://platform.minimaxi.com/user-center/basic-information/interface-key)     | [点此查看](https://platform.minimaxi.com/docs/guides/text-ai-coding-tools#%E5%9C%A8-claude-code-%E4%B8%AD%E4%BD%BF%E7%94%A8-minimax-m2%EF%BC%88%E6%8E%A8%E8%8D%90%EF%BC%89) |
| [Kimi K2](https://www.kimi.com/code)                           | 点此获取                                                                                  | [点此查看](https://www.kimi.com/code/docs/third-party-tools/other-coding-agents.html)                                                                                       |
| [OpenRouter](https://openrouter.ai/)                           | [点此获取](https://openrouter.ai/workspaces/default/keys)                                 | 点此查看                                                                                                                                                                    |
| [XiaomiMIMO](https://platform.xiaomimimo.com/token-plan)       | [点击获取](https://platform.xiaomimimo.com/console/api-keys)                              | [点此查看](https://platform.xiaomimimo.com/docs/zh-CN/integration/tools-overview)                                                                                           |
#### 2. 配置API

#### 借助→[CC Switch](https://github.1zyq1.com/farion1231/cc-switch/releases/download/v3.14.1/CC-Switch-v3.14.1-Windows.msi)
####  手动配置
```
~/.claude/settings.json
```

智谱
```
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "yourkey here",
    "API_TIMEOUT_MS": "3000000",
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
    "MCP_TOOL_TIMEOUT": "30000"
  },
  "permissions": {
    "defaultMode": "bypassPermissions"
  },
  "alwaysThinkingEnabled": false
}
```

火山
```
```JSON
{
    "env": {
        "ANTHROPIC_AUTH_TOKEN": "<ARK_API_KEY>",
        "ANTHROPIC_BASE_URL": "https://ark.cn-beijing.volces.com/api/coding",
        "ANTHROPIC_MODEL": "ark-code-latest"
    }
}
```

MiniMax
```JSON
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
    "ANTHROPIC_MODEL": "MiniMax-M2.7",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "MiniMax-M2.7",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "MiniMax-M2.7",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "MiniMax-M2.7"
  },
  "includeCoAuthoredBy": false
}
```


Kimi K2

```
$env:ENABLE_TOOL_SEARCH="false"
$env:ANTHROPIC_BASE_URL="https://api.kimi.com/coding/"
$env:ANTHROPIC_API_KEY="你的API Key"
```

openrouter

```
  
"env": {
    "ANTHROPIC_BASE_URL": "https://openrouter.ai/api",
    "ANTHROPIC_AUTH_TOKEN": "sk-or-v1-xxxxx",
    "ANTHROPIC_API_KEY": "",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "openrouter/free",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "openrouter/free",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "openrouter/free",
    "CLAUDE_CODE_SUBAGENT_MODEL": "openrouter/free"
  },
```

## 四.参考资料
### Claude code命令&快捷键:[点此查看](https://jieliu.me/posts/xenia/cc%E5%91%BD%E4%BB%A4%E5%BF%AB%E6%8D%B7%E9%94%AE/)
### Claude code skill推荐:[点此查看](https://www.notion.so/skill-347351994e408091a13be04d19c62d1e)
### Claude code MCP:[点此查看](https://jieliu.me/posts/xenia/mcp%E6%B8%85%E5%8D%95/)


## 五.常见问题

### ~/.claude.json
```
  "hasCompletedOnboarding": true
```


