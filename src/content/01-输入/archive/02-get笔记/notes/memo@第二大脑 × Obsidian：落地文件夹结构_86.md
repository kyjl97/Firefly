---
title: "第二大脑 × Obsidian：落地文件夹结构"
created: 2026-05-27 08:17:44
---

# 第二大脑 × Obsidian：落地文件夹结构

## 设计原则

1. **每个文件夹配说明书**：AI能”懂你”的前提是它知道每个位置干嘛的、调用规则是什么
2. **输出（给自己）vs 成果（给别人）**：标准不同，别混在一起
3. **AI可读性**：frontmatter标注type/summary，方便AI检索，不只是给人看的
4. **中央大脑**：一个工作流说明书文件，AI每次干活先读它
5. **版本控制**：Git兜底，AI改坏了随时回退

---

## 顶层结构

```
📂 SecondBrain/
├── 📄 README.md                    # 中央大脑：工作流说明书
├── 📂 00_Inbox/                    # 临时收件箱
├── 📂 01_Input/                    # 输入：外部信息（他人知识）
│   ├── 📄 _folder_guide.md         # 本文件夹说明
│   ├── 📂 Articles/
│   ├── 📂 Videos/
│   ├── 📂 Books/
│   └── 📂 Courses/
├── 📂 02_Wiki/                     # AI拆解的结构化知识
│   ├── 📄 _folder_guide.md
│   ├── 📄 index.md                 # AI自动维护的索引页
│   ├── 📄 log.md                   # AI操作日志
│   ├── 📂 Concepts/                # 方法论、技术名词等概念
│   ├── 📂 Entities/                # 人、公司、项目等实体
│   ├── 📂 Comparisons/             # 横向对比
│   └── 📂 Source_Overviews/        # 原始资料概述
├── 📂 03_Output/                   # 输出：个人思考（给自己看）
│   ├── 📄 _folder_guide.md
│   ├── 📂 Ideas/                   # 碎片想法、灵感
│   ├── 📂 Thinking/                # 深度思考笔记
│   └── 📂 Daily/                   # 日志/复盘
├── 📂 04_Tasks/                    # 任务：项目过程管理
│   ├── 📄 _folder_guide.md
│   └── 📂 {项目名}/
│       ├── 📄 task_{date}.md       # 按日期的任务列表
│       └── 📄 ...                  # 未完成任务自动迁移
├── 📂 05_Outcomes/                 # 成果：对外交付（给别人看）
│   ├── 📄 _folder_guide.md
│   └── 📂 {项目名}/
│       ├── 📂 Articles/
│       ├── 📂 Scripts/
│       └── 📂 Reports/
├── 📂 06_Skills/                   # 可复用的AI技能/工作流
│   ├── 📄 _folder_guide.md
│   └── 📂 {skill名}/              # 每个skill一个文件夹
│       ├── 📄 workflow.md          # 工作流说明书
│       └── 📄 ...                  # 相关模板/参考
├── 📂 07_Archive/                  # 归档：完成/过期的项目
└── 📂 .system/                     # 系统文件（不日常查看）
    ├── 📄 schema.md                # AI加工规则文档
    ├── 📄 style_guide.md           # 写作风格指南
    └── 📄 persona.md               # 个人数字分身画像

```

---

## 关键文件说明

### README.md（中央大脑）

每次AI开始工作前必须先读这个文件。包含：
- 整个库的文件夹结构和用途说明
- 当前各项目的进度和状态
- AI的调用规则和限制
- 常用操作的标准流程
- 随项目更新同步更新

### _folder_guide.md（文件夹说明书）

每个一级文件夹下的说明文件，告诉AI：
- 这个文件夹存放什么内容
- 创建新文件的命名规则
- 哪些内容可以互相调用
- frontmatter必填字段

### schema.md（AI加工规则）

你和AI约定的资料加工规则，包含：
- Wiki页面的标准结构（必须包含哪些字段）
- frontmatter规范（type/summary/source/created等）
- 双向链接的命名规范
- 摄取/问答/审查三个工作流的触发条件和流程
- 页面数量>1000时切换RAG检索的条件

### persona.md（数字分身）

基于你580万字实践中的思路——把个人画像喂给AI，让它更懂你：
- 价值观与信念
- 目标与优先级
- 行为模式与盲区
- 写作风格偏好
- 恐惧与回避

---

## Frontmatter 规范

所有笔记必须包含以下属性（方便AI检索和分类）：

```yaml
---
type: concept | entity | input | output | task | outcome | comparison
source: 原始资料来源
created: 2026-05-27
summary: 一句话摘要（给AI看的）
project: 所属项目（可选）
status: draft | in-progress | done（成果类必填）
---

```

type字段区分AI生成内容（concept/entity/comparison）和用户原创内容（input/output/outcome），避免混淆。

---

## 三个日常操作

### 1. 摄取（Ingest）

新资料放入 `01_Input` → AI按schema拆解 → 生成Wiki页面 → 更新index和log

### 2. 问答（Query）

基于 `02_Wiki` 提问 → AI回答并标注来源 → 高质量回答可新增为Wiki页面

### 3. 审查（Lint）

定期让AI扫描Wiki → 找矛盾/过时内容/孤立页面/缺失链接 → 生成优化建议

---

## Git版本控制

- 安装Obsidian git插件，设置10分钟自动提交
- GitHub新建私人仓库做远程备份
- AI批量修改前确保有版本快照
- 核心原则：AI处理能力越强，越需要版本控制兜底

---

## 落地优先级

1. 先搭结构：创建文件夹 + README.md + 各_folder_guide.md
2. 再定规则：写schema.md + persona.md
3. 然后喂料：把现有资料放入01_Input，让AI开始拆解
4. 最后迭代：用一段时间后根据实际问题优化schema和流程