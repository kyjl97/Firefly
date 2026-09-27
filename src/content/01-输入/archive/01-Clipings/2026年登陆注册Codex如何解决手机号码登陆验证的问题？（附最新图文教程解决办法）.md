---
Source: "https://zhuanlan.zhihu.com/p/2035450261863396708"
created: 2026/05/13
tags:
  - "clippings"
---
4 人赞同了该文章

突发！ [ChatGPT](https://zhida.zhihu.com/search?content_id=274339795&content_type=Article&match_order=1&q=ChatGPT&zhida_source=entity) 居然电话号码验证，附两种解决方案  
就在最近，在使用codex的时候，突然告诉我需要电话号码验证。  
  
然后我一脸蒙蔽，后续去搜了一下才发现，确实有不少人中招了，开始要电话号码了。  

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260513144045752.webp)


![](https://picx.zhimg.com/v2-6b3238660698d56d483fe1ac41ed9865_1440w.jpg)

选择性验证，不是所有人都中招  
先说一个让我觉得有点意思的细节。  
  
同样是我的账号，在网页版聊天完全正常，一切如旧。  
  
但一打开 Codex 去授权登录，弹窗就来了，要手机验证。  
  
换个邮箱注册的小号去试，顺利过了。  
  
这就很奇怪：不是"全部要验证"，是"选择性要验证"。  
哪类账号最容易中招？  
根据社区里大量用户的实测反馈，以下几类账号最容易中招：  
  
注册时间较短、IP 经常跨地区切换的账号；  
  
用过一次性邮箱或 Gmail 别名注册的；  
  
最近刚开始用 Codex、API 这类开发者功能的账号，因为这类行为模式跟批量小号高度重合。  
  
**[OpenAI](https://zhida.zhihu.com/search?content_id=274339795&content_type=Article&match_order=1&q=OpenAI&zhida_source=entity) 背后的真实意图**

ChatGPT / Codex 为什么突然要验证手机号？是不是OpenAI又在搞事情？

![](https://pica.zhimg.com/v2-3a12fb0ea44e96813ade0fe69dd83dd6_1440w.jpg)

今天一次性说清楚。原因只有一个，但你可能没想到。

## 一、真正的原因：有人在薅羊毛，薅疯了

![](https://pic2.zhimg.com/v2-465aabc2eea6e04ba008d362f8399de1_1440w.jpg)

OpenAI推出免费Codex之后，免费用户安装后就能获得一定额度。听起来不错对吧？

但随之而来的就是——批量注册机来了。一些刷量团队疯狂注册账号，几万、十几万的刷，就为了白嫖Codex额度。

![](https://pica.zhimg.com/v2-658ff117e18ef8a729b4c5c82e49a29a_1440w.jpg)

官方先封号，封不完。然后直接升级风控策略： **所有免费使用Codex的用户，都必须验证手机号。**

就算你是正常注册的ChatGPT账号，登录Codex或ChatGPT时也可能触发验证弹窗——这不是针对你，是针对所有人的全局策略。

还有两个额外触发场景：

1. 使用共享IP（多人共用同一个IP地址）
2. 你的IP恰好与批量注册机撞车，可能被误判为刷量账号  
	  
	同时OpenAI 其实在同步推进两件看起来相反的事：一边给部分用户加验证门槛。  
	  
	另一边在美国和印度 Beta 测试"只用手机号就能注册"的新方案，连邮箱都不需要。
![](https://pic2.zhimg.com/v2-0bdddd09d2f958b8a455869f65492d01_1440w.jpg)

其实背后是同一个目的：让每个账号对应一个真实的人。  
  
还有一个细节很多文章没提：  
  
一旦手机号绑定了账号，这个号码就被系统锁定，同一个号码无法再注册新账号。  
  
这意味着接码平台上那些被反复用过的号码，大概率早就废了，这也解释了为什么现在接码成功率非常不行。  
  
**接码平台这边，也在经历大洗牌**  
  
很多人可能还不知道，老牌接码站 [SMS-Activate](https://zhida.zhihu.com/search?content_id=274339795&content_type=Article&match_order=1&q=SMS-Activate&zhida_source=entity) 已经在 2025 年 12 月 29 日彻底停运了。  
官方的解释是俄罗斯等地电信法规收紧，旧的业务模式在合规上遇到了极大挑战。  
技术团队和业务整体被打包交给 [HeroSMS](https://zhida.zhihu.com/search?content_id=274339795&content_type=Article&match_order=1&q=HeroSMS&zhida_source=entity) 接手。  
但这次交接并不顺利。  
  
退款门槛设在了 30 美元，余额不足的用户基本拿不回钱，Reddit 和 Telegram 群里当时骂声一片。  
  
HeroSMS 接手后口碑参差不齐，有人用着没问题，有人反映 OpenAI 的验证码根本收不到。  
  
文章开头图片里的评论区也能看到，已经有用户在吐槽 HeroSMS 翻车了。  
  
原因是接码平台上的号码流转太快，很多都是二手三手的状态，早就被 OpenAI 系统标记过了  
  
根据目前社区反馈，按从简单到稳定排个序：  
  
第一步，先确认你是否真的需要换号码。如果只是偶发触发，可以先尝试在账号设置里提前绑定 Google Authenticator 做二次验证，部分用户反映这样能降低后续被风控的频率，但成功率不稳定，不保证有效。  
  
第二步，用接码平台过一次验证。  
关于接码平台之前分享的sms-activate都已经关闭了  

![](https://picx.zhimg.com/v2-77692192bd2bf636ad67631596615d25_1440w.jpg)

有很多玩家推荐新的替代品hero-sms网站。首次充值需要3美刀，但不一定能收到Codex的验证码，亲测前期还OK，现在无论怎么切换国家号码都很难收到验证码了。需要谨慎考虑，因为验证失败的话充值的3美刀随时打水漂。  
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260513144453590.webp)

![](https://pic2.zhimg.com/v2-a10773149ccc95f2bda64603f02b96f5_1440w.jpg)

有一些国家的号码填进去，OpenAI会发送到Whatsapp上的，因此很多接码平台实际是收不到短信验证码的。觉得麻烦不想折腾的同学可以移步公众号： **Mac的实验室** 后台回复 **sora** 获取大神收藏的最新接码验证渠道。  
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260513144654454.webp)


![](https://pic2.zhimg.com/v2-442c8a1b9a54afd46745d3a2402a4e8d_1440w.jpg)

它会提示通过Whatsapp发送到对应号码上，这种是收不到验证码的

![](https://pic2.zhimg.com/v2-93fe1e97f6b8122f0e0c30c4d038e969_1440w.jpg)

收到Codex的验证码就可以验证了！

上个月有大神分享过用Google账号直接登陆Codex，另外配合纯净的住宅ip环境，可以免手机号验证直接登陆。但这个方法现在也失效了，大部分情况登陆都需要手机号验证了！  

![](https://pic1.zhimg.com/v2-21b5d1c592ae71ed53a5e3d3416d44c0_1440w.jpg)

![](https://pic4.zhimg.com/v2-cca0e4b363a5ac867831ad1a5971e321_1440w.jpg)

验证成功后点击继续就可以跳转到Codex桌面端使用了

![](https://pic2.zhimg.com/v2-3e05b0a5bbfafb75735e3a3342058447_1440w.jpg)

![](https://picx.zhimg.com/v2-e7e556902f0853b7894d982be443b603_1440w.jpg)

普通免费版也有一定的使用额度，当然升级plus体验更棒了  

![](https://pica.zhimg.com/v2-8ac735fdad3d9869b80e440d0f35c88a_1440w.jpg)

![](https://pic2.zhimg.com/v2-c9df64bf1fb48995e4997ae797d5f6d7_1440w.jpg)

Codex的手机号验证的经验就分享到这里，后面有更多方法会继续更新，希望对大家有帮助！有问题欢迎留言哦！  

![](https://pic1.zhimg.com/v2-8269abda41f9e82c25cc5c9fcd8b0e3e_1440w.jpg)

最新更新一个方法：

### 升级Plus（推荐，最最省事）

付费用户基本不再触发手机号验证，我自己多次实测有效。

升级之后仍然弹验证？ **99%是IP的问题，不是账号问题。** 你用的很可能是共享IP，换一个质量更干净的独享IP基本就解决了。

可以通过专业的IP质量检测平台自查你的网络环境,输入IP后查看风险评分，评分越低说明IP越干净，高风险评分建议更换节点。

> 如： [ping0.cc](https://link.zhihu.com/?target=http%3A//ping0.cc) 、 [ipdata.co](https://link.zhihu.com/?target=http%3A//ipdata.co)

![](https://pic4.zhimg.com/v2-7fcf72c0fd03aef108fbb3b51b447ac3_1440w.jpg)

编辑于 2026-05-06 20:09・广东