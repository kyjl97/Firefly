# Codex 术语表

> 根据附件截图核验，并参考 OpenAI Codex 官方资料整理。  
> 这是一版交付用精简稿：优先解释“是什么、怎么理解、什么时候用”，不展开过多配置细节。

## 核验说明

附件里的内容整体方向是正确的，尤其是对 Codex、AI Agent、上下文、任务边界、验收标准、Worktree、Sandbox 等概念的解释。

需要稍微修正的地方有两点：

1. `Thread` 不一定只属于“同一项目”。官方语境里，它更准确地说是一次 Codex 会话，可以包含多轮提示、模型输出和工具调用；它可以绑定项目，也可以是不绑定项目的聊天。
2. `evidence gate`、`closeout`、`verdict`、`BLOCK / WARN / PASS` 更像团队工作流约定，不是 OpenAI 官方固定术语。可以保留，但不要当作官方概念来讲。

## 核心概念

| 术语 | 白话解释 |
| --- | --- |
| Codex | OpenAI 的编码代理。它不只是回答问题，还能读代码、改文件、运行命令、调试、审查，并在真实项目里完成工程任务。 |
| AI Agent | 能围绕目标自主执行步骤的 AI：理解任务、收集上下文、调用工具、观察结果，再继续调整。 |
| 工程执行代理 | 对 Codex 的中文概括：不是“帮你想代码”，而是“能在项目里实际做事”。 |
| Context / 上下文 | Codex 判断任务所需的信息，包括文件、截图、报错、终端输出、历史对话、打开文件和选中代码等。 |
| Thread | 一次 Codex 会话。一个 thread 可以持续多轮，也可以之后恢复继续做。 |
| Task boundary / 任务边界 | 本次允许做什么、不允许做什么。边界越清楚，Codex 越不容易跑偏。 |
| Definition of Done / 验收标准 | 判断任务完成的标准，比如测试通过、页面行为正确、文档补齐、截图验证完成。 |

## Codex 入口

| 入口 | 适合什么时候用 |
| --- | --- |
| Codex App | 桌面端图形界面，适合新手、多任务、看 diff、做审查、使用 worktree 和管理线程。 |
| Codex CLI | 终端里的 Codex，适合熟悉命令行、需要快速处理本地项目或自动化任务。 |
| Codex IDE Extension | VS Code、Cursor、Windsurf 等编辑器里的 Codex，适合围绕打开文件和选中代码协作。 |
| Codex Web / Cloud | 浏览器和云端入口，适合连接 GitHub 仓库、后台处理任务、创建 PR 或跨设备委派工作。 |

## 项目与工作区

| 术语 | 白话解释 |
| --- | --- |
| Project | Codex 当前选中的项目文件夹，通常是一个 Git 仓库。 |
| Workspace | Codex 当前工作的范围，也就是它能读取、修改和运行命令的环境边界。 |
| Local checkout | 你平时自己使用的本地仓库目录。 |
| Worktree | 基于 Git worktree 创建的独立工作目录，用来并行处理任务或隔离改动。 |
| Handoff | 把一个任务和它的改动在 Local 与 Worktree 之间移动，方便后台做完后回到本地检查。 |

## 工作流术语

| 术语 | 白话解释 |
| --- | --- |
| diff | 修改前后的差异，用来确认 Codex 到底改了什么。 |
| review | 审查改动是否符合目标，是否有 bug、风险或遗漏测试。 |
| PR / Pull Request | 把一组改动提交给团队审查、测试和合并的流程。 |
| commit message | 一次提交的简短说明，说明改了什么和为什么。 |
| lint | 静态检查代码风格和潜在问题。 |
| typecheck | 类型检查，常见于 TypeScript 项目。 |
| build | 构建项目，验证代码能否正常打包或发布。 |
| CI | 持续集成，通常会在 GitHub Actions 等平台自动运行测试和构建。 |
| closeout | 任务收尾报告：改了什么、怎么验证、还有什么风险。属于工作流约定。 |
| evidence gate | 证据门：没有测试、截图、日志或 diff 等证据，就不轻易判断任务完成。属于工作流约定。 |
| BLOCK / WARN / PASS | 审查结论三档：阻断、有风险但可继续、未发现阻断。属于工作流约定，不是官方固定术语。 |

## 权限与安全

| 术语 | 白话解释 |
| --- | --- |
| sandbox | 沙盒。限制 Codex 能访问和修改的范围，让它在安全边界内自主执行。 |
| `read-only` | 只读模式。适合分析、解释、审查，不适合直接修改。 |
| `workspace-write` | 工作区写入模式。Codex 可以在项目范围内读写和运行常规命令。 |
| `danger-full-access` | 无沙盒限制。权限很大，只适合高度信任且确实需要的场景。 |
| `approval_policy` | 控制 Codex 什么时候需要停下来请求批准。常见策略包括 `untrusted`、`on-request`、`never`。 |

## 配置与扩展

| 术语 | 白话解释 |
| --- | --- |
| `AGENTS.md` | 给 Codex 的项目说明书，可以写代码风格、测试命令、审查要求和禁止事项。 |
| `config.toml` | Codex 的配置文件，用来设置模型、权限、MCP、hooks、功能开关等。 |
| MCP | Model Context Protocol，让 Codex 连接外部工具和上下文，例如浏览器、文档、Figma 或内部系统。 |
| Skill | 可复用的任务工作流，通常包含说明文件、参考资料和可选脚本。 |
| Plugin | 可安装的扩展包，可以打包 skills、apps、MCP servers 等能力。 |
| Hook | Codex 生命周期钩子，可以在工具调用前后、会话开始等时机触发脚本或检查。 |
| Subagent | 子代理。适合复杂任务里的并行探索、专项审查或多步骤拆分。 |

## 提示词建议

给 Codex 下任务时，最有用的是把这五件事说清楚：

| 要素 | 示例 |
| --- | --- |
| 目标 | “修复登录后不跳转的问题。” |
| 上下文 | “参考这张截图和 `src/auth.ts`。” |
| 边界 | “只改前端，不改 API。” |
| 约束 | “不要新增依赖，保持现有 UI 风格。” |
| 验收 | “运行 lint 和测试，并说明结果。” |

## 一句话记忆

Codex 是带着上下文、边界、权限和验收标准，在真实项目里执行工程任务的 AI 代理。

用好 Codex 的关键不是写很长的提示词，而是把目标、上下文、边界和验证方式讲清楚。

## 官方资料

- [Codex manual](https://developers.openai.com/codex/codex-manual.md)
- [Codex app](https://developers.openai.com/codex/app)
- [Codex CLI](https://developers.openai.com/codex/cli)
- [Codex cloud](https://developers.openai.com/codex/cloud)
- [AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- [Sandbox and approvals](https://developers.openai.com/codex/agent-approvals-security)
