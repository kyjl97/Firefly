---
Source: "https://www.cnblogs.com/itech/p/20133869"
created: 2026/05/28
tags:
  - "Clipings"
---
2025 年 9 月，Anthropic 工程团队发表了一篇题为《Effective Context Engineering for AI Agents》的文章，里面有一段话信息量巨大：

> Claude Code is an agent that employs this hybrid model: CLAUDE.md files are naively dropped into context up front, while primitives like **glob and grep allow it to navigate its environment and retrieve files just-in-time, effectively bypassing the issues of stale indexing and complex syntax trees.**

翻译一下：Claude Code 不用 RAG（检索增强生成），用的是 grep 和 glob。RAG 的那些问题——向量索引过时、语法树解析复杂、embedding 信息压缩损失——在代码搜索场景下，通通被绕过了。

这个设计选择不是拍脑袋做的，而是 Anthropic 在反复验证后得出的结论。今天我们就来拆解"Grep Over RAG"这个设计哲学，同时结合 Claude Code 在大型代码库中的最佳实践，看看 Anthropic 是怎么让一个 AI Agent 在几十万行代码里高效工作的。

## 本文提纲

1. RAG 在代码搜索场景下的五个致命问题
2. Grep Over RAG：为什么"土办法"反而更好用
3. Claude Code 的混合检索架构
4. Context Window：比 RAG 更根本的资源约束
5. 大型代码库实战：70 万行 C# 项目的 Onboarding 案例
6. Claude Code 最佳实践清单
7. 什么时候该用 RAG，什么时候该用 Grep

## RAG 在代码搜索场景下的五个致命问题

RAG 在文档问答场景下确实好用——把维基百科切成 chunk，灌进向量数据库，查询时用 embedding 做语义检索。但放到代码搜索场景，问题就来了：

**1\. 索引永远追不上代码变化**

代码库是活的。你今天建好索引，明天有人 merge 了 PR，索引就过期了。对于大型项目，重新索引一次可能要几十分钟甚至几个小时。Claude Code 用 grep 搜文件，搜到的是什么就是什么，永远是实时的。

**2\. 语法树解析成本高**

代码不是自然语言。Python 的缩进、Rust 的生命周期标注、C++ 的模板元编程——要正确理解这些，得跑完整的语法分析器。而 RAG 系统的 chunk 切分往往只是按行数或 token 数粗暴切割，把一个函数切成两半是常有的事。

**3\. Embedding 压缩丢信息**

把 `validateUserSession(token, refreshToken)` 这行代码压缩成一个 1536 维的向量，和把"用户登录验证"这段话压缩成同一个维度的向量，信息密度完全不同。代码的语义更精确、更结构化，embedding 的信息损失也更严重。

**4\. 语义相似 ≠ 代码相关**

RAG 的核心假设是"语义相近的文本更有可能是答案"。但代码里， `user_id` 在 auth 模块和 logging 模块里语义完全一样，作用完全不同。grep 直接搜字符串，精准匹配，没有这种歧义。

**5\. 流水线复杂度**

RAG 需要一套完整的流水线：代码解析 → chunk 切分 → embedding 生成 → 向量存储 → 查询 → 结果排序。每个环节都可能出问题，维护成本不低。grep 呢？一行命令搞定。

## Grep Over RAG：为什么"土办法"反而更好用

Anthropic 的核心洞察其实很简单： **开发者怎么探索代码库，就让 AI 怎么探索。**

你接手一个新项目，会怎么做？大概率是：

1. 看目录结构（ `ls` 、 `tree` ）
2. 找入口文件（ `grep "main"` 、 `grep "def app"` ）
3. 追踪调用链（ `grep "function_name"` ）
4. 读关键文件理解逻辑

Claude Code 做的事一模一样。它有五个工具类别：

| 类别 | 能做什么 |
| --- | --- |
| 文件操作 | 读取、编辑、创建、重命名文件 |
| 搜索 | 按模式找文件、用正则搜内容、探索代码库 |
| 执行 | 跑 shell 命令、启动服务、运行测试、用 git |
| 网络 | 搜索 web、获取文档、查错误信息 |
| 代码智能 | 类型检查、跳转定义、查找引用 |

Grep/glob 只是"搜索"类别里的基础工具，但它们配合其他工具，形成了一个非常高效的探索循环：

```perl
glob "*.py" → 找到所有 Python 文件
grep "def authenticate" → 找到认证函数所在文件
read auth.py → 读取文件内容
grep "authenticate" → 找到所有调用点
bash "pytest tests/test_auth.py" → 跑测试验证
```

这种做法的优势在于：

- **始终最新** ：直接读文件系统，不存在索引延迟
- **渐进式发现** ：Agent 按需获取信息，不会被无关内容淹没
- **元数据丰富** ：文件名、目录结构、时间戳本身就是有价值的上下文
- **精准匹配** ：正则表达式返回的正好就是代码里存在的
- **零预处理** ：不需要 embedding 流水线、不需要向量数据库
- **可组合** ：grep + read + bash 可以组合出任意复杂的查询

## Claude Code 的混合检索架构

说 Claude Code 完全不用"预加载"，也不准确。它用的是 **混合策略** ：

**MERMAID\_BLOCK\_0**

**静态上下文** （启动时加载）：  
\- **CLAUDE.md** ：项目约定、代码风格、工作流规则，每次会话都加载  
\- **Auto Memory** ：Claude 自动保存的项目模式和你的偏好，前 200 行或 25KB 自动加载  
\- **Skills** ：按需加载的领域知识（描述在启动时加载，完整内容用到时才加载）  
\- **System Instructions** ：系统级指令

**动态检索** （按需获取）：  
\- **Glob/Grep** ：实时搜索文件系统，绕过 RAG 的所有问题  
\- **Read** ：读取特定文件，精确控制 token 消耗  
\- **Bash** ：可以跑任何命令行工具

**隔离层** ：  
\- **Subagents** ：在独立的 context window 里做深度研究，只返回摘要  
\- **Compaction** ：context 快满时自动摘要，保留关键信息

这个架构的精髓在于： **静态信息一次性加载，动态信息按需获取，大量研究工作隔离到子 Agent 里。**

## Context Window：比 RAG 更根本的资源约束

Anthropic 反复强调一个观点： **Context Window 是 AI Agent 最核心的资源，比任何检索技术都重要。**

为什么？因为 LLM 有一个特性叫"context rot"——随着 context 增长，模型的回忆准确率会下降。这不是某个模型的问题，而是 Transformer 架构的注意力机制决定的：n 个 token 之间有 n² 的注意力关系，context 越大，每个 token 分到的"注意力预算"越少。

所以，RAG 要解决的核心问题其实不是"怎么找到相关信息"，而是"怎么只把必要的信息放进 context"。在这个意义上，grep 比 RAG 更高效：它只返回你搜索的内容，不会带回一堆语义相近但实际无关的干扰项。

Claude Code 管理 context 的几个关键机制：

**1\. Compaction（压缩）**

当 context 接近上限时，Claude Code 自动触发压缩：把消息历史交给模型做摘要，保留架构决策、未解决的 bug、实现细节，丢掉冗余的工具输出。同时保留最近访问的 5 个文件。

**2\. 结构化笔记**

Agent 可以把进度写到外部的笔记文件里（如 TODO 列表、NOTES.md），这些文件不属于 context，但下次需要时可以重新读取。Anthropic 甚至举了 Claude 玩 Pokemon 的例子——Agent 把游戏进度写到外部文件，解决了长程任务的 context 耗尽问题。

**3\. Subagents（子 Agent）**

这是最强大的 context 管理工具。子 Agent 在完全独立的 context window 里工作，研究完代码后只返回 1000-2000 token 的摘要。主 Agent 的 context 保持干净。

```
# 用子 Agent 调研，不污染主 context
> use subagents to investigate the authentication flow in src/auth/
```

## 大型代码库实战：70 万行 C# 项目的 Onboarding 案例

理论说完了，看个真实案例。

Brendan MacLean 是华盛顿大学 MacCoss Lab 的首席开发者，维护着一个叫 Skyline 的蛋白质分析软件。这个项目从 2008 年开始开发，C# 代码超过 70 万行，每晚自动运行 20 万+测试。

Brendan 发现了一个有意思的事： **给 Claude Code Onboarding 的方法，跟给新员工 Onboarding 的方法一模一样。**

他的做法分三步：

**第一步：建立上下文仓库**

Brendan 把所有 AI 上下文放在一个独立的 `pwiz-ai` 仓库里，和代码库分开。为什么分开？因为上下文增长速度和代码不一样，而且要跨分支、跨时间点使用。

根目录的 CLAUDE.md 负责"地形介绍"——项目结构、环境配置、关键入口。不是把所有知识塞进去，而是给 Claude 指路。

**第二步：构建 Skills 库**

Skills 是 Claude Code 的领域知识扩展机制。Brendan 最常用的几个：

- **skyline-development** ：项目整体定位和文档索引
- **version-control** ：项目特定的 commit 和 PR 规范
- **debugging** ：最有意思的一个——强制 Claude 做"根因分析"而不是"猜了再测"

这个 debugging skill 的描述写着："ALWAYS load when investigating bugs, failures, or unexpected behavior." 自动触发条件确保 Claude 遇到 bug 时一定会加载这个 skill。

**第三步：MCP 集成**

MCP（Model Context Protocol）让 Claude 能直接访问外部数据源。Brendan 让 Claude 写了一个 MCP server，能拉取 Skyline 的夜间测试报告、异常日志、支持工单，每天早上自动生成摘要邮件。

结果呢？

- 一个搁置了一年的 Files View 面板功能，两周完成
- 一个三年没敢动的测试管理模块，不到一天加上了想要多年的新功能
- 2000+ 张教程截图的自动化截图复现，几乎 100% 可复现
- 实验室里之前对 AI 编码工具持怀疑态度的开发者，用 Claude Code 独立构建并发布了新的可视化组件

Brendan 的总结很有意思："What seemed like a major concern — 'Claude can't truly learn about my large project' — grows ever clearer: context is just another artifact to maintain and grow."（"Claude 没法学会我的大项目"这个担忧越来越清晰了——context 只不过是另一个需要维护和迭代的项目产物。）

## Claude Code 最佳实践清单

结合 Anthropic 官方文档和实际案例，总结一份在大型代码库中使用 Claude Code 的最佳实践：

### 环境配置

**1\. 写好 CLAUDE.md，但别写太长**

CLAUDE.md 是每次会话自动加载的持久上下文。好的 CLAUDE.md 应该：  
\- 包含 Claude 猜不到的 bash 命令  
\- 包含和默认不同的代码风格规则  
\- 包含测试说明和推荐的测试工具  
\- 包含仓库规范（分支命名、PR 约定）  
\- 包含开发环境的特殊配置

| ✅ 放进去 | ❌ 别放 |
| --- | --- |
| Claude 猜不到的 bash 命令 | Claude 能从代码推断的内容 |
| 和默认不同的代码风格 | 标准语言惯例 |
| 测试指令和推荐的测试工具 | 详细 API 文档（链接代替） |
| 仓库规范 | 经常变化的信息 |

**如果 CLAUDE.md 太长，Claude 会忽略一半内容。** 定期修剪，只保留真正影响行为的规则。

**2\. 配好权限，减少打断**

三种方式降低权限确认的频率：  
\- **Auto mode** ：用分类器模型自动判断命令安全性  
\- **Permission allowlists** ：白名单信任的命令（如 `npm test` 、 `git status` ）  
\- **Sandboxing** ：操作系统级隔离

### 工作流

**3\. 先探索，再计划，再编码**

```sql
Explore（Plan Mode） → Plan → Implement → Commit
```

Plan Mode 下 Claude 只读不写，适合先理解代码。不要一上来就让 Claude 写代码——先让它搞清楚问题。

**4\. 给 Claude 验证手段**

这是 Anthropic 反复强调的最高杠杆做法。没有验证标准的 Claude 会写出"看起来对但其实不对"的代码。

```perl
❌ "实现一个验证邮箱的函数"
✅ "写一个 validateEmail 函数。测试用例：user@example.com → true, invalid → false, user@.com → false。实现后跑测试。"
```

**5\. 管理 Context**

Context 是最珍贵的资源：  
\- 用 `/clear` 在不同任务之间清空 context  
\- 超过两次纠错失败， `/clear` 重新开始，带上更精确的 prompt  
\- 用子 Agent 做代码调研，避免大范围 grep/read 填满主 context  
\- 用 `/context` 查看 context 使用情况

**6\. 避免常见失败模式**

Anthropic 列了五个最常见的坑：

| 失败模式 | 解决办法 |
| --- | --- |
| 厨房水槽式会话（一个 session 塞所有事） | 任务间用 `/clear` |
| 反复纠正同一个问题 | 两次失败后 `/clear` 重新开始 |
| CLAUDE.md 过长 | 无情修剪 |
| 信任但不验证（AI 产出了看似合理的代码但不测试） | 始终提供验证手段 |
| 无限探索（让 Claude "investigate" 却不限定范围） | 限定探索范围，或用子 Agent |

### 扩展能力

**7\. 用 Skills 沉淀领域知识**

Skills 是可复用的知识模块，放在 `.claude/skills/` 目录下。当项目有特定的调试流程、部署步骤、代码规范时，写成 skill 比 CLAUDE.md 更灵活——它按需加载，不占日常 context。

**8\. 用 Hooks 做确定性操作**

CLAUDE.md 里的规则是"建议性"的，Claude 可能不遵守。Hooks 是确定性的——每次文件编辑后自动跑 lint，每次 commit 前自动检查，零例外。

**9\. 用子 Agent 做重研究**

子 Agent 是 context 管理的最强工具。它们在独立 context window 里做深度探索，只返回摘要给主会话。

## 什么时候该用 RAG，什么时候该用 Grep

说了一堆 grep 的好话，不代表 RAG 一无是处。关键看场景：

**Grep 更适合** ：  
\- 代码搜索：精确匹配是刚需  
\- 结构化数据：文件名、函数名、变量名  
\- 实时性要求高：代码随时在变  
\- Agent 循环中：需要快速迭代探索

**RAG 更适合** ：  
\- 非结构化知识库：文档、FAQ、讨论帖  
\- 语义搜索：用户不知道确切关键词  
\- 大规模静态内容：维基百科级别的知识库  
\- 跨模态检索：图文混合内容

Claude Code 的设计哲学其实是： **在能用 grep 的地方用 grep，在 grep 不够用的地方才上 RAG。** 这不是技术偏好，而是工程务实——grep 更简单、更可靠、更快，为什么要用更复杂的方案？

---

**作者**: itech001  
**来源**: 公众号：AI人工智能时代  
**网站**: https://www.theaiera.cn/  
每日分享最前沿的AI新闻资讯和技术研究。

*本文首发于 AI人工智能时代，转载请注明出处。*

公众号：AI人工智能时代。 每日AI新闻和技术博客，主页：https://www.theaiera.cn