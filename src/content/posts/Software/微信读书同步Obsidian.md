---
title: 微信读书同步Obsidian
published: 2026-05-26
tags:
  - Obsidian插件
  - 微信读书
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-weread-obsidian-20260529-202317.webp
---
你在微信读书里划过多少条线？写过多少条想法？上一次回去翻它们又是什么时候？

我用了微信读书四年，划线 2000 多条，笔记写了上百条。说实话，99% 的内容画完就忘了——微信读书的笔记入口藏得太深，每次想回顾都要点好几层菜单，体验很差。

但问题是，这些划线笔记不是没用。它们是我读过的每一本书里最精华的片段，是我当时觉得"这句话说得太对了"才动手划下来的。

它们只是缺一个能被真正用起来的地方。

而 Obsidian，刚好是那个地方，

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-weread-obsidian-20260529-202317.webp)

### Weread功能亮点

功能很简单：**把你的微信读书划线、笔记、书评，全部同步到 Obsidian 里**。

- **划线**：你在任何书里划过的段落
- **想法/笔记**：读书时随手写的批注
- **热门划线**：别人划线最多的段落（可选关闭）
- **书籍元数据**：书名、作者、封面、阅读时长

同步进来的内容以 Markdown 格式存储，带完整的 Frontmatter，支持 Dataview 查询，可以和 Obsidian 笔记做双链关联。

### 安装插件

进 Obsidian「**设置 → 第三方插件 → 浏览插件市场**」，搜索 **Weread**，安装并启用。


### 账号绑定

装好之后，进入插件设置页：

一、点击「**登录**」按钮，会弹出微信读书网页版登录页，扫码就能绑定。

二、登录成功后，下拉找到「**笔记文件夹分类**」这个选项，建议改成 **图书分类**。

默认是按日期分类的（`2026-05-26/书名.md`），改成图书分类后会变成 `书名/章节.md`——一本书一个文件夹，结构更直观，也方便后续用 Dataview 按书名筛选。

三、其他选项按需调整：

- **同步热门划线**：如果你只想看自己的笔记，可以关掉
- **同步元数据**：建议开着，书名、作者、封面等信息都会写进 Frontmatter
- **最小划线数**：一本书至少有几条划线才同步，设成 0 就是全部同步

### 一键同步

配置好之后，在左侧边栏点微信读书图标。

打开面板，点右上角的「**同步**」按钮。

第一次同步会比较慢，取决于你微信读书里有多少本书。我 400 多本书，第一次同步跑了大概两分钟。之后每次增量同步就很快了，十几秒搞定。

同步完成后，你的 Obsidian Vault 里会出现一个 `Weread` 文件夹（或你自定义的文件夹名），里面按书名排列着所有你划过线的书。

### 同步进来的笔记长什么样

每本书是一个 Markdown 文件，Frontmatter 里包含：

```yaml
---
bookName: 书名
author: 作者
cover: 封面图URL
readingTime: 阅读时长
category: 分类
---
```

正文里，每条划线按章节排列，带发布时间、划线内容、你的批注。格式干净，可以直接用 Dataview 做查询。

举个例子，你可以建一个 Dataview 面板：

```dataview
TABLE author, readingTime
FROM "Weread"
SORT readingTime DESC
```

这样就能一眼看到你读过哪些书、花了多长时间。

更实用的玩法是：**把划线和批注用双链连接到你自己的笔记里**。比如你正在写一篇关于"写作方法论"的文章，可以在任意一条划线里 `[[写作方法论]]` 把它关联进去——知识网络就这么慢慢建立起来了。

### 总结

总结一下，Get 笔记同步一样，**工具只是把内容搬过来，整理还是得自己做**。

微信读书划线这个功能，很多人用了就忘了。Weread 插件干的活就是帮你把这些碎片内容从微信读书里"救出来"，放进一个真正能加工的地方。

但救出来之后怎么用，取决于你有没有动手去翻、去连、去写。

工具是把钥匙，门还得自己开。

\>>>**延伸阅读**
- [Get笔记同步Obsidian插件](https://jieliu.me/posts/get-to-obsidian)
- [19 个 Obsidian 神仙插件](https://mp.weixin.qq.com/s/8kCbGmeXvB7cuJZGHaCdkw)
- [Dataview与Templater插件联动](https://mp.weixin.qq.com/s/LvxZCJG99fzyYbgmDJ73fA)
- [Obsidian日记半自动化](https://mp.weixin.qq.com/s/kPjIpHmzciWY8_3ettEVsg)
- [Obsidian附件图片管理插件](https://mp.weixin.qq.com/s/lgdJ7DYSqRIS1b13QQnk3A)

以上，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧，如果想第一时间收到推送，也可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。

*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*
