# /Update — 全量更新：素材编译 + 本地索引 + 博客 Wiki

## 触发条件

- 用户输入 `/Update`
- 用户说"全量更新"、"一键更新"、"update all"

## 作用

同时启动 3 个 Agent，并行执行以下三个技能：

| Agent | 技能 | 职责 |
|-------|------|------|
| Agent-A | `/up-Library-ingest` | 编译 `01-输入/` 素材到 `Library/` |
| Agent-B | `/up-index` | 同步 `index.md` 与 6 个子目录 |
| Agent-C | `/up-blog-Wiki` | 同步 `posts/` 到 `wiki/` 对外索引 |

## 执行流程

### 1. 启动 3 个并行 Agent

在同一条消息中发出 3 个 Agent tool call（`run_in_background: false`），每个 Agent 的 prompt 包含对应技能的完整指令。

**Agent-A prompt（Library 编译）**：

```
你是 Library 编译代理。执行 /up-Library-ingest 技能，工作目录为 D:\project2026\fuwari\src\content。

请按照以下流程执行：

1. 扫描 7 个编译目录中的 .md 文件：
   - 01-输入/01-Clipings/
   - 01-输入/02-get笔记/
   - 01-输入/03-微信/
   - 01-输入/04-选题/
   - 01-输入/05-口喷稿/
   - 01-输入/06-微信读书/
   - 01-输入/07-Daily/

2. 如果没有待处理文件，返回"无待编译文件"并结束。

3. 如果有待处理文件，为每个有文件的目录启动子代理并行编译（同一条消息中并行发出多个 Agent tool call）：
   - 读取源文件，提取实体、概念、核心事实
   - 写入 Library/sources/（摘要-<中文标题>.md）
   - 写入 Library/entities/（<中文名称>.md，中文优先，专有名词保留英文）
   - 写入 Library/concepts/（<中文名称>.md）
   - 已存在页面增量合并，冲突加 ## 知识冲突
   - 所有页面必须有 ## 关联连接

4. 子代理全部完成后：
   - 去重检查
   - 更新 Library/index.md
   - 追加 Library/log.md
   - 归档已处理源文件到 01-输入/archive/

5. 返回汇总报告。

遵循 Library/schema.md 中的页面模板。使用简体中文。文件名优先中文。
```

**Agent-B prompt（本地索引同步）**：

```
你是本地索引同步代理。执行 /up-index 技能，工作目录为 D:\project2026\fuwari\src\content。

请按照以下流程执行：

1. 扫描 6 个子目录的 .md 文件：
   - Zen/、Xenia/ → 列表格式
   - posts/AIHacks/、posts/Software/、posts/Technical/、posts/Workflow/ → 表格格式（日期+文件）

2. 读取 index.md，解析各章节链接列表。

3. 对比磁盘文件与 index.md 链接，生成差异报告。

4. 有差异时，用磁盘当前状态重写该章节链接列表：
   - 列表格式：- [显示名](路径/filename.md)
   - 表格格式：| 日期 | 文件 |，日期用 yyyy/MM/dd，同日加 (2)(3) 序号，按修改时间倒序
   - URL 编码：空格→%20，+→%2B，&→%26，中文按 URI 标准编码

5. 返回汇总报告（各章节新增/删除数量）。

注意：
- 不修改 ### 标题行和章节间空行
- 不修改不属于这 6 个章节的内容
- 只在有差异时才编辑
```

**Agent-C prompt（博客 Wiki 同步）**：

```
你是博客 Wiki 同步代理。执行 /up-blog-Wiki 技能，工作目录为 D:\project2026\fuwari\src\content。

请按照以下流程执行：

1. 扫描 posts/ 下四个分类目录（AIHacks/Software/Technical/Workflow），读取每篇文章 frontmatter：
   - 提取 title、published、tags、category、draft
   - 跳过 draft: true
   - 按 published 降序排列

2. 更新 wiki/sources/ 下 4 个分类页：
   - wiki/sources/aihacks.md → posts/AIHacks/
   - wiki/sources/software.md → posts/Software/
   - wiki/sources/technical.md → posts/Technical/
   - wiki/sources/workflow.md → posts/Workflow/
   链接格式：../../content/posts/<分类>/<文件名>.md

3. 更新 wiki/overview.md（文章总数、各分类数、最近更新 10 篇）

4. 更新 wiki/index.md（sources 区域文章数）

5. 链接校验：检查 wiki/ 下所有断链

6. 追加 wiki/log.md

7. 返回汇总报告。

注意：
- 不修改 posts/ 下任何文件
- 不修改 wiki 的 schema.md、purpose.md、目录.md、meta.json.md
- 链接严格使用 ../../content/posts/... 相对路径
- 使用简体中文
```

### 2. 汇总报告

3 个 Agent 全部完成后，输出汇总：

```
## /Update 完成

### Agent-A：Library 编译
- 处理文件：X 个
- 新建页面：Sources X + Entities X + Concepts X
- 跳过/冲突：描述

### Agent-B：本地索引同步
- Zen: +X 新增, -X 删除
- Xenia: +X 新增, -X 删除
- AlHacks/Software/Technical/Workflow: 各自变化

### Agent-C：博客 Wiki 同步
- 文章总数：X 篇
- 更新分类页：X 个
- 断链：X 处（如有）
```

## 设计原则

- **并行执行**：3 个 Agent 在同一消息中并行发出，不串行等待
- **互不干扰**：三个技能操作的目录和文件不重叠，可安全并行
  - Agent-A：读写 `01-输入/`（只读）+ `Library/`（读写）
  - Agent-B：读写 `index.md` + 扫描 `Zen/` `Xenia/` `posts/`
  - Agent-C：读写 `wiki/` + 扫描 `posts/`
- **唯一共享文件**：`posts/` 目录被 Agent-B 和 Agent-C 同时扫描，但都只读不写，无冲突
