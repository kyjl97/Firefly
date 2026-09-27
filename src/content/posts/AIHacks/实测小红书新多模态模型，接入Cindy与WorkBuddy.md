---
title: 实测小红书新多模态模型，接入Cindy与WorkBuddy
published: 2026-08-21
tags:
  - 小红书
  - 免费API
  - 多模态模型
  - dots
  - AI工具
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260821170705419.webp
---
小红书 Dots Studio 的 `dots3-note-preview` 已在 OpenRouter 和官方平台免费开放 API。280B 总参数 / 16B 激活参数的 MoE 模型，支持图文输入，512K 上下文，目前完全免费。下面记录在 Cindy（Anthropic 协议）和 WorkBuddy（OpenAI 兼容协议）里的配置方法。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260821181439565.webp)



## 一、模型速览

OpenRouter 上的免费档：`dots-studio/dots-3-note-preview:free`

| 项目            | 参数                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------- |
| 总参数 / 激活参数    | 280B / 16B（MoE）                                                                                     |
| 模态            | 文本 + 图片 → 文本（多模态）                                                                                   |
| 上下文长度         | 512K                                                                                                |
| OpenRouter 价格 | prompt 0 / completion 0（免费）                                                                         |
| 免费档有效期        | 至 2026-09-30                                                                                        |
| 支持参数          | include_reasoning、max_tokens、response_format、structured_outputs、temperature、tool_choice、tools、top_p |

OpenRouter 详情页：`dots-studio/dots-3-note-preview-20260813`


## 二、获取 API Key

两条路，任选其一：

1. **官方平台**：[studio.dots.ai](https://studio.dots.ai) → 注册账号 → 创建 API Key
2. **OpenRouter**：[openrouter.ai](https://openrouter.ai/) 注册 → Workspaces → Keys 创建 Key（免费模型无需充值）

> 小提示：OpenRouter 上的 `:free` 版本免费但额度有限，跑正式任务前先在官方平台看看付费档。


## 三、Cindy 中配置（Anthropic 协议）

Cindy 的「模型供应商」里我走 Anthropic 协议，截图配置如下：

- 供应商类型：Claude Code
- Base URL：`https://note3-prev-api.askdian.com`
- 请求路径（可选）：`/v1/messages`
- 模型：`dots3-note-prev`
- 上下文：200K（可按需开启）

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260821170705419.webp)


## 四、WorkBuddy 中配置（OpenAI 兼容协议）

WorkBuddy 只支持 OpenAI 兼容协议，所以地址和上面不同：

WorkBuddy官网：[点此查看](https://www.workbuddy.cn/events/invite?inviteCode=uhc35nnbtssnk)


- 提供商：自定义 / Custom
- 接口地址：`https://note3-prev-api.askdianian.com/v1/chat/completions`（主机名与 Cindy 略有不同，以你截图上看到的为准）
- API Key：已保存
- 模型名称：`dots3-note-prev`
- 输入 / 输出：262144 / 65536
- 高级配置：可按需开启工具调用、图片输入、推理模式

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260821171246382.webp)


## 五、两个协议的区别（关键）

同一套模型服务，两种接入方式，差别就在地址和鉴权头：

|      | Cindy（Anthropic）                     | WorkBuddy（OpenAI 兼容）                                        |
| ---- | ------------------------------------ | ----------------------------------------------------------- |
| 地址   | `https://note3-prev-api.askdian.com` | `https://note3-prev-api.askdianian.com/v1/chat/completions` |
| 路径   | `/v1/messages`                       | `/v1/chat/completions`                                      |
| 鉴权   | `x-api-key`                          | `Bearer <key>`                                              |
| 适用工具 | Cindy / Claude Code                  | WorkBuddy / 任何 OpenAI 兼容客户端                                 |

**别把两边的地址混用**：把 OpenAI 的 `/v1/chat/completions` 填进 Cindy，会直接报协议错误。

**以上，既然看到这里了，如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。**

感谢你拨冗阅读，山高水长，我们期待下篇文章与你再见。

ChatGPT Pus订阅开通：[点此查看](https://kyjl97.github.io/plus/)

