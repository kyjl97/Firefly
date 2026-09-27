---
title: Obsidian CLI 全命令参考
created: 2026-05-13
tags: [obsidian, cli, reference]
aliases: [obsidian cli命令, obsidian命令行]
---

# Obsidian CLI 全命令参考

> **版本**: 1.12.7 | **来源**: [obsidian.md/zh/cli](https://obsidian.md/zh/cli) + `obsidian help` 实测
> **本机路径**: `D:\software\Obsidian\Obsidian.exe`
> **Vault 列表**: `content`, `zhishiku`, `obsidian-vault`

---

## 通用语法

```bash
obsidian <命令> vault=<vault名> [选项]
```

- `file=<name>` — 按 wikilink 名定位文件
- `path=<path>` — 按相对路径定位文件
- 含空格的参数用引号：`name="My Note"`
- 换行用 `\n`，制表用 `\t`

---

## 1. 文件操作

### create — 创建文件
```bash
obsidian create vault=content name="新笔记" content="初始内容"
obsidian create vault=content path="folder/new.md" template="模板名"
obsidian create vault=content name="笔记" open newtab
```

| 选项 | 说明 |
|------|------|
| `name=<name>` | 文件名（不含扩展名） |
| `path=<path>` | 文件路径（含扩展名） |
| `content=<text>` | 初始内容 |
| `template=<name>` | 模板名 |
| `overwrite` | 覆盖已存在文件 |
| `open` | 创建后打开 |
| `newtab` | 新标签打开 |

### read — 读取文件
```bash
obsidian read vault=content file="AI文章合集"
obsidian read vault=content path="posts/AIHacks/codex-cn-bridge.md"
```

### open — 打开文件
```bash
obsidian open vault=content file="index"
obsidian open vault=content path="posts/Technical/博客封面与画廊.md" newtab
```

### delete — 删除文件
```bash
obsidian delete vault=content path="tmp/old-note.md"
obsidian delete vault=content path="tmp/old-note.md" permanent
```

| 选项 | 说明 |
|------|------|
| `permanent` | 跳过回收站，永久删除 |

### move — 移动/重命名（自动更新所有引用）
```bash
obsidian move vault=content file="old-name" to="new-folder/new-name"
```

### rename — 重命名
```bash
obsidian rename vault=content file="note" name="new-name"
```

### append — 追加内容
```bash
obsidian append vault=content file="日记" content="追加文本\n第二行"
obsidian append vault=content path="daily/2026-05-13.md" content="新条目" inline
```

| 选项 | 说明 |
|------|------|
| `content=<text>` | 内容（必填） |
| `inline` | 不加前置换行 |

### prepend — 前置内容
```bash
obsidian prepend vault=content file="日记" content="放在最前面的文本"
```

### file — 文件信息
```bash
obsidian file vault=content path="posts/AIHacks/Claude code 安装.md"
```

---

## 2. 搜索与浏览

### search — 搜索
```bash
obsidian search vault=content query="Claude" limit=10
obsidian search vault=content query="frontmatter" path="posts" case format=json
obsidian search vault=content query="todo" total
```

| 选项 | 说明 |
|------|------|
| `query=<text>` | 搜索关键词（必填） |
| `path=<folder>` | 限制搜索目录 |
| `limit=<n>` | 最大文件数 |
| `total` | 仅返回匹配数 |
| `case` | 区分大小写 |
| `format=text\|json` | 输出格式 |

### search:context — 搜索含上下文
```bash
obsidian search:context vault=content query="TODO" limit=5 format=json
```

### search:open — 在 UI 打开搜索结果
```bash
obsidian search:open vault=content query="待办事项"
```

### files — 列出文件
```bash
obsidian files vault=content folder="posts" ext="md"
obsidian files vault=content total
```

### folders — 列出文件夹
```bash
obsidian folders vault=content folder="posts"
obsidian folders vault=content total
```

### folder — 文件夹信息
```bash
obsidian folder vault=content path="posts" info=files
obsidian folder vault=content path="posts" info=size
```

### random — 随机笔记
```bash
obsidian random vault=content folder="posts" newtab
obsidian random:read vault=content folder="posts"
```

### recents — 最近打开
```bash
obsidian recents vault=content
obsidian recents vault=content total
```

---

## 3. 链接分析

### links — 出链
```bash
obsidian links vault=content file="index"
obsidian links vault=content path="Yoke/斜杠命令合集.md" total
```

### backlinks — 入链（反向链接）
```bash
obsidian backlinks vault=content file="导航栏抖动修复记" counts
obsidian backlinks vault=content file="导航栏抖动修复记" format=json
```

| 选项 | 说明 |
|------|------|
| `counts` | 包含链接计数 |
| `total` | 仅返回入链数量 |
| `format=json\|tsv\|csv` | 输出格式（默认 tsv） |

### unresolved — 断链检测
```bash
obsidian unresolved vault=content total
obsidian unresolved vault=content verbose format=json
```

### orphans — 孤儿文件（无入链）
```bash
obsidian orphans vault=content total
obsidian orphans vault=content all
```

### deadends — 死胡同文件（无出链）
```bash
obsidian deadends vault=content total
obsidian deadends vault=content all
```

---

## 4. 属性（Frontmatter）

### properties — 列出属性
```bash
obsidian properties vault=content counts sort=count
obsidian properties vault=content file="index" format=json
obsidian properties vault=content name="tags" total
```

| 选项 | 说明 |
|------|------|
| `name=<name>` | 统计特定属性出现次数 |
| `sort=count` | 按出现次数排序 |
| `counts` | 包含出现次数 |
| `active` | 当前活动文件 |
| `format=yaml\|json\|tsv` | 输出格式 |

### property:read — 读取属性值
```bash
obsidian property:read vault=content name="tags" file="AI文章合集"
```

### property:set — 设置属性
```bash
obsidian property:set vault=content name="status" value="done" file="note"
obsidian property:set vault=content name="tags" value="[\"todo\", \"important\"]" type=list file="note"
obsidian property:set vault=content name="rating" value="5" type=number path="posts/review.md"
```

| 类型 | 说明 |
|------|------|
| `text` | 文本（默认） |
| `list` | 列表 |
| `number` | 数字 |
| `checkbox` | 复选框 |
| `date` | 日期 |
| `datetime` | 日期时间 |

### property:remove — 删除属性
```bash
obsidian property:remove vault=content name="old-field" file="note"
```

---

## 5. 标签

### tags — 列出所有标签
```bash
obsidian tags vault=content counts sort=count
obsidian tags vault=content file="AI文章合集" format=json
obsidian tags vault=content total active
```

| 选项 | 说明 |
|------|------|
| `counts` | 包含使用次数 |
| `sort=count` | 按次数排序 |
| `active` | 活动文件 |
| `format=json\|tsv\|csv` | 输出格式 |

### tag — 标签详情
```bash
obsidian tag vault=content name="todo" total verbose
```

---

## 6. 任务

### tasks — 列出任务
```bash
obsidian tasks vault=content todo
obsidian tasks vault=content done
obsidian tasks vault=content file="日记" verbose
obsidian tasks vault=content daily
obsidian tasks vault=content total format=json
```

### task — 操作单个任务
```bash
obsidian task vault=content path="日记.md" line=15 toggle
obsidian task vault=content path="日记.md" line=15 done
obsidian task vault=content path="日记.md" line=15 todo
obsidian task vault=content daily line=5 toggle
obsidian task vault=content ref="日记.md:15" status="x"
```

---

## 7. 日记

```bash
obsidian daily vault=content
obsidian daily vault=content paneType=split
obsidian daily:read vault=content
obsidian daily:path vault=content
obsidian daily:append vault=content content="## 今日事项\n- [ ] 任务" open
obsidian daily:prepend vault=content content="前置内容" inline
```

| 选项 | 说明 |
|------|------|
| `paneType=tab\|split\|window` | 打开方式 |
| `inline` | 不加换行 |
| `open` | 添加后打开 |

---

## 8. 书签

```bash
obsidian bookmark vault=content file="posts/重要笔记.md" title="重要参考"
obsidian bookmark vault=content folder="posts/AIHacks" title="AI 合集"
obsidian bookmark vault=content search="todo" title="待办搜索"
obsidian bookmark vault=content url="https://obsidian.md" title="官网"

obsidian bookmarks vault=content verbose format=json
obsidian bookmarks vault=content total
```

---

## 9. 插件管理

```bash
obsidian plugins vault=content filter=community versions format=json
obsidian plugins:enabled vault=content

obsidian plugin:install vault=content id="dataview" enable
obsidian plugin:uninstall vault=content id="old-plugin"

obsidian plugin:enable vault=content id="dataview" filter=community
obsidian plugin:disable vault=content id="old-plugin"

obsidian plugin vault=content id="dataview"
obsidian plugin:reload vault=content id="my-plugin"

obsidian plugins:restrict vault=content on
obsidian plugins:restrict vault=content off
```

---

## 10. 主题与 CSS 片段

```bash
obsidian themes vault=content versions
obsidian theme vault=content
obsidian theme vault=content name="Minimal"

obsidian theme:install vault=content name="Minimal" enable
obsidian theme:set vault=content name="Minimal"
obsidian theme:set vault=content name=""
obsidian theme:uninstall vault=content name="Old Theme"

obsidian snippets vault=content
obsidian snippets:enabled vault=content
obsidian snippet:enable vault=content name="my-style"
obsidian snippet:disable vault=content name="my-style"
```

---

## 11. 模板

```bash
obsidian templates vault=content total

obsidian template:insert vault=content name="日记模板"

obsidian template:read vault=content name="日记模板" resolve title="新日记"

# Templater 插件扩展
obsidian templater:create-from-template vault=content template="templates/daily.md" file="daily/2026-05-13.md" open
```

---

## 12. 历史版本

```bash
obsidian history vault=content file="index"
obsidian history:list vault=content

obsidian history:read vault=content file="index" version=1
obsidian history:restore vault=content file="index" version=3
obsidian history:open vault=content file="index"

obsidian diff vault=content file="index" from=1 to=3
obsidian diff vault=content file="index" filter=local
```

---

## 13. 快捷键与命令

```bash
obsidian commands vault=content
obsidian commands vault=content filter="editor"

obsidian command vault=content id="editor:toggle-fold"

obsidian hotkey vault=content id="command-palette:open" verbose
obsidian hotkeys vault=content all format=json
obsidian hotkeys vault=content verbose total
```

---

## 14. UI 操作

```bash
obsidian tabs vault=content ids
obsidian tab:open vault=content file="posts/new.md" view="markdown"

obsidian workspace vault=content ids
obsidian web vault=content url="https://obsidian.md" newtab

obsidian reload vault=content
obsidian restart vault=content
```

---

## 15. Vault 管理

```bash
obsidian vault vault=content
obsidian vault vault=content info=files
obsidian vault vault=content info=folders
obsidian vault vault=content info=size

obsidian vaults vault=content
obsidian vaults vault=content verbose
obsidian vaults vault=content total

obsidian version vault=content
```

---

## 16. 别名管理

```bash
obsidian aliases vault=content
obsidian aliases vault=content file="AI文章合集" verbose
obsidian aliases vault=content total
obsidian aliases vault=content active
```

---

## 17. 大纲

```bash
obsidian outline vault=content file="index"
obsidian outline vault=content file="index" format=md
obsidian outline vault=content file="index" format=json
obsidian outline vault=content file="index" total
```

---

## 18. Base（数据库视图）

```bash
obsidian bases vault=content
obsidian base:views vault=content file="my-base"

obsidian base:query vault=content file="my-base" view="表格" format=json

obsidian base:create vault=content file="my-base" view="表格" name="新条目" content="数据" open
```

---

## 19. 开发者工具

```bash
obsidian dev:cdp vault=content method="Page.captureScreenshot" params='{"format":"png"}'
obsidian dev:debug vault=content on
obsidian dev:debug vault=content off

obsidian dev:dom vault=content selector=".workspace-leaf-content" text
obsidian dev:dom vault=content selector="h1" all text
obsidian dev:dom vault=content selector="a.internal-link" attr="href" all

obsidian dev:css vault=content selector=".cm-editor" prop="font-size"

obsidian dev:console vault=content limit=20 level=error
obsidian dev:console vault=content clear

obsidian dev:errors vault=content
obsidian dev:errors vault=content clear

obsidian dev:screenshot vault=content path="screenshot.png"

obsidian dev:mobile vault=content on
obsidian dev:mobile vault=content off

obsidian devtools vault=content
obsidian eval vault=content code="app.vault.getMarkdownFiles().length"
```

---

## 实战示例

### 批量添加标签
```powershell
$files = obsidian files vault=content folder="posts" format=json
# 遍历 files，逐个 property:set tags
```

### 每日工作流
```bash
# 早上
obsidian daily vault=content paneType=tab
obsidian tasks vault=content todo

# 晚上
obsidian daily:append vault=content content="## 今日总结\n- 完成项目 A"
```

### 清理断链
```bash
obsidian unresolved vault=content verbose format=json
# 遍历结果，修复或删除
```

### 迁移笔记（自动更新引用）
```bash
obsidian move vault=content file="旧名称" to="新分类/新名称"
```

---

## 速查索引

| 想做什么 | 命令 |
|---------|------|
| 读文件 | `read` |
| 写/编辑 | `create` `append` `prepend` |
| 删文件 | `delete` |
| 重命名（更新引用） | `move` 或 `rename` |
| 搜内容 | `search` `search:context` |
| 列文件 | `files` |
| 找断链 | `unresolved` |
| 找孤儿 | `orphans` |
| 看出/入链 | `links` `backlinks` |
| 读属性 | `property:read` |
| 写属性 | `property:set` |
| 删属性 | `property:remove` |
| 列标签 | `tags` |
| 列/操作任务 | `tasks` `task` |
| 日记 | `daily` `daily:append` `daily:read` |
| 历史版本 | `history` `history:restore` |
| 大纲 | `outline` |
| 插件 | `plugin:install/enable/disable/uninstall` |
| 主题 | `theme:install` `theme:set` |

---

## 注意事项

1. 需先开启 Obsidian GUI，CLI 才能连接到 vault
2. `file=` 用 wikilink 名，`path=` 用相对路径
3. `move` / `rename` 自动更新全库引用
4. `create` 默认不覆盖，需加 `overwrite`
5. 多数命令不指定 file/path 时默认操作当前活动文件
6. Shell 特殊字符：`\n` = 换行, `\t` = 制表
