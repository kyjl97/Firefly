# GitHub CLI 完整命令手册

> GitHub CLI 版本：v2.88.0（2026-03-10）  
> 官方手册：https://cli.github.com/manual  
> GitHub：https://github.com/cli/cli  

---

## 目录

- [全局参数](#全局参数)
- [auth — 认证管理](#auth)
- [repo — 仓库管理](#repo)
- [issue — Issue 管理](#issue)
- [pr — Pull Request 管理](#pr)
- [workflow — Actions 工作流](#workflow)
- [run — Actions 运行记录](#run)
- [cache — Actions 缓存](#cache)
- [release — 发行版管理](#release)
- [gist — Gist 管理](#gist)
- [browse — 浏览器打开](#browse)
- [project — Projects 管理](#project)
- [org — 组织管理](#org)
- [codespace — Codespaces 管理](#codespace)
- [search — 搜索](#search)
- [secret — Actions 密钥](#secret)
- [variable — Actions 变量](#variable)
- [label — 标签管理](#label)
- [ssh-key — SSH 密钥](#ssh-key)
- [gpg-key — GPG 密钥](#gpg-key)
- [ruleset — 仓库规则集](#ruleset)
- [api — API 请求](#api)
- [extension — 扩展管理](#extension)
- [alias — 命令别名](#alias)
- [config — 配置管理](#config)
- [copilot — GitHub Copilot CLI](#copilot)
- [completion — Shell 补全](#completion)
- [attestation — 制品证明](#attestation)
- [agent-task — Agent 任务（预览）](#agent-task)
- [status — 跨仓库状态](#status)
- [licenses — 第三方许可](#licenses)
- [其他命令](#other)
- [帮助主题](#help-topics)
- [常用速查](#cheatsheet)

---

## 全局参数

```
gh <command> <subcommand> [flags]
```

| 参数 | 说明 |
|------|------|
| `--repo [HOST/]OWNER/REPO` | 指定仓库（多命令支持） |
| `--hostname <host>` | 指定 GitHub 主机（企业版） |
| `--help` | 显示命令帮助 |
| `--version` | 显示版本号 |

---

## auth

认证与登录管理。

```
gh auth [command]
```

| 命令 | 说明 |
|------|------|
| `login` | 登录 GitHub 账号（交互式） |
| `logout` | 登出 GitHub 账号 |
| `refresh` | 刷新存储的认证凭证 |
| `setup-git` | 配置 git 使用 GitHub CLI 认证 |
| `status` | 显示各已知 GitHub 主机的认证状态 |
| `switch` | 切换活跃 GitHub 账号 |
| `token` | 打印 gh 用于指定主机和账号的认证 token |

**示例：**
```bash
# 登录
gh auth login

# 查看认证状态
gh auth status

# 刷新 token（追加 scope）
gh auth refresh -s project

# 打印 token
gh auth token
```

---

## repo

仓库管理。

```
gh repo <command>
```

### 通用命令

| 命令 | 说明 |
|------|------|
| `create` | 创建新仓库 |
| `list` | 列出用户/组织拥有的仓库 |

### 定向命令

| 命令 | 说明 |
|------|------|
| `view` | 查看仓库（可 `--web` 浏览器打开） |
| `clone` | 克隆仓库到本地 |
| `fork` | Fork 仓库 |
| `edit` | 编辑仓库设置 |
| `delete` | 删除仓库 |
| `archive` | 归档仓库 |
| `unarchive` | 取消归档仓库 |
| `rename` | 重命名仓库 |
| `sync` | 同步仓库（upstream） |
| `set-default` | 配置当前目录的默认仓库 |
| `gitignore` | 列出/查看 .gitignore 模板 |
| `license` | 浏览仓库许可证 |
| `autolink` | 管理自动链接引用 |
| `deploy-key` | 管理部署密钥 |

**示例：**
```bash
# 克隆仓库
gh repo clone cli/cli

# 创建仓库
gh repo create my-repo --public

# 查看仓库（浏览器）
gh repo view --web

# Fork 仓库
gh repo fork owner/repo
```

---

## issue

Issue 管理。

```
gh issue <command>
```

### 通用命令

| 命令 | 说明 |
|------|------|
| `create` | 创建新 Issue |
| `list` | 列出仓库中的 Issue |
| `status` | 显示相关 Issue 状态 |

### 定向命令

| 命令 | 说明 |
|------|------|
| `view` | 查看 Issue（`--web` 浏览器打开） |
| `close` | 关闭 Issue |
| `reopen` | 重新打开 Issue |
| `edit` | 编辑 Issue |
| `delete` | 删除 Issue |
| `comment` | 添加评论到 Issue |
| `lock` | 锁定 Issue 对话 |
| `unlock` | 解锁 Issue 对话 |
| `pin` | 置顶 Issue |
| `unpin` | 取消置顶 Issue |
| `develop` | 管理 Issue 关联分支 |
| `transfer` | 将 Issue 转移到其他仓库 |

**示例：**
```bash
# 创建 Issue
gh issue create --title "Bug fix" --body "Description"

# 列出 Issue
gh issue list --state open

# 查看 Issue
gh issue view 123 --web
```

---

## pr

Pull Request 管理。

```
gh pr <command>
```

### 通用命令

| 命令 | 说明 |
|------|------|
| `create` | 创建 Pull Request |
| `list` | 列出仓库中的 PR |
| `status` | 显示相关 PR 状态 |

### 定向命令

| 命令 | 说明 |
|------|------|
| `view` | 查看 PR（`--web` 浏览器打开） |
| `checkout` | 在 git 中检出 PR 分支 |
| `diff` | 查看 PR 的变更 |
| `checks` | 显示 PR 的 CI 状态 |
| `close` | 关闭 PR |
| `reopen` | 重新打开 PR |
| `merge` | 合并 PR |
| `ready` | 标记 PR 为 ready for review |
| `revert` | 还原 PR |
| `review` | 添加 PR 审查 |
| `edit` | 编辑 PR |
| `comment` | 添加评论到 PR |
| `lock` | 锁定 PR 对话 |
| `unlock` | 解锁 PR 对话 |
| `update-branch` | 更新 PR 分支（rebase） |

**别名：** `gh co` = `gh pr checkout`

**示例：**
```bash
# 创建 PR
gh pr create --title "Feature" --body "Description"

# 检出 PR
gh pr checkout 123

# 合并 PR
gh pr merge 123 --squash

# 审查 PR
gh pr review 123 --approve
```

---

## workflow

GitHub Actions 工作流管理。

```
gh workflow <command>
```

| 命令 | 说明 |
|------|------|
| `list` | 列出工作流 |
| `view` | 查看工作流摘要 |
| `run` | 通过创建 `workflow_dispatch` 事件触发工作流 |
| `enable` | 启用工作流 |
| `disable` | 禁用工作流 |

**示例：**
```bash
# 列出工作流
gh workflow list

# 运行工作流
gh workflow run ci.yml

# 查看工作流
gh workflow view 123 --web
```

---

## run

GitHub Actions 工作流运行记录管理。

```
gh run <command>
```

| 命令 | 说明 |
|------|------|
| `list` | 列出最近的工作流运行 |
| `view` | 查看工作流运行摘要 |
| `watch` | 监视运行直到完成（显示进度） |
| `rerun` | 重新运行 |
| `cancel` | 取消运行 |
| `download` | 下载运行生成的制品（artifacts） |
| `delete` | 删除运行记录 |

**示例：**
```bash
# 列出运行记录
gh run list

# 查看运行详情
gh run view 123 --log

# 监视运行
gh run watch

# 下载制品
gh run download 123
```

---

## cache

GitHub Actions 缓存管理。

```
gh cache <command>
```

| 命令 | 说明 |
|------|------|
| `list` | 列出 Actions 缓存 |
| `delete` | 删除 Actions 缓存（`--all` 删除全部） |

---

## release

发行版（Release）管理。

```
gh release <command>
```

### 通用命令

| 命令 | 说明 |
|------|------|
| `create` | 创建新发行版 |
| `list` | 列出仓库中的发行版 |

### 定向命令

| 命令 | 说明 |
|------|------|
| `view` | 查看发行版信息 |
| `edit` | 编辑发行版 |
| `delete` | 删除发行版 |
| `download` | 下载发行版资源（assets） |
| `upload` | 上传资源到发行版 |
| `delete-asset` | 删除发行版中的资源 |
| `verify` | 验证发行版的证明（attestation） |
| `verify-asset` | 验证资源来源于发行版 |

**示例：**
```bash
# 创建发行版
gh release create v1.0.0 --title "v1.0.0" --notes "Release notes"

# 上传资源
gh release upload v1.0.0 ./dist.zip

# 下载资源
gh release download v1.0.0
```

---

## gist

Gist 管理。

```
gh gist <command>
```

| 命令 | 说明 |
|------|------|
| `create` | 创建新 Gist |
| `list` | 列出 Gist |
| `view` | 查看 Gist |
| `edit` | 编辑 Gist |
| `delete` | 删除 Gist |
| `clone` | 克隆 Gist 到本地 |
| `rename` | 重命名 Gist 中的文件 |

**示例：**
```bash
# 创建 Gist
gh gist create hello.py --public

# 查看 Gist
gh gist view abc123 --web
```

---

## browse

在浏览器中打开仓库、Issue、PR 等。

```
gh browse [<number> | <path> | <commit-sha>] [flags]
```

| 参数/标志 | 说明 |
|----------|------|
| （无参数） | 打开仓库主页 |
| `<number>` | 打开指定 Issue/PR |
| `<path>` | 打开指定文件路径 |
| `<commit-sha>` | 打开指定提交 |
| `-a, --actions` | 打开 Actions 页面 |
| `-b, --branch <name>` | 打开指定分支 |
| `-c, --commit [=last]` | 打开指定提交 |
| `-n, --no-browser` | 只打印 URL，不打开浏览器 |
| `-p, --projects` | 打开 Projects 页面 |
| `-r, --releases` | 打开 Releases 页面 |
| `-s, --settings` | 打开仓库设置页面 |
| `-w, --wiki` | 打开 Wiki 页面 |
| `--blame` | 打开文件的 blame 视图 |

**示例：**
```bash
# 打开仓库主页
gh browse

# 打开 Issue #123
gh browse 123

# 打开 Actions
gh browse --actions

# 只打印 URL
gh browse --no-browser
```

---

## project

GitHub Projects 管理（需要 `project` scope）。

```
gh project <command>
```

| 命令 | 说明 |
|------|------|
| `list` | 列出所有者的 Projects |
| `view` | 查看 Project |
| `create` | 创建 Project |
| `close` | 关闭 Project |
| `delete` | 删除 Project |
| `edit` | 编辑 Project |
| `copy` | 复制 Project |
| `mark-template` | 将 Project 标记为模板 |
| `link` | 将 Project 链接到仓库或团队 |
| `unlink` | 取消 Project 与仓库/团队的链接 |
| `field-create` | 在 Project 中创建字段 |
| `field-delete` | 删除 Project 中的字段 |
| `field-list` | 列出 Project 中的字段 |
| `item-add` | 将 PR 或 Issue 添加到 Project |
| `item-archive` | 归档 Project 中的条目 |
| `item-create` | 在 Project 中创建草稿 Issue 条目 |
| `item-delete` | 从 Project 中删除条目 |
| `item-edit` | 编辑 Project 中的条目 |
| `item-list` | 列出 Project 中的条目 |

**示例：**
```bash
# 创建 Project
gh project create --owner myorg --title "Roadmap"

# 查看 Project
gh project view 1 --owner myorg --web

# 列出字段
gh project field-list 1 --owner myorg
```

---

## org

组织管理。

```
gh org <command>
```

| 命令 | 说明 |
|------|------|
| `list` | 列出认证用户所在的组织 |

---

## codespace

GitHub Codespaces 管理。

```
gh codespace <command>
```

**别名：** `gh cs`

| 命令 | 说明 |
|------|------|
| `list` | 列出 Codespaces |
| `create` | 创建 Codespace |
| `delete` | 删除 Codespaces |
| `edit` | 编辑 Codespace |
| `view` | 查看 Codespace 详情 |
| `stop` | 停止运行中的 Codespace |
| `rebuild` | 重建 Codespace |
| `code` | 在 VS Code 中打开 Codespace |
| `jupyter` | 在 JupyterLab 中打开 Codespace |
| `ssh` | SSH 连接到 Codespace |
| `logs` | 查看 Codespace 日志 |
| `ports` | 列出 Codespace 中的端口 |
| `cp` | 在本地和远程文件系统之间复制文件 |

---

## search

在 GitHub 上搜索。

```
gh search <command> [query] [flags]
```

> **注意**：在 PowerShell 中，以 `-` 开头的搜索限定符需要使用 `--%` 和 `--` 来避免被解析为命令行标志。  
> 示例：`gh --% search issues -- "query -label:bug"`

| 命令 | 说明 |
|------|------|
| `repos` | 搜索仓库 |
| `issues` | 搜索 Issue |
| `prs` | 搜索 Pull Request |
| `code` | 在代码中搜索 |
| `commits` | 搜索提交 |

**示例：**
```bash
# 搜索仓库
gh search repos "cli" --language go --stars ">1000"

# 搜索 Issue
gh search issues --repo owner/repo "bug" --state open

# 搜索 PR
gh search prs --repo owner/repo "feature" --state merged
```

---

## secret

GitHub Actions / Dependabot / Codespaces 密钥管理。

```
gh secret <command>
```

| 命令 | 说明 |
|------|------|
| `set` | 创建或更新密钥 |
| `list` | 列出密钥 |
| `delete` | 删除密钥 |

**示例：**
```bash
# 设置密钥
gh secret set MY_SECRET < my_secret.txt

# 列出密钥
gh secret list

# 删除密钥
gh secret delete MY_SECRET
```

---

## variable

GitHub Actions / Dependabot 变量管理。

```
gh variable <command>
```

| 命令 | 说明 |
|------|------|
| `set` | 创建或更新变量 |
| `list` | 列出变量 |
| `delete` | 删除变量 |
| `get` | 获取变量值 |

**示例：**
```bash
# 设置变量
gh variable set MY_VAR="hello"

# 列出变量
gh variable list
```

---

## label

GitHub Issue/PR 标签管理。

```
gh label <command>
```

| 命令 | 说明 |
|------|------|
| `list` | 列出仓库中的标签 |
| `create` | 创建新标签 |
| `edit` | 编辑标签 |
| `delete` | 删除标签 |
| `clone` | 从一个仓库克隆标签到另一个仓库 |

**示例：**
```bash
# 创建标签
gh label create "bug" --color "d73a4a" --description "Something isn't working"

# 列出标签
gh label list
```

---

## ssh-key

管理 GitHub 账号的 SSH 密钥。

```
gh ssh-key <command>
```

| 命令 | 说明 |
|------|------|
| `list` | 列出账号中的 SSH 密钥 |
| `add` | 添加 SSH 密钥到 GitHub 账号 |
| `delete` | 从 GitHub 账号删除 SSH 密钥 |

---

## gpg-key

管理 GitHub 账号的 GPG 密钥。

```
gh gpg-key <command>
```

| 命令 | 说明 |
|------|------|
| `list` | 列出账号中的 GPG 密钥 |
| `add` | 添加 GPG 密钥到 GitHub 账号 |
| `delete` | 从 GitHub 账号删除 GPG 密钥 |

---

## ruleset

仓库规则集（Rulesets）管理。

```
gh ruleset <command>
```

**别名：** `gh rs`

| 命令 | 说明 |
|------|------|
| `list` | 列出仓库或组织的规则集 |
| `view` | 查看规则集信息 |
| `check` | 查看给定分支会应用哪些规则 |

**示例：**
```bash
# 列出规则集
gh ruleset list

# 检查分支规则
gh ruleset check main
```

---

## api

向 GitHub API 发起认证 HTTP 请求。

```
gh api [flags] <endpoint>
```

| 标志 | 说明 |
|------|------|
| `--method <METHOD>` | HTTP 方法（GET/POST/PUT/PATCH/DELETE） |
| `-H, --header <string>` | 添加 HTTP 请求头 |
| `-f, --raw-field <key=value>` | 添加静态字符串参数 |
| `-F, --field <key=value>` | 添加类型转换参数（JSON 类型） |
| `--input <file>` | 从文件读取请求体 |
| `-p, --preview <names>` | 选择加入 API 预览 |
| `-q, --jq <expression>` | 使用 jq 表达式过滤 JSON 输出 |
| `-t, --template <string>` | 使用 Go 模板格式化 JSON 输出 |
| `--paginate` | 自动翻页获取所有结果 |

> 端点参数中的 `{owner}`、`{repo}`、`{branch}` 会自动替换为当前仓库的值。

**示例：**
```bash
# GET 请求
gh api repos/cli/cli

# GraphQL 请求
gh api graphql -f query='{ viewer { login } }'

# POST 请求（创建 Issue）
gh api repos/OWNER/REPO/issues -X POST -f title="Title" -f body="Body"

# 带分页
gh api --paginate repos/OWNER/REPO/issues
```

---

## extension

GitHub CLI 扩展管理（扩展仓库名必须以 `gh-` 开头）。

```
gh extension <command>
```

**别名：** `gh extensions`, `gh ext`

| 命令 | 说明 |
|------|------|
| `install` | 从仓库安装扩展 |
| `remove` | 卸载已安装的扩展 |
| `list` | 列出已安装的扩展命令 |
| `search` | 搜索 GitHub CLI 扩展 |
| `browse` | UI 模式浏览/添加/移除扩展 |
| `create` | 创建新扩展（脚手架） |
| `exec` | 执行已安装的扩展（用于名称冲突时） |
| `upgrade` | 升级已安装的扩展 |

**示例：**
```bash
# 安装扩展
gh extension install cli/gh-ecosystem

# 列出扩展
gh extension list

# 升级所有扩展
gh extension upgrade --all
```

---

## alias

创建 gh 命令快捷方式，或组合多个命令。

```
gh alias <command>
```

| 命令 | 说明 |
|------|------|
| `set` | 为 gh 命令创建快捷方式 |
| `list` | 列出所有别名 |
| `delete` | 删除别名 |
| `import` | 从 YAML 文件导入别名 |

**示例：**
```bash
# 创建别名
gh alias set pv 'pr view'

# 组合命令别名
gh alias set --shell co 'git checkout $(gh pr list --head branchname --json number --jq ".[0].number")'

# 列出别名
gh alias list
```

---

## config

gh 配置管理。

```
gh config <command>
```

当前可配置项：

| 配置键 | 说明 | 默认值 |
|--------|------|--------|
| `git_protocol` | git clone/push 使用的协议 | `https` |
| `editor` | 文本编辑器 | 系统默认 |
| `prompt` | 终端交互提示开关 | `enabled` |
| `prefer_editor_prompt` | 优先使用编辑器交互提示 | `disabled` |
| `pager` | 终端分页器 | 系统默认 |
| `http_unix_socket` | Unix socket 路径 | — |
| `browser` | 浏览器 | 系统默认 |
| `color_labels` | 使用 RGB 颜色显示标签 | `disabled` |
| `accessible_colors` | 使用 4-bit 可访问颜色 | `disabled` |
| `accessible_prompter` | 使用可访问提示器 | `disabled` |
| `spinner` | 使用动画加载指示器 | `enabled` |

| 命令 | 说明 |
|------|------|
| `get <key>` | 获取配置值 |
| `set <key> <value>` | 设置配置值 |
| `list` | 列出所有配置键值 |
| `clear-cache` | 清除 CLI 缓存 |

**示例：**
```bash
# 设置默认协议为 SSH
gh config set git_protocol ssh

# 查看所有配置
gh config list
```

---

## copilot

运行 GitHub Copilot CLI（预览版）。

```
gh copilot [flags] [args]
```

> 需要 Windows / Linux / macOS，amd64/arm64 架构。  
> 首次运行会自动下载 Copilot CLI 到 `~/.local/share/GitHub CLI/copilot`。

| 标志 | 说明 |
|------|------|
| `--remove` | 删除已下载的 Copilot CLI |
| `--` | 传递后续参数给 Copilot（避免被 gh 解析） |

**示例：**
```bash
# 下载并运行 Copilot CLI
gh copilot

# 运行 Copilot 命令
gh copilot -- "Summarize this week's commits"

# 删除 Copilot CLI
gh copilot --remove
```

---

## completion

生成 Shell 补全脚本。

```
gh completion -s <shell>
```

| Shell | 配置方式 |
|-------|----------|
| bash | `eval "$(gh completion -s bash)"` 加入 `~/.bash_profile` |
| zsh | `gh completion -s zsh > /usr/local/share/zsh/site-functions/_gh`，并在 `~/.zshrc` 中启用 `compinit` |
| fish | `gh completion -s fish > ~/.config/fish/completions/gh.fish` |
| PowerShell | 在 `$profile` 中添加 `Invoke-Expression -Command $(gh completion -s powershell \| Out-String)` |

---

## attestation

制品证明（Attestation）管理。

```
gh attestation <command>
```

**别名：** `gh at`

| 命令 | 说明 |
|------|------|
| `verify` | 使用证明验证制品完整性 |
| `download` | 下载制品的证明供离线使用 |
| `trusted-root` | 输出 `trusted_root.json` 内容（用于离线验证） |

---

## agent-task

Agent 任务管理（**预览版**，可能随时变更）。

```
gh agent-task <command>
```

**别名：** `gh agent-tasks`, `gh agent`, `gh agents`

| 命令 | 说明 |
|------|------|
| `create` | 创建 Agent 任务 |
| `list` | 列出 Agent 任务 |
| `view` | 查看 Agent 任务会话 |

**示例：**
```bash
# 创建任务
gh agent-task create "Improve the performance of the data processing pipeline"

# 列出任务
gh agent-task list

# 查看任务
gh agent-task view 12345abc-12345-12345-12345-12345abc
```

---

## status

显示跨所有已订阅仓库的工作状态，包括：
- 指派的 Issue
- 指派的 PR
- 审查请求
- @提及
- 仓库动态（新 Issue/PR、评论）

```
gh status [flags]
```

| 标志 | 说明 |
|------|------|
| `-o, --org <org>` | 限定在某个组织内 |
| `-e, --exclude <repos>` | 排除指定仓库（逗号分隔，`owner/name` 格式） |

---

## licenses

查看本构建中使用的第三方库许可证信息。

```
gh licenses [flags]
```

---

## preview

执行 gh 功能预览程序。

```
gh preview <command>
```

| 命令 | 说明 |
|------|------|
| `prompter` | 执行预览版提示器（prompter） |

---

## 帮助主题（Help Topics）

| 主题 | 说明 |
|------|------|
| `gh help accessibility` | 了解 GitHub CLI 的无障碍体验 |
| `gh help actions` | 了解 GitHub Actions 集成 |
| `gh help environment` | 了解可与 gh 一起使用的环境变量 |
| `gh help exit-codes` | 了解 gh 使用的退出码 |
| `gh help formatting` | 了解从 gh 导出的 JSON 数据的格式化选项 |
| `gh help mintty` | 了解在 MinTTY 终端中使用 gh 的信息 |
| `gh help reference` | 所有 gh 命令的完整参考（综合参考） |

查看方式：`gh help <topic>`

---

## 其他命令

| 命令 | 说明 |
|------|------|
| `gh version` | 查看版本号 |
| `gh help [command]` | 查看命令帮助 |

---

## 常用速查（Cheat Sheet）

### 仓库操作
```bash
gh repo clone owner/repo          # 克隆仓库
gh repo create my-repo --public   # 创建公开仓库
gh repo fork owner/repo           # Fork 仓库
gh repo view --web                # 浏览器打开仓库
```

### Issue 操作
```bash
gh issue create --title "Title" --body "Desc"   # 创建 Issue
gh issue list --state open                       # 列出开放 Issue
gh issue view 123 --web                        # 浏览器打开 Issue
gh issue close 123                              # 关闭 Issue
```

### PR 操作
```bash
gh pr create --title "Title" --body "Desc"     # 创建 PR
gh pr list                                        # 列出 PR
gh pr checkout 123                               # 检出 PR 分支
gh pr view 123 --web                            # 浏览器打开 PR
gh pr merge 123 --squash                       # Squash 合并
gh pr review 123 --approve                      # 批准 PR
```

### 认证
```bash
gh auth login                # 登录
gh auth status              # 查看状态
gh auth refresh -s project  # 刷新并追加 scope
```

### Actions
```bash
gh workflow list               # 列出工作流
gh run list                  # 列出运行记录
gh run view 123 --log       # 查看运行日志
gh cache list               # 列出缓存
```

### 搜索
```bash
gh search repos "cli" --language go      # 搜索仓库
gh search issues "bug" --repo owner/repo  # 搜索 Issue
```

### API 请求
```bash
gh api repos/cli/cli                           # GET 请求
gh api graphql -f query='{ viewer { login } }'  # GraphQL
gh api --paginate repos/owner/repo/issues       # 自动翻页
```

---

*本文档由 AI 助手根据 GitHub CLI v2.88.0 实际命令输出整理，命令以实际安装版本为准。*
