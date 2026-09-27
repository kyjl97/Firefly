---
title: OB同步notion插件
published: 2026-04-21
tags:
  - Obsidian插件
  - 工作流
category: Workflow
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260421200259532.webp
---

我最近发现了一个超好用的 Obsidian 神器，叫 Share to NotionNext！

可以直接把Obsidian里的Markdown同步到Notion数据库，还能自动生成NotionNext博客，告别复制粘贴、排版错乱，一篇文章秒发博客。

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260421200259532.webp)


### 01.前置准备

 #### 设置 Notion API

- 创建API集成：

> https://www.notion.so/my-integrations

- 复制API Token


#### 创建Notion 数据库

- 创建数据库，参考👇

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260421153612198.webp)

- 数据库页面右上角点击 `...`→集成，选择你设置的集成名称

- 从浏览器链接中复制 32 位数据库 ID（`?v=` 前部分）



### 02.安装&配置

#### 安装插件

- 打开 Obsidian
- 进入 **设置 → 社区插件 → 浏览**
- 搜索 **"Share to NotionNext"**
- 点击安装，然后启用

#### 配置插件

Obsidian设置，第三方插件中找到 **Obsidian to NotionNext**，填入以下信息：

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260421155557890.webp)

- 自动同步Frontmatter键名：category

> 说明：用于指定一个 Obsidian 笔记属性名，作为插件维护「同步记录」的专用字段。插件会在笔记首次同步到指定 Notion 数据库时，将目标数据库的标识自动追加到该字段中，并同步生成对应数据库的页面 ID 与访问链接属性；

- 添加新激据库-"+"
- 填写参数：

> 数据库全名：
>
> 数据库简称：
>
> Lotion API令牌：
>
> 数据库ID：

自定义属性→Add New Property（本人配置参考）

> 标题属性→title→Title
> 自定义属性1→tags→Multi-Select
> 自定义属性2→category→Multi-Select
> 自定义属性3→date→Date
> 自定义属性4→Source→URL
> 自定义属性5→status→Multi-Select

### 03.使用方式

#### 创建模版

建议在Obsidian的模板文件夹创建模板，示例：

```
---
title: 文章标题
category:
  - Software
  - Technical
  - AIHacks
tags:
status:
  - draft
  - published
date:
Source:
---
```



#### 笔记插入元数据


- 创建笔记→Alt+E调出模板，或用[Template](https://mp.weixin.qq.com/s/kPjIpHmzciWY8_3ettEVsg)自动化
- 写完笔记→点击功能区**Notion图标**「同步到 NotionNext」
- 实现一键同步Notion

#### 注意事项

- 确保 Notion 数据库字段名称与插件要求一致
- API Token 不要泄露给他人
- 首次使用建议先测试单篇笔记同步
- 更新插件时注意检查是否有 Breaking Changes

---


### 04.参考资料

→github仓库：
https://github.com/jxpeng98/obsidian-to-NotionNext

→抖音视频教程 
https://v.douyin.com/4K4Njgxq0Oc/

→模板自动化插件指南：
https://mp.weixin.qq.com/s/kPjIpHmzciWY8_3ettEVsg

→NotionNext帮助手册：
https://docs.tangly1024.com/about





