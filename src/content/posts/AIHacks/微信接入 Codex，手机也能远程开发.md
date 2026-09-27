---
title: 微信接入Codex
published: 2026-06-21
tags:
  - ai
  - codex
  - wechat
  - agent
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-wechat-codex-bridge-apimart.webp
---
这两天折腾了一个挺有意思的东西：

把个人微信接到 Codex 上。

以后不用一直坐在电脑前开着 Codex APP。人在外面，手机微信里发一句话，家里或办公室那台电脑上的 Codex 就能收到任务，继续帮你改代码、查项目、跑命令、整理文件。

**项目地址**
https://github.com/Gan-Xing/CodexBridge

它做的事情很直接：把微信消息转成 Codex 能处理的请求，再把 Codex 的回复发回微信。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-wechat-codex-bridge-apimart.webp)

简单理解就是：

```text
个人微信 -> CodexBridge -> 本机 Codex -> CodexBridge -> 个人微信
```

Codex 还是跑在你的电脑上，项目文件也还是在你的电脑上。微信只是多了一个远程入口。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/flow-wechat-codex-bridge.webp)


### 最简单的接入方式

如果你已经安装好了 Codex APP，可以直接把下面这句话发给 Codex：

```text
https://github.com/Gan-Xing/CodexBridge 帮我对接个人微信
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260620233854951.webp)

Codex 会自动处理后面的流程：克隆项目、安装依赖、检查环境、生成二维码、等待扫码、启动桥接服务。

### 扫码登录

依赖安装完之后，它会给你一个二维码。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260620233959351.webp)

用个人微信扫一下，然后在手机上确认登录就行。

这里注意一点：二维码有效期比较短。如果提示「二维码已过期」，让 Codex 重新生成一张再扫，不用纠结。

### 成功后怎么测试

扫码成功后，本机会生成微信账号凭证，通常在：

```text
C:\Users\你的用户名\.codexbridge\weixin\accounts\
```

Windows 上还可以注册成计划任务，任务名一般是：

```text
CodexBridge-Weixin
```

这样以后登录 Windows，它会自动启动。

接入成功后，打开微信，给桥接会话发：

```text
/h
```

或者：

```text
/status
```

如果能收到回复，说明链路已经通了。

后面就可以直接发自然语言任务，比如：

```text
帮我看一下 D:\project2026\fuwari 这个项目最近有哪些改动，整理成一段提交说明。
```

### 常用命令

| 命令         | 作用         |
| ---------- | ---------- |
| `/h`       | 查看帮助       |
| `/status`  | 查看当前桥接状态   |
| `/new 路径`  | 切换到新的项目目录  |
| `/threads` | 查看历史线程     |
| `/open 2`  | 打开某个历史线程   |
| `/stop`    | 停止当前正在跑的任务 |
| `/retry`   | 重试上一条请求    |

日常远程使用，先记住这几个就够了。

### 几个注意点

**一、Windows 脚本路径可能要改**

项目自带的 `.cmd` 里可能写着作者自己的电脑路径，需要改成你本机的 Codex 路径和工作目录。

比如：

```text
D:\software\Codex\app\resources\codex.exe
D:\zed-workspace
```

如果你是让 Codex 自动接入，它一般会自己检查并替你改掉。

**二、二维码过期很正常**

看到二维码就马上扫。过期了就重新生成。

**三、电脑要保持在线**

这个桥接不是云服务。CodexBridge 跑在你本机上，所以电脑关机、睡眠、断网，微信就收不到回复。

如果打算长期使用，建议关闭自动睡眠，并用 Windows 计划任务保持服务常驻。

**四、注意权限边界**

微信消息最后会变成 Codex 在你电脑上的任务，所以不要随便开放给别人用。建议只处理私聊，群聊默认关闭，或者只允许指定用户。

### 适合什么场景

它不是为了替代 Codex APP，而是给 Codex 多开了一个入口。

电脑端适合认真操作，微信端适合随手派活。

比如你在外面突然想到一个需求、一段文案、一个代码修改点，就可以直接发给微信里的 Codex。只要电脑在线，它就能在背后继续干活。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/remote-work-wechat-codex.webp)

### 总结

这次接入之后，我最大的感受是：

AI Agent 真正变好用，不只是模型变强，而是入口变近。

以前你要坐到电脑前，打开软件，找到项目，再开始说需求。

现在变成了：

想到什么，微信发一句。

对于改代码、整理文件、写博客、查项目状态这类任务，这个体验已经很实用了。

以上，既然看到这里了，如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。

感谢你拨冗阅读，山高水长，我们下次再见。

*\>/ 更多可落地干货教程
欢迎访问我的博客：[kyjl97.github.io](https://kyjl97.github.io/)*

