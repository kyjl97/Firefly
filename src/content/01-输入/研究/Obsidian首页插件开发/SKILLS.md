# Home Console — Skill 映射表

## Skill 按钮清单

所有按钮点击后在 Obsidian Terminal 中执行 `claude '命令'`。

---

### 第一行：每日运转

| # | 按钮名 | 图标 | 终端命令 | 说明 |
|---|--------|------|---------|------|
| 1 | 任务 | 📋 | `claude '$任务管理'` | 打开任务看板视图 |
| 2 | 想法 | 💡 | `claude '$快速想法'` | 快速捕获一个想法到 04-选题 |
| 3 | 选题 | 📝 | `claude '$选题规划'` | 查看/管理选题池 |
| 4 | 灵感 | 💎 | `claude '$灵感记录'` | 记录灵感碎片 |
| 5 | 日志 | 📅 | `claude '$日常-每日开场'` | 创建/编辑今日 Daily Note |

---

### 第二行：知识管理

| # | 按钮名 | 图标 | 终端命令 | 对应 Skill 文件 | 说明 |
|---|--------|------|---------|---------------|------|
| 6 | 笔记分诊 | 🧹 | `claude '$笔记分诊'` | 自定义 | 扫描 01-输入/ 未归类笔记，自动分发到正确目录 |
| 7 | 收件箱归档 | 📥 | `claude '/up-Library-ingest'` | 知识库管理 | 读取 01-输入/ 素材，提炼到 Library/，源文件归档 |
| 8 | 查知识库 | 🔍 | `claude '/Library-query'` | 知识库管理 | 检索 Library 索引，综合回答并用 [[]] 标注来源 |
| 9 | 知识库体检 | 🧪 | `claude '/Library-lint'` | 知识库管理 | 检查死链、孤儿页面、索引遗漏、知识冲突 |
| 10 | 全量同步 | 🔄 | `claude '/Update'` | 知识库管理 | 同时更新 index + Library + wiki |
| 11 | 索引同步 | 📋 | `claude '/up-index'` | 知识库管理 | 同步 index.md 与 6 个目录的文件索引 |
| 12 | Wiki同步 | 🌐 | `claude '/up-blog-Wiki'` | 知识库管理 | 同步 posts 文章元数据到 wiki/，校验外链有效性 |

---

### 第三行：内容生产

| # | 按钮名 | 图标 | 终端命令 | 对应 Skill 文件 | 说明 |
|---|--------|------|---------|---------------|------|
| 13 | 选题生成 | 💡 | `claude '/huashu-topic-gen'` | huashu-topic-gen | 基于素材生成选题角度 |
| 14 | 写文章 | ✍️ | `claude '/khazix-writer'` | khazix-writer | 通用写作 |
| 15 | 写教程 | 📖 | `claude '/kyjl97-tutorial'` | kyjl97-tutorial | 教程类专用写作 |
| 16 | 引流文案 | 🎯 | `claude '/article-traffic-writer'` | article-traffic-writer | 引流型文案 |
| 17 | 去AI味 | 🤖 | `claude '/humanizer'` | humanizer | 降低 AI 痕迹 |
| 18 | 审校 | 📝 | `claude '/huashu-proofreading'` | huashu-proofreading | 三遍审校降 AI 味 |
| 19 | 文章配图 | 📸 | `claude '/baoyu-article-illustrator'` | baoyu-article-illustrator | 自动文内配图 |
| 20 | 内容打包 | 📦 | `claude '/article-pack'` | article-pack | 配图+封面+标题+短文案+PPT |

---

### 第四行：数据分析

| # | 按钮名 | 图标 | 终端命令 | 对应 Skill 文件 | 说明 |
|---|--------|------|---------|---------------|------|
| 21 | 热点雷达 | 🔥 | `claude '/aihot'` | aihot | AI 领域热点捕捉与选题推荐 |
| 22 | 视频数据分析 | 📊 | `claude '$视频数据分析'` | 自定义 | 分析过往视频数据表现 |

---

## Skill 分组统计

| 分组 | 按钮数 | 说明 |
|------|--------|------|
| 每日运转 | 5 | 日常操作快捷入口 |
| 知识管理 | 7 | 对应 `知识库管理斜杠命令.md` 中的 6 个命令 + 笔记分诊 |
| 内容生产 | 8 | 对应内容生产流水线各阶段 |
| 数据分析 | 2 | 数据分析与热点监控 |
| **总计** | **22** | |

---

## 执行流程

```
用户点击 [🔥 热点雷达]
    │
    ▼
SkillRunner.run('claude \'/aihot\'')
    │
    ├── Phase 1（当前）: 复制到剪贴板 + Notice 提示
    │   └── "✅ 已复制: claude '/aihot'\n去 Claude Code 粘贴执行"
    │
    └── Phase 2（后续）: 终端直连
        ├── 打开/聚焦 Obsidian Terminal 面板
        ├── 发送命令: claude '/aihot'
        ├── 实时显示执行输出
        └── 完成后刷新统计数据
```

---

## 数据流关系

```
[📥 收件箱] ←── 01-输入/ ──→ [📥 编译素材] ──→ [📚 知识库] ←── Library/
                                                    │
                                            [🔍 查知识库]
                                            [🧪 体检]
                                                    │
                                                    ▼
[💡 选题] ──→ [✍️ 写文章] ──→ [🤖 去AI味] ──→ [📸 配图] ──→ [📦 打包]
                                                                   │
                                                                   ▼
                                                          [🌐 Wiki同步]
                                                          [📋 索引同步]
```
