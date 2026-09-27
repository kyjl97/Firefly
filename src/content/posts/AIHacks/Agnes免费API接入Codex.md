---
title: Agnes接CDX
published: 2026-06-13
tags:
  - ai
  - api
  - skill
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-agnes-codex-20260613-183633.webp
---
近期Codex翻车踩了个大坑：接入DeepSeek国产模型后，基础对话、编程功能一切正常，但硬性bug无法规避——**不支持图像与视频生成**。对于需要一站式创作的创作者来说，这个缺陷几乎无法接受。

所幸我偶然发现了一款神仙免费API：Agnes 2.0 Flash。功能全面碾压同类接口，同时支持对话、AI生图、AI生视频，无任何付费门槛，实测稳定性、生成质量双在线，直接替代残缺版Codex。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-agnes-codex-20260613-183633.webp)

### 四步接 Codex++

**一、注册拿 Key**
打开 [agnes-ai.com](https://agnes-ai.com)，用 Google/GitHub 登录，左侧菜单「API 密钥」→ 创建新密钥。

我是用GitHub登录的。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260613172153682.webp)

**二、安装 Codex++**
https://github.com/BigPizzaV3/CodexPlusPlus/releases/latest
对应系统版本安装。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260613180554472.webp)

**三、配置供应商**
Codex++ 管理工具 → 供应商配置 → 添加供应商：

保存 → 设为使用 → 重启。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260613181219768.webp)

**四、安装生图/生视频 Skill**
装这个 https://github.com/Yacey/agnes-ai-generation-skill
实现模型自动路由。装好后在 Codex 里就能直接对话、生图、生视频。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260613182312484.webp)

### 开始使用

```
使用 Agnes 帮我生成一张高信息密度的未来城市图片。
```

```
使用 Agnes 创建图片 一个可爱Q版的硅胶护腕托，外形基于【🐼】表情，采用柔软的食品级硅胶材质，表面为亲肤哑光质感，内部填充慢回弹棉，拟人化卡通风格，表情生动，双手张开趴在桌面上，呈现出拥抱手腕的姿势，整体造型圆润软萌，颜色为【🐼】配色，风格治愈可爱，适合办公使用，背景为白色纯色，柔和布光，产品摄影风格，前视角或45度俯视，高清细节，突出硅胶质感与舒适功能
```

```
使用 Agnes 把这张图片生成一段电影感视频。
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260614190638233.webp)


不过这个有技能也有点点问题，一次对话生成任务完成后，在同一个对话框里进行任务是不行的，只是玩一下哈！

以上，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧！想第一时间收到推送，可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。

如需远程协助，可通过向日葵或 ToDesk 远程处理。加**GitHub: https://github.com/kyjl97

*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*



