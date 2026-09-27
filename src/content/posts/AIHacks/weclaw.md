---
title: weclaw
published: 2026-03-20
tags:
  - 命令行工具
  - AI
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_qb64vqqb64vqqb64.webp
---

最近微信推出了clawBot插件，找个几个微信桥接器Claude项目，最终都失败了，就在刚刷即刻突然看到艾逗笔大佬的**weclaw**，让我眼前一亮.



只需一行命令就可以桥接给微信，安装后自动检测已安装的AI Agent（Claude、Codex、Gemini 等），重要的是这个项目不是逆向实现的桥接服务，无封号风险。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/Gemini_Generated_Image_qb64vqqb64vqqb64.webp)



## 1.安装weclaw

下载二进制文件扫码登录

https://github.com/fastclaw-ai/weclaw/releases/tag/v0.6.2



或一键命令安装

```bash
# 一键安装
curl -sSL https://raw.githubusercontent.com/fastclaw-ai/weclaw/main/install.sh | sh

# 启动（首次运行会弹出微信扫码登录）
weclaw start
```

## 2.开始使用

安装完回自动检测已安装的 AI Agent（Claude、Codex、Gemini 等）



weclaw 是基于微信官方接口（不是逆向、不是 hack）实现的桥接服务，无封号风险，可放心接入，无需小号。


![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260327002112849.webp)

## 3.聊天命令(可选)

~/.weclaw/config.json配置文件，默认使用Claude，你可以将 `default_agent` 的值修改为其他你常用的Agent，一次性接入多个 Agent



也可以在配置文件中为每个 Agent 自定义触发命令：

```
{
  "agents": {
    "claude": {
      "type": "acp",
      "aliases": ["ai", "c"]
    }
  }
}
```

然后 `/ai 你好` 或 `/c 你好` 就会路由到 claude。



PS.另外使用**weclaw start**可以添加更多微信账号。

## 4.常见问题



A.**运行 `weclaw` 提示 `command not found`**
请重新执行官方安装脚本或使用 Go安装：

```bash
go install github.com/fastclaw-ai/weclaw@latest
```
安装后确认以下路径已加入系统环境变量 `PATH`：
- Linux/macOS：`~/.local/bin` Windows：`%USERPROFILE%\go\bin`


验证命令：

Linux/macOS：`which weclaw` Windows：`where weclaw`
能查询到路径后，再执行 `weclaw start`。



B.**默认使用 Codex 而非 Claude**
打开配置文件 `~/.weclaw/config.json`，将 `default_agent` 的值修改为 `codex`，保存后重启 `weclaw start` 生效。



C,排除命令

查看详细日志:  tail -100 ~/.weclaw/weclaw.log

查看Agent 进程状态:  weclaw status

检查系统资源:

free -h  # 内存
dmesg | grep -i kill  # 是否有 OOM kill

## 5.类似的项目

https://github.com/m1heng/claude-plugin-weixin

https://github.com/cyhhao/vibe-remote

https://github.com/qufei1993/cc-weixin



PS.如需远程配置，联系**GitHub: https://github.com/kyjl97  远程客户端下载网址：[fix.kyjl97.github.io](fix.kyjl97.github.io)

