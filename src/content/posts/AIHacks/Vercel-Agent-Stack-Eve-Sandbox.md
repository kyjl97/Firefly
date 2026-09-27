---
title: Vercel-Agent-Stack-Eve-Sandbox
published: 2026-08-05
tags:
  - ai
  - agent
  - vercel
  - workflow
  - browser
category: AIHacks
draft: false
pinned: false
image: https://github.com/user-attachments/assets/b72d9959-5bed-4b86-a40a-7fc7bfe8fe80
---

如果你经常用 AI 帮自己写文章、发推特、发邮件，那 Vercel Labs 最近在 GitHub 上悄悄开源的这两个项目，绝对值得你关注：
1. **eve 营销智能体团队模板**：项目地址为 [marketing-team-eve-template](https://github.com/vercel-labs/marketing-team-eve-template)
2. **云端浏览器工具**：项目地址为 [remote-agent-browser](https://github.com/vercel-labs/remote-agent-browser)

结合 Vercel 官方上线的 [Agent Stack (智能体技术栈)](https://vercel.com/kb/agent-stack) 介绍，这标志着 Vercel 正在把 AI 智能体（Agent）变成可以直接帮我们干活的“云端虚拟员工团队”。

我们用大白话来拆解一下这两个工具，帮你算清“账单成本”，并手把手教你如何零门槛搭建出一套属于你自己的 AI 营销部门。

![](https://github.com/user-attachments/assets/b72d9959-5bed-4b86-a40a-7fc7bfe8fe80)

---

## 一、 核心疑问：这和普通的 AI 智能体（如 Coze、Dify、GPTs）有什么区别？

很多人会疑惑：我平时用 GPTs 或者 Dify 写个工作流，不也能查资料、写文案吗？Vercel 这套东西到底有什么特别的？

我们可以用“个人小作坊”与“正规公司”的区别来理解：

### 1. 普通智能体（如 Dify、Coze）：“一个人在战斗”
普通的智能体本质上是一个“聊天窗口”的套壳。你给它堆一堆提示词，它能写文章。但如果你让它执行复杂工作（例如：写 Notion 博客 $\rightarrow$ 提炼短推特 $\rightarrow$ 配图 $\rightarrow$ 群发邮件），它很快就会**“脑载过载”**：
*   **上下文爆掉**：把所有的逻辑、API 密钥、长短文章全塞进一个 AI 脑袋里，它会迅速把格式写偏、遗忘前文。
*   **安全隐患**：你必须把 Notion 的密钥、Resend 邮件的 API Key 直接粘在代码里，一旦 AI 越轨，密钥极易泄露。
*   **无法操作真实网页**：它无法登录需要验证码的后台，也无法替你去网页上点击按钮、下载 PDF。

### 2. Vercel 的 Agent Stack：“正规公司团队”
Vercel 提供的这套技术方案，真正实现了“企业级智能体”落地：
*   **公司制多代理解耦（各司其职）**：Lead 智能体是“老板”，只分发任务；写手、社媒、邮件、SEO 是“专业员工”。每个 AI 员工都住在自己独立的云端小沙箱里，不知道其他 AI 的工具和隐私，写文案前只去读一份共享的“品牌手册”。这样 AI 脑袋很清爽，绝不会越写越乱。
*   **自带云端 Chrome 浏览器（能像人一样上网）**：普通 AI 只能抓取干瘪的网页 HTML（还经常被防爬阻拦）。Vercel 的云端浏览器直接给 AI 配了一台**带 Chrome 浏览器的云端电脑**，AI 可以自己登录账号、绕过防爬检测、点按钮、甚至把下载的文件直接回传给你。
*   **高危操作必须人类审批（安全闭环）**：你的 Notion/Resend 密钥全部托管在云端，AI 摸不到。当 AI 想要群发邮件或删除草稿时，它会在你的 Slack（飞书）里弹出一个卡片，**只有你亲手点一下“Approve (同意)”按钮，它才敢执行**。

---

## 二、 优势与原理：这套系统到底是怎么跑起来的？

### 1. 核心优势是什么？
*   **任务零污染，越干越聪明**：普通的 AI 聊久了会“变笨”（上下文污染）。Eve 框架中，每个 AI 都在完全独立的微型沙盒（Micro-Sandbox）里运行，任务完成沙盒立即销毁。每次接受指令都是“全新大脑”，绝对不受历史对话干扰。
*   **资产中心流转**：AI 团队生成的所有配图、排版、甚至网页下载的 CSV 文件，全部自动上传到云端的 Vercel Blob 中心化存储中。AI 写手写好 Notion 博客后，推特 AI 会自动去云端读出它的内容生成推特，整个过程没有文本冗余。

### 2. 底层运行原理是什么？
这套系统看似复杂，其实底层的协同逻辑非常清晰：
1.  **主管解析与分发**：当你在 Slack 里 @AI 主管 并派发一个任务，`lead` 主控智能体首先读取你存在云端的“品牌手册”和“喜好”，为任务写出一份 **Brief（任务简报）**，然后把简报丢给特定的专业 AI（比如文案写手）。
2.  **临时云沙盒启动（计算隔离）**：Vercel 的工作流引擎在云端立刻启动一个临时的 **Vercel Sandbox 实例**（云端安全计算容器）。
3.  **独立执行与资产共享**：专业 AI 在这个临时沙盒里通过绑定的 SaaS 工具干活（如读写 Notion、下载数据到沙盒临时文件、写入 Vercel Blob），并把生成的产物（如 Notion 页面链接）返回。
4.  **人类审查与沙盒销毁**：如果涉及到群发邮件等高危操作，工作流引擎自动暂停，并在你的 Slack 界面弹出 `Approve / Deny` 按钮。当你点击同意后，任务继续并完成最终提交，最后云端临时沙盒被自动销毁。

---

## 三、 AI 营销天团：用 Eve 框架把杂活全自动串联

在 Eve 营销团队模板中，多智能体的分工非常精细：

*   **团队主管 (lead)**：负责接收你的指令，写好任务需求，然后把任务派发给手下的专业 AI。
*   **文案写手 (content-marketer)**：专门写长文章，写完后直接自动同步到你的 [Notion](https://notion.so) 知识库。
*   **社媒协调员 (social-media-coordinator)**：负责把长文章精简成适合发在 X (Twitter), LinkedIn, Threads 上的短贴文，并自动排期到你的 [Typefully](https://typefully.com) 草稿箱。
*   **邮件群发员 (email)**：负责把文章改写成适合发给订阅用户的精简邮件，并自动配置好 [Resend](https://resend.com) 的邮件发送列表。
*   **SEO 优化师 (seo)**：负责帮你审计页面，生成搜索引擎最喜欢的 JSON-LD 结构化数据。

---

## 四、 给 AI 专配的云端 Chrome 浏览器

Vercel 开源的 [Remote Agent Browser](https://github.com/vercel-labs/remote-agent-browser) 运行在隔离的 [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox) 里，为 AI 提供了极强的网络爬取与操作能力：

*   **不占本地内存**：所有的浏览器操作都在云端运行，你本地的电脑不会卡顿。
*   **能记住登录状态**：你可以设定一个会话 ID，让 AI 即使换了任务，也依然处于同一个登录账号下，Cookie、页面状态全部能保留。
*   **直接传输文件**：AI 在网页上下载的数据、截图等文件，可以直接以 Buffer 字节的形式传送回你的本地。

---

## 五、 💰 账单明细：搞定这一套，到底要花多少钱？

很多人一听到“云端运行”、“Sandbox 沙箱”、“多智能体协作”就担心会产生天价账单。

**结论放在最前面：个人玩家完全可以做到「0元白嫖运行」，只有调用大模型（API Key）会产生极其低廉的按量费用（一天几分钱到几毛钱）。**

具体费用构成和免费额度对比如下：

| 服务组件 | 费用标准 | 避坑提醒 / 免费额度 |
| :--- | :--- | :--- |
| Vercel Sandbox (运行云端浏览器) | 免费 (个人 Hobby 计划) | 免费额度完全够日常零星任务。Hobby 计划超出额度只会暂停服务，**不会自动扣费**，绝对安全。 |
| Vercel Blob (存储品牌文档与图片) | 免费 (个人 Hobby 计划) | 提供 250MB 免费存储，存日常 Markdown 文本和配图绰绰有余。超出无自动扣费。 |
| Resend (群发邮件) | 免费 (Free 计划) | 允许绑定自定义域名，**每月免费发送 3000 封邮件**（每天限 100 封），超过 100 封可购买 Pro，不然只是暂停发送。 |
| Notion / Slack / Typefully | 免费 (个人基础版) | 使用个人账号配合基础的草稿、协作功能完全免费。 |
| 大模型 (LLM) API 消耗 | 按量自付 (需自备 API Key) | 费用取决于你配置什么模型。若使用 DeepSeek，单次营销分发任务的 Token 成本可能在 **几分钱** 左右。 |

---

## 六、 🏦 商业机密：既然免费，Vercel 到底靠什么赚钱？

算完账你可能会好奇：这套系统对个人玩家几乎是免费的，那 Vercel 这么大一家公司，到底靠什么赚钱？是不是有什么隐藏收费？

**一句话回答：开源的东西不赚钱（甚至倒贴），Vercel 赚的是「你用完它之后，继续留在云上花钱」的钱。**

### 1. 开源的部分：免费的“钓鱼饵”
`eve` 框架、`marketing-team-eve-template` 模板、`remote-agent-browser` 全部开源免费。它们的真实用途是**占领开发者心智**，让你把项目部署到 Vercel 自家的云平台。这就是经典的“开源获客 → 云服务变现”打法（GitLab、Supabase 都是同一套路）。

### 2. 赚钱的部分：Vercel 云平台本身
真正赚钱的是这些云服务，超过免费额度后按量计费：

| 收入来源 | 怎么赚 |
| :--- | :--- |
| 托管订阅 | Hobby 免费，但 Pro（约 $20/人/月）和企业版是主要收入：构建分钟数、带宽、Serverless 函数调用量。 |
| Sandbox 算力 | 智能体每次干活都要开云端沙盒，超过免费额度后按量收费（约 $0.128/CPU 小时、$0.0212/GB·小时）。 |
| Vercel Blob 存储 | 智能体产生的图片、文档、数据存云端，超过 250MB 免费额后按量收费。 |
| AI Gateway | 智能体调大模型走 Vercel 的网关时，Vercel 在中间当“模型批发商”，**赚差价或平台服务费**。 |
| Vercel Connect | 连接 Notion/Slack/Resend 的授权中继层，未来可做企业级抽成。 |
| 企业客户 | 私有化部署、合规、SLA 保障、专属支持——客单价最高的部分。 |

### 3. 免费额度就是“试用装”
这套商业模型的核心是：**免费额度卡得刚好够你玩，不够你用**。
1. 你看到开源模板 → 免费部署 → 觉得好用
2. 免费额度（Sandbox CPU、Blob 250MB、每月请求量）只够日常零星试用
3. 一旦你真把它当生产工具用（团队多人、高频任务、大量文件）→ 免费额度不够 → 系统提示你升级 Pro 或按量付费
4. 企业用户要求私有部署、数据合规、SLA → 直接签 Enterprise 大单

### 4. ⚠️ 一个值得留意的隐性成本
**AI Gateway 差价**：如果你用 Vercel 的 AI Gateway 调模型（模型 ID 写成 `deepseek/deepseek-chat` 这种网关格式），Vercel 会作为中间代理，定价可能比直连官方贵一点——这是他们的利润点之一。
**省钱技巧**：本文配的示例是**直连 DeepSeek 官方**（`baseURL: https://api.deepseek.com`），请求不经过 Vercel 网关，这部分差价可以直接省掉。

**总结**：Vercel 赌的是“AI Agent 会成为主流应用形态”，所以先免费送你铲子（开源框架），等你在他们的云上挖出金矿（生产级使用），再收租（托管 + 算力 + 存储 + AI 流量）。个人用户只要控制用量，完全可以长期白嫖。

---

## 七、 🚀 动手实操：3步搭建你自己的 AI 营销部门

以下是具体的搭建和运行指南。只要你准备好 GitHub 和 Vercel 账号，按照这三步走，10分钟就能跑起来：

### 第一步：一键云端部署
1.  点击进入 [Eve 营销团队模板 GitHub 仓库](https://github.com/vercel-labs/marketing-team-eve-template)。
2.  点击 README 中的 **Deploy with Vercel** 按钮。
3.  Vercel 部署向导会自动弹出。根据提示连接你的各大平台账号：
    *   **Notion**（用于同步文档与知识库，通过 Vercel Connect 授权）
    *   **Resend**（用于群发邮件，通过 Vercel Connect 授权）
    *   **Slack**（作为你和 AI 员工对话、审批的聊天软件界面）
    *   **Typefully API Key**（在你的 Typefully 账户[设置](https://typefully.com/?settings=api)里生成并填入，用于自动排期推特）  每月 15 次发布额度
4.  点击 Deploy 完成云端部署。

### 第二步：将项目同步到本地电脑
部署成功后，你需要在本地进行调试。请在终端执行以下命令：

| 命令 | 说明 |
| :--- | :--- |
| git clone https://github.com/vercel-labs/marketing-team-eve-template.git | 克隆 Vercel 营销团队模板仓库到本地 |
| cd marketing-team-eve-template | 进入项目文件夹 |
| pnpm install | 安装项目所需的依赖包（需要提前安装 Node.js 和 pnpm） |
| vercel link | 将本地代码与你刚刚在云端部署的 Vercel 项目进行绑定 |
| vercel env pull | 一键拉取云端项目的 API Key 等环境变量并生成本地 .env.local 配置文件 |

### 第三步：本地启动与对话
完成以上步骤后，你可以直接在本地终端运行 Agent 调试控制台：

| 命令 | 说明 |
| :--- | :--- |
| pnpm dev | 本地启动开发环境，开启 TUI 终端界面进行调试 |

启动后，你既可以在终端命令行中直接给 AI 主管派发任务，也可以直接在第一步中配好的 **Slack 频道**里 @AI 机器人，开始让你的 AI 营销团队干活。

---

## 八、 🎯 场景实测：给 5 位 AI 员工的测试提示词

启动控制台（`pnpm dev`）后，你可以直接复制并输入以下提示词，体验不同“虚拟员工”的分工与能力：

### 1. 品牌定位专家 (product-marketer)

**测试提示词**：
```text
基于我们目前的产品特点，帮我梳理我们的核心产品卖点（Value Propositions），确认并更新我们团队共享的品牌设定文档（Brand Context）。
```

**干活效果**：
该任务会自动分配给 `product-marketer` 智能体。它会整理出精准的受众痛点与产品卖点，并把这些信息固化到共享的品牌文档里，成为其他所有 AI 写作时的知识背景。

### 2. 文案写手 (content-marketer)

**测试提示词**：
```text
写一篇关于“AI 智能体（Agent）如何改变普通人数字工作流”的深度博客文章。大纲需要包含痛点分析与具体的自动化案例。文章撰写完毕后，自动保存到我的 Notion 数据库中。
```

**干活效果**：
任务分发给 `content-marketer`。它会在后台静默完成资料搜集、文章起草与润色，最后生成一个 Notion 链接返回给您。

### 3. 社媒协调员 (social-media-coordinator)

**测试提示词**：
```text
根据我们刚才写好的这篇 Notion 博客内容，帮我提炼 3 条适合发布在 Twitter 上的短贴文。每条贴文要包含 Hook（吸睛开头）和引导点击的 Action 话术，生成后推送到 Typefully 的草稿箱。
```

**干活效果**：
任务分发给 `social-media-coordinator`。它会自动拉取最新的 Notion 页面，分析长文，提炼短贴，并在您的 Typefully 中自动排期创建 3 篇推特草稿。

### 4. SEO 优化师 (seo)

**测试提示词**：
```text
帮我审计我们刚才生成的 Notion 博客页面，检查关键词密度、主副标题层级结构，并生成对应的 JSON-LD 结构化数据优化方案。
```

**干活效果**：
任务分发给 `seo`。它会调取网页内容进行语义级 SEO 扫描，并产出规范化的 Schema 配置代码。

### 5. 邮件群发员 (email)

**测试提示词**：
```text
把我们上一篇关于工作流的博客内容改写为一份精简的 Newsletter 邮件，适配我的 Resend 模板，并在 Resend 后台创建一个待发送的邮件群发活动（Campaign）。
```

**干活效果**：
任务分发给 `email`。它会根据邮件读者的阅读习惯把文章改写为更短的 Newsletter，在 Resend 后台建好 Campaign。**注意：因为涉及到实际发送，系统在最后一步会暂停并向您发送一个审批卡片，必须由您在终端或 Slack 中点击“同意（Approve）”才会真正发信。**

---

## 九、 💡 常见问题 (FAQ)

### Q1：可以配置我自己持有的 API Key 吗？怎么配置？
可以，而且大模型的 API Key **必须**由你自己配置。需要修改以下 3 类文件：

**① 本地环境配置文件（.env.local）**

绝对路径：
`C:\Users\Administrator\Documents\codex\2026-08-05\marketing-team-eve-template\.env.local`

在文件末尾追加对应模型的 API Key，例如 DeepSeek 官方 Key：
```bash
DEEPSEEK_API_KEY="您的官方APIKey"
```

**② 模型直连配置文件（agent/model.ts，需新建）**

绝对路径：
`C:\Users\Administrator\Documents\codex\2026-08-05\marketing-team-eve-template\agent\model.ts`

导入模型提供商依赖，并指向官方 API 接口地址：
```typescript
import { createOpenAI } from "@ai-sdk/openai";

export const deepseekModel = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
})("deepseek-chat");
```

**③ 智能体角色定义文件（agent.ts）**

主控智能体绝对路径：
`C:\Users\Administrator\Documents\codex\2026-08-05\marketing-team-eve-template\agent\agent.ts`

子智能体角色绝对路径（位于 `agent/subagents/` 子目录下的 5 个文件）：
- `C:\Users\Administrator\Documents\codex\2026-08-05\marketing-team-eve-template\agent\subagents\content-marketer\agent.ts`（文案写手）
- `C:\Users\Administrator\Documents\codex\2026-08-05\marketing-team-eve-template\agent\subagents\email\agent.ts`（邮件群发）
- `C:\Users\Administrator\Documents\codex\2026-08-05\marketing-team-eve-template\agent\subagents\product-marketer\agent.ts`（定位分析）
- `C:\Users\Administrator\Documents\codex\2026-08-05\marketing-team-eve-template\agent\subagents\seo\agent.ts`（SEO 专家）
- `C:\Users\Administrator\Documents\codex\2026-08-05\marketing-team-eve-template\agent\subagents\social-media-coordinator\agent.ts`（社媒协调）

修改这些文件，把 `model` 指向 `deepseekModel`。对于自定义或国内的第三方模型，还需要同时在配置里指明上下文窗口大小（例如：`modelContextWindowTokens: 128000`），以避免编译报错。

**云端运行**：如果项目已经部署在云端，直接登录 Vercel 控制台，在项目的 `Settings -> Environment Variables` 页面添加对应环境变量（如 `OPENAI_API_KEY` 或 `DEEPSEEK_API_KEY`）即可，无需修改任何本地代码。

### Q2：这套系统支持哪些大模型？可以用国内的 DeepSeek 吗？
支持。因为 Vercel 智能体框架底层使用了 [Vercel AI Gateway](https://vercel.com/docs/ai-gateway)，支持极其广泛的模型。你可以使用 OpenAI、Anthropic Claude，或者使用任何兼容 OpenAI 格式接口的国产模型（如 DeepSeek，推荐通过 [OpenRouter](https://openrouter.ai) 或 [SiliconFlow](https://siliconflow.cn) 的 API Key 直接接入）。
*   在运行本地命令行控制台调试时，你随时可以在交互窗口输入 `/model` 命令，即可弹出模型列表进行无缝快速切换。

### Q3：Vercel 免费额度超标了真的不会偷偷扣我信用卡的钱吗？
**绝对不会**。Vercel 个人 Hobby 账户有强制的免费超量保护机制。不管是云端浏览器 Sandbox 使用的 CPU 时间超限，还是 Vercel Blob 的存储空间占满，一旦超出免费上限，系统会直接**暂停服务**，等待下个计费周期重置。不会在后台产生扣款订单，大可放心玩耍。
