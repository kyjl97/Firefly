# /up-blog-Wiki — 更新博客对外 Wiki

## 触发条件

- 用户输入 `/up-blog-Wiki`
- 用户说"更新博客 wiki"、"同步 wiki"

## 作用

将 `posts/` 下的博客文章索引同步到 `wiki/`，保持对外链接正常跳转。

## 执行流程

### 1. 扫描 posts/ 目录

遍历 `posts/` 下四个分类目录，读取每篇文章的 frontmatter：

- 提取：`title`、`published`、`tags`、`category`、`draft`
- 跳过 `draft: true` 的草稿
- 按 `published` 日期降序排列

### 2. 更新 sources/ 分类页

更新以下 4 个文件，每个对应一个 posts 分类：

| 文件 | 对应目录 |
|------|---------|
| `wiki/sources/aihacks.md` | `posts/AIHacks/` |
| `wiki/sources/software.md` | `posts/Software/` |
| `wiki/sources/technical.md` | `posts/Technical/` |
| `wiki/sources/workflow.md` | `posts/Workflow/` |

每个文件格式：

```markdown
# Source: <分类名>

## Overview

<分类描述>

- **文章数**：X
- **最近更新**：YYYY-MM-DD

## File Listing

| 文件 | 标题 | 主题 | 日期 |
|------|------|------|------|
| [文件名.md](../../content/posts/分类/文件名.md) | 标题 | 主题 | 日期 |

## Key Exports

- <该分类的核心产出总结>
```

**链接格式**：必须使用 `../../content/posts/<分类>/<文件名>.md` 相对路径，确保博客网页渲染后正常跳转。

### 3. 更新 overview.md

- 更新文章总数、各分类文章数、占比、最近更新日期
- 更新「最近更新」列表（取全局最新 10 篇）
- 保持现有格式不变

### 4. 更新 index.md

- 更新 sources 区域的文章数
- 如有新增/删除的 entities、concepts、synthesis 页面，同步更新

### 5. 链接校验

扫描 `wiki/` 下所有 `.md` 文件中的链接：
- 检查 `../../content/posts/...` 路径对应的文件是否存在
- 检查 wiki 内部链接（`entities/`、`concepts/`、`sources/`、`synthesis/`）目标是否存在
- 检查是否有多余的分类页（如已删除的 xenia.md、zen.md）
- 报告所有断链

### 6. 更新 log.md

在 `wiki/log.md` 顶部追加：

```markdown
## YYYY-MM-DD

- **HH:MM** — 更新 Wiki 统计与分类索引
  - 重新扫描 posts/ 目录，识别 X 个分类、Y 篇已发布文章
  - 更新 sources/ 下各分类页
  - 更新 overview、index
  - 链接校验：断链 X 处（如有）
```

## 约束

- **不修改** `posts/` 下的任何文件
- **不修改** wiki 的 schema.md、purpose.md、目录.md、meta.json.md（这些是结构定义，不需要随文章更新）
- 链接格式严格使用 `../../content/posts/...` 相对路径
- 保持现有文件的格式和结构，只更新数据部分
- 使用简体中文
