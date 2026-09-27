---
title: Kimi Code CLI
published: 2026-07-21
tags:
  - ai
  - deepseek
  - agent
  - workflow
  - token
  - api
  - kimi
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/9388438feff4fe47c94d06c8e3abc86f.webp
---
**Kimi Code CLI** 是 Moonshot AI 推出的终端 AI 编程助手，专为开发者打造。它完美平衡了轻量与功能：单文件安装、毫秒级启动、精致的终端 UI，开箱即用 Kimi 模型，同时兼容 OpenAI、DeepSeek、小米 MiMo 等第三方 API。

## 核心亮点

- **🚀 极致轻量**：单文件安装，毫秒启动，不占用系统资源
- **🎯 模型灵活**：开箱用 Kimi，也支持 DeepSeek、MiMo、通义千问等
- **🔌 插件生态**：官方数据插件 + 第三方扩展，功能无限延伸
- **🤖 子 Agent 并行**：Swarm 模式让复杂任务拆分并行处理
- **📱 多模态支持**：视频、图片、音频输入，不只是代码助手
- **📝 智能会话管理**：压缩、导出、分叉，上下文随你掌控

项目地址：[https://github.com/MoonshotAI/kimi-code](https://github.com/MoonshotAI/kimi-code)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/9388438feff4fe47c94d06c8e3abc86f.webp)

### 快速上手

Windows安装PowerShell命令

```
irm https://code.kimi.com/kimi-code/install.ps1 | iex
```

启动命令

```
kimi
```

### 配置第三方模型

把下面这段话发给你的其他AI agent

```
请帮我配置 Kimi Code CLI 的第三方模型供应商 API。

操作步骤：

1. 先确认 kimi-code 已安装，运行 kimi --version 检查。如果提示找不到命令，用完整路径 %USERPROFILE%\.kimi-code\bin\kimi.exe --version 试试。

2. 运行 kimi provider catalog list 查看所有支持的供应商列表。

3. 我需要添加的供应商是：[填供应商名，比如 deepseek / xiaomi / moonshotai / alibaba / zhipuai 等]，我的 API Key 是：[粘贴你的 API Key]。

4. 用以下命令添加：
kimi provider catalog add <供应商id> --api-key "<你的API Key>"

例如添加 DeepSeek：
kimi provider catalog add deepseek --api-key "sk-xxxxx"

例如添加小米 MiMo：
kimi provider catalog add xiaomi --api-key "sk-xxxxx"

例如添加通义千问（国内版）：
kimi provider catalog add alibaba-cn --api-key "sk-xxxxx"

5. 添加完后运行 kimi provider list 确认供应商已出现在列表中。

6. 告诉我配置是否成功，以及支持哪些模型。
```

### Skill 目录与管理

Kimi Code CLI 的 Skill 存储在四个层级的目录中，优先级从高到低：

#### 用户级别（适用于所有项目）
- `$KIMI_CODE_HOME/skills/`（默认：`~/.kimi-code/skills/`）
- `~/.agents/skills/`

#### 项目级别（项目根目录）
- `.kimi-code/skills/`
- `.agents/skills/`

#### 额外目录（通过配置声明）
在 `config.toml` 中添加：
```toml
extra_skill_dirs = ["~/team-skills", ".agents/team-skills"]
```

#### 内置 Skills
随 CLI 分发，提供开箱即用的工作流（如 `/mcp-config`、`/custom-theme` 等）。

**创建 Skill**：在对应目录下创建文件夹，主文件命名为 `SKILL.md`，包含 YAML frontmatter 和 Markdown 内容。

**调用 Skill**：`/skill:<名称> [参数]`

**参考文档**：[Agent Skills | Kimi Code Docs](https://www.kimi.com/code/docs/en/kimi-code-cli/customization/skills.html)

### 常用命令

Kimi Code CLI 提供了丰富的内置斜杠命令，以下是日常开发中最实用的命令：

**完整命令参考**：[Kimi Code CLI 内置命令](../../Xenia/Kimi%20Code%20CLI%20内置命令.md)

#### 🎯 目标与任务

- **`/goal`** - 启动自主目标模式，让 Kimi Code 在多轮对话中始终围绕同一目标工作
  - 示例：`/goal 修复登录测试中的失败用例`
  - 子命令：`/goal pause`（暂停）、`/goal resume`（恢复）、`/goal cancel`（取消）

- **`/swarm`** - 群组模式，将复杂任务拆分成更小的子任务，启动专门的子代理并行处理
  - 示例：`/swarm 重构用户认证模块并添加单元测试`

- **`/btw`** - 在不影响当前主任务的情况下，开一个侧边对话问临时问题
  - 示例：`/btw TypeScript 的泛型约束怎么写？`

#### 📝 会话管理

- **`/compact`** - 压缩当前对话上下文，释放 token 用量，长对话必备
  - 示例：`/compact 保留代码修改相关的上下文`

- **`/export-md`** - 将当前会话导出为 Markdown 文件，方便归档或分享
  - 示例：`/export-md ./debug-session.md`

- **`/undo`** - 撤销最近的提示，回退到上一步
  - 示例：`/undo`（撤销上一条）或 `/undo 3`（撤销最近3条）

- **`/reload`** - 重新加载配置文件，修改 config.toml 后无需重启
  - 示例：`/reload`

#### 🔧 工具与插件

- **`/plugins`** - 打开插件管理器，安装、启用、禁用插件
  - 官方插件合集在这里找

- **`/mcp`** - 查看 MCP 服务器状态，管理工具连接

- **`/skill:kimi-datasource`** - 调用 Kimi Datasource 数据插件（需先安装）

- **`ReadMediaFile`** - 内置工具，支持解析视频、图片等多媒体文件

#### ℹ️ 信息查询

- **`/status`** - 查看当前会话状态：版本、模型、工作目录、权限模式等

- **`/usage`** - 查看 token 用量和配额信息

- **`/help`** - 显示所有可用命令和键盘快捷键

---

### 🚀 插件Kimi Datasource

**Kimi Datasource** 是 Kimi Code 的官方数据插件，支持用自然语言查询：
- 📈 金融市场数据（A股、港股、美股实时/历史行情）
- 🌍 宏观经济数据（世界银行189个国家50+年数据）
- 🏢 企业信息（工商登记、股权结构、司法风险）
- 📚 学术文献（数百万篇论文检索）
- ⚖️ 中国法律法规（宪法、法律、司法解释、部门规章）

#### 安装步骤

**第一步：完成登录**（必须）
```
/login
```
使用 Kimi Code 账户完成 OAuth 登录，插件依赖本地凭证访问数据服务。

**第二步：打开插件管理器**
```
/plugins
```

**第三步：切换到 Official 标签页**
按 `Tab` 键切换到 "Official"（官方）标签页。

**第四步：安装插件**
在列表中找到 "Kimi Datasource"，按 `Enter` 安装。

**第五步：激活插件**
```
/reload
```
或启动新会话：`/new`

#### 使用示例

安装完成后，直接用自然语言描述需求，或显式调用：

```
/skill:kimi-datasource 查询贵州茅台最近一年的股价走势
```

```
/skill:kimi-datasource 搜索关于 RLHF 的高引论文
```

```
/skill:kimi-datasource 查询小米科技的工商登记信息
```

> **注意**：数据查询按次计费，消耗 Kimi Code 账户额度。AI 生成内容仅供参考，不构成投资建议。

**以上，既然看到这里了，如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。**

感谢你拨冗阅读，山高水长，我们期待下篇文章与你再见。

个人主页：https://kyjl97.github.io/deepseek-imagegen/

个人作品集：https://kyjl97.github.io/oszen/

远程协助服务：https://github.com/kyjl97/