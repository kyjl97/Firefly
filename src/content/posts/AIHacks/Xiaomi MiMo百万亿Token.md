---
title: Xiaomi MiMo百万亿Token
published: 2026-04-29
tags: []
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429164836641.webp
---
Xiaomi MiMo 将面向全球 AI 用户进行免费 Token 发放，我们将在 30 天内发放总计 100 万亿（100T） Token 权益，赠完即止。

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429164836641.webp)
### 活动说明
活动时间：北京时间 2026 年 4 月 28 日 00:00 至 5 月 28 日 00:00
参与地址：100t.xiaomimimo.com

![cf72d62911b25788c88a6a27cb51d0e1.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429135442847.webp)

我昨天提交了申请，今天上午收到了邮件。
![44c56664a458bcf7969adaf06c229903.jpg](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429135509294.webp)

### 领取方式
使用此申请邮箱登录或注册MiMoAPI开放平台，权益将任24小时内自动到账。

📝**小提示**
没办法用邮箱注册，只能绑定邮箱。
去这里绑定邮箱account.xiaomi.com


或去这里
https://platform.xiaomimimo.com/contact
提交反馈，话术如下
```
我参加了创作者激励计划已通过，开放平台无法用邮箱注册，我用的是手机号注册的。我的Id：
```

### 查看到账
可以在充值明细中看到赠送的订单编号。
可以看到，有效期是一个月。

![f16d6021ac340bf9503741e01a68c0e3.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429135733268.webp)

可以在订阅套餐里看到该套餐的有效期和额度。我看了一下，我的额度是两个亿。
![7e60c3fe07593ee78def36703add3f4e.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429135746969.webp)



### 获取专属 API Key
⚠️注意：一定是去来[订阅管理](https://platform.xiaomimimo.com/console/plan-manage)获取
而不是自己去创建，这样才是使用的免费的额度，哈哈哈！
- 专属API key
- 专属Base URL

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429162707099.webp)

### 接入Claude code

在CC Switch填写参数

⚠️注意：不要使用默认的请求地址，不要自己去创建API key
> 请求地址：填你的专属Base URL
> API Key：填你的专属API

ps.默认使用**mimo-v2-pro**模型，不支持获取模型列表。

### 接入Qwen Code

#### 选择认证方式

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429160433714.webp)
#### 进入自定义配置**
![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429160502785.webp)
#### 选择兼容协议
OpenAI 与Anthropic都支持

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429160551791.webp)

#### 粘贴你的**专属 Base URL**

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429160916176.webp)
#### 粘贴你的**专属 API KEY**
![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429160951881.webp)

#### 输入模型名称

> MiMo-V2.5-Pro、MiMo-V2.5、MiMo-V2.5-TTS-VoiceClone、MiMo-V2.5-TTS-VoiceDesign、MiMo-V2.5-TTS、MiMo-V2-Pro、MiMo-V2-Omni、MiMo-V2-TTS

⚠️注意：

我试了MiMo-V2.5-Pro、MiMo-V2.5都不想，后面settings.json换成mimo-v2-pro可以了

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429161451540.webp)
#### 启用思考模式
按下**空格键（Space）**选中然后回车，两个可同时启用。
1. `Enable thinking`（启用思考模式）

2. `Enable modality`（启用多模态能力）

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429161543041.webp)

#### 开始使用
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260429163300716.webp)

### 写在最后
以上是本次激励计划的免费领取步骤，以及接入两个常用AI Agent的流程，但需要注意的事项较多。

你的**订阅管理**中已为你准备好专属的 API key 和 Base url，切勿自行创建，因为免费额度仅适用于系统提供的专属配置，自行创建将产生额外费用。

**Source来源**：[kyjl97.github.io](kyjl97.github.io)

