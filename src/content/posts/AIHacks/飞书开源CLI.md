---
title: 飞书开源CLI
published: 2026-05-15
tags:
  - 飞书
  - CLI
  - AI Agent
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/lark-cli.webp
---
一个让你和 AI Agent 都能在终端中操作飞书cli。覆盖消息、文档、多维表格、电子表格、幻灯片、日历、邮箱、任务、会议、Markdown 等核心业务域，提供 200+ 命令及 24 个 AI Agent [Skills](https://github.com/larksuite/cli/blob/main/skills)。

想写这篇文章很久了，说实话，这个工具刚上线我就安装了，但当时很多功能根本用不了。这段时间，又有人频频推荐，于是我重新安装，实测发现所有功能都能正常使用了。这篇文章其实攒了很久，我真心推荐你去安装使用它。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/lark-cli.webp)


项目地址
https://github.com/larksuite/cli

### 安装与配置

**第 1 步 — 安装**

```shell
npm install -g @larksuite/cli
```

**第 2 步 — 配置应用凭证**

在后台运行此命令，命令会输出一个授权链接，提取该链接并发送给用户，用户在浏览器中完成配置后命令会自动退出。

```shell
lark-cli config init --new
```

**第 3 步 — 交互式登录**

同上，后台运行，提取授权链接发给用户。

```shell
lark-cli auth login
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260516004325433.webp)


**第 4 步 — 验证**

```shell
lark-cli auth status
```

完整文档参考：
https://github.com/larksuite/cli/blob/main/README.zh.md

### 在Claude code使用

- 帮我搜下云文档里关于 XX 的文档
- 帮我搜下飞书技术笔记知识库里关于chrome的文档
- 帮我创建一篇飞书文档
- 在飞书文档里插入这张图
- 帮我搜索所有包含'项目计划'的文档
- 把这段内容追加到我的笔记文档里
- 创建一个多维表格，包含姓名、部门、入职时间三个字段
- 读取我昨天创建的文档内容
- 把这份PDF上传到我的云盘
- 在云盘搜索文件名包含'报告'的文件
- 创建一个共享文件夹，名字叫'项目资料'
- 创建一个任务：完成Q2总结报告，截止日期本周五
- 查看我负责的所有进行中的任务
- 把这份文档分享给整个团队
- 创建一个多维表格，记录团队值班安排，包含日期、姓名、备注三个字段

整个过程自然流畅，AI直接执行，不需要你在多个工具之间来回切换。

缺点当然也有：每次添加新权限需要重新授权，飞书应用的管理也需要一点学习成本。

PS.我整理一份Lark-cli完整命令手册，可保存下来给你的Agent看。
https://github.com/kyjl97


**以上，既然看到这里了，如果你觉得内容不错，随手点个赞、在看、转发三连吧！如果想第一时间收到推送，可以给我点个星标 ⭐～**

谢谢你看我的文章，我们，下次再见。
