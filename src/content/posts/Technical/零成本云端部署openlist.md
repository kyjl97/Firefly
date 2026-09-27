---
title: 零成本云端部署openlist
published: 2026-08-12T10:00:00.000Z
tags:
  - openlist
  - Alist
  - 云端部署
  - 网站搭建
category: Technical
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-openlist-free-fly-20260812-145838.webp
---
最近我想在云端部署这个 openlist，但服务器太贵，找免费、有性价比的方案找了很久都没找到。

今天试着问了下豆包，结果它还真帮我找到了——一个基于 **Fly.io** 的开源项目。项目我看不太懂，就拉到本地让 **Codex** 帮我分析并写成了教程，照着部署，居然一次就成功了！

重要的是，这个是真的免费的，白送 3 台 256MB 虚拟机（每月 160GB 流量），个人用完全够，3GB 永久存储卷，SQLite 数据库存卷里，重启、重部署数据都不丢，Dockerfile 一键部署，不用买数据库服务，还自带 Aria2 离线下载

3 步搞定，全程 0 成本，下面直接上教程，如果想部署的可以去试试！

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-openlist-free-fly-20260812-145838.webp)

### 准备工作

#### 1. 安装 Fly.io 命令行工具 (FlyCTL)

根据你的操作系统，打开终端（Windows 推荐使用 PowerShell）并运行以下安装命令：

- **Windows**:
  ```powershell
  powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
  ```
- **macOS / Linux**:
  ```bash
  curl -L https://fly.io/install.sh | sh
  ```

安装完成后，**重新打开终端**（让环境变量生效），输入 `flyctl --help` 验证是否安装成功。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260812134150815.webp)

#### 2. 注册与登录 Fly.io

在终端中执行以下命令进行注册和登录（注意：Fly.io 注册需要绑定信用卡以防滥用，但免费额度内绝对不扣费）：

```bash
# 注册（如无账号）
flyctl auth signup

# 登录（已有账号）
flyctl auth login
```

⚠️ 注意：注册需要外币信用卡（部分虚拟卡可通过），地区如实填写即可；卡内余额建议保持在 **10 美元以上**——Fly.io 会对卡片做 $10 预授权验证（只是临时冻结、不是扣费），余额不足会导致部署时报错。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260812135611927.webp)

### 部署步骤

#### 1. 拉取部署配置模板

在本地克隆本项目部署模板：

```bash
# 克隆仓库
git clone https://github.com/lushi78778/openlist-fly.git

# 进入目录
cd openlist-fly
```

项目中已经为你准备好了两个核心文件：
- **`Dockerfile`**：指定使用 OpenList 的 All-in-One 镜像（自带 Aria2），并暴露出 5244 端口。
- **`fly.toml`**：Fly.io 部署配置文件，定义了应用名称、启动区域以及磁盘挂载路径。

#### 2. 初始化部署 (会报错，别慌！)

在项目目录下执行：

```bash
flyctl launch
```

**说明**：根据提示输入你的应用名称，**建议写短一点**——应用名一旦确定就无法修改，想换名只能重新部署。确认配置后点击 `Confirm Settings`，如果询问是否立即部署，选择部署即可。

**注意**：**第一次部署通常会提示失败。** 这是正常的，因为我们的 `fly.toml` 中配置了名为 `data` 的磁盘挂载点，但在部署前 Fly.io 还没创建这个磁盘卷。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260812140248046.webp)

#### 3. 创建持久化磁盘 (Volume)

既然缺少磁盘卷，我们就手动创建一个名为 `data` 的硬盘空间（大小设为 1GB，完全符合免费额度限制）：

```bash
flyctl volumes create data --size 1
```

根据提示选择你期望的部署区域（比如东京 `nrt` 或香港 `hkg`）。创建成功后，终端会返回相关的卷 ID（Volume ID）和挂载信息。

#### 4. 重新部署

磁盘卷创建成功后，再次运行部署命令即可：

```bash
flyctl deploy
```

大约一两分钟后，Fly.io 就会完成容器构建并启动你的 OpenList。终端会给出应用的访问域名，例如：`https://你的应用名.fly.dev/`（如 `https://kyjl97.github.io/remote/`，按你自己的应用名访问）。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260812144043932.webp)

### 常见问题与运维技巧

#### 1. 忘记后台密码怎么办？

第一次启动时，OpenList 会自动生成一个初始密码。如果没来得及看日志或者忘记了密码，可以直接通过 `ssh` 连进你的 Fly 虚拟机修改：

```bash
# 连接到你部署的机器终端
fly ssh console

# 随机生成一个新管理员密码
./openlist admin random

# 或者手动设置一个你记得住的密码（比如 12345678）
./openlist admin set 12345678
```

#### 2. 前台无法访问内容？

进入后台后，打开「**用户**」管理页面，找到 **guest** 用户，点击**编辑**并**启用**。如果未启用，别人打开你的网站就看不到你挂载的文件啦。

#### 3. 释放/删除卷

如果需要重装或者销毁应用，删除卷的命令为：
```bash
fly vol destroy <卷ID>
```

### 写在最后

通过以上几步，你就轻松拥有了一个属于自己的云端网盘聚合列表站，并且有免费的 1GB SQLite 存储来记录所有的网盘配置。

如果觉得这篇教程对你有帮助，别忘了**点赞+收藏+转发**三连呀！关注我，后续分享更多实用技巧、效率工具干货，下次见～ 👋

**得救之道远程技术支持：[fix.kyjl97.github.io](https://github.com/kyjl97/)**



### 其他零成本部署方案参考

免费VPS的厂商
https://www.vpsbros.com/%E5%85%8D%E8%B4%B9vps/


