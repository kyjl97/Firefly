---
author: 小刚 AI
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzkzODQ3NDMxMw==&mid=2247487771&idx=1&sn=b08b26ee71d4411ba684ce3c0dcfc9fa&chksm=c338742612c1f040defe02eac954cf6e7a307f82ba8e7c3c1b611ff28b6945191657f3c8e8a3&mpshare=1&scene=1&srcid=0526iFW0DpIbyt0Ht4kyzV47&sharer_shareinfo=785f7412b186cd4de4a9d4724a8d0a3c&sharer_shareinfo_first=785f7412b186cd4de4a9d4724a8d0a3c#rd
saved: 2026-05-26 14:24:07
tags:
  - 笔记同步助手
id: c1c803f4-18f5-4886-9647-8d21763d54d9
---

公众号名称：小刚AI探索

作者名称：小刚 AI

发布时间：2025-04-13 15:18

用剪映的字幕自动识别总是会有很多错别字的问题，剪映自带的导入内容匹配音频又会出现一段文字堆在一起的问题，尤其使用HeyGem数字人，动辄好几分钟的音频，一句句的检查修改实在有些崩溃，于是打算做一个AI字幕校对工具,本来以为分分钟就搞定的时候，没想到一搞就是一天。

最开始以为这么简单的应用随便找个上下文和输出Token高的模型就行了，就从硅基流动找了个免费的智普9B模型，没想到竟然不能很好的完成任务，不能完整的匹配原先字幕的时间点。于是就换了DeepSeek R1，这个竟然一直不返回信息，可能因为内容比较多，又是非流式输出，时间久了貌似是断开了链接。

然后只好换个平台试试，换到了火山引擎的，又遇到了调用失败的问题，主要是因为Cursor给写的api接口是通用的接口，而火山需要先选择指定的模型开通，还需要使用指定地区节点的api接口连接，比如：https://ark.cn-beijing.volces.com/api/v3/chat/completions  
![[images/104540688f08a93d8356f6eae933eca0_MD5.png]]

所以在Cursor开发调用api的应用的时候，最好给他官方开发文档的内容做参考，不要完全指望他给写。另外AI应用，最好在各家的大模型广场先测试下对应的模型是否能够完成任务。然后就在能够准确完成任务的模型里面选一款性价比高的就可以了。比如我就用的豆包1.5pro的模型，相对 DeepSeek R1 还是能便宜不少的。

下面就分享下这工具的用法。  
网址：https://www.subtitle-edit.com/

1、从剪映的音频上点右键就可以识别字幕歌词，然后导出的时候选择导出SRT格式的。  
![[images/fb6a1c97c55c2bb3e2b6a042d2a42f8c_MD5.png]]  
2、打开网站，在SRT处上传剪映导出的SRT字幕文件，TXT处上传自己原先的口播稿。  
![[images/300cd231058f78cba8ce9b10e20e2b8d_MD5.png]]  
3、点击开始校对，就等待大模型返回信息即可，因为是非流式输出，所以得等完全生成好了才会显示信息，所以内容多的话可能会有些慢。  
![[images/8d55b966afb6b8b92063361a69d82015_MD5.png]]  
4、生成完成还可以做一些简单的修改，然后下载SRT文件，再重新导入到剪映就可以了。  
![[images/f1ec44a280694415b50971b7f1a28b3f_MD5.png]]

尴尬之处发现字幕识别的功能现在竟然也是剪映的SVIP才能用了，感觉这工具的实用性大打折扣，不过常做视频剪辑的，剪映的VIP基本是必备的，感觉现在剪映是个超级全能工具，我有时候甚至都用它设计一些简单的图片。而且各种AI功能，省掉之前各个小工具，比如音频分离UVR、视频高清化TopazVideoAI，生成图片音乐素材等等等，一个剪映就够了。

另一个尴尬之处是，做的这第一个AI网站就是个超级消耗Token的，一般如果是中文文字，100个中文字才需要大约60个Tokens，但是这种带格式的字幕，每个符号、字符都占1个Token，而且输入输出都带着格式，所以这个Token消耗量。。。

再就是这个能力在各种聊天工具里面基本都比较容易实现，只需要上传原稿、字幕内容，给个简单的提示词就可以，只不过是不能直接给出.SRT格式的文件而已。

这么一想我这第一个AI网站貌似不太会成功的样子![[images/da758965a1c145e3212eef15b8b53d2d_MD5.png||20]]。。。。

---

![[images/cf1bb9610d3d3305801aa3d4b9fc74d1_MD5.jpg|cover_image]]

Original 小刚 AI 小刚AI探索

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/b0fe866b_1779776645369?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzkzODQ3NDMxMw%3D%3D%26mid%3D2247487771%26idx%3D1%26sn%3Db08b26ee71d4411ba684ce3c0dcfc9fa%26chksm%3Dc338742612c1f040defe02eac954cf6e7a307f82ba8e7c3c1b611ff28b6945191657f3c8e8a3%26mpshare%3D1%26scene%3D1%26srcid%3D0526iFW0DpIbyt0Ht4kyzV47%26sharer_shareinfo%3D785f7412b186cd4de4a9d4724a8d0a3c%26sharer_shareinfo_first%3D785f7412b186cd4de4a9d4724a8d0a3c%23rd&s=obsidian)