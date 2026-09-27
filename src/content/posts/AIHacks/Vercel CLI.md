---
title: Vercel CLI
published: 2026-08-05
tags:
  - vercel
  - cli
  - deploy
  - ai
category: AIHacks
draft: false
pinned: false
image: 
---

如果你用过 Vercel（全球流行的前端托管/云平台），一定见过 `vercel` 这个命令行工具。它到底是什么？简单说：**Vercel CLI 是 Vercel 官方出的命令行工具，让你在终端里就能把项目部署上线、管理域名和环境变量，不用去网页上点点点。**

注意：**它不是 AI 智能体，也没有任何 AI 能力**。它只是一个「云平台遥控器」——负责把你的代码打包、上传、发布到 Vercel 的服务器上。

---

## 一、它能干什么？

| 功能 | 说明 |
| :--- | :--- |
| 部署上线 | 把本地代码构建后发布到云端，生成可访问的线上地址 |
| 登录授权 | 设备码登录你的 Vercel 账号 |
| 管理环境变量 | 添加/查看 API Key 等敏感配置（加密存储） |
| 绑定域名 | 把自定义域名挂到你的项目上 |
| 项目管理 | 查看部署记录、项目信息、成员等 |

核心价值：**一切操作可脚本化、可自动化**，比在网页上手动点击高效得多。

---

## 二、怎么安装？

Vercel CLI 是一个 npm 包，一条命令全局安装：

| 命令 | 说明 |
| :--- | :--- |
| npm install -g vercel | 全局安装 Vercel CLI（需要先装 Node.js） |
| vercel --version | 验证是否安装成功 |

装完登录一次即可：

| 命令 | 说明 |
| :--- | :--- |
| vercel login | 设备码授权登录（浏览器确认） |
| vercel whoami | 查看当前登录的账号 |

---

## 三、最常用的几个命令

| 命令 | 说明 |
| :--- | :--- |
| vercel deploy --prod | 部署到生产环境（正式上线） |
| vercel env add 变量名 production | 添加云端环境变量（--value 指定值，--sensitive 加密存储） |
| vercel env pull | 把云端环境变量下载到本地 .env.local |
| vercel link | 把本地文件夹和云端项目绑定 |
| vercel domains add 域名 项目名 | 给项目绑定自定义域名 |
| vercel ls | 查看项目的部署记录 |

---

## 四、实际应用场景（以部署 AI 智能体为例）

在搭建飞书 AI 营销团队时，整个流程全靠 Vercel CLI 串起来：

1. `vercel login` 登录
2. `vercel link` 绑定云端项目
3. `vercel env add DEEPSEEK_API_KEY production --sensitive --yes` 配置大模型密钥
4. `vercel deploy --prod --yes` 一键部署上线
5. `vercel domains add bot.你的域名.com 项目名` 绑定国内可达域名

**GitHub 推送 ≠ 部署**：推送到 GitHub 只是代码备份；要让线上更新，必须执行 `vercel deploy`（或配置 Git 集成自动部署）。

### 让 AI 智能体帮你部署（提示词模板）

不用自己敲命令，把这些提示词直接发给 AI 编程助手（Claude Code / Codex 等），它会自动执行上面的流程：

**① 首次部署上线**
```text
帮我部署这个项目到 Vercel 生产环境：
1. 检查 Vercel CLI 是否安装（vercel --version），没有就 npm install -g vercel
2. 检查是否已登录（vercel whoami），没登录就发起 vercel login 并等我完成设备授权
3. 执行 vercel link --project <项目名> --yes 绑定云端项目
4. 执行 vercel deploy --prod --yes 部署上线
5. 把生成的线上地址告诉我
```

**② 配置环境变量（API Key）**
```text
帮我把 DEEPSEEK_API_KEY 配置到 Vercel 生产环境。密钥在本地 .env.local 里，
用 vercel env add 添加并加密存储（--sensitive），全程不要打印密钥本身。
```

**③ 日常更新部署（改完代码重新上线）**
```text
代码已修改并通过本地验证（pnpm validate）。执行 vercel deploy --prod --yes
重新部署到生产环境，完成后确认 readyState 为 READY，并告诉我新的线上地址。
```

**④ 绑定自定义域名**
```text
帮我把 bot.example.com 绑定到这个项目：先检查 Cloudflare DNS 是否已配好
CNAME（目标 cname.vercel-dns.com，开启代理），然后用 vercel domains add
bot.example.com <项目名> 绑定，最后 curl 测试域名返回 200。
```

**⑤ 一条龙（改代码 + 验证 + 部署）**
```text
改完这个 bug 后：1) 运行 pnpm validate 确认 0 错误 2) 执行 vercel deploy --prod --yes
部署 3) 确认线上可用，汇报结果。
```

> ⚠️ 安全提醒：提示词里不要粘贴真实 API Key；密钥只写在本地 `.env.local`（已被 .gitignore 忽略），AI 用 `vercel env add` 上传时走加密存储。

### 部署的三种方式对比

| 概念 | 是什么 | 适用场景 |
| :--- | :--- | :--- |
| vercel deploy | 手动把本地代码部署上线 | 开发调试、需要手动控制发布节奏 |
| eve deploy | eve 框架封装的一键部署命令 | eve 项目专用（部分环境可能报错，如 Windows 下 pnpm 路径问题） |
| Git 集成部署 | 配置后每次 git push 自动触发部署 | 团队协作、希望「推送即上线」的自动化工作流 |

**关键区别**：GitHub 推送 ≠ 部署。推送到 GitHub 只是代码备份；要让线上更新，必须执行 `vercel deploy`，或配置 Git 集成让它自动部署。

---

## 五、不装 CLI 行不行？

**可以**。Vercel 网页控制台（dashboard）能完成大部分操作：部署点按钮、环境变量在 Settings 里填、域名在 Settings 里加。

CLI 的优势是**效率**：一条命令替代十几次点击，还能写进脚本自动化。开发者和 AI 智能体（比如让 Agent 帮你部署）都更偏好 CLI 方式。

---

## 总结

**Vercel CLI = 把项目部署到 Vercel 云的命令行遥控器。** 装一次、登录一次，之后所有部署、配置、域名管理都能在终端里完成，是「云端部署」这件事最顺手的姿势。
