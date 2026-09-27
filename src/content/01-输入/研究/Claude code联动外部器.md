---
title: Claude Code 联动外部服务调研
date: 2026-05-26
tags: [Claude Code, MCP, 工具集成, AI开发工具]
summary: Claude Code 通过 MCP/CLI/API 等方式可连接的外部服务全景图，含各服务实现工具链接
---

## 核心机制

Claude Code 连接外部服务主要通过 **MCP（Model Context Protocol）**、**CLI 工具**、**API** 等方式。MCP 是一个开放标准，让 Claude Code 能直接读写外部系统。

### 三种传输方式

| 方式 | 适用场景 | 示例 |
|------|---------|------|
| **Remote HTTP** | 云端服务（推荐） | `claude mcp add --transport http slack https://mcp.slack.com/mcp` |
| **Remote SSE** | 旧版云端服务（逐步废弃） | `claude mcp add --transport sse asana https://mcp.asana.com/sse` |
| **Local stdio** | 需要本地系统访问 | `claude mcp add --transport stdio --env API_KEY=xxx myservice -- npx -y some-mcp-server` |

### 管理命令

```bash
claude mcp list          # 列出所有已配置服务
claude mcp get <name>    # 查看某个服务详情
claude mcp remove <name> # 移除服务
/mcp                     # 在 Claude Code 内检查连接状态
claude mcp add-from-claude-desktop  # 从 Claude Desktop 导入
```

---

## 笔记与知识管理

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **飞书/Lark** | `larksuite/cli` | https://github.com/larksuite/cli |
| **Notion** | `makenotion/notion-mcp-server` | https://github.com/makenotion/notion-mcp-server |
| **Obsidian** | `cyanheads/obsidian-mcp-server` | https://github.com/cyanheads/obsidian-mcp-server |
| **Apple Notes** | `taylorarndt/apple-notes-mcp` | https://github.com/taylorarndt/apple-notes-mcp |
| **Readwise** | `readwiseio/readwise-skills` | https://github.com/readwiseio/readwise-skills |
| **NotebookLM** | `teng-lin/notebooklm-py` | https://github.com/teng-lin/notebooklm-py |
| **微信读书** | `aixiasang/weread-mcp` | https://github.com/aixiasang/weread-mcp |
| **Memory/Knowledge Graph** | `@modelcontextprotocol/server-memory` | https://github.com/modelcontextprotocol/servers |

---

## 项目管理

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **GitHub** | `github/github-mcp-server` | https://github.com/github/github-mcp-server |
| **GitLab** | GitLab 官方 MCP | https://docs.gitlab.com/ee/user/group/integrations/mcp.html |
| **Linear** | `jerhadf/linear-mcp-server` | https://github.com/jerhadf/linear-mcp-server |
| **Jira** | `cfdude/mcp-jira` | https://github.com/cfdude/mcp-jira |
| **Asana** | `BlZvi/asana-mcp-server` | https://github.com/BlZvi/asana-mcp-server |
| **Trello** | `m0xai/trello-mcp-server` | https://github.com/m0xai/trello-mcp-server |
| **Shortcut** | `trycake/mcp-shortcut` | https://github.com/trycake/mcp-shortcut |
| **滴答清单 (TickTick)** | `alexarevalo9/ticktick-mcp-server` | https://github.com/alexarevalo9/ticktick-mcp-server |

---

## 通讯与协作

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **Slack** | `korotovsky/slack-mcp-server` | https://github.com/korotovsky/slack-mcp-server |
| **Discord** | `v-3/discordmcp` | https://github.com/v-3/discordmcp |
| **Telegram** | `chigwell/telegram-mcp` | https://github.com/chigwell/telegram-mcp |
| **Microsoft Teams** | `m0nkmaster/msteams-mcp` | https://github.com/m0nkmaster/msteams-mcp |
| **Gmail** | `GongRzhe/Gmail-MCP-Server` | https://github.com/GongRzhe/Gmail-MCP-Server |

---

## 云存储与文件

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **Google Drive** | `@modelcontextprotocol/server-google-drive` | https://github.com/modelcontextprotocol/servers |
| **Google Sheets** | `mkummer225/google-sheets-mcp` | https://github.com/mkummer225/google-sheets-mcp |
| **Dropbox** | `ngs/dropbox-mcp-server` | https://github.com/ngs/dropbox-mcp-server |
| **AWS S3** | `awslabs/mcp` | https://github.com/awslabs/mcp |
| **Cloudflare R2** | `GutMutCode/mcp-server-cloudflare` | https://github.com/GutMutCode/mcp-server-cloudflare |
| **Filesystem** | `@modelcontextprotocol/server-filesystem` | https://github.com/modelcontextprotocol/servers |

---

## 数据库

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **PostgreSQL** | `@modelcontextprotocol/server-postgres` | https://github.com/modelcontextprotocol/servers |
| **MySQL** | `designcomputer/mysql_mcp_server` | https://github.com/designcomputer/mysql_mcp_server |
| **SQLite** | `@modelcontextprotocol/server-sqlite` | https://github.com/modelcontextprotocol/servers |
| **Airtable** | `domdomegg/airtable-mcp-server` | https://github.com/domdomegg/airtable-mcp-server |
| **Supabase** | `alexander-zuev/supabase-mcp-server` | https://github.com/alexander-zuev/supabase-mcp-server |
| **Redis** | `redis/mcp-redis` | https://github.com/redis/mcp-redis |
| **MongoDB** | `mongodb-js/mongodb-mcp-server` | https://github.com/mongodb-js/mongodb-mcp-server |

---

## 浏览器自动化

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **Playwright** | `microsoft/playwright-mcp` | https://github.com/microsoft/playwright-mcp |
| **Puppeteer** | `@modelcontextprotocol/server-puppeteer` | https://github.com/modelcontextprotocol/servers |
| **Browserbase** | `browserbase/mcp-server-browserbase` | https://github.com/browserbase/mcp-server-browserbase |

---

## 搜索与网页

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **Brave Search** | `brave/brave-search-mcp-server` | https://github.com/brave/brave-search-mcp-server |
| **Fetch** | `@modelcontextprotocol/server-fetch` | https://github.com/modelcontextprotocol/servers |
| **Google Search** | `gradusnikov/google-search-mcp-server` | https://github.com/gradusnikov/google-search-mcp-server |
| **Firecrawl** | `firecrawl/firecrawl-mcp-server` | https://github.com/firecrawl/firecrawl-mcp-server |

---

## 开发者工具

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **Sentry** | `@modelcontextprotocol/server-sentry` | https://github.com/modelcontextprotocol/servers |
| **Docker** | `QuantGeekDev/docker-mcp` | https://github.com/QuantGeekDev/docker-mcp |
| **Terraform** | `hashicorp/terraform-mcp-server` | https://github.com/hashicorp/terraform-mcp-server |

---

## 云平台

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **AWS** | `awslabs/mcp` | https://github.com/awslabs/mcp |
| **Cloudflare** | `GutMutCode/mcp-server-cloudflare` | https://github.com/GutMutCode/mcp-server-cloudflare |
| **Azure** | `Azure/azure-mcp` | https://github.com/Azure/azure-mcp |
| **GCP** | `modelcontextprotocol/servers` | https://github.com/modelcontextprotocol/servers |
| **Kubernetes** | `strowk/mcp-k8s` | https://github.com/strowk/mcp-k8s |
| **Pulumi** | ` pulumi/mcp-server` | https://github.com/pulumi/mcp-server |

---

## 设计与媒体

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **Figma** | `grab/cursor-talk-to-figma-mcp` | https://github.com/grab/cursor-talk-to-figma-mcp |
| **Spotify** | `marcelmarais/spotify-mcp-server` | https://github.com/marcelmarais/spotify-mcp-server |
| **YouTube** | `mourad-ghafiri/youtube-mcp-server` | https://github.com/mourad-ghafiri/youtube-mcp-server |
| **Bilibili** | `huccihuang/bilibili-mcp-server` | https://github.com/huccihuang/bilibili-mcp-server |
| **Blender** | `ahujasid/blender-mcp` | https://github.com/ahujasid/blender-mcp |
| **ComfyUI** | `joenorton/comfyui-mcp-server` | https://github.com/joenorton/comfyui-mcp-server |

---

## 社交媒体

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **X/Twitter** | `Astra-97/twitter-mcp` | https://github.com/Astra-97/twitter-mcp |

---

## 金融与支付

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **Stripe** | `digitalcube/advanced-stripe-mcp-server` | https://github.com/digitalcube/advanced-stripe-mcp-server |
| **Plaid** | `304techmaven/plaid-mcp-server` | https://github.com/304techmaven/plaid-mcp-server |
| **CoinGecko** | `CharlesCreativeContent/CoinGecko-Thesys-MCP` | https://github.com/CharlesCreativeContent/CoinGecko-Thesys-MCP |

---

## 学术研究

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **PubMed** | `cyanheads/pubmed-mcp-server` | https://github.com/cyanheads/pubmed-mcp-server |
| **ArXiv** | `blazickjp/arxiv-mcp-server` | https://github.com/blazickjp/arxiv-mcp-server |
| **Semantic Scholar** | `ZidongS/Semantic-Scholar-MCP-Server` | https://github.com/ZidongS/Semantic-Scholar-MCP-Server |

---

## 监控与可观测性

| 服务 | 实现工具 | GitHub / 官方链接 |
|------|---------|------------------|
| **Grafana** | `DrDroidLab/grafana-mcp-server` | https://github.com/DrDroidLab/grafana-mcp-server |
| **PagerDuty** | `modelcontextprotocol/servers` | https://github.com/modelcontextprotocol/servers |
| **Statsig** | Statsig 官方 MCP | https://docs.statsig.com/integrations/mcp |

---

## 聚合器（一次接入大量服务）

| 服务 | 说明 | 链接 |
|------|------|------|
| **Pipedream** | 2,500+ API，8,000+ 预置工具，托管 MCP | https://mcp.pipedream.com |
| **MetaMCP** | MCP 聚合器，一个 Docker 容器管理多个 MCP | https://github.com/metatool-ai/metamcp |
| **WayStation** | 连接 MCP 到 Notion、Slack、Monday 等 | https://waystation.ai |

---

## 参考资源

- MCP 官方文档：https://code.claude.com/docs/en/mcp.md
- 官方审核目录：https://claude.ai/directory
- 社区维护列表：https://github.com/punkpeye/awesome-mcp-servers
- MCP 协议规范：https://modelcontextprotocol.io/introduction
