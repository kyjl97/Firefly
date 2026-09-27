# Kimi Code CLI 内置命令参考

## 概述
Kimi Code CLI 提供了丰富的内置斜杠命令，覆盖账号配置、会话管理、模式切换、信息查询等功能。在 TUI 输入框中输入 `/` 即可触发命令补全，命令别名也会被匹配。

**注意**：某些命令仅在空闲状态下可用。在会话流式输出或压缩上下文时执行这些命令会被阻止——请先按 `Esc` 或 `Ctrl-C` 中断。

## 账号与配置
| 命令             | 别名              | 描述                          | 是否始终可用 |
| -------------- | --------------- | --------------------------- | ------ |
| `/login`       | -               | 选择账号或平台并登录（使用 OAuth 设备码流程）  | 否      |
| `/logout`      | -               | 清除当前选中账号的凭证                 | 否      |
| `/provider`    | -               | 打开交互式提供商管理器，查看、添加和移除已配置的提供商 | 是      |
| `/model`       | -               | 切换当前会话使用的 LLM 模型            | 是      |
| `/settings`    | `/config`       | 在 TUI 中打开设置面板               | 是      |
| `/experiments` | `/experimental` | 打开实验性功能面板                   | 是      |
| `/permission`  | -               | 选择权限模式                      | 否      |
| `/editor`      | -               | 配置通过 Ctrl-G 启动的外部编辑器        | 否      |
| `/theme`       | -               | 切换终端 UI 颜色主题                | 否      |

## 会话管理
| 命令 | 别名 | 描述 | 是否始终可用 |
|------|------|------|--------------|
| `/new` | `/clear` | 开始新会话，丢弃当前上下文 | 否 |
| `/sessions` | `/resume` | 浏览历史会话并切换到/恢复某个会话 | 否 |
| `/tasks` | `/task` | 浏览后台任务列表 | 是 |
| `/fork` | - | 从当前会话分叉一个新会话，保留完整对话历史 | 否 |
| `/title [文本]` | `/rename` | 无参数时显示当前会话标题，有参数时设置新标题（最多 200 字符） | 是 |
| `/compact [指令]` | - | 压缩当前对话上下文以释放 token 用量；可选的自定义指令可提示模型保留什么 | 否 |
| `/undo [数量]` | - | 撤销活动上下文中最近的提示。无数量时打开选择器；有数量时撤销相应数量的提示 | 否 |
| `/reload` | - | 重新加载当前会话并应用最新的 config.toml 设置 | 否 |
| `/reload-tui` | - | 仅重新加载 tui.toml UI 偏好设置 | 是 |
| `/init` | - | 分析当前代码库并生成 AGENTS.md | 否 |
| `/export-md [路径]` | `/export` | 将当前会话导出为 Markdown 文件 | 否 |
| `/export-debug-zip` | - | 将当前会话导出为调试 ZIP 归档文件 | 否 |
| `/copy` | - | 将最后一条助手消息复制到剪贴板 | 否 |
| `/add-dir [路径]` | - | 将额外的工作区目录添加到当前会话 | 否 |

## 模式与运行控制
| 命令 | 别名 | 描述 | 是否始终可用 |
|------|------|------|--------------|
| `/yolo [on\|off]` | `/yes` | 切换 YOLO 模式。启用时跳过常规工具调用的审批（计划模式退出审批不受影响） | 是 |
| `/auto [on\|off]` | - | 切换自动权限模式。启用时工具审批自动处理，代理不会向用户提问 | 是 |
| `/plan [on\|off]` | - | 切换计划模式 | 是 |
| `/plan clear` | - | 清除当前计划 | 否 |
| `/swarm on\|off` | - | 开启或关闭群体模式 | 是 |
| `/swarm <任务>` | - | 开启群体模式，然后将任务作为普通提示发送 | 是 |
| `/goal [...]` | - | 启动或管理自主目标（详见下文） | 是 |

## 自主目标
`/goal` 启动或管理目标模式：一个持久的目标，Kimi Code 在自动继续的轮次中持续追求。

| 命令 | 描述 | 是否始终可用 |
|------|------|--------------|
| `/goal` 或 `/goal status` | 显示当前目标及其状态、耗时、轮数和 token 计数 | 是 |
| `/goal pause` | 暂停活动目标并保持它 | 是 |
| `/goal resume` | 恢复暂停或阻止的目标 | 否 |
| `/goal cancel` | 移除当前目标 | 是 |
| `/goal replace <目标>` | 用新目标替换保存的目标 | 否 |
| `/goal next <目标>` | 为此会话排队一个即将到来的目标 | 是 |
| `/goal next manage` | 打开即将到来的目标管理器 | 是 |

**示例**：
```bash
# 更新文档、运行文档构建，如果 20 轮后仍被阻止则停止
/goal Update the checkout docs, run docs build, and stop if still blocked after 20 turns

# 如果目标需要以 "cancel" 开头
/goal -- cancel the old rollout note after the new docs are published
```

## 信息与状态
| 命令 | 别名 | 描述 | 是否始终可用 |
|------|------|------|--------------|
| `/help` | `/h`, `/?` | 显示键盘快捷键和所有可用命令 | 是 |
| `/btw [问题]` | - | 在分叉的子代理中打开侧对话，不影响当前主代理轮次；无参数时先打开面板等待输入 | 是 |
| `/usage` | - | 显示 token 用量、上下文消耗和配额信息 | 是 |
| `/status` | - | 显示当前会话运行时状态：版本、模型、工作目录、权限模式等 | 是 |
| `/mcp` | - | 列出当前会话中的 MCP 服务器及其连接状态 | 是 |
| `/plugins` | - | 打开交互式插件管理器 | 是 |
| `/version` | - | 显示 Kimi Code CLI 版本号 | 是 |
| `/feedback` | - | 提交反馈，可选包含诊断日志和代码库上下文 | 是 |

## 退出
| 命令 | 别名 | 描述 | 是否始终可用 |
|------|------|------|--------------|
| `/exit` | `/quit`, `/q` | 退出 Kimi Code CLI | 否 |

## 内置技能命令
Kimi Code CLI 内置了一组技能，直接作为 `/<名称>` 斜杠命令出现，无需 `skill:` 前缀。

| 命令 | 描述 |
|------|------|
| `/mcp-config` | 配置 MCP 服务器并处理 MCP OAuth 登录 |
| `/custom-theme [文本]` | 创建或编辑自定义 TUI 颜色主题 |
| `/update-config` | 检查或编辑 config.toml（模型、提供商、权限、钩子）和 tui.toml（主题、编辑器、通知、自动更新） |
| `/check-kimi-code-docs` | 根据官方文档回答 Kimi Code 产品问题（CLI 用法、配置、会员、错误码） |
| `/import-from-cc-codex` | 将 Claude Code 和 Codex 的指令、技能和 MCP 设置导入到 Kimi Code |
| `/sub-skill` | 发现并重新组织本地技能库存为分层子技能包，包含 `/sub-skill.review`（只读提案）和 `/sub-skill.consolidate`（应用重组） |

**注意**：所有内置技能命令仅在空闲状态下可用。

## 技能动态命令
激活的外部技能会自动注册为斜杠命令：

- **外部技能**：`/skill:<名称> [额外文本]`
  - 例如：`/skill:code-style` 加载名为 code-style 的技能并发送给代理
- **外部子技能**：`/<父技能>.<子技能> [额外文本]`
  - 例如：`/code-style.review` 调用 code-style 技能内的 review 子技能
- **简写形式**：`/<名称>`（如果名称未被系统斜杠命令占用）
  - 例如：`/code-style` 会回退匹配 `/skill:code-style`

**注意**：所有技能命令仅在空闲状态下可用。

## 键盘快捷键
除了斜杠命令，Kimi Code CLI 还提供了丰富的键盘快捷键。详见 [键盘快捷键文档](https://www.kimi.com/code/docs/en/kimi-code-cli/reference/keyboard.html)。

|             |                       |
| ----------- | --------------------- |
| `Ctrl-J`    | 在输入中插入换行              |
| `↑` / `↓`   | 查看输入历史                |
| `Shift-Tab` | 切换 Plan 模式            |
| `Alt-V`     | 粘贴剪贴板中的图片或视频（Windows） |

## 内置工具
代理可以调用各种内置工具。详见 [内置工具文档](https://www.kimi.com/code/docs/en/kimi-code-cli/reference/tools.html)。

---
**参考文档**：[Slash Commands | Kimi Code Docs](https://www.kimi.com/code/docs/en/kimi-code-cli/reference/slash-commands.html)