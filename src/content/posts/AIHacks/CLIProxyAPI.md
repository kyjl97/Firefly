---
title: CLI代理API
published: 0202-02-14
tags:
  - 技术教程
category: AIHacks
draft: false
pinned: false
image:
---


这就是个能让你绕过官方限制，把各大 AI 客户端额度无缝转成标准 API 的本地代理。 平时你开了 ChatGPT Plus、Claude Pro 或者用免费的 Gemini 2.5 Pro，官方只让在网页或自家的 CLI 工具里用。

这工具的骚操作在于，它直接拿你账号的 OAuth 登录态，在本地原地吐出一个标准的 OpenAI/Claude 兼容接口。

项目地址
https://github.com/router-for-me/CLIProxyAPI

### 配置

1.下载解压：[点这里](https://github.com/router-for-me/CLIProxyAPI/releases)

2.修改配置文件
- config.example.yaml改成config.yaml
- config.yaml参数值修改allow-remote:false改成

```
 allow-remote:true
```

- config.yaml参数值secret-key:""（后台访问密码）改成

```
secret-key:"123" 
```

3.调用可执行程序
在安装目录右键打开cmd，输入下面命令回车

```
cli-proxy-api.exe antigravity-login
```



### 接入cc

```
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:8317",
    "ANTHROPIC_AUTH_TOKEN": "your-api-key-1",
    "ANTHROPIC_MODEL": "gemini-claude-opus-4-5-thinking"
  }
}
```


CLIProxyAPI 用户手册：

[https://help.router-for.me/](https://help.router-for.me/cn/)

视频教程
https://www.bilibili.com/video/BV1bgB9BfEKv/?spm_id_from=333.1391.0.0&vd_source=206031f494850e57fd6c92ace02b1bed