---
title: Obsidian链接收藏自动化
published: 2026-04-27
tags:
  - Obsidian插件
  - Obsidian
  - 工作流
category: Workflow
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260427195504528.webp
---
你有没有过这样的困扰？刷到优质干货、实用工具、优质教程，随手存入浏览器书签，想着日后回看。久而久之，书签越堆越多、杂乱无序，想要检索复用却无从下手，大量优质资源最终沦为闲置的无效数据。


为此，我搭建了一套**轻量化全自动链接收藏工作流**，依靠 **LinkStowr + Obsidian + Dataview** 三方联动，实现：

一键收藏网页、云端中转同步、本地自动归档、标签分类索引，彻底告别杂乱书签，轻松沉淀全网优质资源。

![得救之道「kyjl97.github.io](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260427195504528.webp)
### 部署先决条件

1. 前往 [linkstowr.com](https://linkstowr.com/) 注册账号，生成专属访问令牌；
2. 浏览器安装 [LinkStowr 扩展](https://chromewebstore.google.com/detail/linkstowr/aabkobajeambdejghgegicnhcndhcjpk)，填入[访问令牌](https://linkstowr.com/user/settings)完成绑定授权；
3. 在 Obsidian 中安装并启用 [**LinkStowr**](https://github.com/joelseq/obsidian-linkstowr)、**Dataview** 两款核心插件；
4. 全部配置完成后，即可随时一键收藏网页，自定义添加标签与备注，高效系统化管理所有链接资源。

---

### 一键收藏网页Url

安装好 LinkStowr 浏览器扩展后，收藏链接的过程变得异常简单：

1.  看到优质网页，点击右上角的扩展图标。
2.  插件会自动抓取网页标题，你可以按需修改。
3.  给链接打上标签（比如 `#AI工具`、`#飞书`、`#Notion`），⚠️**输入标签并按回车键**
4.  写下几句备注，记录为什么收藏它，方便未来回忆。
5.  点击「Save Link」，完成！

整个过程不到 3 秒，链接就被安全地暂存到云端，等待被同步到 Obsidian。

---

###  沉淀到知识库

接下来，Obsidian 里的  **LinkStowr 插件会接管一切。它的配置非常关键，我是这样设置的：

#### 1. 配置基础信息
- **Links folder path**：设置为 `02_Wiki/链接收藏`，所有链接笔记都会存放在这里。
- **Access Token**：填入 LinkStowr 扩展中获取的令牌，打通同步通道。
- **Sync on load**：开启，每次打开 Obsidian 自动同步一次新链接。
- **Custom server URL**：留空，使用官方服务即可。

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260427115231051.webp)

#### 2. 标准化笔记模板


为了让所有链接笔记格式统一，我创建了一个模板文件 `templates/link-template.md`，内容如下：
```markdown
---
title: {{title}}
url: {{url}}
date: {{date:YYYY/MM/DD}}
tags: {{tags}}
note: {{note}}
---

# {{title}}
🔗 链接：[{{title}}]({{url}})
📝 说明：{{note}}
```

这个模板会自动填充标题、链接、日期、标签和备注，保证每一条链接笔记都结构清晰，可被 Dataview 检索和调用。

---

### Dataview自动化索引

所有链接笔记都沉淀好了，怎么高效查看？我用 Dataview 做了一个「index.md」作为统一入口，实现了按标签自动分类。

链接收藏

> 有价值的工具和资源链接。


#### 飞书文档合集

```dataview
TABLE WITHOUT ID
  title AS "名称",
  url AS "链接",
  note AS "说明",
  tags AS "标签"
FROM "02_Wiki/链接收藏"
WHERE file.path != "02_Wiki/链接收藏/00-index.md"
AND contains(tags, "飞书")
SORT date DESC
```

#### Notion文档合集

```dataview
TABLE WITHOUT ID
  title AS "名称",
  url AS "链接",
  note AS "说明",
  tags AS "标签"
FROM "02_Wiki/链接收藏"
WHERE file.path != "02_Wiki/链接收藏/00-index.md"
AND contains(tags, "notion")
SORT date DESC
```

#### github项目

```dataview
TABLE WITHOUT ID
  title AS "名称",
  url AS "链接",
  note AS "说明",
  tags AS "标签"
FROM "02_Wiki/链接收藏"
WHERE file.path != "02_Wiki/链接收藏/00-index.md"
AND contains(tags, "github")
SORT date DESC
```

#### AI工具

```dataview
TABLE WITHOUT ID
  title AS "名称",
  url AS "链接",
  note AS "说明",
  tags AS "标签"
FROM "02_Wiki/链接收藏"
WHERE file.path != "02_Wiki/链接收藏/00-index.md"
AND contains(tags, "ai")
SORT date DESC
```


#### 全部链接

```dataview
TABLE WITHOUT ID
  title AS "名称",
  url AS "链接",
  note AS "说明",
  tags AS "标签"
FROM "02_Wiki/链接收藏"
WHERE file.path != "02_Wiki/链接收藏/00-index.md"
SORT date DESC
```



这套工作流不仅解决了我链接杂乱的问题，更让每一次收藏都变成了对数字资产的有效沉淀。

如果你也被杂乱的书签困扰，不妨试试 LinkShelf + Obsidian 这套组合，让你的链接管理从此告别手动，走向自动化。
