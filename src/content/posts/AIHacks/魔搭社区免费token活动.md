---
title: 魔搭Token福利
published: 2025-08-18
tags:
  - AI
  - 免费
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506001907821.png
---
近日,国内领先的 AI 模型开源社区——**魔搭社区（ModelScope）** 传来重磅消息：其免费 API 接口已正式支持 Anthropic API 协议！免费享用每天 **2000 次调用额度**（单模型 500 次），基本够日常使用了。

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260506001907821.png)


### 操作步骤

下面说下详细操作步骤：

#### 1. 注册魔搭社区并获取 Key

**注册地址**：[点此直达](https://jieliu.me)

> 可以使用 GitHub 注册登录，需绑定阿里云账号、实名认证。

#### 2. 创建 API Key

**创建地址**：
[https://www.modelscope.cn/my/access/token](https://www.modelscope.cn/my/access/token)

#### 3. Claude Code 配置

打开 `cc switch` 配置 Claude Code：

- **预设供应商**：ModelScope
- **请求地址**：`https://api-inference.modelscope.cn`
- **模型建议**：

| 角色定位        | 比喻        | 调整后模型                  |
| :---------- | --------- | :--------------------- |
| 主模型         | 全技员       | Qwen/Qwen3.5-397B-A17B |
| Haiku 默认模型  | 打杂实习生     | ZhipuAI/GLM-4.7-Flash  |
| Sonnet 默认模型 | 资深骨干员工    | MiniMax/MiniMax-M2.7   |
| Opus 默认模型   | 技术专家 / 总监 | ZhipuAI/GLM-5.0        |
- 日常随便聊 / 写东西，找**主模型**
- 简单重复的活，丢给**Haiku**
- 有点难度的复杂工作，交给**Sonnet**
- 搞不定的大难题，才请**Opus**出手

### 参考资料

- [魔搭社区免费提供2000次Claude Code调用](https://modelscope.csdn.net/68e774a18867235e138f1912.html)
- [魔搭社区免费API封装生图skill](https://mp.weixin.qq.com/s/x9zLFZEu96Dx3XDVrCp_Xg)