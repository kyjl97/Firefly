# flyctl 命令速查（Fly.io 部署 CLI）

> 版本：v0.4.82（2026-08-11 构建）
> 更新时间：2026-08-12
> 官方文档：https://fly.io/docs/
> 安装：https://fly.io/install.sh（macOS/Linux）、`iwr https://fly.io/install.ps1 -useb | iex`（Windows PowerShell）

---

## 目录

- [安装与路径](#安装与路径)
- [认证 auth](#认证-auth)
- [应用管理 apps](#应用管理-apps)
- [部署 deploy](#部署-deploy)
- [卷管理 volumes](#卷管理-volumes)
- [运维：日志 / ssh / status / ips](#运维日志--ssh--status--ips)
- [常用速查表](#常用速查表)
- [实战技巧与踩坑（重要）](#实战技巧与踩坑重要)
- [本项目部署上下文](#本项目部署上下文)

---

## 安装与路径

**Windows** 安装后二进制位于（**不在 PATH 里**，bash 需用完整路径调用）：

```
C:\Users\<用户名>\.fly\bin\flyctl.exe
```

本机完整路径：`C:/Users/Administrator/.fly/bin/flyctl.exe`

```bash
# bash 里调用（本机）
FLY="C:/Users/Administrator/.fly/bin/flyctl.exe"
"$FLY" version

# PowerShell 里若不在 PATH，同样用完整路径
C:\Users\Administrator\.fly\bin\flyctl.exe version
```

> 提示：`flyctl` 和 `fly` 是同一个工具的两个链接名，装哪个都能用。

---

## 认证 auth

| 命令 | 说明 |
|------|------|
| `flyctl auth signup` | 注册新账号 |
| `flyctl auth login` | 登录（浏览器 OAuth） |
| `flyctl auth whoami` | 查看当前登录邮箱/用户 |
| `flyctl auth token` | 获取 API token（**已废弃**，改用 `flyctl tokens create`） |
| `flyctl orgs list` | 列出组织 |

```bash
"$FLY" auth whoami
"$FLY" orgs list
```

> 注意：`flyctl auth token` 输出会附带一行 deprecated 提示到 stdout，取 token 时用 `tail -1` 过滤。

---

## 应用管理 apps

| 命令 | 说明 |
|------|------|
| `flyctl apps create <name> --org <org>` | 创建应用（名字**全局唯一**） |
| `flyctl apps list` | 列出当前账号所有应用 |
| `flyctl apps destroy <name>` | 永久销毁应用（**不可逆**） |
| `flyctl apps move` | 把应用移到另一个组织 |
| `flyctl apps releases` | 查看发布记录 |

```bash
# 创建应用（非交互）
"$FLY" apps create kyjl97 --org personal

# 查看应用
"$FLY" apps list
```

> 应用名规则：小写字母/数字/连字符，全局唯一（同 GitHub 用户名），被占用报
> `Error: Validation failed: Name has already been taken`。

---

## 部署 deploy

| 命令 | 说明 |
|------|------|
| `flyctl launch` | 初始化项目（交互式，会生成/读取 fly.toml） |
| `flyctl deploy` | 构建镜像并部署（远程构建，耗时 1~3 分钟） |
| `flyctl status` | 查看应用状态 |
| `flyctl config` | 管理 fly.toml 配置 |

```bash
# 在项目目录（含 fly.toml）下部署
"$FLY" deploy

# 查看状态
"$FLY" status -a kyjl97
```

**部署流程（Dockerfile + fly.toml 模板项目）**：
1. `flyctl apps create <name> --org personal`
2. `flyctl volumes create data --size 1 --region nrt --yes`
3. `flyctl deploy`（deploy 命令按 fly.toml 中 `app` 名部署，无需 -a）

> `flyctl launch` 第一次会因卷不存在而失败（模板项目定义了 mounts），**正常现象**，先建卷再 `flyctl deploy` 即可。

---

## 卷管理 volumes

| 命令 | 说明 |
|------|------|
| `flyctl volumes create <name> --size <GB> --region <区域>` | 创建持久化卷 |
| `flyctl volumes list -a <app>` | 列出应用的卷 |
| `flyctl vol destroy <卷ID>` | 删除卷（**不可逆**） |

```bash
# 创建卷（非交互必须加 --yes！）
"$FLY" volumes create data --size 1 --region nrt -a kyjl97 --yes

# 列出卷
"$FLY" volumes list -a kyjl97
```

> - 卷绑定**物理主机**（Fly 会警告建议每应用 2+ 卷以防宕机，免费额度内 1 个够用）
> - 默认加密 + 自动快照（保留 5 份）
> - 免费额度：3GB 总卷空间

---

## 运维：日志 / ssh / status / ips

| 命令 | 说明 |
|------|------|
| `flyctl logs -a <app>` | 实时日志（**一直跟随不退出**，注意超时） |
| `flyctl ssh console -a <app>` | 进入容器终端 |
| `flyctl ips list -a <app>` | 查看 IP |
| `flyctl ips allocate-v4 -a <app>` | 分配独立 IPv4（默认是共享 IP） |
| `flyctl releases` | 发布历史 |
| `flyctl restart` | 重启应用 |

```bash
# 拿 OpenList 初始密码（grep 过滤，logs 会持续输出需配合 timeout）
timeout 45 "$FLY" logs -a kyjl97 | grep -iE "password|admin"

# 进容器改密码
"$FLY" ssh console -a kyjl97
./openlist admin set 新密码
```

> `flyctl logs` 是持续跟随模式，agent 里调用必须包 `timeout`，否则会挂到超时。

---

## 常用速查表

```bash
# 一次完整部署（新应用）
"$FLY" apps create myapp --org personal
"$FLY" volumes create data --size 1 --region nrt --yes -a myapp
"$FLY" deploy          # 在项目目录，fly.toml 的 app 需已改为 myapp

# 日常运维
"$FLY" status -a myapp
timeout 45 "$FLY" logs -a myapp | grep password
"$FLY" ssh console -a myapp
"$FLY" volumes list -a myapp
"$FLY" vol destroy vol_xxx
```

---

## 实战技巧与踩坑（重要）

### 1. 新账号可能被风控（high risk）
**现象**：所有写操作报
`Error: Your account has been marked as high risk. Please go to https://fly.io/high-risk-unlock ...`

**触发因素**：机房 IP（代理/VPN 出口）、新号注册后立即高频操作、虚拟卡支付。
**解法**：
- 打开 https://fly.io/high-risk-unlock（已确认是官方页面，未登录会跳登录）
- **必须用户本人**登录提交验证（用途说明等）
- 卡里需有 **$10 预授权**（Stripe hold，不是真扣费，验证后 3~7 天自动释放；缺 $10 会验证失败）
- 审核是**异步**的（快则几十分钟，慢则几天），通过后发邮件通知
- ⚠️ 审核期间**不要反复重试命令**，会加重风控信号

### 2. 应用名全局唯一，且**不支持改名**
- 名字被占用报 `Name has already been taken`（无占用检测命令，只能试）
- 已确认 Fly.io **不支持改名**：CLI 无 rename 子命令、GraphQL API 无 rename mutation、官方文档无相关页面
- **换名唯一方案：新建短名应用 + 销毁旧应用**（应用全新时零成本；有数据需先迁移卷数据）

### 3. 非交互环境（agent 跑命令）必须加 `--yes`
**现象**：`Error: yes flag must be specified when not running interactively`
**解法**：`volumes create` 等需要确认的命令加 `--yes`。

### 4. flyctl 不在 PATH
Windows 安装到 `C:\Users\<用户>\.fly\bin\`，bash/PowerShell 里要用完整路径调用。

### 5. `flyctl auth token` 已废弃
输出带 deprecated 提示（会混进 stdout），改用 `flyctl tokens create`；取 token 用 `tail -1`。

### 6. OpenList 初始密码在日志里
首次启动日志打印：`Successfully created the admin user and the initial password is: <密码>`，用 `timeout 45 flyctl logs -a <app> | grep -i password` 抓取。

### 7. 部署耗时与超时
远程构建镜像（Depot builder）约 1~2 分钟，agent 调用 `flyctl deploy` 时 timeout 至少设 300~600 秒，否则会被掐断。

### 8. 免费额度速记
- VM：3 个 shared-cpu-1x（256MB）/ 月
- 卷：3GB 总量
- 流量：160GB/月（亚洲/印度 30GB 免费）
- 常用区域：`nrt`（东京）、`hkg`（香港）

---

## 本项目部署上下文

- 应用名：**kyjl97**（原 lushi-openlist-v3 已废弃）
- 域名：https://kyjl97.github.io/remote/
- 卷：vol_re1d72z0xn3pz654（1GB / nrt）
- 项目目录：D:\project2026\openlist-fly
- 镜像：openlistteam/openlist:latest-lite-aio（Aria2 离线下载版）
- 完整部署信息备份：桌面 `OpenList云端部署信息备份.txt`

*本文档由 AI 助手根据实际部署实战整理，命令以实际安装版本（v0.4.82）为准。*
