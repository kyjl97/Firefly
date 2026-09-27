---
title: Agent Skills 管理方案
published: 2026-04-20
tags:
  - AI
category: Xenia
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/hub.webp
---

相信有很多小伙伴跟我一样，手头同时在用好几个 AI Agent——Claude Code、Codex、Cursor、Windsurf……每个 Agent 都有自己的 Skill 目录，装了一堆技能包。



时间一长就会遇到一个头疼的问题：同一个 Skill 要在不同 Agent 里各装一遍，版本还不一定一致，管理起来非常混乱。从最早手动复制粘贴技能配置，到用脚本管理本地技能库，再到尝试多设备同步——我发现**技能的发现、配置、迁移和同步**，一直是个很痛的问题。



我一直在想，有没有一种方式能像管理代码依赖一样，统一管理所有 Agent 的技能包？同时实现在多设备上能够一键迁移跟同步？最近我在 GitHub 上发现了 几个解决方案，完美解决了我的痛点。



![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/hub.webp)



## 多个Agent共用一套SKII

| 名称                                                                                   | 来源说明                                                      | 形式   |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------- | ---- |
| [qufei1993/skills-hub](https://github.com/qufei1993/skills-hub)                      | [点此查看](https://mp.weixin.qq.com/s/u1RCeiYMFItuzIf1g6J_DQ) | 客户端  |
| [iamzhihuix/skills-manage](https://github.com/iamzhihuix/skills-manage)              | [点此查看](https://x.com/gkxspace/status/2046938571395760307) | 客户端  |
| [runkids/skillshare](https://github.com/runkids/skillshare)（颜值高）                     | [点此查看](https://mp.weixin.qq.com/s/aPPIWCKgXmiibU7X1A9OIA) | 启动网页 |
| [Backtthefuture/skillmanager](https://github.com/Backtthefuture/skillmanager)（黄叔）    | [点此查看](https://mp.weixin.qq.com/s/xMFZhFC3Dyj7Y4Den7upTQ) | 启动网页 |
| [shanliuling/skills-link](https://github.com/shanliuling/skills-link)                |                                                           | 命令行  |
| ~~[youzaiAGI/agent-skills-hub](https://github.com/youzaiAGI/agent-skills-hub)~~（已删库） | [点此查看](https://mp.weixin.qq.com/s/5deQW5ZnszBgJ4Ji9i6AKA) | 命令行  |

## 多设备共用skill同步

通过创建符号（软链接）链接方式

https://mp.weixin.qq.com/s/EQoA2Lqf4wk6sf-STZTeLw



在多台电脑之间无缝同步Claude Code 配置和会话。命令行工具，*我配置失败*

https://github.com/ikook-wang/cc-sync/blob/main/README_zh-CN.md


