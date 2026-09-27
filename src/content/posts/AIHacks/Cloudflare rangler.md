---
title: Cloudflare rangler
published: 2026-01-01
tags: []
category: 未分类
draft: false
pinned: false
image: 
---

Wrangler 是 Cloudflare 官方提供的开发者命令行工具，专门用于本地开发、调试和部署 Cloudflare Workers、Cloudflare Pages 以及相关的数据存储服务（如 D1 数据库、KV 键值存储等）。

对于不希望频繁登录网页端，或者需要将发布流程集成进本地脚本的开发者来说，Wrangler 是必备的效率工具。

---

### 1. 安装 Wrangler

Wrangler 依赖 Node.js 环境。你可以直接在终端中运行以下命令进行安装：

```bash
# 全局安装
npm install -g wrangler

# 检查是否安装成功及当前版本
wrangler --version
```

*提示：如果你不想全局安装，也可以在需要运行的项目根目录下直接使用 `npx wrangler <命令>` 来调用临时版本。*

---

### 2. 账号登录与授权

在第一次使用 Wrangler 部署之前，必须先将本地命令行与你的 Cloudflare 账号进行绑定：

```bash
wrangler login
```

运行该命令后：
1. 终端会弹出一个网页授权链接。
2. 你的默认浏览器会自动打开该链接，并要求你登录 Cloudflare 账号。
3. 登录并点击“授权”后，Wrangler 会自动将访问令牌（Access Token）保存到本地电脑，无需手动复制 API 密钥。

若想验证登录状态，可以运行：
```bash
wrangler whoami
```

---

### 3. Cloudflare Pages 静态网站部署

Pages 用于托管你的静态前端项目（例如用 HTML/CSS/JS 编写的单页应用，或者 Hexo、Hugo、Vue、React 等打包生成的静态文件夹）。

#### 静态网站部署
不需要配置任何配置文件，直接指定打包文件夹和项目名称即可部署：
```bash
# wrangler pages deploy <要部署的文件夹> --project-name=<你的项目名称>
wrangler pages deploy ./dist --project-name=my-app
```
*注意：如果是首次部署该项目，Cloudflare 会在你的账户下自动创建一个名为 `my-app` 的 Pages 项目；后续更新只需重复运行此命令，内容会直接覆盖更新。*

#### 本地静态预览
在部署前，如果想在本地预览打包后的静态站点在 Cloudflare 环境下的运行效果：
```bash
wrangler pages dev ./dist
```
默认会在本地 `http://localhost:8788` 启动一个预览服务器。

---

### 4. Cloudflare Workers 后端/函数部署

Workers 用于运行你编写的 Serverless 函数（比如轻量 API、代理服务等）。

#### 初始化 Workers 项目
```bash
# 创建一个名为 my-worker 的新 Workers 项目
wrangler init my-worker
```
根据终端提示选择项目模板（JavaScript / TypeScript）。创建完成后，项目根目录会生成一个核心配置文件 `wrangler.toml`，用于定义路由、环境变量和资源绑定。

#### 本地开发调试
```bash
wrangler dev
```
这会在本地启动一个模拟 Workers 环境的开发服务器，支持热重载，每次修改代码都会自动生效。

#### 发布/部署到云端
```bash
wrangler deploy
```
Wrangler 会自动读取当前目录下的 `wrangler.toml` 配置文件，并将你的 Workers 代码打包上传至云端运行。

---

### 5. Wrangler 常用命令速查表

| 命令 | 用途 | 适用场景 |
|---|---|---|
| `wrangler login` | 登录 Cloudflare 账号 | 首次配置或 Token 失效时 |
| `wrangler whoami` | 查看当前登录的账号信息与权限 | 验证是否登录成功 |
| `wrangler logout` | 登出并清理本地授权 Token | 切换账号或安全清理时 |
| `wrangler pages deploy <dir>` | 部署静态文件夹到 Pages | 前端静态页面发布 |
| `wrangler pages dev <dir>` | 本地预览 Pages 静态项目 | 前端本地测试 |
| `wrangler init <name>` | 初始化一个新的 Workers 模版 | 启动新 Workers 项目 |
| `wrangler dev` | 本地运行并调试 Workers 代码 | 后端本地测试 |
| `wrangler deploy` | 部署 Workers 函数到云端 | 后端云端发布 |
| `wrangler secret put <KEY>` | 在云端设置加密的环境变量（如 API Key） | 配置敏感密钥 |

---

### 6. 避坑指南：SOCKS5 代理冲突问题

由于 Wrangler CLI 基于 Node.js 构建，如果你的本地网络配置了 SOCKS5 代理（例如系统代理环境变量中包含 `http_proxy=socks5://127.0.0.1:xxxx`），在执行登录或部署命令时，Node.js 底层的 fetch 库可能会抛出 `TypeError: Unsupported proxy protocol: socks5:` 异常导致网络阻塞。

#### 解决办法：
在执行 Wrangler 命令前，临时将 `http_proxy` 环境变量覆盖为标准的 `http://` 协议，或者清空代理变量。

在 **Git Bash** 或 **Linux/macOS 终端**下运行：
```bash
# 覆盖代理后执行部署
http_proxy=http://127.0.0.1:7890 wrangler deploy

# 或者直接清空代理后再运行
unset http_proxy; unset https_proxy; wrangler deploy
```

在 **Windows PowerShell** 下运行：
```powershell
# 临时清空当前进程的代理变量再运行
$env:http_proxy=""
$env:https_proxy=""
wrangler deploy
```
