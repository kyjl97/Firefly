# Lark-cli 完整命令手册

> lark-cli 版本：v1.0.32  
> 更新时间：2026-05-16  
> 官方文档：https://open.feishu.cn/document/  
> GitHub：https://github.com/larksuite/cli

---

## 目录

- [全局参数](#全局参数)
- [auth — 授权管理](#auth)
- [im — 即时通讯](#im)
- [docs — 文档操作](#docs)
- [sheets — 多维表格/电子表格](#sheets)
- [calendar — 日历](#calendar)
- [contact — 通讯录](#contact)
- [drive — 云盘文件](#drive)
- [wiki — 知识库](#wiki)
- [base — 多维表格（Bitale）](#base)
- [slides — 幻灯片](#slides)
- [task — 任务](#task)
- [vc — 视频会议](#vc)
- [whiteboard — 白板](#whiteboard)
- [mail — 邮件](#mail)
- [markdown — Markdown 文档](#markdown)
- [minutes — 会议纪要](#minutes)
- [okr — OKR](#okr)
- [approval — 审批](#approval)
- [attendance — 考勤](#attendance)
- [event — 实时事件](#event)
- [config / profile — 配置管理](#config)
- [schema / api — 底层 API](#api)
- [其他工具命令](#other)
- [常用速查](#cheatsheet)

---

## 全局参数

```
lark-cli [command] [subcommand] [flags]
```

| 参数 | 说明 |
|------|------|
| `--as user\|bot` | 身份类型（用户/机器人） |
| `--params '<json>'` | URL 查询参数（JSON） |
| `--data '<json>'` | 请求体（POST/PATCH/PUT） |
| `--format <fmt>` | 输出格式：json / ndjson / table / csv / pretty |
| `--page-all` | 自动分页获取全部结果 |
| `--page-size <N>` | 每页条数（默认 15，最大 20） |
| `--page-limit <N>` | `--page-all` 最大页数（0=无限） |
| `--page-delay <MS>` | 分页间隔毫秒数（默认 200） |
| `-o, --output <path>` | 二进制输出路径 |
| `--jq <expr>` | jq 表达式过滤 JSON 输出 |
| `-q <expr>` | `--jq` 简写 |
| `--dry-run` | 只打印请求，不执行 |
| `--profile <name>` | 使用指定配置 profile |

---

## auth

OAuth 凭证与授权管理。

```
lark-cli auth [command]
```

| 命令 | 说明 |
|------|------|
| `login` | 设备流授权登录（含 `--no-wait` / `--scope` / `--device-code`） |
| `logout` | 退出登录（清除 token） |
| `status` | 查看当前授权状态（用户/scope/过期时间） |
| `list` | 列出所有已登录用户 |
| `check --scope <scope>` | 检查当前 token 是否包含指定 scope |
| `scopes` | 查询应用已启用的全部 scope |

**示例：**
```bash
# 设备流登录（阻塞等待）
lark-cli auth login --scope "im:message im:message.send_as_user"

# 非阻塞登录（获取链接让用户授权）
lark-cli auth login --no-wait --json --scope "im:message"

# 用 device_code 完成轮询
lark-cli auth login --device-code <code>

# 查看状态
lark-cli auth status
```

---

## im

即时通讯：收发消息、管理群聊。

```
lark-cli im [command]
```

### Shortcuts（推荐优先使用）

| 命令                             | 说明                                                  |
| ------------------------------ | --------------------------------------------------- |
| `+messages-send`               | 发送消息（私信/群聊，支持 text/markdown/image/file/video/audio） |
| `+messages-reply`              | 回复消息（支持 thread 回复）                                  |
| `+messages-mget`               | 批量获取消息详情（最多 50 条）                                   |
| `+messages-search`             | 跨会话搜索消息（关键词/发件人/时间过滤）                               |
| `+chat-create`                 | 创建群聊或话题群                                            |
| `+chat-list`                   | 列出当前用户/机器人所在的群                                      |
| `+chat-search`                 | 按关键词搜索群聊                                            |
| `+chat-update`                 | 更新群名称/描述                                            |
| `+chat-messages-list`          | 列出群聊/P2P 消息（支持时间范围/分页）                              |
| `+threads-messages-list`       | 列出 thread 中的消息                                      |
| `+messages-resources-download` | 下载消息中的图片/文件（支持大文件分片）                                |
| `+flag-create`                 | 创建书签（消息层/feed 层）                                    |
| `+flag-list`                   | 列出书签                                                |
| `+flag-cancel`                 | 取消书签                                                |

### 原生 API 资源

| 资源 | 方法 | 说明 |
|------|------|------|
| `chats` | `create / get / update / link` | 群聊管理 |
| `chat.members` | `create / get / delete / bots` | 群成员管理 |
| `messages` | `delete / forward / merge_forward / read_users` | 消息操作 |
| `reactions` | `create / delete / list / batch_query` | 表情回应 |
| `pins` | `create / delete / list` | 置顶消息 |
| `images` | `create` | 上传图片 |
| `threads` | `forward` | 转发话题 |

**`+messages-send` 参数：**

| 参数 | 必填 | 说明 |
|------|------|------|
| `--chat-id <id>` | 二选一 | 群聊 ID（`oc_xxx`） |
| `--user-id <id>` | 二选一 | 用户 open_id（`ou_xxx`） |
| `--text <str>` | 三选一 | 纯文本消息 |
| `--markdown <str>` | 三选一 | Markdown（自动转 post） |
| `--content <json>` | 三选一 | 精确 JSON  payload |
| `--image <path\|key>` | — | 发送图片 |
| `--file <path\|key>` | — | 发送文件 |
| `--video <path\|key>` | — | 发送视频（需配 `--video-cover`） |
| `--audio <path\|key>` | — | 发送音频 |
| `--as user\|bot` | — | 发送身份（默认 bot） |

**示例：**
```bash
# 发送纯文本到私信
lark-cli im +messages-send --user-id ou_xxx --as user --text "Hello"

# 发送 Markdown 到群
lark-cli im +messages-send --chat-id oc_xxx --markdown $'## 标题\n\n内容'

# 搜索消息
lark-cli im +messages-search --query "报告" --as user

# 创建群聊
lark-cli im +chat-create --chat-mode group --user-id ou_xxx
```

---

## docs

文档与内容操作（Docs v2，v1 已弃用）。

```
lark-cli docs [command] [--api-version v2]
```

| 命令 | 说明 |
|------|------|
| `+create` | 创建飞书文档 |
| `+fetch` | 获取文档内容 |
| `+update` | 更新文档内容 |
| `+search` | 搜索文档/Wiki/电子表格（Search v2） |
| `+media-upload` | 上传图片/附件到文档 block |
| `+media-insert` | 插入本地图片/文件到文档 |
| `+media-download` | 下载文档中的媒体文件 |
| `+media-preview` | 预览文档媒体文件 |
| `+whiteboard-update` | 更新白板（mermaid/plantuml） |

**示例：**
```bash
# 搜索文档
lark-cli docs +search --query "chrome" --as user --format pretty

# 获取文档内容
lark-cli docs +fetch --doc-token "AMBJdByOtoTbCQx0kCjcoTh7nXe" --api-version v2
```

---

## sheets

电子表格操作。

```
lark-cli sheets [command]
```

| 命令 | 说明 |
|------|------|
| `+create` | 创建电子表格 |
| `+info` | 查看表格/工作表信息 |
| `+append` | 追加行数据 |
| `+find` | 查找单元格 |
| `+add-dimension` | 末尾添加行/列 |
| `+insert-dimension` | 指定位置插入行/列 |
| `+delete-dimension` | 删除行/列 |
| `+create-sheet` | 创建新的工作表 |
| `+delete-sheet` | 删除工作表 |
| `+copy-sheet` | 复制工作表 |
| `+batch-set-style` | 批量设置单元格样式 |
| `+create-filter-view` | 创建筛选视图 |
| `+export` | 导出表格（异步任务） |
| `+create-float-image` | 创建浮动图片 |
| `+get-float-image` | 获取浮动图片 |
| `+delete-float-image` | 删除浮动图片 |
| `+get-dropdown` | 获取下拉列表设置 |

---

## calendar

日历、事件、参会人管理。

```
lark-cli calendar [command]
```

| 命令 | 说明 |
|------|------|
| `+agenda` | 查看日历日程（默认今天） |
| `+create` | 创建日历事件并邀请参会人 |
| `+update` | 更新日历事件 |
| `+rsvp` | 回复事件（接受/拒绝/待定） |
| `+freebusy` | 查询用户忙闲状态 |
| `+room-find` | 查找可用会议室 |
| `+suggestion` | 智能推荐空闲时间段 |
| `calendars` | 日历资源管理 |
| `events` | 事件资源管理 |
| `event.attendees` | 参会人管理 |

**示例：**
```bash
# 查看今日日程
lark-cli calendar +agenda

# 创建事件
lark-cli calendar +create --summary "团队会议" --start "2026-05-16T10:00:00+08:00" --end "2026-05-16T11:00:00+08:00"
```

---

## contact

通讯录操作。

```
lark-cli contact [command]
```

| 命令 | 说明 |
|------|------|
| `+get-user` | 获取用户信息（不填 user_id 则获取自己） |
| `+search-user` | 按关键词搜索用户（需要 `--as user`） |

---

## drive

云盘文件、评论、权限、上传管理。

```
lark-cli drive [command]
```

| 命令 | 说明 |
|------|------|
| `+upload` | 上传本地文件到云盘 |
| `+download` | 从云盘下载文件到本地 |
| `+create-folder` | 在云盘创建文件夹 |
| `+delete` | 删除云盘文件/文件夹 |
| `+move` | 移动文件/文件夹 |
| `+create-shortcut` | 创建云盘快捷方式 |
| `+search` | 搜索云盘中的文档/表格（Search v2） |
| `+add-comment` | 添加评论（支持 doc/docx/sheet/slides，自动解析 Wiki URL） |
| `+apply-permission` | 申请文档查看/编辑权限 |
| `+export` | 导出文档/docx/sheet/bitable 到本地 |
| `+import` | 导入本地文件到云盘（转为云文档） |
| `+push` | 本地目录 → 云盘（单向同步） |
| `+pull` | 云盘 → 本地（单向同步） |
| `+status` | 比较本地与云盘文件差异 |
| `+task-result` | 轮询异步任务结果（导入/导出/移动/删除） |
| `files` | 文件资源管理 |
| `permission.members` | 权限成员管理 |

---

## wiki

知识库空间与节点管理。

```
lark-cli wiki [command]
```

| 命令 | 说明 |
|------|------|
| `+space-list` | 列出可访问的知识库空间 |
| `+node-list` | 列出知识库节点（支持按父节点遍历） |
| `+node-create` | 创建知识库节点（自动解析 space） |
| `+node-copy` | 复制知识库节点到目标空间 |
| `+move` | 移动知识库节点（或把云盘文档移入 Wiki） |
| `+delete-space` | 删除知识库空间（异步轮询） |
| `nodes` | 节点资源管理 |
| `spaces` | 空间资源管理 |
| `members` | 成员管理 |

**示例：**
```bash
# 搜索 Wiki 文档
lark-cli docs +search --query "chrome" --as user --format pretty

# 列出知识库空间
lark-cli wiki +space-list --as user
```

---

## base

多维表格（Bitable）管理：数据表/字段/记录/视图/仪表盘/工作流/表单/权限。

```
lark-cli base [command]
```

| 命令 | 说明 |
|------|------|
| `+base-create` | 创建多维表格 |
| `+base-get` | 获取多维表格信息 |
| `+base-copy` | 复制多维表格 |
| `+advperm-enable` | 开启高级权限 |
| `+advperm-disable` | 关闭高级权限 |
| `+dashboard-create` | 创建仪表盘 |
| `+dashboard-block-create` | 创建仪表盘 block |
| `+dashboard-block-list` | 列出仪表盘 block |
| `+dashboard-arrange` | 自动布局仪表盘（服务端） |

---

## slides

幻灯片创建与管理，读取内容，添加/删除幻灯片。

```
lark-cli slides [command]
```

| 命令 | 说明 |
|------|------|
| `+create` | 创建幻灯片演示文稿 |
| `+media-upload` | 上传图片到幻灯片（返回 file_token） |
| `+replace-slide` | 替换幻灯片中的元素（block_replace） |
| `presentations` | 演示文稿资源管理 |
| `presentation.slide` | 单张幻灯片管理 |

---

## task

任务、任务列表、子任务管理。

```
lark-cli task [command]
```

| 命令 | 说明 |
|------|------|
| `+create` | 创建任务 |
| `+complete` | 标记任务为完成 |
| `+reopen` | 重新打开已完成的任务 |
| `+get-my-tasks` | 列出分配给我的任务 |
| `+get-related-tasks` | 列出与我相关的任务 |
| `+assign` | 分配/移除任务成员 |
| `+followers` | 管理任务关注人 |
| `+comment` | 添加任务评论 |
| `+reminder` | 管理任务提醒 |
| `+search` | 搜索任务 |
| `+set-ancestor` | 设置/清除任务父级 |
| `+subscribe-event` | 订阅任务事件 |
| `+tasklist-create` | 创建任务列表 |
| `+tasklist-members` | 管理任务列表成员 |

---

## vc

视频会议与会议纪要管理。

```
lark-cli vc [command]
```

| 命令 | 说明 |
|------|------|
| `+meeting-join` | 机器人加入会议（按会议号） |
| `+meeting-leave` | 机器人离开会议 |
| `+meeting-events` | 列出机器人会议事件 |
| `+notes` | 查询会议纪要（按 meeting-id/minute-token/calendar-event-id） |
| `+recording` | 查询会议录制 minute_token |
| `+search` | 搜索会议记录（至少包含一个过滤条件） |
| `meeting` | 会议资源管理 |

---

## whiteboard

创建与编辑白板（支持 mermaid / plantuml）。

```
lark-cli whiteboard [command]
```

配合 `docs +whiteboard-update` 使用，可在文档中嵌入白板。

---

## mail

邮件、草稿、文件夹、通讯录管理。

```
lark-cli mail [command]
```

| 命令 | 说明 |
|------|------|
| `drafts` | 草稿管理 |
| `emails` | 邮件管理 |
| `folders` | 文件夹管理 |
| `contacts` | 邮件通讯录 |

---

## markdown

云盘原生 Markdown 文件：创建、读取、覆盖。

```
lark-cli markdown [command]
```

| 命令 | 说明 |
|------|------|
| `create` | 创建 Markdown 文件 |
| `fetch` | 获取 Markdown 文件内容 |
| `overwrite` | 覆盖 Markdown 文件内容 |

---

## minutes

会议纪要内容与元数据检索。

```
lark-cli minutes [command]
```

| 命令 | 说明 |
|------|------|
| `metadata` | 获取会议纪要元数据 |
| `content` | 获取会议纪要内容 |

---

## okr

飞书 OKR：目标、关键结果、对齐、指标、进展管理。

```
lark-cli okr [command]
```

| 命令 | 说明 |
|------|------|
| `objectives` | OKR 目标管理 |
| `key_results` | 关键结果管理 |
| `alignments` | 对齐关系管理 |
| `indicators` | 指标管理 |
| `progresses` | 进展更新管理 |

---

## approval

审批实例与任务管理。

```
lark-cli approval [command]
```

| 命令 | 说明 |
|------|------|
| `instances` | 审批实例管理 |
| `tasks` | 审批任务管理 |

---

## attendance

考勤记录查询。

```
lark-cli attendance [command]
```

---

## event

消费与管理实时事件（Webhook/事件订阅）。

```
lark-cli event [command]
```

---

## config / profile

```
lark-cli config [command]    # 全局 CLI 配置管理
lark-cli profile [command]   # 管理配置 profile（多账号切换）
```

---

## schema / api

底层 API 调用与参数查看。

```bash
# 查看 API 方法的参数结构（必须先看这个再调用）
lark-cli schema <service.resource.method> [--format pretty]

# 通用 API 调用
lark-cli api <GET|POST|PUT|PATCH|DELETE> <path> [--params <json>] [--data <json>]

# 示例：列出日历
lark-cli api GET /open-apis/calendar/v4/calendars

# 示例：查看 calendar event 创建参数
lark-cli schema calendar.events.create --format pretty
```

---

## 其他工具命令

| 命令 | 说明 |
|------|------|
| `lark-cli doctor` | CLI 健康检查（配置/授权/连通性） |
| `lark-cli update` | 更新 lark-cli 到最新版本 |
| `lark-cli --version` | 查看当前版本 |
| `lark-cli help [command]` | 查看命令帮助 |

---

## 常用速查（Cheat Sheet）

### 发送消息
```bash
lark-cli im +messages-send --user-id ou_xxx --as user --text "内容"
lark-cli im +messages-send --chat-id oc_xxx --markdown $'## 标题\n\n正文'
```

### 搜索文档
```bash
lark-cli docs +search --query "关键词" --as user --format pretty
```

### 查看日历
```bash
lark-cli calendar +agenda
lark-cli calendar +create --summary "会议" --start "2026-05-16T10:00:00+08:00"
```

### 授权
```bash
lark-cli auth login --scope "im:message im:message.send_as_user"
lark-cli auth status
```

### 上传文件到云盘
```bash
lark-cli drive +upload --file-path "./report.pdf"
```

### 通用 API
```bash
lark-cli schema calendar.events.create --format pretty   # 查参数
lark-cli api GET /open-apis/calendar/v4/calendars     # 直接调 API
```

---

*本文档由 AI 助手根据 lark-cli v1.0.32 实际命令输出整理，命令以实际安装版本为准。*
