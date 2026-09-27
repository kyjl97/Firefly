# eve 飞书 AI 营销团队 · 搭建交付文档

> 在飞书里 @ 机器人，就能让一个 **14 人 AI 团队**（5 位营销专员 + 8 位内容工作室成员 + 1 位短视频脚本专家）替你干活：营销分发 + 内容生产全流程（选题 → 调研 → 写作 → 核查 → 审稿 → 排版）+ 短视频口播脚本，产出自动存入 Notion。
>
> 底层：Vercel eve 框架（开源 Agent 框架）+ DeepSeek 大模型 + 飞书机器人（国内直连域名）。

---

## 一、最终效果

```
飞书群聊 @「AI营销团队」机器人
        │  webhook（国内可达域名 bot.你的域名.com）
        ▼
Vercel 云端（eve 框架 + 飞书原生通道）
        │  事件驱动
        ▼
DeepSeek（思考/写作） → Notion（知识库/成稿）
```

- 24 小时在线待命，有任务才干活，空闲零成本
- 14 人团队自动发现注册，主管按任务性质路由到正确专家
- 高危操作（发邮件、删库）弹审批卡片，人工确认后才执行

---

## 二、团队角色全景（14 人）

### 营销组（模板自带）

| 角色                             | 职责                            |
| :----------------------------- | :---------------------------- |
| lead（主管）                       | 接收指令、写简报、路由任务，不直接产出           |
| product-marketer（品牌定位）         | 定位、卖点、维护品牌文档                  |
| content-marketer（文案写手）         | 长文撰写，产出入 Notion               |
| social-media-coordinator（社媒协调） | 短贴文，排期（原 Typefully，国内版可收敛到飞书）；**支持公众号草稿箱发布（`publish_wechat_draft`，自动转 HTML + 上传封面 → 微信官方 API 存草稿，人工确认后发布）** |
| seo（SEO 优化）                    | 页面审计、结构化数据                    |
| email（邮件群发）                    | Newsletter 改写与群发（国内版可收敛到飞书）   |

### 内容工作室组（新增，分步流水线）

| 角色                | 中文名          | 职责                         | 流水线位置 |
| :---------------- | :----------- | :------------------------- | :---- |
| style-polisher    | 刘风格 · 风格打磨师  | 维护团队文风规范（语气/措辞/禁用词），贯穿所有内容 | 贯穿全程  |
| topic-planner     | 赵选题 · 选题策划   | 找选题、定方向、产出选题方案             | ① 选题  |
| research-analyst | 张素材 · 调研专家 | 搜集素材、带来源核验、编译调研笔记；支持云端浏览器抓取动态页面（`browser_fetch`，web_fetch 打不开的 SPA/需登录页面用它） | ② 调研 |
| article-writer    | 李文章 · 写手     | 按选题+素材+风格起草长文              | ③ 写作  |
| fact-checker      | 吴查查 · 事实核查专家 | 逐条核验事实/引用/数字               | ④ 核查  |
| senior-editor     | 周审稿 · 资深主编   | 结构/逻辑/风格审稿，改稿定稿            | ⑤ 审稿  |
| layout-designer | 陈排版 · 排版设计师 | 标题层级/列表/代码块/配图占位排版；**可调用 `generate_image` 生成配图（GPT-Image-2）** | ⑥ 排版 |
| knowledge-manager | 王整理 · 知识管家   | Notion 知识库整理归档、建索引         | 归档    |

### 短视频组（独立专家）

| 角色 | 中文名 | 职责 |
| :--- | :--- | :--- |
| short-video-scriptwriter | 短视频脚本专家 | 把任意素材/文章改写成 1 分钟短视频口播逐字稿（220-260 字，四段结构：钩子+痛点 → 方法 → 原理 → 动态收尾），可直接照着录 |

### 内容生产流水线（分步协作）

```
你（飞书）→ ①赵选题 → ②张素材 → ③李文章 → ④吴查查 → ⑤周审稿 → ⑥陈排版 → 成品
                选题方案     调研笔记     草稿        核查报告     定稿        可发布格式
                └────────────── 刘风格（风格指南贯穿）──────────────┘
                └──────────────── 王整理（Notion 归档沉淀）────────────────┘
```

角色之间通过 **artifact（交付物 id）** 衔接：上一个角色的产出 id 放进下一个角色的简报，主管负责把衔接信息写清楚。定稿后可直接交给「短视频脚本专家」生成口播脚本。

---

## 三、前置准备（账号清单）

| 账号/工具 | 用途 | 是否需要付费 |
| :--- | :--- | :--- |
| GitHub 账号 | 托管模板代码 | 免费 |
| Vercel 账号（建议注册 Team） | 云端部署 | Hobby 免费版即可 |
| 飞书账号（管理员权限） | 创建机器人应用 | 免费 |
| 域名（挂在 Cloudflare） | 让飞书国内能访问你的服务 | 已有域名即可 |
| DeepSeek 开放平台账号 | 大模型 API | 充值少量（约 10 元起） |
| Node.js + pnpm | 本地开发 | 免费 |

---

## 四、完整搭建步骤

### 第 1 步：一键部署模板到 Vercel

1. 打开模板仓库：<https://github.com/vercel-labs/marketing-team-eve-template>
2. 点击 README 里的 **Deploy with Vercel** 按钮
3. 部署向导里按提示连接：
   - **Notion**（Vercel Connect 授权）
   - **Resend**（邮件）
   - **Slack**（模板默认聊天入口，本方案会被飞书替代）
   - **Typefully API Key**（从 Typefully 账户设置生成）
4. 完成部署，记下生成的 GitHub 仓库 URL

### 第 2 步：本地克隆与初始化

```bash
git clone <你的仓库URL> marketing-team-eve-template
cd marketing-team-eve-template
pnpm install
```

### 第 3 步：链接 Vercel 项目并拉取环境变量

```bash
vercel login              # 设备码授权登录
vercel link --project marketing-team-eve-template --yes
vercel env pull
```

> ⚠️ **坑**：Vercel CLI 在 git 仓库里可能只生成 `.vercel/repo.json`（git 链接模式），而 eve 部署需要 `.vercel/project.json`。手动创建：
>
> ```json
> // .vercel/project.json
> {
>   "projectId": "prj_xxxxx",
>   "orgId": "team_xxxxx"
> }
> ```
>
> 从本地 `.env.local` 里的 `VERCEL_OIDC_TOKEN`（JWT）解码 payload 可拿到 `project_id` 和 `owner_id`。

### 第 4 步：配置 DeepSeek 大模型

**4.1** 在 `.env.local` 末尾追加：

```bash
DEEPSEEK_API_KEY="sk-你的官方Key"
```

**4.2** 新建共享模型文件 `agent/model.ts`：

```typescript
import { createOpenAI } from "@ai-sdk/openai";

export const deepseekModel = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
})("deepseek-chat");
```

**4.3** 安装依赖并替换 6 个智能体的模型：

```bash
pnpm add @ai-sdk/openai
```

将以下 6 个文件中的 `model` 改为 `deepseekModel`，并加上 `modelContextWindowTokens: 128000`（绕过编译期上下文窗口校验）：

- `agent/agent.ts`（主管）
- `agent/subagents/content-marketer/agent.ts`（文案）
- `agent/subagents/email/agent.ts`（邮件）
- `agent/subagents/product-marketer/agent.ts`（品牌）
- `agent/subagents/seo/agent.ts`（SEO）
- `agent/subagents/social-media-coordinator/agent.ts`（社媒）

```typescript
import { defineAgent } from "eve";
import { deepseekModel } from "#model.js";

export default defineAgent({
  compaction: { thresholdPercent: 0.9 },
  model: deepseekModel,
  modelContextWindowTokens: 128000,
});
```

### 第 5 步：飞书开放平台创建应用

> 这一步必须在飞书开发者后台网页操作（平台不支持 API 创建应用）。

1. 打开 <https://open.feishu.cn/> → 开发者后台 → **创建企业自建应用**
2. 填写应用名称（如「AI营销团队」）、描述、图标
3. 进入应用 → **凭证与基础信息** → 记录：
   - **App ID**（形如 `cli_xxxx`）
   - **App Secret**
4. **添加应用能力** → 开通**机器人**
5. **权限管理** → 开通（重点）：
   - `im:message:send_as_bot`（发消息）
   - `im:message.p2p_msg:readonly`（单聊消息）
   - `im:message.group_at_msg:readonly`（群 @ 机器人）
6. **事件与回调** → **添加事件** → 搜索并添加 `im.message.receive_v1`（接收消息）

### 第 6 步：写飞书原生通道（核心交付代码）

> 模板默认的 Slack 通道和 `@larksuite/vercel-chat-adapter`（WebSocket-only）与 eve 的回复机制不兼容（eve 的 send 只在 webhook 上下文可用）。**正确做法是用 eve 原生 `defineChannel` 写 webhook 模式通道**。

新建 `agent/channels/lark.ts`：

```typescript
import { defineChannel, POST } from "eve/channels";

const FEISHU_BASE = "https://open.feishu.cn";
let cachedToken: { value: string; expiresAt: number } | null = null;
let cachedBotOpenId: string | null = null;

async function getTenantToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;
  const res = await fetch(`${FEISHU_BASE}/open-apis/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_id: process.env.LARK_APP_ID,
      app_secret: process.env.LARK_APP_SECRET,
    }),
  });
  const data = (await res.json()) as {
    code: number; msg: string; tenant_access_token: string; expire: number;
  };
  if (data.code !== 0) throw new Error(`获取飞书 token 失败: ${data.msg}`);
  cachedToken = { value: data.tenant_access_token, expiresAt: Date.now() + data.expire * 1000 - 60_000 };
  return cachedToken.value;
}

async function getBotOpenId(): Promise<string> {
  if (cachedBotOpenId) return cachedBotOpenId;
  const token = await getTenantToken();
  const res = await fetch(`${FEISHU_BASE}/open-apis/bot/v3/info`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = (await res.json()) as { code: number; bot: { open_id: string } };
  if (data.code !== 0) throw new Error(`获取机器人信息失败: ${data.code}`);
  cachedBotOpenId = data.bot.open_id;
  return cachedBotOpenId;
}

async function sendLarkText(chatId: string, text: string): Promise<void> {
  const token = await getTenantToken();
  const res = await fetch(
    `${FEISHU_BASE}/open-apis/im/v1/messages?receive_id_type=chat_id`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ receive_id: chatId, msg_type: "text", content: JSON.stringify({ text }) }),
    },
  );
  const data = (await res.json()) as { code: number; msg: string };
  if (data.code !== 0) console.error(`飞书发送失败 chat_id=${chatId}: ${data.msg}`);
}

interface LarkChannelState { chatId?: string; chatType?: string; }
interface LarkInbound { chatId: string; chatType: string; text: string; senderOpenId: string; }

async function parseLarkMessage(body: unknown): Promise<LarkInbound | null> {
  const raw = body as {
    header?: { event_type?: string };
    event?: {
      message?: {
        chat_id?: string; chat_type?: string; message_type?: string; content?: string;
        mentions?: Array<{ id?: { open_id?: string } }>;
      };
      sender?: { sender_id?: { open_id?: string } };
    };
  };
  if (raw.header?.event_type !== "im.message.receive_v1") return null;
  const msg = raw.event?.message;
  if (!msg?.chat_id || msg.message_type !== "text" || !msg.content) return null;
  const chatType = msg.chat_type ?? "p2p";
  let text = "";
  try { text = (JSON.parse(msg.content) as { text?: string }).text ?? ""; } catch { return null; }
  if (chatType === "group") {
    const botOpenId = await getBotOpenId();
    if (!(msg.mentions ?? []).some((m) => m.id?.open_id === botOpenId)) return null;
  }
  return {
    chatId: msg.chat_id,
    chatType,
    text: text.trim(),
    senderOpenId: raw.event?.sender?.sender_id?.open_id ?? "",
  };
}

export default defineChannel<LarkChannelState, { state: LarkChannelState }>({
  state: {},
  context(state) { return { state }; },
  routes: [
    POST("/eve/v1/lark", async (req, args) => {
      let body: unknown;
      try { body = await req.json(); } catch {
        return Response.json({ code: 1, msg: "invalid json" }, { status: 400 });
      }
      const challengeBody = body as { type?: string; challenge?: string };
      if (challengeBody.type === "url_verification" && challengeBody.challenge) {
        return Response.json({ challenge: challengeBody.challenge });
      }
      const inbound = await parseLarkMessage(body);
      if (!inbound) return Response.json({ code: 0, msg: "ignored" });
      await args.send(inbound.text, {
        continuationToken: `lark:${inbound.chatId}`,
        state: { chatId: inbound.chatId, chatType: inbound.chatType },
        auth: {
          principalId: inbound.senderOpenId,
          principalType: "user",
          authenticator: "lark",
          attributes: {},
        },
      });
      return Response.json({ code: 0, msg: "ok" });
    }),
  ],
  events: {
    "message.completed": async (data, channel) => {
      const { chatId } = channel.state;
      if (chatId && data.message) await sendLarkText(chatId, data.message);
    },
    "turn.failed": async (_data, channel) => {
      const { chatId } = channel.state;
      if (chatId) await sendLarkText(chatId, "⚠️ 任务处理失败，请稍后重试或查看日志。");
    },
  },
});
```

在 `.env.local` 追加飞书凭据：

```bash
LARK_APP_ID="cli_你的AppID"
LARK_APP_SECRET="你的AppSecret"
```

验证编译（必须 0 错误）：

```bash
pnpm run fix && pnpm validate
```

### 第 7 步：部署到 Vercel

**7.1** 配置云端环境变量（Vercel 控制台 → Settings → Environment Variables，全部加密存储）：

```bash
DEEPSEEK_API_KEY
LARK_APP_ID
LARK_APP_SECRET
```

> 也可用 CLI：`vercel env add DEEPSEEK_API_KEY production --value xxx --sensitive --yes`

**7.2** 创建 `vercel.json` 开启 Fluid Compute（消除冷启动，飞书要求 webhook 3 秒内响应）：

```json
{ "fluid": true }
```

**7.3** 部署：

```bash
vercel deploy --prod --yes
```

> ⚠️ `eve deploy` 在 Windows 上可能报 `pnpm not found`（内部 spawn 问题），直接用 `vercel deploy --prod` 即可（Vercel 云端会自行构建）。

### 第 8 步：关闭 Vercel 部署保护（必须）

Vercel 控制台 → 项目 → **Settings → Deployment Protection** → **Vercel Authentication** → **Disable**。

> 不关闭的话，飞书 webhook 请求会被 Vercel 的 SSO 拦截返回 401，消息永远进不来。

### 第 9 步：绑定国内可达域名（必须，国内访问 Vercel 被墙）

`vercel.app` 域名在中国大陆被墙，飞书服务器（国内）无法访问。**用 Cloudflare 子域名解决**：

1. **Cloudflare** → 你的域名 → DNS → 添加记录：
   - 类型 `CNAME`、名称 `bot`、目标 `cname.vercel-dns.com`、**代理开启（橙色云朵）**
2. **Vercel CLI** 绑定域名到项目：
   ```bash
   vercel domains add bot.你的域名.com marketing-team-eve-template
   ```
3. 等 1-2 分钟 Vercel 签发 TLS 证书，测试：
   ```bash
   curl --noproxy '*' https://bot.你的域名.com/eve/v1/lark
   ```
   返回 200 即成功。

### 第 10 步：飞书后台配置 webhook

1. 飞书开放平台 → 应用 → **事件与回调**
2. 订阅方式：**「将事件发送至开发者服务器」**
3. 请求地址：
   ```
   https://bot.你的域名.com/eve/v1/lark
   ```
4. 加密策略：**无**（MVP 阶段不配 Encrypt Key）
5. **保存** → 飞书会发 `url_verification` 验证，0.9 秒内响应必然通过

### 第 11 步：扩展自定义角色（14 人团队怎么来的）

eve 的角色是**目录即角色**：新建一个子目录就多一个专家，无需注册表。以「选题策划」为例：

```text
agent/subagents/<角色英文id>/
├── agent.ts            # 角色定义（description 是主管路由的依据，必须写清楚：负责什么/简报带什么/交付什么）
├── instructions.md     # 角色行为规范（身份、工作流程、协作衔接、交付物）
├── sandbox.ts          # 沙箱配置（复制现有角色即可）
├── tools/              # 工具（one-line 文件调用工厂函数）
└── connections/        # 外部连接（Notion 等，按需）
```

**快速创建**：
1. 复制现有角色的 `sandbox.ts` 和标准 `tools/`（`get_brand_context.ts`、`read_artifact.ts`、`save_artifact.ts`、资产工具等）
2. 写 `agent.ts`：`description` 用英文写清楚职责（主管只靠它路由）
3. 写 `instructions.md`：中文写行为规范
4. `pnpm validate` 验证（`eve info` 会显示 Subagents 数量增加）

**协作衔接**：角色之间通过 **artifact（交付物 id）** 流转——上一环产出 `save_artifact` 得到 id，下一环的简报带上这个 id，主管负责传递。标准 artifact 类型：`content-plan`、`research-notes`、`draft`、`seo-audit`、`positioning`、`competitive-scan`、`deliverability-audit`。

**14 人团队的流水线角色**（本交付已内置）：选题策划 → 调研专家 → 写手 → 事实核查 → 资深主编 → 排版设计师，风格打磨师贯穿，知识管家归档。

---

## 五、踩坑速查表

| 症状 | 根因 | 解决 |
| :--- | :--- | :--- |
| `eve dev` 报 `Cannot find module ...src/internal/authored-module-map-loader.ts` | eve 0.27.6 路径解析 Bug：dev 打包时把框架内部 `#*.js` 解析到项目根的 `src/`（发布包无 src） | 修补 `node_modules/eve/dist/src/internal/application/package.js` 的 `resolvePackageSourceFilePath`，源码不存在时回退到 `dist/src/`；删除 `.eve/dev-hosts/**/index.mjs` 缓存重启 |
| `eve deploy` 报 `pnpm not found` | Windows 下 eve 内部 spawn pnpm 失败 | 改用 `vercel deploy --prod --yes` |
| `eve deploy` 报 not linked | `.vercel` 只有 repo.json 没有 project.json | 手动创建 `.vercel/project.json`（projectId/orgId 从 OIDC token 解码） |
| 飞书长连接验证成功但收不到回复 | `@larksuite/vercel-chat-adapter` 是 WS-only，eve 的 `send()` 只在 webhook 上下文可用（`chatSdkChannel().send can only run during a Chat SDK webhook handler`） | **不要用 chat-sdk 适配器**，改用 eve 原生 `defineChannel` 写 webhook 通道（见第 6 步） |
| 飞书 webhook 验证 3 秒超时 | 两个原因：① Vercel 冷启动慢；② `vercel.app` 国内被墙 | ① `vercel.json` 开 `{"fluid": true}`；② 绑定 Cloudflare 子域名 |
| webhook 返回 401 Protected deployment | Vercel 部署保护拦截 | 关闭 Deployment Protection |
| `bot.你的域名.com` 返回 525 | Vercel 未绑定该域名，无 TLS 证书 | `vercel domains add bot.你的域名.com <项目名>` 等证书签发 |
| 飞书事件收到但应用显示只有 card.action.trigger | 没添加消息事件订阅 | 事件与回调 → 添加 `im.message.receive_v1`（接收消息） |
| `createLarkAdapter()` 报 `appId is required` | 独立 Node 脚本不加载 `.env.local` | 用 `node --env-file=.env.local` 或交给 eve（eve 自动加载 env） |
| `Cannot read properties of undefined (reading 'connect')` | chat SDK 缺 `state` 配置 | `pnpm add @chat-adapter/state-memory` 并配置 `state: createMemoryState()` |

---

## 六、使用指南与测试提示词

启动本地开发：`pnpm dev`（终端 TUI）；日常使用：飞书 @ 机器人。

### 营销组测试指令

| 指令（复制到飞书） | 触发哪个 AI 员工 |
| :--- | :--- |
| `基于我们目前的产品特点，帮我梳理核心卖点，更新品牌设定文档` | 品牌定位专家 |
| `写一篇关于"AI 智能体如何改变普通人数字工作流"的深度博客，存到 Notion` | 文案写手 |
| `根据刚写的 Notion 博客，提炼 3 条社媒短贴` | 社媒协调员 |
| `帮我审计这个页面，输出 SEO 优化方案和 JSON-LD 结构化数据` | SEO 优化师 |
| `把这篇博客改写为 Newsletter 草稿` | 邮件群发员 |

### 内容工作室测试指令（分步流水线）

| 步骤 | 指令（复制到飞书） | 触发角色 |
| :--- | :--- | :--- |
| ① 选题 | `帮我规划 5 个关于「AI 个人提效」的选题，适合公众号` | 赵选题 · 选题策划 |
| ② 调研 | `按刚才的选题方案（id 在回复里）做素材调研，重点找数据和案例` | 张素材 · 调研专家 |
| ③ 写作 | `根据调研笔记（id）和风格文档，写一篇 2000 字初稿` | 李文章 · 写手 |
| ④ 核查 | `逐条核查这篇文章（链接/id）的事实、引用和数字` | 吴查查 · 事实核查 |
| ⑤ 审稿 | `结合核查报告审稿并定稿这篇文章` | 周审稿 · 资深主编 |
| ⑥ 排版 | `把定稿排版成公众号可直接发布的格式` | 陈排版 · 排版设计师 |
| 归档 | `把这篇定稿归档到 Notion 知识库并建索引` | 王整理 · 知识管家 |
| 全程 | `按咱们的风格文档，把这段话改得更有人味` / `更新文风规范：避免xxx` | 刘风格 · 风格打磨师 |

### 短视频组测试指令

| 指令（复制到飞书） | 触发角色 |
| :--- | :--- |
| `把这篇 Notion 文章（链接）改写成 1 分钟短视频口播脚本，属于工具分享类，结尾引导评论扣'提示词'` | 短视频脚本专家 |
| `用下面这段内容写一条短视频脚本（内容：...），观点类，结尾要金句升华` | 短视频脚本专家 |

> 该角色会严格输出四段结构（钩子+痛点 → 方法 → 原理 → 动态收尾）、220-260 字、口语化、代码块包裹，可直接照着录。

### 完整流水线示例（一次说清，主管会带你走）

```
写一篇关于「普通人用 AI 提效」的文章。流程：先让选题策划出 3 个角度，
我选一个后交给调研专家收集素材，然后写手成稿、事实核查、主编定稿、
排版成公众号格式，最后归档到 Notion。
```

---

## 七、成本与安全说明

### 成本结构

| 项目 | 计费方式 | 个人实际花费 |
| :--- | :--- | :--- |
| Vercel 托管（Hobby 计划） | 免费，含 Serverless 函数调用 | 免费 |
| Vercel Sandbox（云端沙箱） | 按 CPU 时间 + 内存计费：约 $0.128/CPU 小时、$0.0212/GB·小时 | Hobby 免费额度内基本够用 |
| Vercel Blob（文件存储） | 250MB 免费 | 免费 |
| 云端浏览器（调研专家用 `browser_fetch`） | 复用 Sandbox 计费，每次调用几分钟 CPU | 免费额度内基本够用 |
| DeepSeek 大模型 | 按 token 计费 | 日常任务一天几分钱到几毛钱 |
| 生图（GPT-Image-2 via APIMART） | 按张计费 | 单张约 8 分钱（10 元可生成 100+ 张） |
| Notion / 飞书 / Resend | 免费版（Resend 3000 封/月） | 免费 |

**结论**：个人使用基本免费，日常一天几毛钱封顶。超出免费额度只会暂停服务，不会自动扣费。

### 安全

- API Key 全部加密存于 Vercel 环境变量，`.env.local` 已被 `.gitignore` 排除，不会泄露到 GitHub
- 云端浏览器每次调用用完即销毁沙箱，不留存页面数据
- **当前 MVP 边界**：仅文本消息收发；图片/文件、审批卡片、流式打字机为后续增强项

---

## 附录：快速交付清单（克隆仓库版）

> 适用：对方已拿到代码仓库（克隆/fork），只需要初始化自己的环境。**14 人团队、飞书通道、模型配置都已内置在代码里，无需重新搭建。**

### 已完成（克隆即得，无需操作）

- 14 人团队全部角色代码（营销 5 + 内容工作室 8 + 短视频脚本专家）
- 飞书原生通道（`agent/channels/lark.ts`，webhook 模式）
- DeepSeek 模型配置（`agent/model.ts`）
- Fluid Compute 配置（`vercel.json`）
- 云端浏览器调研工具（`browser_fetch`，调研专家可抓取动态页面；依赖 `remote-agent-browser`，已装）
- 公众号草稿箱发布工具（`publish_wechat_draft`，社媒协调员可发布到公众号草稿箱；已支持 `WECHAT_PROXY` 代理，依赖 `undici`，已装）
- 生图工具（`generate_image`，写手/排版设计师可生成配图；GPT-Image-2 via APIMART，需配置 `APIMART_API_KEY`）

### 对方必须自己做的 5 步（约 30 分钟）

| 步骤 | 操作 | 需要什么 |
| :--- | :--- | :--- |
| ① 安装依赖 | `pnpm install` | Node.js + pnpm |
| ② 配置本地密钥 | 在 `.env.local` 填入 `DEEPSEEK_API_KEY`、`LARK_APP_ID`、`LARK_APP_SECRET` | DeepSeek 账号 + 飞书应用凭据 |
| ③ 飞书建应用 | 开放平台创建自建应用：开通机器人、`im:message` 相关权限、订阅 `im.message.receive_v1` | 飞书管理员账号 |
| ④ 部署上线 | `vercel login` → `vercel link` → `vercel env add`（三个密钥 + 公众号密钥）→ `vercel deploy --prod` → **关闭部署保护** | Vercel 账号 |
| ⑤ 配 webhook | 飞书后台订阅方式改「将事件发送至开发者服务器」，地址填 `https://bot.你的域名.com/eve/v1/lark` | 国内可达域名（Cloudflare 子域名方案见正文第 9 步） |
| ⑥（可选）公众号草稿箱 | ① 公众号后台「设置与开发→基本配置」获取 AppID/AppSecret 并加 IP 白名单；② `vercel env add WECHAT_APP_ID / WECHAT_APP_SECRET`；③ 线上直连被动态 IP 拦截时，配 `WECHAT_PROXY`（固定 IP 代理） | 已认证公众号 |
| ⑦（可选）生图 | `vercel env add APIMART_API_KEY`（在 apimart.ai/keys 获取），写手/排版设计师即可生成配图 | APIMART 账号 |

### 交付时建议这样说

```text
代码已全部备好，你只需要：
1. git clone <仓库地址> && cd 项目 && pnpm install
2. 准备三样东西：DeepSeek API Key、飞书应用（App ID/Secret）、Vercel 账号
3. 按交付文档「附录」的 5 步初始化，约 30 分钟跑通
4. 有任何一步卡住，把报错发我
```

### 私有仓库的交付方式

> 代码仓库默认设为**私有**（密钥永不进代码库），按交付对象选择给码方式：

| 交付对象 | 方式 |
| :--- | :--- |
| 单个客户 | GitHub 仓库 → Settings → Collaborators → 添加对方 GitHub 账号（只读权限） |
| 不想加协作者 | 仓库 → Code → Download ZIP，直接把压缩包发给对方 |
| 多个客户 | 保持私有，每次交付发 ZIP 或单独 fork 分支 |

### 云端环境变量配置清单（客户可见）

> 所有密钥只存在于两处：**Vercel 云端环境变量（Encrypted 加密）** + 本地 `.env.local`（已被 .gitignore 排除）。代码全部通过 `process.env.XXX` 读取，零硬编码。

| 变量名                                | 服务       | 用途                                                       | 是否必配 |
| :--------------------------------- | :------- | :------------------------------------------------------- | :--- |
| DEEPSEEK_API_KEY                   | DeepSeek | 14 人团队思考/写作的大模型 Key                                      | ✅ 必配 |
| LARK_APP_ID / LARK_APP_SECRET      | 飞书       | 机器人收发消息                                                  | ✅ 必配 |
| NOTION_CONNECTOR                   | Notion   | 知识库/长文存储（部署时 Vercel Connect 自动配置）                        | ✅ 必配 |
| APIMART_API_KEY                    | 生图       | 写手/排版生成配图（GPT-Image-2，约 8 分/张）                           | 可选   |
| WECHAT_APP_ID / WECHAT_APP_SECRET  | 公众号      | 草稿箱发布（需已认证公众号 + IP 白名单）                                  | 可选   |
| WECHAT_PROXY                       | 公众号      | 线上直连被动态 IP 拦截时，配固定 IP 代理                                 | 可选   |
| TYPEFULLY_API_KEY                  | 推特排期     | 社媒排期用；本地已验证可用；云端若遇 IP 校验问题，需确保部署区域出口 IP 可达（同公众号方案可配固定出口） | 按需   |
| SLACK_CONNECTOR / RESEND_CONNECTOR | Slack/邮件 | 模板自带连接（国内版可不配）                                           | 可选   |

**配置方式**：
```bash
vercel env add <变量名> production --value <值> --sensitive --yes
```

**改密钥后的生效流程**：同步更新本地 `.env.local` + Vercel 环境变量 → 重新 `vercel deploy --prod` 才生效。

**安全红线**：密钥不要出现在聊天记录、截图、文档或提交记录中（本交付文档一律用占位符）；如需向客户展示，只给变量名和用途，不给值。

