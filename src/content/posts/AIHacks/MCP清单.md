---
title: 10个MCP清单
published: 2025-04-24
tags:
  - MCP
category: AIHacks
draft: false
pinned: false
image:
---

随着 MCP（Model Context Protocol）生态快速普及，AI 工具不再局限于纯文本对话。

通过挂载各类 MCP 服务，可让 Claude、Cursor、TRAE 等工具打通本地文件、代码仓库、浏览器、实时搜索、数据库、设计稿等全链路能力，彻底告别手动复制粘贴、信息滞后、答案幻觉等痛点。

下面整理社区装机率最高、实用性拉满的10个必装MCP，兼顾日常开发、内容创作、数据处理、自动化办公等多元需求，附核心作用、安装价值与完整可直接复制的配置代码，一键落地部署。

## 一、十大核心MCP详细介绍
### 1. Filesystem MCP（官方）
- 作用：读写本地文件、搜索、创建/移动目录、执行命令。
- 必装理由：所有本地工作流的基础，安全可控（可按目录授权）。
- 项目地址：
https://github.com/modelcontextprotocol/servers

### 2. GitHub MCP Server（官方）
- 作用：读代码库、管理 PR/Issue、审查代码、搜索仓库、跑 Actions。
- 必装理由：AI 真正理解你的代码库，无需手动复制文件到对话。
- 项目地址：
 https://github.com/github/github-mcp-server

### 3. Context7 MCP
- 作用：实时拉取最新官方文档、API 参考、代码示例，注入上下文。
- 必装理由：根治AI瞎编API问题，适配React、Next、Python、Go等主流技术栈。
- 项目地址：
https://github.com/upstash/context7

### 4. Playwright MCP（浏览器自动化）
- 作用：操控浏览器、点击填表、截图、爬虫、前端测试、JS渲染页面抓取。
- 必装理由：AI可模拟真人上网，完成调研、测试、数据采集等自动化工作。
- 项目地址：
https://github.com/microsoft/playwright-mcp

### 5. Firecrawl MCP（网页抓取）
- 作用：任意网站转干净Markdown结构化数据，去广告、抗反爬、支持JS渲染。
- 必装理由：资料研究、内容提取、私有知识库构建的核心工具。
- 项目地址：
https://github.com/mendableai/firecrawl

### 6. Tavily MCP（AI原生搜索）
- 作用：专为大模型设计的搜索引擎，返回结构化、LLM友好结果。
- 必装理由：无广告、结果精简，解决大模型知识库滞后问题，适合实时调研。
- 项目地址:
https://github.com/tavily-ai/tavily-mcp

### 7. PostgreSQL MCP（数据库）
- 作用：安全连接PostgreSQL，执行查询、查看表结构、生成报表、数据分析。
- 必装理由：后端开发与数据分析刚需，AI直连数据库，简化数据排查与统计。
- 项目地址：
https://github.com/modelcontextprotocol/servers/tree/main/postgres

### 8. Memory Bank（Claude-Mem）
- 作用：跨会话永久记忆，留存项目结构、技术栈、使用偏好、历史关键内容。
- 必装理由：解决AI失忆问题，长期项目对话无缝衔接，大幅提升协作效率。
- 项目地址：
https://github.com/anthropics/claude-mem

### 9. Figma MCP（设计转代码）
- 作用：读取Figma设计稿、解析组件样式与布局，快速生成前端代码。
- 必装理由：前端开发神器，打通设计到代码流程，降低UI还原成本。
- 项目地址：
https://github.com/glips/figma-context-mcp

### 10. Sequential Thinking MCP
- 作用：强制AI分步思考、拆解复杂问题、链式推理，有效减少幻觉。
- 必装理由：架构设计、算法开发、故障排查等复杂场景必备，逻辑更严谨。
- 项目地址：
https://github.com/modelcontextprotocol/servers/tree/main/sequential-thinking

更多
https://ai.codefather.cn/mcp


### 其他

一个中文敏感词/违禁词检测 MCP
支持小红书、抖音、快手、B站专属词库
https://github.com/CCCpan/chinese-sensitive-words-mcp



## 二、完整MCP配置文件
适配 Cursor、Claude 桌面端、TRAE 等客户端，直接写入 mcp.json 即可使用。
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "你的gh token"
      }
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "context7-mcp"],
      "env": {}
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"],
      "env": {}
    },
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "你的key"
      }
    },
    "tavily": {
      "command": "npx",
      "args": ["-y", "tavily-mcp"],
      "env": {
        "TAVILY_API_KEY": "你的key"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://USER:PASSWORD@localhost:5432/db"
      }
    },
    "memory-bank": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-memory-bank"],
      "env": {}
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "figma-mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "你的key"
      }
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "env": {}
    }
  }
}
