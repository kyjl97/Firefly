---
title: CodePilot
published: 2026-03-07
tags:
  - Claudecode
  - 软件推荐
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260307140824884.webp
---
CodePilot 是一款功能强大的 Claude 第三方客户端，近期上线的飞书桥接功能，实现了 Claude 能力与飞书生态的深度打通。完成接入配置后，你可以直接在飞书内使用 Claude 完成以下场景的工作：

- 无需切换客户端，在飞书聊天窗口直接与 Claude 对话咨询问题
- 直接读取、总结飞书文档/多维表/电子表格的内容，高效处理办公文档
- 自动回复飞书消息、管理日程、处理待办任务，提升办公效率
- 基于飞书生态定制专属工作流，实现复杂办公场景的自动化处理

本指南将详细介绍 CodePilot 接入飞书的完整配置步骤，全程操作约10分钟即可完成。

## 一、前期准备

- 已经安装Claude：[参考教程](https://jieliu.me/posts/aihacks/claudecode安装使用教程/)
- 已安装CodePilot：[最新安装包下载](https://github.com/op7418/CodePilot/releases)
- 有飞书账号：[飞书官网](https://www.feishu.cn/download)

## 二、接入步骤

### 1.创建企业自建应用

1. 登陆开发者后台：[开发者后台 - 飞书开放平台](https://open.feishu.cn/app?lang=zh-CN)，创建企业自建应用
2. 在弹出的创建窗口中，填写以下信息：

| 配置项   | 填写内容（后续都可以随意修改） | 说明         |
| :------- | :----------------------------- | :----------- |
| 应用名称 | （内容随便写）                 | 自定义名称   |
| 应用描述 | （内容随便写）                 | 简单描述用途 |
| 应用图标 | 可以暂时不传                   |              |

1. 填写完成后，点击 **“创建”** 按钮
2. 应用创建成功后，会自动跳转到应用详情页

### 2.添加应用能力


1. 在能力列表中，找到 **“机器人”** 能力卡片，点击卡片上的 **“添加”** 按钮

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260307140824884.webp)

### 3.批量导入应用权限（最关键步骤）

这是最容易出错的步骤，必须严格按要求操作！

1. 在应用详情页左侧目录树，找到 **权限管理  > 批量导入 / 导出权限**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260307140925760.webp)



2. 在弹出的窗口中，默认是 **“导入”** 页签，清空输入框内的所有内容，将下方代码块内容完整复制进来，点击 **“确定新增权限”** 完成权限导入

```
{
  "scopes": {
    "tenant": [
      "contact:contact.base:readonly",
      "docx:document:readonly",
      "im:chat:read",
      "im:chat:update",
      "im:message.group_at_msg:readonly",
      "im:message.p2p_msg:readonly",
      "im:message.pins:read",
      "im:message.pins:write_only",
      "im:message.reactions:read",
      "im:message.reactions:write_only",
      "im:message:readonly",
      "im:message:recall",
      "im:message:send_as_bot",
      "im:message:send_multi_users",
      "im:message:send_sys_msg",
      "im:message:update",
      "im:resource",
      "application:application:self_manage",
      "cardkit:card:write",
      "cardkit:card:read"
    ],
    "user": [
      "contact:user.employee_id:readonly",
      "offline_access","base:app:copy",
      "base:field:create",
      "base:field:delete",
      "base:field:read",
      "base:field:update",
      "base:record:create",
      "base:record:delete",
      "base:record:retrieve",
      "base:record:update",
      "base:table:create",
      "base:table:delete",
      "base:table:read",
      "base:table:update",
      "base:view:read",
      "base:view:write_only",
      "base:app:create",
      "base:app:update",
      "base:app:read",
      "board:whiteboard:node:create",
      "board:whiteboard:node:read",
      "calendar:calendar:read",
      "calendar:calendar.event:create",
      "calendar:calendar.event:delete",
      "calendar:calendar.event:read",
      "calendar:calendar.event:reply",
      "calendar:calendar.event:update",
      "calendar:calendar.free_busy:read",
      "contact:contact.base:readonly",
      "contact:user.base:readonly",
      "contact:user:search",
      "docs:document.comment:create",
      "docs:document.comment:read",
      "docs:document.comment:update",
      "docs:document.media:download",
      "docs:document:copy",
      "docx:document:create",
      "docx:document:readonly",
      "docx:document:write_only",
      "drive:drive.metadata:readonly",
      "drive:file:download",
      "drive:file:upload",
      "im:chat.members:read",
      "im:chat:read",
      "im:message",
      "im:message.group_msg:get_as_user",
      "im:message.p2p_msg:get_as_user",
      "im:message:readonly",
      "search:docs:read",
      "search:message",
      "space:document:delete",
      "space:document:move",
      "space:document:retrieve",
      "task:comment:read",
      "task:comment:write",
      "task:task:read",
      "task:task:write",
      "task:task:writeonly",
      "task:tasklist:read",
      "task:tasklist:write",
      "wiki:node:copy",
      "wiki:node:create",
      "wiki:node:move",
      "wiki:node:read",
      "wiki:node:retrieve",
      "wiki:space:read",
      "wiki:space:retrieve",
      "wiki:space:write_only"
    ]
  }
}
```

### 4.获取应用凭证（⚠️ 请对自己的这两个信息严格保密！)

1. 在应用详情页左侧目录，找到 **“凭证与基础信息”**，点击进入
2. 在页面中，您会看到以下两项重要信息，请务必完整复制并妥善保存：

| 凭证名称       | 格式说明                  | 用途                   |
| :------------- | :------------------------ | :--------------------- |
| **App ID**     | 格式如 `cli_xxxxxxxxxxxx` | 飞书应用唯一标识       |
| **App Secret** | 一串长字符串              | 应用安全密钥，不可泄露 |

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260307141317972.webp)

### 5.配置 CodePilot 桥接

1.  设置-桥接-飞书设置

将第四步获取 **App ID 和 App Secret** 粘贴进来保存

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260307141355929.webp)

2. 设置-桥接-远程桥接


![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260307141429197.webp)

### 6.订阅事件与发布应用

**订阅机器人长链接 接收事件和卡片****回调**

这一步的作用是让 **CodePilot** 具有在飞书内收发消息的能力

1. 进入[飞书开放平台](https://open.feishu.cn/app?lang=zh-CN)，找到刚刚创建的应用，配置**事件与回调**
2. 进入 **事件配置 > 订阅方式 > 使用 长链接 接受事件 > 保存**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260307142759027.webp)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260307142947985.webp)

3. 添加**“接收消息”**事件

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260307143100055.webp)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260307143148375.webp)

4. 进行**回调配置**

进入“**回调配置**”，搜索并添加"**卡片回传交互**”，点击“**确认添加**”

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260307143410177.webp)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260307143422030.webp)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260307143451245.webp)

5. 发布应用

> 应用必须发布后，才能在飞书中使用！

1. 点击上方**“创建版本”**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260307143950751.webp)

### 7. 与飞书完成配对

在飞书里找到你刚创建的机器人

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260307144058038.webp)

## 三、相关资源

[Happy：给Claude一双翅膀](https://mp.weixin.qq.com/s/hBCmiClrTG5TjQQbryxJCg)

https://github.com/xvirobotics/metabot