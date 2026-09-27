---
title: Python信息追踪
published: 2026-04-30
tags: []
category: Technical
draft: false
pinned: false
image: 
---

这个开源项目，你丢一个名字/手机号/IP给它，得到关联的社交媒体账号、归属地、地理位置信息。

在 GitHub 已获取 11.8k star。
项目地址
https://github.com/HunxByts/GhostTrack

仅仅一个 Python 脚本，用来做 IP / 手机号 / 用户名的基础 OSINT 信息收集。

三个模块，覆盖常见情报场景：

IP Tracker：输入目标 IP，可获取基础地理位置信息，也可以结合 Seeker 等工具做进一步关联分析（例如辅助反查真实 IP）
Phone Tracker：手机号归属地、运营商信息查询，属于 OSINT 中很常见的基础能力
Username Tracker：输入用户名，跨多个平台搜索公开账号信息，把分散的社交媒体痕迹拼接起来

适合人群：

做渗透测试前期信息收集的安全工程师
学习 OSINT 方法论的安全方向学生
CTF 比赛中需要快速做信息侦察的选手
对信息安全和数据关联分析感兴趣的开发者

⚠️ 需要强调：该工具仅用于合法授权的安全研究与学习用途，禁止用于任何未经授权的个人追踪或隐私侵犯行为。
