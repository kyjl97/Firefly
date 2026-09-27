---
title: 微信内容同步Obsidian
published: 2026-05-26
tags:
  - obsidian
  - wechat
  - workflow
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-wechat-obsidian-20260526-174500.webp
---
微信里看到的好文章、一闪而过的灵感、随手录的语音备忘——怎么快速存进 Obsidian？本文介绍两种实测可用的同步方案。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-wechat-obsidian-20260526-174500.webp)


### 方案一：笔记同步助手

**绑定流程**

公众号关注「笔记同步助手」→ 点击左下角自定义菜单→开始使用「使用Obsidian」→获取密钥 、在微信中添加 Obsidian 为好友 → 复制密钥待会用。

**安装插件**

Obsidian 社区插件市场搜索 `Biji Tongbu`，安装启用后粘贴密钥，建议勾选「启动时同步（本设备）」。

我的设置供参考：

- 消息合并模式：仅合并消息
- 消息文件夹：`01-输入/微信`
- 文章文件夹：`01-输入/微信`
- 图片储存文件夹：`01-输入/微信/images`
- 消息文件夹模板：`消息_{{{date}}}`

如果想用 AI 帮你改插件设置，可以发送这段 Prompt：

```
请先读 https://www.bijitongbu.site/tutorials/ai-settings-guide/ ，我安装了 Biji Tongbu 这个插件，帮我改下插件设置，然后帮我把笔记按年月分文件夹
```

📖 官网文档：
https://www.bijitongbu.site/tutorials/obsidian-tutorial/


### 方案二：Obsidian 内容同步助手

有人用 vib coding 做了一个「Obsidian 内容同步助手」，微信小程序 + Obsidian 插件配合，支持剪贴板、录音、网页链接、文件同步。实测可用，流程很轻。

**操作步骤**

**一步：绑定小程序**

微信搜索小程序「Obsidian 内容同步助手」→ 首页点击「绑定 Obsidian」→ 复制 6 位绑定码。默认赠送 8 天会员试用。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/IMG_1177.webp)

**二步：安装插件**

在 Obsidian 社区插件市场搜索 **WeChat Inbox Sync**，安装后进入设置，粘贴绑定码，点击「立即绑定」。记得勾选「启动时自动同步」。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260526003152490.webp)

#### 使用体验

整体流畅，两个小槽点：

- **非实时同步**：微信复制链接后打开小程序点「读取网页链接」，不会立即推送到 Obsidian，需要手动点击插件里的同步按钮
- **开屏广告**：小程序有广告

好消息是每次重新打开 Obsidian 会自动拉取未同步的内容，日常使用影响不大。

参考：[飞书教程：WeChat Inbox Sync](https://my.feishu.cn/wiki/EPHhwqRobijHqfkAqjMcDEgvnlf)

### 写在最后

以上就是微信内容同步到 Obsidian 的两种方案。方案一免费但配置稍多，方案二更轻量但有小程序广告。按需选择即可。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/a40746dd7c4aef1a757eedac61ca79e9.webp)

- [一键把 Get 笔记同步到 Obsidian](https://mp.weixin.qq.com/s/2eqmgz77JXHaYgL6-TWBdA)

---
那么，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧！想第一时间收到推送，可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/未命名的设计.webp)
*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*