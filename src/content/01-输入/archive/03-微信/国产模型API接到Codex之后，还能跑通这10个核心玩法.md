---
author: AI沃茨
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=Mzg3MTk3NzYzNw==&mid=2247507308&idx=1&sn=1823daf986fac0d15015389e5dc16861&chksm=cf04ccc6df1f6cec30a5dde3376b71ae5f83e7151e38b4e74aeac9feea1f24492bf58838ec70&mpshare=1&scene=1&srcid=0526C3PXTM8fYsTLZftqHeM7&sharer_shareinfo=38fbd371bae24edcae12c921c76c8e10&sharer_shareinfo_first=38fbd371bae24edcae12c921c76c8e10#rd
saved: 2026-05-26 04:05:05
tags:
  - 笔记同步助手
id: 75d7aa49-510d-4fda-8aa1-ec4971f5db08
---

公众号名称：卡尔的AI沃茨

作者名称：AI沃茨

发布时间：2026-05-24 12:46

## Agent界不能没有Coding Plan和Max x20订阅，就像麻婆豆腐里不能没有豆腐。

中转API确实能省钱，但缓存失效之后9折没了，额度虚标，速率跟不上，上下文被动缩水，这些苦我是一点也不想吃了。Claude的API我现在也没什么招，老被封。GPT Pro现在也不敢断，谁也不知道它会不会哪天也学一下友商，突然来个身份验证。

所以这次我想测一个更具体的，

如果把国内模型API接进Codex App，它到底还能不能撑起一套真实可用的Agent工作流？

刚好，Codex团队最近分享了如何把Codex用到极致的教程。

于是我跟上线两个月，刚刚又上了新模型，之前也没专门测过的​阶跃星辰Step Plan​一拍即合，做了这次国内Codex玩法合集。

![[images/f1f0f25fe4c38a682e1197f8bd68a8a7_MD5.png]]

我最先关心两个点。

接了API之后，还能不能用手机端连Codex？锁屏状态下呢？

答案是可以。

Codex最近更新的双击Command键，然后截屏整个屏幕的功能，API模式下还能不能用？

答案也是可以。

这两个点解决了我最担心的事情，API模式不是一个残血版Codex，至少在我这次测试里，它还能保留Codex App关键的入口和交互。

Step Plan这次可以通过配置模型名step-router-v1，根据任务复杂度自动在deepseek-v4-pro和step-3.5-flash之间切换。v4-pro刚还宣布了继续保持2.5折。四舍五入一下，这就有点像DeepSeek也出了一个Coding Plan。

对Coding Plan我的要求其实不高，

能随时买到的，额度别虚标的，Max token别动不动卡到8K的，

上面这些缺点大家可以对号入座一把。。。

![[images/d3da7bfa206b1a05d5d75ac1c6306725_MD5.png]]

PS：deepseek-v4-pro和step-3.5-flash的模型综合能力分，2603是step-3.5-flash的迭代版本

![[images/45cc01ba587ac4020209e9ac621401f3_MD5.jpg]]

PS：deepseek-v4-pro和step-3.5-flash的价格排名

Step Plan里还塞了一个6B以下的image-edit-2模型​，支持文生图和图像编辑。

这个我后面也顺手测了一下。

  

## 把API接进Codex

先说最实用的部分。

我给大家做了一个脚本，它会自动引导你完成所有的配置，

```
curl -fsSL https://raw.githubusercontent.com/LearnPrompt/stepfun-codex-adapter/main/install_stepfun_codex_adapter.sh -o install_stepfun_codex_adapter.sh
chmod +x install_stepfun_codex_adapter.sh
./install_stepfun_codex_adapter.sh
```

这个脚本主要做几件事，

选择订阅类型，比如Plan或者普通订阅，选择对应模型；

检查你的电脑是否已经安装cc-switch和Codex，如果没有，它会帮你装好；

在cc-switch里把Step的API转换成Codex需要的Responses API格式。

![[images/f5ea14268091627e989987bb38a9cd32_MD5.png]]

完成之后再打开Codex App，如果你在对话框右下角看​到StepFun开头，就​说明Codex已经从GPT账号登录切换到了API模式。

![[images/ab9dd6402bf4cd341343467f0e13c988_MD5.jpg]]

## 接上API，Codex的功能还剩多少?

开头我们已经测试了手机调用Codex App以及双击按键屏幕截图的功能。

那下一步我们继续跟着Codex团队的思路，测了最近用得很多的浏览器自动化和电脑自动化。

这次我还故意加了一个坑，

我同时打开了两个不同个人资料的账号，这两个账号上都装了Codex的浏览器插件。

在我的日常使用里，GPT-5.5有时候也会被这个场景迷惑到，不知道我要在哪个账号发X。

从截图里可以看到，一开​始step-3.5-flash​它确实被虚晃了一枪，后面它发现需要切换到另一个Profile，最后大概探索了3到4轮，完成了推特发布。

![[images/4e97d48aed2528104f39009a38e1fa8a_MD5.png]]

Computer Use当然也能做。

我让它在飞书里给我的Hermes发一条消息，问问能不能操作Claude Code的文字信息。

这怎么不算一次性把御三家都用上呢？

![[images/de2c321a6ac9f89d0a1134c1ccb8acbc_MD5.png]]

这里也顺手把Codex App里的几个入口捋一下，

browser​｜适合在侧边栏里做网页审查、阅读网页、标记页面，

@chrome｜适合那些需要浏览器登录态的工作流，

@computer｜适合处理只能在桌面GUI里点来点去的任务。

Step Plan里还带了一个​image-edit-2。

来都来了，我在测试API接入Codex之后，在计划模式还能不能正常用的情况下，让他给我开发了一个可以调用这个图像模型的脚本。

![[images/f80f9c670c92367eace9b71a01daf71d_MD5.png]]

我试了一下，​让6B以下模型生成一​个大小字体的中文图片，难度还是比较高的。

但我更多测试之后发现，拿它来修改图片里的文字，速度很快而且也很少改错。

![[images/772cd568dfbdba346f42348066b3425c_MD5.png]]

![[images/e33a5fcd759082afe8f864741d1549be_MD5.png]]

还有两个我常用到的能力边界也要讲清楚。

在测试过程中，对话时自动压缩上下文的能力是正常生效的。

目前比较明确没有生效的是，因为是API登录，不是账号登录，所以如果你想通过已经登录到这个账号上的设备做连接，比如用MacBook Pro去操作非局域网的Mac mini，就不能直接连，这个时候还是要走SSH。

![[images/de2c321a6ac9f89d0a1134c1ccb8acbc_MD5.png]]

Codex还有一个我很喜欢的交互就是任务跑一半的时候，可以进行任务干预。

这个干预分成两种。

第一种是引导，

当你发现AI跑偏了，可以直接把它拉回来。比如我发送之后才临时想起来，想在第一个模块里加一些文字特效，就可以直接补进去。

第二种是排队，

它不会打断现在正在运行的任务，而是把新任务排在队伍后面。

![[images/615c2c517af6562e73c8f1f7aa9e407c_MD5.png]]

这也是顺带测了一下切换到DeepSeek V4 Pro后，模型做出来的网页质量了。

> 📹 此处为视频内容（vid: wxv\_4529329549171687424），未能直接提取，请前往原文查看：[在公众号原文中观看](https://mp.weixin.qq.com/s?__biz=Mzg3MTk3NzYzNw==&mid=2247507308&idx=1&sn=1823daf986fac0d15015389e5dc16861&chksm=cf04ccc6df1f6cec30a5dde3376b71ae5f83e7151e38b4e74aeac9feea1f24492bf58838ec70&mpshare=1&scene=1&srcid=0526C3PXTM8fYsTLZftqHeM7&sharer_shareinfo=38fbd371bae24edcae12c921c76c8e10&sharer_shareinfo_first=38fbd371bae24edcae12c921c76c8e10#rd)

除了上面这些功能测试，Codex团队分享的自动化和目标设定（goal），也是我这次重点想测的地方。

自动化的成功率还是比较高的。在Codex里面，它很多时候是以一个提示语的方式存在。右侧栏可以看到每次运行的成功率和失败率，也可以主动触发。

我这里直接搬了一个AI日报提示语，用之前开发的AI热点伯乐Skill跑了一次。

> 📹 此处为视频内容（vid: wxv\_4529330506697015296），未能直接提取，请前往原文查看：[在公众号原文中观看](https://mp.weixin.qq.com/s?__biz=Mzg3MTk3NzYzNw==&mid=2247507308&idx=1&sn=1823daf986fac0d15015389e5dc16861&chksm=cf04ccc6df1f6cec30a5dde3376b71ae5f83e7151e38b4e74aeac9feea1f24492bf58838ec70&mpshare=1&scene=1&srcid=0526C3PXTM8fYsTLZftqHeM7&sharer_shareinfo=38fbd371bae24edcae12c921c76c8e10&sharer_shareinfo_first=38fbd371bae24edcae12c921c76c8e10#rd)

跟自动化不同，

Goals是为了更长时间的Codex任务准备的。

你给它写一个明确目标之后，AI会在一段时间内持续完成它。

如果你直接打Goal，Codex里没有出现相关选项，可以先在终端里输入：

```
codex features enable goals
Enabled feature `goals` in config.toml.
```

> 等它起作用之后，重启Codex App，就会看到一个叫设置目标的选项。
> 
> 这就是我设计的一个目标，让模型开发一个用于AI图片展示的画廊网页。
> 
> ![[images/27e4fe35da30084c36401b11e60c4af7_MD5.png]]
> 
> BTW，目标本身是可以中途修改的。
> 
> 当Codex能跑更长时间任务之后，我的下一个问题API版本的Codex还能保留记忆吗？
> 
> Codex团队在用Codex的时候打开共享记忆，也推荐我们把持久上下文存在Obsidian这样的知识库里。
> 
> 我自己就是这么做的。
> 
> 我的Hermes，OpenClaw，Claude Code和CodeX，它们的默认目录就是Obsidian的vault。我会通过Agent.md来约束它们每次读取文件的次数。这样虽然我每次加载消耗的 token 会比直接在空目录上面要多一些，但我能以最快的速度启动我的任务。
> 
> 这次我让step-3.5-flash帮​我查了一下，Obsidian里过去两个月存下来的、跟Codex工作流相关的数据有哪些，它们的路径分别在哪。
> 
> > 📹 此处为视频内容（vid: wxv\_4529332431950413825），未能直接提取，请前往原文查看：[在公众号原文中观看](https://mp.weixin.qq.com/s?__biz=Mzg3MTk3NzYzNw==&mid=2247507308&idx=1&sn=1823daf986fac0d15015389e5dc16861&chksm=cf04ccc6df1f6cec30a5dde3376b71ae5f83e7151e38b4e74aeac9feea1f24492bf58838ec70&mpshare=1&scene=1&srcid=0526C3PXTM8fYsTLZftqHeM7&sharer_shareinfo=38fbd371bae24edcae12c921c76c8e10&sharer_shareinfo_first=38fbd371bae24edcae12c921c76c8e10#rd)
> 
> 测试到这里的时候，我又发现了一个 API 版 Codex 缺失的功能，
> 
> Chronicle记忆组件，它能帮Codex从你最近屏幕上发生的事情中提取并构建记忆，但是换成API后，这个功能就关了。
> 
> ![[images/90c123d3683cffceb0d2a77005f0a19b_MD5.png]]
> 
> 最后又到了大家最关心的价格环节，
> 
> Plan能不能长期用，最后还是要回到价格，额度和稳定性。
> 
> 这次我直接让GPT用绝对精准、不忽悠、把事情拆得明明白白、不焦虑、不踩坑、特别直白、不要绕圈子的方式，给了一版对比。
> 
> ![[images/7a3f0059918350cc72595e8320bf9c27_MD5.png]]
> 
> 我的感受是，这类测试Case很适合以后有新模型时继续复用。
> 
> 因为Codex现在的生态正在从一个编程Agent，逐步切换成一个通用Agent。
> 
> 你在它上面测功能完整度，提示语适配度，浏览器能力，桌面能力，长期任务和记忆协作，基本能很快看出一个模型到底能不能放到Agent里用。
> 
> 最后，也回答一下大家问得最多的问题：
> 
> 我的主力Agent到底是Hermes、Codex，还是Claude Code？
> 
> 我的选择是，
> 
> 都要，但分工不同。
> 
> Hermes更适合做我的IM入口和长期调度层。
> 
> 我在手机上配置了快捷键，按一下就能打开飞书，飞书里对接Hermes。它适合长期任务，多群组多会话。所以它很适合做计划，再通过tmux控制Codex或者子Agent派发出去执行。
> 
> 所以没有必要在它们之间二选一。
> 
> 买Coding Plan和订阅Max20最大的爽点，
> 
> 不就是可以尽情尝试不同的Agent，
> 
> 并保留各自好用的点吗？
> 
> 就像买手机壳一样。
> 
> 在预算允许的情况下，
> 
> 我买它个四五种不同材质换着用，
> 
> 岂不美滋滋。
> 
> ​
> 
> @ 作者 / 卡尔
> 
> ---
> 
> 最后，感谢你看到这里👏如果喜欢这篇文章，不妨顺手给我们_点赞｜在看｜转发｜评论 📣_
> 
> 如果想要第一时间收到推送，不妨给我个星标🌟
> 
> 如果你有更有趣的玩法，欢迎在评论区聊聊🤝
> 
> 更多的内容正在不断填坑中……
> 
> ![[images/c6ab5294d179362efeb453fb82100bdb_MD5.jpg]]

---

![[images/30dceb1e28859317257eaabccfec1a51_MD5.jpg|cover_image]]

Original AI沃茨 卡尔的AI沃茨

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/f672bf19_1779739503132?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg3MTk3NzYzNw%3D%3D%26mid%3D2247507308%26idx%3D1%26sn%3D1823daf986fac0d15015389e5dc16861%26chksm%3Dcf04ccc6df1f6cec30a5dde3376b71ae5f83e7151e38b4e74aeac9feea1f24492bf58838ec70%26mpshare%3D1%26scene%3D1%26srcid%3D0526C3PXTM8fYsTLZftqHeM7%26sharer_shareinfo%3D38fbd371bae24edcae12c921c76c8e10%26sharer_shareinfo_first%3D38fbd371bae24edcae12c921c76c8e10%23rd&s=obsidian)