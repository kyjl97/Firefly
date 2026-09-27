---
title: openlist挂载阿里云盘
published: 2025-10-22T14:20:00.000Z
tags:
  - openlsit
category: Technical
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20251013222806220.webp
---

很多人使用 OpenList 搭建网盘聚合时，希望接入阿里云盘，实现文件集中管理与在线播放。本文将手把手教你如何在 OpenList 中添加阿里云盘存储，从获取 Token 到配置参数，简单几步即可完成接入。

## 教程步骤

1. **访问**

地址https://api.oplist.org/

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20251013222806220.webp)

2. **手机扫码登录**

使用阿里云盘 App 扫描二维码登录。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20251013222908278.webp)

3. **授权登录**

在授权页面取消勾选 **“备份盘”**，然后点击 **允许**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20251013223149217.webp)

4. **获取刷新令牌**

登录成功后会自动跳转回授权页面，复制页面中的 **刷新令牌**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20251013223503994.webp)

5. **添加到 OpenList**

回到OpenList管理后台

依次点击 存储 → 添加，并填写以下信息：

- 驱动：阿里云盘(Oauth2)
- 挂载路径：随便写
- 刷新令牌：粘贴第四部复制的令牌
- 根文件夹 ID：

> 默认为`root`，展示全部云盘内容，若只想展示某文件夹內内容，可以改为`file_id`，打开阿里云盘官网，点击进入要设置的文件夹时点击 URL 后面的字符串
>
> 这个文件夹的 file_id 即为 `68ed113250419512244e4ea3831a29b2000462d0`

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20251013231704751.webp)

6. **保存配置**

填写完成后，滑到页面底部点击 **保存** 即可。

✅至此，阿里云盘已成功接入 OpenList，可在前台正常浏览、预览与播放文件。