---
title: "videocut-skills"
type: entity
tags: [skills, 视频剪辑, 字幕, claude-code]
sources: [01-输入/03-微信/剪辑 Agent 字幕升级：99% 正确率的字幕，一条指令直接推进剪映.md, 01-输入/03-微信/发现了 4 个好玩 SKills，已经在 GitHub 上开源了。.md]
last_updated: 2026-05-27
---

## 定义

GitHub 上的开源视频剪辑 Skill，集成 Whisper 字幕生成、FFmpeg 底层剪辑、口播稿对齐、错词字典纠错，直接生成可编辑的剪映草稿。

## 核心能力/特点

- **字幕生成**：Whisper 模型生成字幕 + 词典纠错
- **剪映草稿输出**：基于 capcut-mate 直接生成剪映原生草稿（含花字、入场动画），非导出 SRT
- **三档准确率**：有口播稿 99%、有错词字典 95%、无辅助约 80%
- **自动化安装**：首次运行自动安装环境、依赖、下载模型（约 5GB）
- **自我更新**：可根据用户使用习惯不断优化剪辑规则
- **GitHub**：`github.com/Ceeon/videocut-skills`
- **存放路径**：`.claude/skills/`

## 关联连接

- [[摘要-剪辑Agent字幕升级]] — 来源引用
- [[摘要-四个好玩的开源Skills]] — 来源引用
- [[AI字幕校对]] — 字幕自动化方法论
- [[capcut-mate]] — 生成剪映草稿的底层项目
