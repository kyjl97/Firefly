---
title: Get笔记同步Obsidian
published: 2026-05-22
tags:
  - Obsidian插件
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-get-to-obsidian-20260522-160900.webp
---
你在 Get 笔记中长期收藏却未整理，这种收藏夹囤积症持续多久了？

我用了大概半年。最开始觉得太棒了——看到好文章，丢进去；听到有意思的播客，丢进去；脑子里冒出什么想法，随手语音一下，也丢进去。AI 帮你摘要，帮你整理，感觉自己的知识库在飞速膨胀。

然后过了两个月，我打开 Get 笔记，里面已经有 400 多条笔记了。但真正"用"过的，可能不超过 20 条。

问题不在工具，在于 Get 笔记是个"输入终点"，但知识真正被用起来，需要的是"加工和连接"。而 Obsidian，恰好是干这件事的地方。

所以有人做了一个插件，把 Get 笔记的内容自动同步到 Obsidian 里。

**项目地址：**
https://github.com/springrain1/get-to-obsidian

PS.如果遇到地址打不开，关注公众号「得救之道」，后台回复「get-obsidian」获取插件
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-get-to-obsidian-20260522-160900.webp)

### 准备工作

在开始之前，你需要：

- 一个已经在用的 **Obsidian Vault**
- 一个正在用的 **Get 笔记账号**
- 安装好 **Node.js**（因为后面要跑 npx 命令，没有的话先装一下）
- 会用Obsidian 的插件市场，搜索安装BRAT 这个插件

BRAT 是什么？简单说，它是一个能帮你安装"还没上架插件市场"的 Obsidian 插件工具。


### 安装步骤

#### 第一步：装 BRAT 插件

打开 Obsidian，进「设置 → 第三方插件 → 浏览插件市场」，搜索 **BRAT**，安装并启用。

这一步应该很顺，BRAT 是 Obsidian 社区里用得很广的工具，我自己装过的不下五六个插件都是靠它的。

#### 第二步：用 BRAT 安装 get-to-obsidian

进入 BRAT 的设置页，找到「Add Beta plugin」，填入仓库地址：

```
https://github.com/springrain1/get-to-obsidian
```

点确认，BRAT 会自动帮你拉取并安装插件。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260522151517689.webp)

#### 第三步：装 Playwright

这块是容易漏掉的地方，官方也有写，但藏得比较深：

**装完插件后，还需要手动跑一条命令：**

```bash
npx playwright@1.43.1 install
```

打开终端（Windows 用 PowerShell 或者 CMD 都行，Mac 直接用 Terminal），把这行粘进去跑一下。

Playwright 是一个浏览器自动化库，插件用它来抓取 Get 笔记里的内容。如果跳过这一步，后台自动同步那个功能就跑不起来。

我当时第一次配的时候就没注意这个，折腾了半个小时才发现。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260522155643986.webp)


#### 第四步：配置 Get 笔记账号

安装完后，点击左侧边栏的笔记本图标 📓

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260522152241888.webp)

进入插件的设置页，建议勾选插件中
☑️启动Obsidian时自动同步
☑️每小时自动同步一次

最后点击点一次「自动同步」试试——如果 Obsidian Vault 里出现了新的文件夹，里面开始有笔记冒出来，说明连接成功了。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260522153016063.webp)



### 同步进来的笔记长什么样

跑通之后，每条从 Get 笔记同步过来的笔记，都是一个独立的 Markdown 文件。

你的 Obsidian vault 会生成以下结构：
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260522160651760.webp)


notes文件中笔记，标题、时间、来源链接、标签，都在 Frontmatter 里，结构干净。

这意味着什么？意味着你可以：

- 用 **Dataview** 按标签、日期、来源过滤笔记，做成动态看板
- 给任意一条笔记加上 `[[双链]]`，把它跟 Obsidian 里的其他笔记连起来
- 把它丢进某个项目文件夹，让它参与你真正的知识系统

增量同步这一点也设计得挺合理——每次只拉取新增的内容，不会重复写入，不用担心跑几次之后 Vault 里一堆重复文件。


### 同步完之后，别忘了这件事

工具链再顺滑，也代替不了"定期整理"这个动作。

这是真的。我自己每周会专门找个时间，打开 Obsidian，把这一周同步进来的内容过一遍：

- **有价值的**，加标签、加双链，融进知识网络
- **跟某个项目相关的**，移到对应的项目目录
- **读完摘要觉得不需要深挖的**，标记已读
- **确实没用的**，直接删掉

不要让 Obsidian 变成另一个收藏夹。Get 笔记负责"接收"，Obsidian 负责"加工"，定期回顾才是让这套系统真正转起来的关键。

### 最后总结下

收藏夹囤积症的解药，不是换一个更好的收藏夹，而是建立"收进来之后要做什么"的机制。

get-to-obsidian 解决的是"把 Get 笔记的内容拉进来"这一步。

真正让知识活起来的，是你装了双链之后那个整理的动作。

工具是桥，路还得自己走。

\>>>**延伸阅读**
- [19 个 Obsidian 神仙插件](https://mp.weixin.qq.com/s/8kCbGmeXvB7cuJZGHaCdkw)
- [Obsidian同步Notion最佳实践](https://mp.weixin.qq.com/s/24oTrC1tttUs18Qv7cRwRQ)
- [Dataview与Templater插件联动](https://mp.weixin.qq.com/s/LvxZCJG99fzyYbgmDJ73fA)
- [Obsidian日记半自动化](https://mp.weixin.qq.com/s/kPjIpHmzciWY8_3ettEVsg)
- [Obsidian附件图片管理插件](https://mp.weixin.qq.com/s/lgdJ7DYSqRIS1b13QQnk3A)
- [Obsidian插件LinkStowr最佳实践](https://mp.weixin.qq.com/s/45pUXcmcifTzTcdrlrTWHQ)
- [Obsidian的插件Claudian报错](https://mp.weixin.qq.com/s/pdbv5g8wGVga9z4n52homw)
- [Karpathy 的 LLM Wiki最佳实践](https://mp.weixin.qq.com/s/9qTRLHvoNQKUF2Ac2iVRvA)
- [Obsidian推送微信插件配置CF Worker代理方案](https://mp.weixin.qq.com/s/4SEsM-AWoEhPXiD49oNB9g)

以上，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧，如果想第一时间收到推送，也可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。

*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*


### 补充：
GET笔记导入为 markdown，使用 tauri 实现的跨平台客户端
https://github.com/Duosl/biji2md_tauri
打开get笔记刷新网页，安装以下步骤操作拿到Bearer后面的内容就是token
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260526010012622.webp)

软件界面如下，同步之前，进去设置，建议导出目录结构**按主标签分组**或者**平铺**
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260526010140943.webp)

相比第一个有个没有来源
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260526011705005.webp)

参考教程
https://my.feishu.cn/wiki/FOBBw4Y5PisOU4k842VcIu0Sndb