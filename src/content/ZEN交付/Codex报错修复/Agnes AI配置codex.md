
### 一.接口信息

API Key获取
https://platform.agnes-ai.com/settings/apiKeys


Base URL（Agnes AI API 兼容 OpenAI 风格的接口。）

```
https://apihub.agnes-ai.com/v1
```



### 二.配置指南

#### 1. 配置工具
- CC Switch： https://ccswitch.io/zh/
- Codex++： https://codexpp.cc/#downloads
- 配置文件路径

```
%USERPROFILE%\.codex
```

#### 2.配置说明

##### CC Switch

> 注意确认 **Codex 路由已启用**，一定要在「路由映射」添加模型，CC Switch本地把 Codex 的 Responses 请求翻译成 Chat Completions 请求，再发给 Agnes AI

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260813171847590.webp)


##### codex++

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260613181219768.webp)


### 三.常见问题

#### 无法显示agnes-2.0-flash

CC switch 当中配置了 API，但是 codex 当中显示的模型列表依然是 GPT 官方模型列表？

解决办法：

将下面的这个文件夹全部删除，重新启动。

```
%USERPROFILE%\.codex
```

#### 输出报404错误

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260813174946602.webp)

问题的根因

**两个协议的区别**

|         | **Responses API**           | **Chat Completions API**            |
| ------- | --------------------------- | ----------------------------------- |
| **端点**  | `/v1/responses`             | `/v1/chat/completions`              |
| **谁在用** | OpenAI 官方 Codex、最新版 ChatGPT | 绝大多数第三方 AI（Agnes、DeepSeek、Claude 等） |
| **功能**  | 支持工具调用、文件操作、多轮状态保持          | 基础对话，一问一答                           |
| **兼容性** | 只有 OpenAI 原生支持              | 行业通用标准                              |

 CC Switch 的作用就是**翻译官**：
 
```
 Codex 客户端 ──/v1/responses──→ CC Switch ──【翻译成 /v1/chat/completions】──→ Agnes AI
```

所以需要在 CC Switch 里打开**本地路由映射**，让它自动把 Responses 请求转成 Chat Completions 请求，再发给 Agnes AI。


Agnes AI 只懂 `/v1/chat/completions`，不懂 `/v1/responses`，所以报 404。

```
Codex 客户端 ──请求 /v1/responses──→ CC Switch ──转发 /v1/responses──→ Agnes AI
                                                                         ↑
                                                                    不认识这个端点
                                                                    返回 404
```

- `model_provider`：决定 Codex 把模型请求发送到哪里；
- 模型网关：在 Codex 和模型服务之间完成协议转换、鉴权、路由、日志或限流

|          | model\_provider | 模型网关 (CC Switch)                      |
| -------- | --------------- | ------------------------------------- |
| **是什么**  | 上游服务商           | 本地代理/路由器                              |
| **职责**   | 提供模型推理能力        | 接收客户端请求，决定发给谁                         |
| **位置**   | 远端（云端）          | 本地（你的电脑 `127.0.0.1:15721`）            |
| **数量**   | 可以配置多个          | 只有一个（就是 CC Switch）                    |
| **协议转换** | 不做              | **核心功能**：Responses ↔ Chat Completions |


发送下面的提示词给其他的智能体，帮你修复。

```
我在CC Switch配置Agnes AI 可以，上游协议选择Chat Completions，启动codex对话报错
```

### 参考资料

ChatGPT 中文教程
https://www.codex-docs.com/docs

大模型API报错信息分析工具
https://errs.dmxapi.cn/