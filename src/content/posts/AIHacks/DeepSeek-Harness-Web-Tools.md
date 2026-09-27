---
title: DSH免费搜索插件
published: 2026-08-19
tags:
  - DeepSeek Harness
  - DSH Desktop
  - 插件
  - web_search
  - DuckDuckGo
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260820023507727.webp
---
DSH 自带的 `web_search` 默认走 DeepSeek 官方云端搜索，需要一个付费 API Key——余额一用完，搜索就报 `Insufficient Balance`，整个联网能力直接瘫痪。

[DeepSeek-Harness-Web-Tools](https://github.com/tonyd2wild/DeepSeek-Harness-Web-Tools) 用一个本地 DuckDuckGo 服务替代它，**免费、免 key、免注册**，让 DSH 的搜索能力彻底摆脱付费额度。

> ⚠️ 这是非官方社区项目，与 DeepSeek AI 无关。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260820023507727.webp)

## 先说结论：为什么"桌面版"和"CLI"装法不一样

这个插件的官方 README 是按纯 `dsh` CLI 写的，命令都是往 `web` / `headless` profile 里装。但 **DSH Desktop（桌面版）启动时读的是 `desktop` profile，不是 `web`**。如果你照着 README 原样敲，装错 profile 之后桌面端根本不会生效。

本文是专门针对 **DSH Desktop 桌面版** 的安装法，踩坑点都标注了。

两个 profile 的分工是这样的：

| 维度 | CLI 版 | 桌面版（DSH Desktop） |
|------|--------|----------------------|
| 启动方式 | `npx @deepseek-ai/dsh web` | 双击 exe |
| 实际读取的 profile | `web`（或 `headless`） | **`desktop`** |
| 插件装到哪里 | `~/.dsh/profiles/web/` | `~/.dsh/profiles/desktop/` |
| `dsh` 命令来源 | 系统 npm 全局 | 桌面版自带，默认 profile 是 `desktop` |

## 这个插件是怎么工作的

它由两个部分组成：

1. **Python shim（搜索后端）**：一个本地 HTTP 服务，监听 `127.0.0.1:8899`，负责去查 DuckDuckGo。
2. **JS 插件（`dsh-plugin-ddg-search`）**：注册进 DSH 的 `web` seam，把搜索请求转发给上面的 shim。

因为 DuckDuckGo 客户端最好用的是 Python 的 `ddgs` 库（而 DSH 插件是 JavaScript 写的），所以作者把"查 DuckDuckGo"单独拆成了一个 Python 进程，插件通过本地 HTTP 调它。**这也就意味着：shim 必须一直开着，搜索才能用。**

## 前置要求

- DSH Desktop 已安装（本文环境：`dsh 0.1.0-rc.7`）
- **Python 3.9+**（需要 `python` 命令，用来建 venv 跑 shim）
- Node 22+、pnpm（插件加载本身依赖，桌面版已自带）

## 安装步骤（桌面版）

### 1. 克隆仓库

```powershell
git clone https://github.com/tonyd2wild/DeepSeek-Harness-Web-Tools.git
```

仓库里有三个目录：`plugin/`（JS 插件）、`shim/`（Python 搜索后端）、`examples/`（配置示例）。

### 2. 建 Python 环境并装依赖

进入 `shim` 目录，建虚拟环境并装 `ddgs`：

```powershell
cd DeepSeek-Harness-Web-Tools\shim
python -m venv venv
venv\Scripts\python.exe -m pip install -r requirements.txt
```

`requirements.txt` 只有一个依赖 `ddgs>=9.0.0`。

### 3. 启动 shim 并验证

```powershell
venv\Scripts\python.exe server.py --host 127.0.0.1 --port 8899
```

另开一个终端验证：

```powershell
Invoke-WebRequest http://127.0.0.1:8899/health -UseBasicParsing
```

返回 `{"status": "ok", "backend": "duckduckgo"}` 就说明后端活了。也可以直接 POST 一次 `/search` 验证能返回真实搜索结果。

### 4. 把插件放进 desktop profile

这一步是桌面版和 CLI 版最大的区别——**插件必须进 `desktop` profile，不是 `web`**。

插件的 `plugin/` 目录只有两个文件（`index.js` + `package.json`），零依赖。把整个 `plugin` 目录复制成 `desktop` profile 里的 `dsh-plugin-ddg-search`：

```powershell
$src = "<仓库路径>\plugin"
$dst = "$env:USERPROFILE\.dsh\profiles\desktop\node_modules\dsh-plugin-ddg-search"
New-Item -ItemType Directory -Path $dst -Force | Out-Null
Copy-Item "$src\index.js" $dst -Force
Copy-Item "$src\package.json" $dst -Force
```

> **为什么用手动复制，而不是 `dsh plugin add`？**
> 桌面版 profile 的 node_modules 可能由旧版 pnpm（store v10）链接，而当前 pnpm 已是 v11，`dsh plugin add` 会报 `ERR_PNPM_UNEXPECTED_STORE`（store 位置冲突），还可能触发 pnpm 11 的供应链策略拦截，卡死在一堆报错里。这个插件只有两个纯 JS 文件、无依赖，直接复制是最稳、最可控的做法。

### 5. 编辑 cordis.patch.yml 注册并切换后端

编辑 `C:\Users\Administrator\.dsh\profiles\desktop\cordis.patch.yml`，追加：

```yaml
# DuckDuckGo 免费搜索
- insert:
    - id: web-search-ddg
      name: 'dsh-plugin-ddg-search'
      config:
        baseURL: http://127.0.0.1:8899

# 把检索后端切到本地 DuckDuckGo shim（替代付费的 deepseek-official）
- id: web
  config:
    searchProvider: ddg-shim
```

两个关键点：

1. `insert` 里的 `id: web-search-ddg` 注册了搜索 provider，`baseURL` 指向 shim。
2. `- id: web` 这一条把 `searchProvider` 从默认的 `deepseek-official`（付费）**整体替换**成 `ddg-shim`。

> **坑：patch 是"整体替换"不是"合并"**
> cordis 的 patch 会替换目标行的整个 `config`，不会自动 merge。所以 `- id: web` 里只写你要改的 `searchProvider` 就够了，别顺手把 `fetchProvider` 也写上——`fetchProvider` 不写就等于保持关闭（这正是我们要的：只开搜索、不开 fetch）。

### 6. 验证配置是否正确合并

```powershell
dsh --profile desktop --dump-config | findstr /C:"ddg" /C:"searchProvider"
```

应该能看到：

```
- id: web
  config:
    searchProvider: ddg-shim
- id: web-search-ddg
  name: dsh-plugin-ddg-search
  config:
    baseURL: http://127.0.0.1:8899
```

### 7. 配置 shim 开机自启

仓库自带 `shim\start-hidden.vbs`，用 `pythonw.exe` 无窗口静默启动。把它做成启动文件夹快捷方式：

```powershell
$startup = [Environment]::GetFolderPath('Startup')
$vbs = "<仓库路径>\shim\start-hidden.vbs"
$ws = New-Object -ComObject WScript.Shell
$sc = $ws.CreateShortcut("$startup\DSH-DDG-Search-Shim.lnk")
$sc.TargetPath = "wscript.exe"
$sc.Arguments = "`"$vbs`""
$sc.WorkingDirectory = (Split-Path $vbs)
$sc.WindowStyle = 7
$sc.Save()
```

### 8. 重启并测试

完全退出 DSH Desktop 重新打开，`Ctrl+Shift+R` 硬刷新。然后让 AI 搜点什么，能返回结果就是成功了。

## ⚠️ 一个必须知道的坑：shim 会"假死"

这是最容易踩的坑，单独拎出来讲：

**shim 只在"电脑开机/登录"时通过启动文件夹拉起。如果你只重启了 DSH Desktop（不重启电脑），shim 不会自动跟着起来。**

表现是：搜索报错变成 `DuckDuckGo shim unreachable at http://127.0.0.1:8899 ... Is the shim running?`——注意这个报错**不是失败，恰恰说明插件已经生效了**，只是后端进程没在跑。

解决：双击运行一次 `shim\start-hidden.vbs`（或手动 `server.py`），把 shim 拉起来即可。

快速判断 shim 是否活着：

```powershell
Invoke-WebRequest http://127.0.0.1:8899/health -UseBasicParsing
```

返回 `{"status":"ok","backend":"duckduckgo"}` = 正常；连不上 = 需要手动拉起。

## 关于 web_fetch：默认不开

这个插件还能开 `web_fetch`（让 agent 抓取任意网页），但**官方默认禁用 fetch 是有原因的**：`dsh-web-fetch-http` 没有 SSRF 防护，开了之后 agent 能访问你电脑能访问的一切——localhost、内网、VPN 主机、云元数据。所以我建议**只开搜索、保持 fetch 关闭**，除非你明确知道自己要什么。

## 给客户的一键安装提示词（直接复制）

客户不需要懂技术，打开 DeepSeek Harness 把下面这段发给 agent：

````
请帮我在 DeepSeek Harness 桌面版里安装免费的 DuckDuckGo 搜索插件（DeepSeek-Harness-Web-Tools），替代默认的付费搜索。按以下步骤执行：

1. 用 git clone https://github.com/tonyd2wild/DeepSeek-Harness-Web-Tools.git 克隆仓库到本地某个目录。
2. 进入 shim 目录，用 python -m venv venv 建虚拟环境，再用 venv 里的 python 执行 pip install -r requirements.txt。
3. 启动 shim：venv\Scripts\python.exe server.py --host 127.0.0.1 --port 8899（后台运行），并访问 http://127.0.0.1:8899/health 确认返回 ok。
4. 把 plugin 目录（index.js + package.json）复制到 C:\Users\Administrator\.dsh\profiles\desktop\node_modules\dsh-plugin-ddg-search\。
5. 编辑 C:\Users\Administrator\.dsh\profiles\desktop\cordis.patch.yml，追加：insert 注册 id=web-search-ddg、name=dsh-plugin-ddg-search、config.baseURL=http://127.0.0.1:8899；再用 - id: web 的 config.searchProvider=ddg-shim 替换默认搜索后端。不要写 fetchProvider。
6. 用 dsh --profile desktop --dump-config 验证 ddg 相关行出现在输出里。
7. 把 shim\start-hidden.vbs 做成启动文件夹的快捷方式（开机自启）。
8. 提醒我完全退出并重启 DeepSeek Harness，重启后测试搜索。

注意：如果之后搜索报 "shim unreachable"，说明 shim 进程没在跑，双击 start-hidden.vbs 拉起即可。执行中卡在哪一步请明确告诉我，不要跳过。
````

## 关于作者

**得救之道** — 科技博主，也是一名github开源作者，非科班出身，以实践驱动开发，践行Build in Public成长理念，深耕 Windows效率生态，擅长将AI Agent从构想转化为可落地的实用方案，我坚信AI与智能体将重塑个人做事方式，愿以自身技术积累，助力个体把握智能时代机遇，高效提升自身创作、办公与成长效率。
