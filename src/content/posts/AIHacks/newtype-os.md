---
title: Newtype工作流
published: 2026-03-30
tags:
  - Agent
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_1zejbk1zejbk1zej.webp
---
你有没有过这样的经历：

想写一篇深度文章，但光是调研就花了一整天？

网上资料查了一堆，结果自己先搞乱了？

写完之后自己都不想看第二遍，更别说发出来了？

我一直觉得，AI 时代最缺的已经不是「能帮你写东西的工具」了，而是**一套完整的工作流**。

直到我发现了 **newtype-os**。内核是一套 **8 Agent 多层编排系统**，配备专业 Skills 和记忆系统，专为内容生产场景打造。

**项目地址**：
https://github.com/newtype-01/newtype-os/blob/main/README.zh-cn.md

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_1zejbk1zejbk1zej.webp)

你可以把它理解为：**一个驻扎在终端里的内容团队**。主编（Chief）负责与你对话、拆解需求；副主编（Deputy）调度执行；6 位专家各司其职——调研、核查、检索、提取、撰写、编辑。

```
你 ↔ Chief（主编）—— 思考伙伴 + 任务协调
              ↓
          Deputy（副主编）—— 执行调度
              ↓
    ┌─────────┼─────────┐
    ↓         ↓         ↓
 外部情报    内部知识    内容生产
    │         │         │
    ├─ Researcher（研究员）—— 外部调研、趋势发现
    ├─ Fact-Checker（核查员）—— 事实验证、来源评估
    │
    ├─ Archivist（档案员）—— 知识库检索、语义关联
    ├─ Extractor（提取员）—— PDF/网页/图片 → Markdown
    │
    ├─ Writer（撰稿人）—— 素材 → 结构化初稿
    └─ Editor（编辑）—— 润色、逻辑加固、风格统一
```



## 01. 快速上手

### 安装

```bash
npm install -g @newtype-os/cli
```

安装完后先启动，初始化配置：

```bash
nt         # 启动后直接说话
nt init    # 初始化配置，注入技能到其他 AI 工具
```

### 配置 Agent 模型

```
C:\Users\Administrator\.config\newtype\newtype-profile.json
```

### Agent 团队

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260821233713432.webp)

### 内置 Skills 与 MCP 服务器

Agent 在执行任务时会自动加载对应的 Skill 框架：

| Skill                  | 命令                    | 说明                                                          |
| ---------------------- | --------------------- | ----------------------------------------------------------- |
| **Super Workflow**     | `/super-workflow`     | 端到端内容生产工作流纪律，含强制质量门控：定标准 → 选题 → 大纲 → 写作 → 审稿 → 诊断 → 终检 → 交付 |
| **Super Analyst**      | `/super-analyst`      | 12 种分析框架（SWOT、波特五力、第一性原理等）                                  |
| **Super Writer**       | `/super-writer`       | 6 种写作方法论（W.R.I.T.E、AIDA、叙事等）                                |
| **Super Fact-Checker** | `/super-fact-checker` | 系统化事实核查 + 来源可信度评估                                           |
| **Super Editor**       | `/super-editor`       | 四层编辑：结构 → 段落 → 句子 → 用词                                      |
| **Super Interviewer**  | `/super-interviewer`  | 深度对话技巧，用于需求挖掘和头脑风暴                                          |
| **Super Obsidian**     | `/super-obsidian`     | Obsidian CLI 优先的笔记库操作：搜索、阅读、创建与管理笔记                         |
| **MCP 集成**             | -                     | 内置微信桥接（WeClaw）、知识图谱、外部 API 等 MCP 服务器                        |

### CLI 命令

除了 TUI 交互界面，newtype 还提供一组面向命令行和 AI Agent 调用的专业命令（均支持 `--json` 输出）：

| 命令                          | 调度的 Agent                       | 说明                                             |
| --------------------------- | ------------------------------- | ---------------------------------------------- |
| `nt research [topic]`       | Researcher + Fact-Checker       | 深度调研 + 来源验证                                    |
| `nt write [topic]`          | Writer                          | 多风格内容生成                                        |
| `nt edit [file]`            | Editor                          | 四层内容精修                                         |
| `nt fact-check [topic]`     | Fact-Checker                    | 事实核查与交叉验证                                      |
| `nt analyze [topic]`        | Deputy + Researcher + Archivist | 基于框架的结构化分析                                     |
| `nt extract`                | Extractor                       | 从文件/URL/图片提取内容                                 |
| `nt archive <action>`       | Archivist                       | 知识库存取与语义搜索                                     |
| `nt pipeline [topic]`       | 全流程编排                           | Research → Analyze → Write → Fact-check → Edit |
| `nt session list`           | -                               | 列出所有会话记录                                       |
| `nt session read [id]`      | -                               | 读取指定会话内容                                       |
| `nt session search [query]` | -                               | 跨会话全文搜索                                        |
| `nt skill list`             | -                               | 查看已安装的技能列表                                     |
| `nt skill install [name]`   | -                               | 安装新技能                                          |
| `nt config`                 | -                               | 查看/编辑配置                                        |
| `nt doctor`                 | -                               | 环境诊断与健康检查                                      |
| `nt update`                 | -                               | 检查并更新版本                                        |


### 交互命令

| 命令              | 说明                             |
| --------------- | ------------------------------ |
| `/connect`      | 连接模型供应商                        |
| `/agent-models` | Agent 模型分配                     |
| `/init-deep`    | AI 读取仓库所有文章，创建知识文档             |
| `/init-soul`    | 创建定义 Chief 性格（表人格）的 soul.md 文档 |
| `/wiki`         | 知识库自动化编译                       |
| `/clear`        | 清空当前会话上下文                      |
| `/compact`      | 压缩会话历史，节省 token                |
| `/model [name]` | 切换当前使用的模型                      |
| `/export`       | 导出当前会话为 Markdown               |

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260330163220785.webp)

## 02. 设计原理与技能

### 记忆系统

newtype 内置三层记忆架构，让 Agent 团队拥有跨会话的长期记忆：

| 层级 | 说明 | 用途 |
|------|------|------|
| **Memory** | 会话记忆摘要 | 记录每次对话的关键决策和待办 |
| **Archive** | 用户主动存档 | 重要内容手动归档，支持语义搜索 |
| **Knowledge** | 项目知识库 | 自动编译项目文档，形成结构化知识 |

Chief 可以通过 Archivist 检索任意层级的记忆，实现"还记得上次我们讨论过..."这样的连续对话。

### 深度分析模式（Analyze Mode）

当 Chief 遇到需要深度分析的任务时，会自动进入 Analyze Mode，工作流程如下：

```
你提出问题
    ↓
Chief 判断需要深度分析
    ↓
chief_task(subagent_type="deputy", prompt="Analyze: [topic]")
    ↓
Deputy 调度多个 Agent 并行工作：
    ├─ Researcher —— 搜集代码模式、实现方案
    └─ Archivist —— 检索知识库、外部文档
    ↓
Chief 综合所有发现，给出结论
```

**关键参数说明：**

| 参数 | 说明 |
|------|------|
| `subagent_type="deputy"` | 委派给副主编调度 |
| `run_in_background=false` | 同步等待结果，阻塞对话 |
| `run_in_background=true` | 异步执行，不阻塞对话（适合耗时调研） |
| `skills=["super-analyst"]` | 加载特定技能框架辅助分析 |

**Chief 的直连工具：**

除了委派 Agent，Chief 还可以直接使用：
- `grep` —— 文件内容搜索
- `lsp_*` —— 代码智能（跳转定义、查找引用、类型解析）
- `read` / `glob` —— 文件读取与模式匹配

这些工具用于快速定位问题，不需要走完整的委派链路。

同时项目深度集成多款 MCP 实用工具，核心亮点是打通微信生态，复用此前拆解的 WeClaw 项目能力，支持移动端远程操控、随时发指令。

全程只需和 Chief 主编用自然语言提需求，无需手动操作、不用分步对接，系统会自动串联所有 Agent 分工协作，一站式完成从调研、取材、撰稿到精修的全流程创作。

## 03. 使用场景案例

### 场景 1：写一篇深度文章

```
> 我想写一篇关于 AI Agent 架构趋势的文章

Chief：好的，我帮你调研一下最新的动态...
[自动调用 Researcher 调研]
[自动调用 Fact-Checker 验证]
[自动调用 Writer 写作]
[自动调用 Editor 润色]

完成！生成了完整的文章草稿
```

一条命令，从调研到成稿，全部搞定。

### 场景 2：快速查资料

```
> 帮我查一下 MCP 协议最近有什么新动态

Chief：[调用 Researcher 搜索] [调用 Fact-Checker 验证]
找到了 3 篇最新文章，主要内容是...
```

### 场景 3：管理知识库

```
> 之前我写的关于 xxx 的笔记在哪？

Chief：[调用 Archivist 搜索你的 Obsidian 笔记]
找到了，在 xx 文件里，需要我调取出来吗？
```

### 场景 4：提取网页内容

```
> 把这个 PDF 的内容提取出来

Chief：[调用 Extractor]
已提取完成，保存在 xxx.md
```

### 场景 5：桥接个人微信

newtype CLI 内置了 [WeClaw](https://github.com/fastclaw-ai/weclaw) 集成，通过 [ACP（Agent Client Protocol）](https://github.com/nicepkg/acp) 将你的微信与完整 Agent 团队打通。在微信里给自己发一条消息，Chief 就会接手处理——调研、写作、核查，全部在微信完成。

| 命令 | 说明 |
|------|------|
| `nt wechat setup` | 下载 WeClaw 二进制文件 + 扫码绑定微信 |
| `nt wechat start` | 启动微信 Agent 桥接（启动前自动检测更新） |
| `nt wechat stop` | 停止微信 Agent 桥接 |
| `nt wechat status` | 查看已安装版本和运行状态 |

快速开始：

```bash
nt wechat setup    # 首次：下载 + 扫码登录
nt wechat start    # 启动桥接守护进程
```

桥接进程在后台运行。微信消息通过 newtype 的 ACP 服务器路由，使用你配置的模型调度 Chief 处理。微信端无需 API Key——使用的是微信官方 [iLink API](https://ilinkai.weixin.qq.com/)。

> PS. 配置文件里，第一行 `default_agent` 设置为 `newtype` 就会加载它技能的工作流：
> `C:\Users\Administrator\.weclaw\config.json`

---

用了一段时间，最大的感受是：**终于可以把「创作」这件事，真正变成一件只需要动嘴不动手的事。**

以前写一篇文章，要自己查资料、自己整理、自己写、自己改，来来回回折腾好几遍。现在只需要告诉 Chief 要写什么，它会把后面的事情全部安排好。

当然，它不是完美的。生成的内容还是需要自己过一遍，核心观点还是需要自己把控。但至少，**那些繁琐的体力活，有人帮你干了。**
