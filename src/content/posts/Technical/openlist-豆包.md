---
title: openlist挂载豆包云盘
published: 2025-09-18T10:30:00.000Z
tags:
  - openlsit
category: Technical
draft: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251130152350228.webp
---

本篇文章将教你如何把**豆包网盘**接入 OpenList，通过 WebDAV 方式实现挂载与访问。只需按照以下步骤操作，即可实现豆包网盘文件管理、本地读取与在线播放。

## 一、挂载方式

在 OpenList 的存储策略里：

选择 **WebDAV**策略使用 **本地代理**

## 二、获取 Cookie

检查-网络-查找

搜索下方命令，随便点进去一个文件再退出来，刷新下，

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251130152350228.webp)

搜索关键词

```Plain
sid_guard
```

点搜索结果进去，会自动定位到，标头-cookie，复制以sid_guard开头的内容即可

## 三、根文件夹 ID

OpenList 挂载豆包网盘，需要指定访问目录。
你可以选择挂载：

- 所有文件根目录
- 某个指定单文件夹

### 获取 root_id

这个用于挂载整个网盘，进入文件夹，再出来，再进去，搜索

```Plain
root_id
```

会自动定位响应，点击预览就可以看到root_id，直接复制值

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251130152354231.webp)

###  获取单文件夹 ID

直接打开你的文件，地址栏里的数字就是了

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20251130152357486.webp)

以上，一个稳定、可管理、可在线播放的豆包网盘就成功接入了 OpenList。



如果觉得这篇教程对你有帮助，别忘了**点赞+收藏+转发**三连呀！关注我，后续分享更多实用技巧、效率工具干货，下次见～ 👋



**得救之道远程技术支持：[fix.kyjl97.github.io](https://github.com/kyjl97/)**