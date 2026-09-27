---
title: OB首页控制台插件
published: 2026-05-28
tags:
  - obsidian
  - claude-code
  - skill
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-vibe-coding-obsidian-v3-20260528-180000.webp
---
算起来，我用Obsidian记也有好几年了，随着时间推移，文件越来越多，Claude Code里安装的skill也越来越多。

然后我就发现了一个很尴尬的问题。

我想调用一个skill，但死活想不起来那个斜杠命令叫什么。是`/khazix-writer`还是`/wewrite`？是`/up-Library-ingest`还是`/Library-lint`？每次都要去翻`知识库管理斜杠命令.md`那个文件，翻完复制，再去终端粘贴。

找笔记也是。文件散落在`01-输入/`、`posts/`、`Library/`、`Xenia/`、`Yoke/`、`Zen/`六个大目录下面，每个目录又有子目录。我想看看最近创建了什么笔记，得一个一个目录点进去看。

还有快速创建**日记**和**笔记**。每天想记点东西，得先新建文件，选目录，写frontmatter，再开始写内容。流程不长，但每天都来一遍就很烦。

三个问题，本质上都是同一个问题。

**Obsidian缺一个控制台。**
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260528174551686.webp)

### 灵感来自一张截图

前两天在网上刷到一张图，是一个人做的Obsidian首页仪表盘。

深色界面，顶部是统计卡片，中间是skill按钮栏，下面是tab面板。点击一个按钮就能直接执行对应的skill命令。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/7545851ed95b5dcaaa35d94b632e3a11.webp)

我当时就觉得，这玩意我也能搞。

但我不是程序员，不会写TypeScript，更不会写Obsidian插件。

不过，我会用Claude Code。

### 开始Vibe Coding

说真的，一开始我也不知道能不能搞成。我的想法很简单，跟Claude Code说清楚我要什么，它来写代码，我来看效果。

我把我的需求甩给了Claude Code，包括我的目录结构、skill列表、想要的界面布局。然后就开始了。

过程怎么说呢，比我想象的顺利，但也踩了不少坑。

**第一个坑是「终端集成」**。我想让点击skill按钮后自动在Obsidian的终端里输入命令，而不是只复制到剪贴板。为了搞清楚polyipseity Terminal插件的API，Claude Code把插件的minified代码翻了个底朝天，最后发现它的view type是动态生成的，根本写不死。

试了三种方案，最后发现最靠谱的还是复制到剪贴板。虽然不是一键执行，但至少不用每次去翻那个命令文件了。

**第二个坑是CSS**。我想要一个很酷的暗色主题，参考了PHOENIX仪表盘和Slash设计系统的设计语言。Claude Code帮我把CSS从最初的简陋版本迭代了四五个版本，从纯黑背景到金色强调色，从普通按钮到pill形状，从硬编码颜色到跟随Obsidian主题变量。

现在回头看，整个开发过程大概就是这样的：

**我描述需求 → Claude Code写代码 → 我截图看效果 → 我说「这个不对」「那个要改」 → Claude Code改 → 我再看 → 直到满意。**

整个过程大概花了两个小时。

### 最终效果

现在打开Obsidian，左侧栏有个仪表盘图标，点进去就是一个Home Console面板。

顶部是skill按钮栏，分了五个组，每个组都有自己的颜色标签。新建组有日记和笔记两个按钮，点日记自动创建今天的Daily Note并打开，点笔记弹出目录选择让你选保存到哪个文件夹。

文案组有选题生成、写文章、写教程、引流文案、去AI味、审校、标题七个按钮。制图组有配图、封面、卡片、PPT。查询组有查知识库，点击后会弹一个输入框，你输入关键词，它就帮你拼好`/Library-query 你的问题`然后复制到剪贴板。整理组有Library编译、Wiki编译、index编译、全量同步。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260528174330534.webp)



下面是六个Tab面板。输入池显示`01-输入/`下面各目录有多少待处理的素材。知识库显示Library的分类分布和最新页面，还有快捷入口可以直接打开`index.md`和`log.md`。博客文章Tab左侧是分类分布和文章概况，右侧是最近创建的笔记列表，带搜索过滤。Dataview、命令和快捷键、资料合集三个Tab分别对应Zen、Xenia、Yoke三个目录的文件列表，也都有搜索框。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260528175023790.webp)

说真的，我自己用了两天，最大的感受是。

以前每次要用一个skill，脑子里要过一遍「那个命令叫什么来着」，现在不用了。按钮就在那里，点一下就复制好了，去终端粘贴就行。

这种感觉就像，你以前每次炒菜都要先翻一遍菜谱找调料在哪，现在调料瓶全部摆在灶台边上，伸手就够到。

### 这件事让我想到的

其实整个开发过程最让我兴奋的不是最终做出来了什么，而是这个过程本身。

我一个不会写TypeScript的人，两个小时，从零开始搞出了一个能用的Obsidian插件。这在一年前是不可想象的。

Vibe coding这个词很准确。你不是在「编程」，你是在跟一个懂编程的伙伴聊天。你说你的想法，它帮你实现。你说「这个不对」，它帮你改。你说「参考一下这个设计」，它帮你对标。

**你做的事情是思考、判断、审美。代码实现是AI的事情。**

这不是说以后程序员就没用了。恰恰相反，正是因为有Claude Code这样的工具在，我才能把精力集中在「我要什么」而不是「怎么实现」上面。

就像我跟Claude Code头脑风暴的时候，它帮我分析了终端插件的API、分析了xterm.js的输入机制、帮我把22个skill按钮按工作流分了五个组。这些东西如果靠我自己去研究，可能一周都搞不完。

但有了AI，它研究，我决策。

它说「终端插件的view type是动态的，建议用剪贴板桥接」，我判断「可以，先用剪贴板，以后再优化」。它说「统计栏可以显示收件箱数量和死链数量」，我判断「不要，太多了，简洁一点」。

这才是AI时代正确的协作方式。

**不是让AI替你做所有事，而是让AI帮你做你做不到的事，然后你来做判断。**

### 写在最后

如果你也是Obsidian重度用户，也在为笔记太多找不到、skill命令记不住而烦恼，不妨试试自己搞一个Home Console。

你不需要会写代码。你只需要有Claude Code，和一个想解决问题的心。

就像我一样。

---
\>>>**延伸阅读**
- [全程借助 Vibe Coding 开发，打造出 Rustdesk 一键定制编译方案。](https://mp.weixin.qq.com/s/qJIDXo-CqusOzWWXHBMPYA)

----
以上，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧！想第一时间收到推送，可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/未命名的设计.webp)
*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*
