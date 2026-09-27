
# 知识库管理 & 内容生产斜杠命令

---

## 一、知识库管理（6 个技能）

| Skill                        | 说明                                   |
| ---------------------------- | ------------------------------------ |
| /Library-query               | 检索 Library 索引，综合回答并用 `[[]]` 标注引用来源   |
| /up-Library-ingest           | 读取 01-输入/素材，提炼结构化页面存入 Library/，源文件归档 |
| /up-index                    | 同步 index.md 与 6 个目录的文件索引（新增/删除检测）    |
| /up-blog-Wiki                | 同步 posts 文章元数据到 wiki/，校验外链有效性        |
| /Update                      | 同时更新 index、Library、wiki              |
| /Library-lint                | 检查 Library 健康度：死链、孤儿页面、索引遗漏、知识冲突     |
| /Notebooklm-DeepResearch-ppt | 调用Notebooklm生成ppt下载桌面                |
| /guizang-social-card-skill   | 转成小红书图文                              |
| /claude-design-card          | 帮我把这篇文章做成一套小红书图文笔记卡片                 |
| /x-post                      | 帮我把这篇文章转换为短文案                        |
| /huashu-douyin-script        | 抖音爆款脚本                               |
| /ian-xiaohei-scenes          | 配图                                   |
|                              |                                      |
### 联动用法

```
为这篇文章生成标题与封面，并行执行。
```

```
使用技能/guizang-social-card-skill将这篇文章转化为小红书图文，并调用技能/x-post 为这篇文章生成三个版本的短文案，并行执行。
```

```
调用技能/x-post帮我把这篇文章转换短文案，同时调用/claude-design-card帮我把这篇文章做成一套小红书图文笔记卡片 并行执行
```

```
同时调用以下4个skill
/Title
/article-cover-16x9
/x-post
/guizang-social-card-skill 转换成一套小红书配图
```

```
/baoyu-article-illustrator /article-cover-16x9 /Title 同时启用这三个技能，生成配图、封面和标题。
```

```
调用技能/x-post帮我把这篇文章转换短文案，同时调用/claude-design-card帮我把这篇文章做成一套小红书图文笔记卡片 并行执行
```


---

## 二、外部输入同步（插件配置）

| 来源     | 插件 / 工具              | 存放位置              | 备注                                            |
| ------ | -------------------- | ----------------- | --------------------------------------------- |
| 微信读书   | Weread 插件            | `01-输入/06-微信读书/`  | 自动同步                                          |
| Get 笔记 | Dedao Brain Importer | `01-输入/02-get笔记/` | 笔记目录用默认                                       |
| 微信文章   | 笔记同步助手（Biji Tongbu）  | `01-输入/03-微信/`    | 图片存 `01-输入/03-微信/images`，消息模板 `消息_{{{date}}}` |
插件路径
```
D:\project2026\fuwari\src\content\.obsidian\plugins\obsidian-home-console
```

---

## 三、内容生产流水线

完整流程：**剪藏 → 编译 → 查知识 → 选题 → 写作 → 去 AI 味 → 内容打包**

### 1. 剪藏

外部输入同步到 `01-输入/`（见上方插件配置）。

### 2. 编译素材

```
/up-Library-ingest
```

读取 `01-输入/` 中的素材，提炼为结构化知识页面存入 `Library/`。

### 3. 基于知识库查答案

```
/Library-query 帮我找下花叔skill github链接
/Library-query 我想了解下Craft Agent
```

### 4. 选题角度生成

```
/huashu-topic-gen
```

```
/content-topic-generator
```

### 5. 写作

通用写作：
```
/khazix-writer
```

```
/ljg-writes
```

教程类：
```
/kyjl97-tutorial
```

引流文案：
```
/article-traffic-writer
```

### 6. 去 AI 味

```
/humanizer
```

三遍审校降 AI 味：
```
/huashu-proofreading
```

### 7. 内容打包

配图 → 封面 → 标题 → 短文案 → PPT（作为后续录制素材）

```
/article-pack
```

