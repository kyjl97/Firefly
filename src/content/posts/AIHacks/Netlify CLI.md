---
title: Netlify CLI工具
published: 2026-01-01
tags: []
category: 未分类
draft: false
pinned: false
image: 
---

Netlify CLI 是 Netlify 官方提供的命令行工具，允许开发者在本地终端中完成站点的本地运行、配置管理、API 调试和直接部署发布。

对于频繁迭代静态网页、单页应用（SPA）或轻量 Serverless 后端的开发者，Netlify CLI 能够极大简化线上控制台的繁琐操作。

---

### 1. 安装 Netlify CLI

Netlify CLI 基于 Node.js 开发。你可以在终端运行以下命令完成全局安装：

```bash
# 全局安装
npm install -g netlify-cli

# 确认安装成功与当前版本
netlify --version
```

*提示：如果你只在单个项目中使用，也可以使用 `npx netlify-cli <命令>` 临时调用。*

---

### 2. 账号授权登录

在使用命令行管理站点前，需要先绑定你的 Netlify 账号：

```bash
netlify login
```

运行该命令后：
1. 终端会自动打开默认浏览器并跳转到 Netlify 授权页面。
2. 登录并点击“Authorize”允许绑定。
3. 授权成功后，命令行会自动获取并保存 Token，完成绑定。

若要检查当前登录的账号状态：
```bash
netlify status
```

---

### 3. 项目初始化与关联

如果本地已经有代码，并希望将其与 Netlify 上的站点进行绑定：

#### 创建并关联新站点
```bash
netlify init
```
这会引导你在当前目录下创建一个新的线上站点，或者关联一个已有的站点，并自动配置持续集成（CI/CD）的构建设置。

#### 仅关联已有站点
如果不需要配置复杂的 CI，仅仅将本地文件夹与已有的 Netlify 站点建立连接：
```bash
netlify link
```
你可以通过输入线上 Site ID 或者通过搜索站名来快速完成绑定。

---

### 4. 本地仿真调试（Netlify Dev）

Netlify Dev 是该工具的核心功能，它可以在本地完美模拟线上的运行环境。如果你在项目中配置了重定向（`_redirects`）、自定义 Header（`_headers`）或者编写了 Serverless 函数（Netlify Functions），可以直接运行：

```bash
netlify dev
```

它会自动检测项目类型（例如 React、Vue、Hugo 等），在本地启动开发服务器，并将重定向逻辑和后端函数代理到统一的端口下（默认 `http://localhost:8888`），极大地提升了本地开发和排错效率。

---

### 5. 命令行一键部署

如果你的项目已经构建完成（例如静态页面打包到了 `./dist` 或 `./build` 目录中），你可以直接在命令行中推送上线，而无需依赖 Git 触发。

#### 部署为测试草稿（Draft）
```bash
# 部署后会生成一个 Draft URL 用于预览测试，不影响生产环境
netlify deploy --dir=./dist
```

#### 部署到正式生产环境（Production）
```bash
# 预览确认无误后，加入 --prod 参数直接发布到正式域名上
netlify deploy --dir=./dist --prod
```

---

### 6. Netlify CLI 常用命令速查表

| 命令 | 用途 | 适用场景 |
|---|---|---|
| `netlify login` | 登录授权 Netlify 账号 | 首次绑定账号时 |
| `netlify status` | 查看当前用户和站点的关联状态 | 确认身份及站点配置 |
| `netlify init` | 创建并配置持续集成的站点 | 项目首次接入 Netlify 时 |
| `netlify link` | 将本地目录与已有线上站点绑定 | 绑定已有项目 |
| `netlify dev` | 启动本地高仿真开发服务器 | 本地测试重定向及 Serverless 函数 |
| `netlify deploy` | 一键打包上传并输出预览 Draft 链接 | 部署测试版 |
| `netlify deploy --prod` | 一键打包发布至生产环境正式域名 | 部署正式版 |
| `netlify functions:create` | 快速初始化一个 Serverless 后端函数模板 | 编写轻量 API |
| `netlify open` | 在浏览器中直接打开线上控制台或站点 | 快速查看线上状态 |

---

### 7. 避坑指南：SOCKS5 代理冲突问题

由于 Netlify CLI 的网络通信基于 Node.js 运行，当本地网络配置了 SOCKS5 代理（如环境变量中含有 `http_proxy=socks5://127.0.0.1:xxxx`）时，CLI 的 fetch 底层可能会因为无法解析 socks5 协议而报错中断。

#### 解决办法：
在运行 `netlify login` 或 `netlify deploy` 之前，将代理协议临时覆盖为标准的 `http://`。

**Git Bash / 终端：**
```bash
http_proxy=http://127.0.0.1:7890 netlify deploy --prod
```

**PowerShell：**
```powershell
$env:http_proxy="http://127.0.0.1:7890"
netlify deploy --prod
```
