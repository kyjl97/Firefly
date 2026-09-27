---
Source: "https://mp.weixin.qq.com/s/rrnCk_NVZbmPmScxgCWg6w"
created: 2026/05/09
tags:
  - "clippings"
---
米哥妙妙 *2026年5月7日 17:09*

上个月 OpenAI 发布了 Codex App 桌面版，MAC用户用得很爽，但我是Windows系统，要么打不开微软商店，要么安装没反应。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/aDzem9Baqia3HChkyuEib8MTOJFmH2ukc5hpY9nkPA3icicDl6MwL9XNp9I2R4DCQT88fovPicnX4jPibJg29ElwoiaLBo3EzAYmkhJYOQJP854g14/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

后来很长一段时间，都是用的Codex CLI方式。但最近Codex可以直接用GPT image2 批量生图，真的太香了。

于是又再一次鼓足勇气，决心解决这个问题。

可以肯定是我本机的问题，因为别人也是Windows系统，但没问题。

我遇到的情况是，一开始 Microsoft Store打不开，后来偶尔能打开，又下载不了。

换了个方法，用命令行装：

```
1

winget install Codex -s msstore
```

报错： `0x8a15005e` 。

查了说是证书问题，想临时绕过证书校验再装，又遇到新的报错： `0x8007041d` 。

微软文档说这个错误是“服务没有及时响应”。

感觉问题从证书变成了安装服务问题，又夹杂着网络问题。

最后花了三个多小时，排查下来，是系统安装服务问题，以及网络问题叠加在一起。

如果你也遇到以下同样的问题，这篇总结可以详细看看：

- Microsoft Store 下载 Codex 一直没进度。
- winget install Codex -s msstore 卡住或报错。
- 报 `0x8007041d` 。
- 报 `0x8a15005e : The server certificate did not match any of the expected values.`
- 商店显示正在安装，但实际没有下载。
- 已经开始下载，但卡在几百 KB，比如 390 KB。

---

## Chapter 1

## 第一个坑： DoSvc系统服务被禁止更新工具锁死

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

从微软商店安装 App ，底层走的是 Windows Update 的一部分链路。

有一个服务叫 **DoSvc** （Delivery Optimization，传递优化），上负责协调 Store 和 Windows Update 的下载任务。

最开始安装时候，一直显示被禁用了。

```
1

DoSvc  Stopped  Disabled
```

我让AI帮我修复，结果死活改不了，不成功。

**当时处理这个问题， ==有一个关键转折点：从命令行修改方式，改为手动去注册表修改。==**

因为不是普通禁用，所以用命令行无法说生效。

后来进注册表一看， `Start=0x4` ，权限里 SYSTEM 和 Administrators 都只有 ReadKey，写不进去。

然后发现了这个：

```
1

WubLock  REG_DWORD  0x1
```

WubLock。

这是 **Windows Update Blocker** （WUB）类工具留下的标记。

这类工具的用途是“关闭 Windows 自动更新”，很多用户会装，省得系统在后台偷偷下更新。但它的副作用是：在注册表里写一个锁，让这些服务即使你手动改了启动类型，也照样起不来。

也就是说，你以为禁用更新只是“关掉了一个功能”，实际上它把 Microsoft Store 的安装链路也顺手切断了。

修复方法： **==进注册表，改所有者，给权限，删 WubLock，把 Start 改回 3（手动），重启。==**

重启后 `DoSvc` 成功启动。

---

## Chapter 2

## 第二个坑：Windows Update 服务的宿主地址出错

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

DoSvc 修好了，继续看 wuauserv（Windows Update 服务）。

启动它：

```
1

net start wuauserv
```

报： `服务没有响应控制功能` 。

权限正常，Start 也是 3。为什么还起不来？

查服务组配置：

```
1

reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Svchost" /v wusvcs
```

结果：

```
1

wusvcs    REG_MULTI_SZ    WaaSMedicSvc
```

wuauserv 的配置里写的是 `svchost.exe -k wusvcs -p` ，意思是“我要挂在 wusvcs 这个服务组里启动”。

但 wusvcs 组里只有 `WaaSMedicSvc` ，没有 `wuauserv` 。

服务找不到自己的“宿主”，当然启动不了。

这个问题在某些系统优化脚本或“精简版 Windows”里比较常见—— **有人在清理服务组配置的时候，把 wuauserv 误删了。**

修复：把 wuauserv 补回到 wusvcs 组里，一条命令的事。

```
1

reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Svchost" /v wusvcs /t REG_MULTI_SZ /d "WaaSMedicSvc\0wuauserv" /f
```

然后 `net start wuauserv` ，成功启动。

---

## Chapter 3

## 第三个坑：网络代理节点不对，下载卡死

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

两个服务修好之后，重新装 Codex。

执行命令行正常，但是一直显示在进行中。于是改为从微软商店打开下载，可以看到能显示开始下载，但是一直卡着390KB状态

```
1

Codex  已下载 390.0 KB
```

本来以为又是什么服务问题，继续问AI，给出了一堆命令行核查，无果。

说实话，那一刻还是蛮沮丧的，还以为就快成功了，结果又不行。

后来去吃饭，走了一圈，忽然想到，会不会是网络问题导致？有点类似上次安卓手机安装Google pay一样。

回来后，把节点从美国改为香港。漂亮！！！通了！！！

我还以为，只要浏览器能打开 ChatGPT，codex理所当然就OK。

结果是，Microsoft Store 走的是另一条下载链路，用的是 Windows 的 CDN 通道，不一定跟浏览器走同一个出口。

至此，终于完美解决问题。

---

## Chapter 4

## 小小复盘

装好之后，我把整个过程回看了一遍，这次从卡死到装好，排查的顺序是：

1. 证书绕过 → 解锁 winget 访问 Store 源
2. 修 DoSvc → 删 WubLock，恢复传递优化服务
3. 修 wuauserv → 把服务补回宿主配置组
4. 换代理节点 → 解决最后的下载卡顿

回头看，难怪第一次AI无法帮我解决问题。而这次AI帮我解决了起码98%的问题，剩下两个卡点，一个是手动改注册表，一个是手动改网络，是自己想到的。

其实我对电脑这类的系统服务和注册表也不并熟悉，但多少有些解题执着，一个问题如果未能解决，我会反复尝试不同解法。

所以用AI工具解决问题，不代表人完全不参与，全部100%依赖于AI。当陷入困境时候，也动动脑子，提点方向性建议，说不定就是解决关键问题的KEY了。

---

## 附：完整修复命令

**检查服务状态：**

```
1

Get-Service AppXSvc,ClipSVC,InstallService,BITS,DoSvc,wuauserv,usosvc | Format-Table Name,Status,StartType
```

**修复 DoSvc（删 WubLock）：**

```
123

reg export "HKLM\SYSTEM\CurrentControlSet\Services\DoSvc" "C:\Windows\Temp\DoSvc-backup.reg" /y
reg delete "HKLM\SYSTEM\CurrentControlSet\Services\DoSvc" /v WubLock /f
reg add "HKLM\SYSTEM\CurrentControlSet\Services\DoSvc" /v Start /t REG_DWORD /d 3 /f
```

重启电脑。

**修复 wuauserv（补回宿主组）：**

```
123

reg export "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Svchost" "C:\Windows\Temp\svchost-backup.reg" /y
reg add "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Svchost" /v wusvcs /t REG_MULTI_SZ /d "WaaSMedicSvc\0wuauserv" /f
net start wuauserv
```

**安装 Codex：**

```
1

winget install Codex -s msstore --accept-source-agreements --accept-package-agreements
```

下载卡了就切节点。

**收尾：**

```
12

winget settings --disable BypassCertificatePinningForMicrosoftStore
winget list Codex
```

*（你将以上修复思路和流程给AI，应该足够解决问题了。更为详细的安装修复命令完整版，我会放进 AI 进化知识星球，方便大家直接照着排查。）*

---

**微信扫一扫赞赏作者**

Ai工具 · 目录

继续滑动看下一个

米哥AI沟通

向上滑动看下一个

拖拽到此处

图片将完成下载

由Fitkun图片批量下载提供

同步

点击同步文章到多平台