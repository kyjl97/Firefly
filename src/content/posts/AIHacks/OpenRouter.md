---
title: OpenRouter免费模型
published: 2026-04-28
tags: []
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260428232049626.webp
---
介绍一种零成本使用 Claude Code 的方案：通过 OpenRouter 上的免费模型 Ling-2.6-1T，配合 CC Switch 这款可视化管理工具，一键切换 API 提供商，实现完全免费的 AI 编程体验。

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260428232049626.webp)


### 接入流程
OpenRouter 提供了免费模型，CC Switch 让你一键把这些模型接入 Claude Code，不用手动改配置文件，全程可视化操作。

```
```*
OpenRouter（免费模型 Ling-2.6-1T）
        ↓
  CC Switch（可视化管理 + 一键切换）
        ↓
  Claude Code
```

整个流程分三步：

1. 在 OpenRouter 注册并[获取 API Key](https://openrouter.ai/workspaces/default/keys)
*免费模型每日额度说明*

> 日限额：50次 / 天，20 次 / 分钟
> [充值](https://openrouter.ai/settings/credits) ≥$10（约 70-75 元），永久保持 1000 次/天

2. 安装 CC Switch

3. 在 CC Switch 中添加 OpenRouter 提供商，一键切换给 Claude Code

### CC Switch 中配置 OpenRouter

Base URL
```
https://openrouter.ai/api/v1
```

模型推荐

```
inclusionai/ling-2.6-1t:free
```
最近很火的模型，出自蚂蚁百灵大模型，知识储备充足，思考维度更深，输出的回答质量更高、精准度更强，但响应速度相对缓慢，更适配复杂且重要的工作任务。

```
ling-2.6-flash
```
类似快枪手，核心优势是反应速度快，作答内容满足基础使用需求即可，不会过度追求完美，整体工作效率出色，能够快速批量处理事务，适合应用于简单、需要即时响应的各类任务。

```
Nemotron 3 Super (free)
```
超长上下文、多智能体推理、高吞吐量，长文档分析、跨文档推理、科学计算


建议多配置几个，如下图方便快速切换
小技巧：配置好一个直接复制，然后编辑，粘贴模型Id，点击模型映射“一键设置”

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260428224818573.webp)

PS.OpenRouter充值如果想要支付宝或微信，勾选 “Use checkout page”。然后页面出现。详细教程：[参阅](https://zhuanlan.zhihu.com/p/1902150269241893722)


### 相关资料
- OpenRouter官网LLM排行榜
 https://openrouter.ai/rankings
- 免费模型合集
https://openrouter.ai/models?q=FREE
- 充信用点入口
https://openrouter.ai/settings/credits
- 微信、支付宝充值信用点
https://zhuanlan.zhihu.com/p/1902150269241893722
- 创建API入口
https://openrouter.ai/workspaces/default/keys

