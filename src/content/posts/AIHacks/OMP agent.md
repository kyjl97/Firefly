---
title: OMP终端Agent
published: 2026-08-05
tags:
  - ai
  - agent
  - omp
  - coding
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/a8cfa447836df47defa87baf527104ec.webp
---

OMP (Oh My Pi) 是一个专为终端设计的强大 AI 编程 Agent。它是对原始 Pi 项目的高级分叉和重构，将整个 IDE 的核心能力（如 LSP、DAP 调试器、多代理解耦、内容哈希编辑等）直接装进终端，并基于 Rust 编写的高性能引擎运行。

相比于传统的 AI 命令行工具，OMP 在稳定度、精准度、速度以及多模型智能路由方面做到了极致。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/a8cfa447836df47defa87baf527104ec.webp)

---

## 一、安装与环境初始化

OMP 支持 macOS、Linux 和 Windows，并且与你现有的工具链（如 Claude Code, Cursor 等）无缝兼容，能够直接识别你现有的规则、技能和 MCP 服务器。

### 1. 安装命令

请根据你的操作系统和环境选择复制对应的安装命令：

| 命令 | 说明 |
| :--- | :--- |
| curl -fsSL https://omp.sh/install \| sh | macOS / Linux 一键安装脚本 |
| brew install can1357/tap/omp | macOS Homebrew 安装命令 |
| bun install -g @oh-my-pi/pi-coding-agent | Bun 安装命令（推荐，需要 bun >= 1.3.14） |
| irm https://omp.sh/install.ps1 \| iex | Windows PowerShell 一键安装命令 |
| mise use -g github:can1357/oh-my-pi | mise 锁版本安装命令 |

### 2. 配置 Shell 自动补全

OMP 能根据命令行和标志元数据动态生成补全脚本，配置后可支持子命令、参数甚至是 --model 的模糊匹配。

| 命令 | 说明 |
| :--- | :--- |
| eval "$(omp completions zsh)" | Zsh 终端自动补全配置（可直接写入 ~/.zshrc） |
| eval "$(omp completions bash)" | Bash 终端自动补全配置（可直接写入 ~/.bashrc） |
| omp completions fish > ~/.config/fish/completions/omp.fish | Fish 终端自动补全配置文件导出 |

---

## 二、OMP 核心特性

1. **Hashline (基于哈希的锚定编辑)：** OMP 写入代码时不会生硬地重写整段，而是根据行内容的哈希进行锚定。如果文件在编辑期间被意外修改导致哈希失效，它会拒绝修改，防止代码被“喂烂”。
2. **LSP 语义级代码理解：** OMP 内部集成了 LSP（Language Server Protocol），在重命名、文件移动、查找引用时会走 workspace/willRenameFiles 协议，跨文件修改时能保证导出的类名、模块引用被完美修正。
3. **DAP 调试器驱动：** 告别传统的“Print 语句调试”。OMP 可以挂载 lldb-dap 调试 C 二进制，挂载 dlv 调试 Go，或通过 debugpy 暂停和检查 Python 进程，一步步深入堆栈和变量。
4. **时间旅行流规则 (TTSR)：** OMP 拥有一套特殊的拦截机制。当大模型脱离原本设计的规则时，正则表达式会在 Token 输出的一瞬间中断，立刻注入 reminders 系统提醒，并直接在同一断点重新生成。
5. **第一代双模型协同 (Advisor)：** 开启 --advisor 时，除了主操作模型外，还会启动一个独立的评估模型（如 Sonnet 或 GPT-5）。它只以旁观者视角审计主模型做出的每一步操作，发现逻辑缺漏或越轨行为立刻通过 Advisor Note 注入修正。

---

## 三、常用 CLI 命令与子命令

### 1. 基础启动与交互命令

| 命令 | 说明 |
| :--- | :--- |
| omp | 启动 OMP 交互式终端 (TUI) |
| omp "列出 src/ 下所有的 .ts 文件" | 带初始提示词启动交互终端 |
| omp @prompt.md @image.png "解释这张图在做什么" | 携带上下文文件/图片启动终端 |
| omp -p "写一个生成 UUID 的 Python 脚本" | 非交互式单次执行并退出 (One-shot) |
| omp --continue "接上文，我们继续讨论" | 继续上一次对话会话 |
| omp --resume <session-id> | 恢复指定 ID 的历史会话 |
| omp --from-claude | 导入 Claude Code 会话进入 OMP |
| omp --from-codex | 导入 Codex 会话进入 OMP |

### 2. 管理与系统子命令

| 命令 | 说明 |
| :--- | :--- |
| omp setup | 初始化 OMP 或者是安装可选特性的依赖（如 Python 内核） |
| omp models | 列出、搜索、测试及刷新可用模型库 |
| omp token | 获取已配置 Provider 的 API Key 或 OAuth Token |
| omp usage | 展示当前所有已登录渠道的使用限额和配额 |
| omp commit | 自动审计 Git 工作区并生成原子 Commit 信息并更新变更日志 |
| omp bench | 压测不同模型，测试首字延迟 (TTFT) 和吞吐速度 (tokens/s) |
| omp stats | 本地可视化展示当前 OMP Token 消耗及花费统计 |
| omp plugin install <package> | 安装、卸载或管理 OMP 扩展插件 |
| omp join <collab-url> | 加入协作会话，远程通过终端或浏览器结对编程 |
| omp completions zsh | 输出 Zsh 终端自动补全脚本 |
| omp update | 检测并安装 OMP 工具链的更新 |
| omp acp | 将 OMP 启动为 ACP 协议服务（用于 Zed 等编辑器挂载） |
| omp worktree | 管理 OMP 运行时生成的独立 Git 工作区 |

---

## 四、核心命令行标志 (CLI Flags)

在启动 OMP 时，可以通过以下 Flags 调整模型的运作方式：

| 命令 | 说明 |
| :--- | :--- |
| --model=<name> | 指定主会话模型（支持模糊匹配，如 opus, gpt-4o 等） |
| --smol=<name> | 指定处理轻量级子代理任务的快速模型（也可用环境变量 PI_SMOL_MODEL） |
| --slow=<name> | 指定处理深思熟虑推理任务的模型（也可用环境变量 PI_SLOW_MODEL） |
| --plan=<name> | 架构规划阶段所使用的模型（也可用环境变量 PI_PLAN_MODEL） |
| --prewalk | 启用廉价过渡模式，在规划完成后自动切换至快速模型执行代码写入 |
| --plan-yolo | 强制以只读模式规划并自动批准计划开始执行 |
| --thinking=<level> | 设定推理强度的级别，可选：off, minimal, low, medium, high, xhigh, max, auto |
| --hide-thinking | 终端 TUI 渲染时隐藏思考链过程，保持界面整洁 |
| --advisor | 并发挂载评估器模型（双模型协同审计模式） |
| --auto-approve | 跳过所有工具调用时的手动确认，自动执行（YOLO 模式） |
| --approval-mode=<mode> | 覆盖全局确认模式，可选：always-ask, write, yolo |
| --no-tools | 禁用所有内置工具，只进行纯文本聊天 |
| --no-lsp | 禁用 LSP 智能提示、格式化和诊断服务 |
| --no-pty | 禁用 PTY-based 交互式 bash 执行 |

---

## 五、在会话中控制 OMP（魔术词与斜杠命令）

在交互会话运行期间，你可以通过特定的魔术词和斜杠命令即时操纵 Agent：

### 1. 魔术关键字 (Magic Keywords)

在日常对话中输入以下单词（不加反引号，不在代码块内），会强制开启专用流：

| 命令 | 说明 |
| :--- | :--- |
| ultrathink | 强制模型启动最高级别的深度思考推理（如 Step-3.7-Reasoning / o3-mini 的 Max Reasoning） |
| orchestrate | 指令模型主动并行创建子代理独立修复不同文件，并在最后交叉验证集成 |
| workflowz | 构建确定性的多子代理任务工作流 |

### 2. 斜杠命令 (Slash Commands)

在会话内以斜杠开头输入：

| 命令 | 说明 |
| :--- | :--- |
| /vibe | 进入只读模式（Vibe Mode），Agent 充当指挥官分发任务给子进程 |
| /fresh | 刷新 Provider API 流状态而不破坏本地历史（解决流假死） |
| /collab | 开启局域网/中继协作，打印二维码与加入链接以结对编程 |
| /debug | 开启 OMP 的性能与日志追踪面板，分析调用瓶颈 |
| /model | 实时为指定角色（default, slow, smol 等）切换所使用的 LLM 模型 |
| /reload-plugins | 重新加载修改后的插件/扩展代码 |

---

## 六、内置工具集说明

OMP 的强大得益于它集成了 31 个内置工具，在此列出核心重点工具：

| 命令                 | 说明                                                        |
| :----------------- | :-------------------------------------------------------- |
| read, write        | 跨系统读写。支持文件、远程 SSH 路径、SQLite、PDF 以及在线 URL 的 Reader-mode 抓取 |
| edit               | 基于 hashline 的内容哈希编辑工具                                     |
| ast_edit, ast_grep | 通过树解析器对 50 多种语言进行语法结构化重写与查找                               |
| grep, glob         | 高效搜索文件匹配和获取文件列表                                           |
| lsp                | 语义级别的 rename、重定义跳转、诊断检测等代码智能操作                            |
| debug              | 开启 DAP 协议，进入现场的单步断点调试环境                                   |
| python, notebook   | 运行持久化 Python 进程沙盒、编辑修改 Jupyter cell                       |
| bash               | 内置 uutils 和 jaq 的终端，避免了系统层 fork 进程导致的性能损耗                 |
| task               | 分发子任务去独立 worktree 验证执行                                    |
| web_search         | 自动调用高精准度网站（Arxiv、StackOverflow等）多渠道检索并返回 Markdown 文本      |
| todo               | 阶段性的待办任务卡片管理                                              |
| ask                | 终端下的多选项交互询问弹窗                                             |
| rewind             | 修剪探索性上下文，保留一份简洁报告（压缩上下文）                                |
| checkpoint         | 标记会话状态，供之后压缩（collapse-and-report）                          |

通过这一套高度内聚的 Rust 级内置工具与智能路由策略，OMP 几乎摆脱了对外部系统的硬性依赖，真正做到一次安装，终身可用。

---

## 七、上下文压缩与会话管理

长对话会让上下文越来越满，影响速度和质量。OMP 提供一套「压缩与回收」机制：

| 命令/工具 | 作用 | 用法 |
| :--- | :--- | :--- |
| rewind | 修剪探索性上下文，保留一份简洁报告作为新起点 | 在对话中说：`rewind 把前面过程压缩成要点，我们继续` |
| checkpoint | 标记当前会话状态，之后可压缩成报告 | `checkpoint` 打个标记，稍后让模型压缩 |
| /fresh | 刷新 Provider API 流状态（解决流假死），不删历史 | 会话内输入 `/fresh` |
| 自动 Compaction | 上下文接近模型窗口上限时自动压缩历史 | 无需手动，后台自动 |

**说明**：
- `rewind` / `checkpoint` 是 setting-gated 工具（**默认关闭**），需在配置中启用（如 `~/.omp/agent/config.yml` 或相关设置开启对应工具）后才能在对话中调用。
- 上下文太满、回复变慢时，最实用的是说 `rewind 压缩前面的过程，保留结论`；想干净重来就开新会话（`omp` 自动建新会话，`--resume` 可回到旧会话）。
- 压缩不会丢失你明确保留的结论（checkpoint/rewind 会生成一份报告作为新上下文起点）。
