---
title: 在飞微信、飞书和 Claude 对话
published: 2026-05-23
tags:
  - claude
  - feishu
  - acp
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/wechat-feishu-claude-cover.webp
---
我是Claude Code重度用户，但有个问题一直没解决——我人是在微信/飞书里的，但 Claude Code 跑在终端上。每次要给它发个需求、传个文件，都得切回终端敲命令。一天切几十次，真的烦。

后来找到了 [lc2panda/claude-plugin-wechat](https://github.com/lc2panda/claude-plugin-wechat) 这个项目，能把 Claude Code 接到微信和飞书上，在聊天框里直接跟它对话。支持：文字、图片、文件、语音、视频、远程权限审批、飞书文档，这个项目有两种模式：**Channel 模式**和 **ACP 模式**。这篇只讲 ACP 模式，我相信大多数人的 Claude Code 都接的是 国产API Key

项目地址：
https://github.com/lc2panda/claude-plugin-wechat
![745](https://gitee.com/da-qiang-classmate/typora/raw/master/image/IMG_1145.webp)


### 准备工作

动手之前，先确认你的环境到位了。

#### 环境要求

- **Bun**：运行时依赖，必须有
- **飞书应用**（可选）：只用微信的话不需要

装 Bun 就一行：

```bash
curl -fsSL https://bun.sh/install | bash
```

装完验证一下：

```bash
bun --version
```


说实话我也不确定你是不是已经有 Bun 了，如果已经装过可以跳过这步。

### 微信配置

先讲微信的，因为微信简单——不需要配任何应用，装完扫码就完事。

#### 全局安装

ACP 模式是独立运行的，全局安装就行：

```bash
bun add -g github:lc2panda/claude-plugin-wechat
```

这个过程取决于网速，有些地方访问 GitHub 比较慢，可能会等个一两分钟。我当时配这个的时候，第一次装卡住了，重试了一次才成功。

#### 微信 · 启动 ACP

安装完直接启动：

```bash
wechat-acp
```

其他启动方式：

```
wechat-acp --cwd /项目路径          # 指定工作目录
ACP_AGENT=gemini wechat-acp        # 切换 Agent
```

第一次启动会自动弹出二维码，拿出手机微信扫码确认，就登录好了。

之后如果重新登录（比如换了设备），加个 `--login` 参数：

```bash
wechat-acp --login
```


#### 微信 · 验证

拿手机给文件传输助手发条消息试试。如果 Claude 回了，就成了。

这里注意：**谁扫码登录的微信号，谁自动获得授权**。想让别的微信用户也能用，他们第一次发消息会收到一个 6 位配对码，你拿到配对码后在终端执行：

```
/wechat:access pair <配对码>
```

微信 ACP 本身就支持这些内置 Agent：

```bash
ACP_AGENT=gemini wechat-acp   # 切换成 Gemini
ACP_AGENT=qwen wechat-acp     # 切换成通义千问
ACP_AGENT=copilot wechat-acp  # 切换成 GitHub Copilot
```

不设环境变量的话，默认用的是 Claude。


### 飞书

#### 全局安装

微信跑通了？那飞书也一样，装一次就够了（前面已经全局装过的话这步跳过）：

```bash
bun add -g github:lc2panda/claude-plugin-wechat
```

#### 飞书 · 配置应用

飞书比微信多一步，得先有个飞书应用跟 ACP 对接。如果你之前已经为 Channel 模式配过，凭据通用，直接跳到启动就行。

**第一步：创建应用**

去[飞书开放平台](https://open.feishu.cn)创建一个自建应用。Lark 用户（海外版）用 `open.larksuite.com`。

**第二步：配置权限**

"权限管理" → "批量导入"，贴这段 JSON：

```json
{
  "scopes": {
    "tenant": [
      "im:message",
      "im:message.p2p_msg:readonly",
      "im:message.group_at_msg:readonly",
      "im:message:send_as_bot",
      "im:resource"
    ]
  }
}
```

**第三步：开启长连接**

"事件与回调" → "订阅方式" → 选择**使用长连接接收事件**，添加事件 `im.message.receive_v1`。

这一步有点绕，我第一次配的时候找了半天。官方文档写得不清楚，是我自己试出来的——选了长连接之后，下面会出现一个添加事件的框，搜 `im.message.receive_v1` 加上就行。

**第四步：发布应用**

"版本管理" → 创建版本 → 填写版本号和说明 → 发布。

发布之后拿到 **App ID** 和 **App Secret**，这俩是后面登录要用的。


#### 飞书 · 启动 ACP

凭据到手，启动：

```bash
feishu-acp
```

第一次启动会让你输入 App ID 和 App Secret，就是刚才拿到的。验证通过后 ACP 就跑起来了。之后再启动会自动记住凭据。

#### 飞书 · 验证

去飞书找到你的机器人，发条消息试试。收到回复就通了。

飞书也支持切换 Agent，跟微信一样：

```bash
ACP_AGENT=gemini feishu-acp
```

在聊天里随时发 `/cwd /新路径` 能切换工作目录。

### 写在最后
说真的，自从把 Claude Code 接上微信和飞书，我在手机上也随时能给它丢任务了。午休躺床上突然想到一个方向，掏出手机发条消息，回去电脑前代码都写好了。

那感觉，想想就觉得爽。

⚠️不过这个项目他是相当于单项启动Claude code，双下远程控制看下Wangnov/gewe-cc。

以上，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧，如果想第一时间收到推送，也可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。

*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*