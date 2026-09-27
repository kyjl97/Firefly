---
title: DSH图片拦截
published: 2026-08-13
tags: [DeepSeek Harness, 多模态, 图片, settings.yaml]
category: AIHacks
draft: false
pinned: false
image:
---
在 DeepSeek Harness 里给 AI 发图，结果收到提示「当前模型不支持图片，请切换支持图片的模型」，而且**图片根本发不出去**。

这不是你的操作问题，而是**模型目录没声明支持图片**导致的硬性拦截。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/DSH_Desktop_P7QtoVCxmJ.webp)

### 根本原因

手动配置的模型，在**自己声明之前**一律按**纯文本**对待——因为没有任何环节能去询问后端端点接受哪些模态。

所以给这类模型附加图片，会在**发送前**就被拒绝，并**点名该模型**。

### 解决办法

在 `$DSH_HOME/settings.yaml` 中，给支持视觉的模型**显式声明 `input: [text, image]`**：

```yaml
llm-pi-ai:
  providers:
    my-gateway:
      apiKeyEnv: GATEWAY_API_KEY
      api: openai-completions
      baseURL: https://gateway.example/v1
      models:
        - id: legacy-chat                 # 纯文本，可以不加
        - id: vision-preview              # ← 视觉模型加这一行
          input: [text, image]
```

- `input` 接受 `text` 和 `image`，**只作用于该模型**，一条路由可同时服务两类模型。
- 省略或写成空列表，则回退到模型目录记录的模态 / 路由的 `defaultInput`。

### DeepSeek harness解决提示词

把下面这段提示词发给 agent**，agent 会自动完成整个修复：

````
我的 DeepSeek Harness 现在无法发送图片，发图片时提示"当前模型不支持图片，请切换支持图片的模型"，图片根本发不出去。

请帮我这样解决：

1. 首先定位并读取配置文件 `$DSH_HOME/settings.yaml`（Windows 上通常是 `C:\Users\<用户名>\.dsh\settings.yaml`）。
2. 找到 `llm-pi-ai.providers` 下面我配置的 provider 和它的 `models` 列表。
3. 给所有支持视觉能力的模型加上支持图片输入的声明：在模型条目里加 `input: [text, image]`。如果你不确定哪些支持，就把所有模型都加上 `input: [text, image]`，这些大模型基本都是多模态的。
4. 修改完成后，把改好的完整 `models` 配置读出来给我确认一遍，确保缩进和格式正确。
5. 最后提醒我：必须完全退出并重启 DeepSeek Harness 才会生效，只刷新对话无效；重启后再测试发一张图片验证。

请现在就执行。如果配置文件找不到或没有权限修改，请明确告诉我卡在哪一步。
````

> 使用提示：发给 agent 后，agent 会自己定位文件、改配置并把结果回读确认。改完让客户**重启 Harness** 即可正常发图。

### 实际案例

个人封装版默认的所有模型都没带 `input`，导致默认的 `deepseek-v4-flash` 也无法发图。只需给所有需要的模型补上：

```yaml
- id: deepseek-v4-flash
  name: DeepSeek V4 Flash
  input: [text, image]
```

### 注意

改完后**必须完全退出并重启 Harness** 才会生效，仅刷新对话无效。

> 小贴士：若某个模型后端其实不支持图片，发图后端会报错，此时去掉该模型的 `input` 声明即可。

参考文档：[DeepSeek Harness Providers 指南](https://deepseek-harness.github.io/deepseek-harness/guide/providers)

### 识图

 [dsh-koboldcpp-hands](https://github.com/MicroHEROX/dsh-koboldcpp-hands) 该插件为 dsh 提供 koboldcpp_run / koboldcpp_vision 两个工具，把 OCR、图片分析、多图对比等视觉任务交给本地 KoboldCpp 多模态模型处理。
 
或者
https://github.com/kyjl97/glm4v-vision-mcp


如需远程协，浏览器搜索得救之道远程支持




