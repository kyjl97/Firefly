---
title: 手机Agent：Open Minis
published: 2026-05-12
tags:
  - AI Agent
  - iOS
  - 效率工具
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260512163703973.webp
---
在电脑上用 Agents 很爽，但 **Agent 能随身带在手机里，直接调用你手机的所有能力呢？**

这就是 [Open Minis](https://openminis.app/) —— 一个真正把「端侧 AI Agent」做明白的产品。

这不是又一个聊天 App。它是一个完整的 AI Agent 运行时，跑在你的手机上。一句话：**你的 AI 助手，真的能「用」你的手机了。**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260512163703973.webp)


### 开箱即用三步

App Store 搜索 Minis 下载：

1. 配置 AI 提供商（Claude、GPT、Gemini、OpenRouter 或任意 OpenAI 兼容接口）
2. 选择模型
3. 开始对话

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/82113b5adf0449adf186fa2ea26301c6.webp)

### 核心能力

#### 1. 完整 Linux 环境，Agent 自己写代码

内置 Alpine Linux，Agent 能自己安装包、写脚本、执行命令，一切本地运行。

我测试让它安装「数字生命卡兹克 AIHOT」skill，它自己克隆仓库、发现缺 Git 就自己装上，全程丝滑。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/56190a24b2d77fa6329c946bc9e6a558.webp)

#### 2. 原生 iOS 深度集成

这才是最狠的 —— 直接调用几乎所有 iOS 系统能力，用自然语言就行：

| 能力 | 你只要说 |
|------|---------|
| 健康数据 | "我这周走了多少步？" |
| 日历 | "明天我有什么安排？" |
| 提醒事项 | "下午3点提醒我给牙医打电话" |
| 智能家居 | "把客厅灯关了" |
| 联系人 | "找一下张三的手机号" |
| 蓝牙、剪贴板、照片、闹钟、电池... | 自然语言描述即可 |

#### 3. 内置浏览器 + SKILL 兼容

- Agent 自己会浏览网页、填表、截图
- 完全兼容 Claude Code 的 SKILL.md 格式，电脑上的技能直接拿来用

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/eee01e6c6defe0578def1c8616f3f975.webp)

### 为什么重要？

#### 隐私第一
API 密钥存在 Keychain，无数据收集，所有内容本地处理。

#### 多模型自由
可同时配置多个提供商，支持 Fallback（故障自动切换）、负载均衡模式。

#### Agent 自循环
可配置专门的「Agent Loop 模型池」，分解子任务或深度推理时自动调用。

### 支持平台

- iOS 16+ / iPadOS 16+
- macOS 13+ (Apple Silicon)
- visionOS 1.0+
- Android（预览版）

### 总结

这不是「手机上的又一个 AI App」，这是 **AI 终于能真正用你的手机了**。

之前的手机 AI 都停留在「聊天」层面，而 Open Minis 直接把 Agent 的触手伸进了系统层。日历、健康数据、智能家居、文件系统 —— AI 终于能以自然的方式访问和操作它们了。

如果你在电脑上已经体会过 Agents 带来的效率革命，把这种能力装进口袋的感觉，值得立刻去试一下。
