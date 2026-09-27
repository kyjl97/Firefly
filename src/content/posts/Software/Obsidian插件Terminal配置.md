---
title: Obsidian插件Terminal配置
published: 2026-05-24
tags: []
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260524152702768.webp
---

1. 打开 Obsidian 设置，进入「Terminal」插件的「配置」页面。

2. 选择任意兼容预设，点击「编辑」，命名为「PowerShell 整合式」，前置选择「powershell: 整合式」。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260524152702768.webp)


3. 点击「参数」前的加号，添加参数 `-NoLogo`；将默认 `python3` 替换为系统真实 Python 路径。

```
-NoLogo
```

```Plain
C:\Users\Administrator\AppData\Local\Programs\Python\Python314\python.exe
```

4. 点击「检查」验证配置，若提示依赖异常，按提示安装/升级对应依赖。
我这边报错了所以需要安装两个依赖包。

```Plain
pip install psutil>=5.9.5 pywinctl>=0.0.50
```

5. 返回设置页面，将该配置设为默认，重启 Obsidian 后即可正常使用终端。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/a40746dd7c4aef1a757eedac61ca79e9.webp)

- [19 个 Obsidian 神仙插件](https://mp.weixin.qq.com/s/8kCbGmeXvB7cuJZGHaCdkw)
- [一键把 Get 笔记同步到 Obsidian](https://mp.weixin.qq.com/s/2eqmgz77JXHaYgL6-TWBdA)
- [Obsidian同步Notion最佳实践](https://mp.weixin.qq.com/s/24oTrC1tttUs18Qv7cRwRQ)
- [Dataview与Templater插件联动](https://mp.weixin.qq.com/s/LvxZCJG99fzyYbgmDJ73fA)
- [Obsidian日记半自动化](https://mp.weixin.qq.com/s/kPjIpHmzciWY8_3ettEVsg)
- [Obsidian附件图片管理插件](https://mp.weixin.qq.com/s/lgdJ7DYSqRIS1b13QQnk3A)
- [Obsidian插件LinkStowr最佳实践](https://mp.weixin.qq.com/s/45pUXcmcifTzTcdrlrTWHQ)
- [Obsidian的插件Claudian报错](https://mp.weixin.qq.com/s/pdbv5g8wGVga9z4n52homw)
- [Karpathy 的 LLM Wiki最佳实践](https://mp.weixin.qq.com/s/9qTRLHvoNQKUF2Ac2iVRvA)
- [Obsidian推送微信插件配置CF Worker代理方案](https://mp.weixin.qq.com/s/4SEsM-AWoEhPXiD49oNB9g)

**以上，既然看到这里了，如果觉得不错，随手点个赞、在看、转发三连吧，如果想第一时间收到推送，也可以给我个星标⭐️～**

谢谢你看我的文章，我们，下次再见。

*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*

