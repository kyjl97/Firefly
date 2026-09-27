# OpenCodex 输出报错诊断与修复指南

> 场景：Codex 通过 OpenCodex（ocx）网关路由时出现 `unexpected status 5xx`、`Provider unreachable`、`404`、`超时` 等报错。
> 目标：按层排查，快速定位根因，不重复从零开始的诊断步骤。

---

## 一、快速诊断流程

遇到报错，先按这个顺序跑一遍，确认故障在哪一层：

```
Codex → opencodex 网关 (127.0.0.1:10100) → 上游 (ChatGPT / 第三方 provider)
         ↑ 先查这层              ↑ 再查这层
```

### Step 1：网关是否活着

```bash
# 秒级响应 → 网关正常
ocx status

# 或手动查
curl -sS -m 5 http://127.0.0.1:10100/healthz
# 期望：HTTP 200（响应应 < 1 秒）

# 如果没有响应，检查进程
netstat -ano | grep 10100 | grep LISTENING
# 如无监听 → 网关挂了，跳到 §三.1
# 如有监听但无响应 → 进程假死，跳到 §三.2
```

> **判断**：`/healthz` 200 但 `/v1/models` 超时 → 网关活着但上游不通，查 Step 2。

### Step 2：上游是否可达（最常见故障点）

```bash
# 直连测试（本机能否访问 ChatGPT）
curl -sS -m 10 -o /dev/null -w "HTTP:%{http_code} TIME:%{time_total}\n" \
  "https://chatgpt.com/backend-api/wham/usage"

# 走系统代理测试
curl -sS -m 10 -x http://127.0.0.1:7890 -o /dev/null -w "HTTP:%{http_code} TIME:%{time_total}\n" \
  "https://chatgpt.com/backend-api/wham/usage"
```

| 结果 | 判断 |
|------|------|
| 直连超时，走代理 `401` | 上游可达，但需要代理 → **代理未配置**，跳到 §三.3 |
| 直连 `401` | 上游可达，网关问题转到 Step 3 |
| 两者都超时 | 网络不通，检查代理/节点是否有效 |
| 直连 `200` | 机器无代理限制，查其他问题 |

### Step 3：网关能否转发到上游

```bash
# 通过网关请求模型列表
curl -sS -m 30 -o /dev/null -w "HTTP:%{http_code} TIME:%{time_total}\n" \
  http://127.0.0.1:10100/v1/models

# 期望：HTTP 200（响应时间 ≈ 直连上游时间 + 网关开销）
```

> 如果 `/healthz` 秒回但 `/v1/models` 超时 → 网关本身 OK，但无法连接上游 → **代理配置问题**。

### Step 4：Official 全量诊断

```bash
ocx doctor
```

重点关注输出中的：
- `WHAM reachability` —— 网关调用上游的连通性
- `Configured proxy` —— 是否配置了代理
- `Running proxy process proxy env` —— 代理是否生效于运行进程

---

## 二、环境快查

```bash
# 系统代理是否开启
reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" | \
  grep -E "ProxyEnable|ProxyServer"

# 网关代理配置
ocx config get proxy

# 当前网关进程
cat "$USERPROFILE/.opencodex/ocx.pid"
tasklist //FI "PID eq $(cat $USERPROFILE/.opencodex/ocx.pid)" 2>/dev/null

# 服务日志尾行
tail -n 20 "$USERPROFILE/.opencodex/service.log"

# 网关版本
cat "$USERPROFILE/.opencodex/version.json"

# OAuth 令牌状态
cat "$USERPROFILE/.opencodex/auth.json" | head -c 200
```

---

## 三、常见故障模式

### 3.1 502 Bad Gateway — Provider unreachable

**现象**：
```
unexpected status 502 Bad Gateway: Provider unreachable: Unable to connect.
Is the computer able to access the url?, url: http://127.0.0.1:10100/v1/responses
```

**根因队列**（按概率排序）：
1. **代理未配置**（本机需要代理才能访问 ChatGPT 等上游）
2. 代理节点失效（Clash 节点过期/断连）
3. 上游服务宕机（少见）

**检查与修复**：

```bash
# 1. 确认是否需要代理
curl -sS -m 10 "https://chatgpt.com/backend-api/wham/usage"

# 2. 检查当前代理配置
ocx config get proxy

# 3. 配置代理（如需要）
ocx config set proxy "http://127.0.0.1:7890"

# 4. 重启网关使配置生效
ocx stop
sleep 3
ocx start

# 或通过服务重启（更可靠）
taskkill //PID $(cat $USERPROFILE/.opencodex/ocx.pid) //F
# 等待 15 秒让服务 wrapper 自动拉起
```

> **注意**：`ocx restart` 可能超时卡死（配置同步阻塞），用 `stop + start` 或 kill 进程让 service wrapper 自动重启更可靠。

### 3.2 网关假死 — 端口监听但无响应

**现象**：
- `netstat -ano | grep 10100` 显示 LISTENING
- 但 `/healthz` 或 `/v1/models` 返回 `HTTP 000`（连接被拒或超时）
- 进程是 `bun.exe`，内存占用异常（如持续增长）

**根因**：Bun 运行时内存泄漏或事件循环阻塞，常见于长时间运行后。

**修复**：

```bash
# 1. 确认主进程 PID
cat "$USERPROFILE/.opencodex/ocx.pid"

# 2. 强制终结
taskkill //PID $(cat $USERPROFILE/.opencodex/ocx.pid) //F

# 3. 等待服务 wrapper 自动拉起（约 10-15 秒）
sleep 15

# 4. 验证恢复
curl -sS -m 5 http://127.0.0.1:10100/healthz
```

### 3.3 代理配置丢失

**现象**：网关重启后，之前能用的代理设置丢失。

**根因**：启动脚本 `opencodex-service.cmd` 不读取 shell 环境变量中的代理，也不从系统注册表继承。必须通过 `config.json` 的 `proxy` 字段持久化。

**修复**：

```bash
# 写入持久化配置
ocx config set proxy "http://127.0.0.1:7890"

# 验证
ocx config get proxy
# 输出：http://127.0.0.1:7890
```

> **原理**：`config.json` 写入后，`@bitkyc08/opencodex` 的 `applyProxyEnv()` 在启动时自动设置 `HTTP_PROXY`/`HTTPS_PROXY`，同时给 `NO_PROXY` 追加 `localhost,127.0.0.1` 以保持健康检查正常。

### 3.4 404 Unknown Endpoint

**现象**：
```
unexpected status 404 Not Found: Unknown endpoint: POST /v1/live, url: http://127.0.0.1:10100/v1/live
```

**根因**：OpenCodex 版本过旧，未实现实时语音等新端点。

**修复**：

```bash
# 升级
npm install -g @bitkyc08/opencodex@latest

# 重启
ocx stop
ocx start
```

### 3.5 生图报错 "none is configured in opencodex"

**现象**：文本模型正常，但 `/v1/images/*` 返回错误。

**根因**：`providers.openai.authMode` 不是 `forward`。

**修复**：

```bash
# 检查当前配置
cat "$USERPROFILE/.opencodex/config.json" | python -c "import json,sys; d=json.load(sys.stdin); print(d['providers']['openai']['authMode'])"

# 手动修改（或通过 ocx config，但 authMode 暂未暴露到 config set）
# 编辑 config.json 中 providers.openai.authMode 改为 "forward"
# 然后重启网关
```

### 3.6 服务进程消失

**现象**：`ocx status` 之前显示运行中，重启后网关不再自启，或手动启动的进程在退出后消失。

**根因**：Windows 任务计划服务未安装。

**修复**：

```bash
# 安装常驻服务
ocx service install

# 验证
ocx service status
ocx status
```

### 3.7 Codex 运行时版本不匹配

**现象**：`ocx doctor` 提示 "OpenCodex is using an older Codex binary"。

**修复**：

```bash
# 更新到最新版 CLI
ocx doctor --fix-codex-runtime

# 刷新模型目录
ocx sync
```

---

## 四、代理相关命令速查

```bash
# 查看/设置/删除代理
ocx config get proxy
ocx config set proxy "http://127.0.0.1:7890"
ocx config unset proxy

# 验证代理是否生效（模拟网关转发路径）
ocx provider test openai

# 查看系统代理状态
reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable
reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyServer

# 查看 Clash 监听端口
netstat -ano | grep "LISTENING" | grep -E "7890|7897"
```

---

## 五、网关生命周期管理

```bash
# 启动
ocx start

# 停止（同时恢复 Codex 直连）
ocx stop

# 重启（可能卡死，备选方案见下）
ocx restart

# 重启可靠方案
ocx stop
sleep 3
ocx start

# 强制重启（服务 wrapper 模式）
taskkill //PID $(cat $USERPROFILE/.opencodex/ocx.pid) //F
# 等待 15 秒自动拉起

# 模型同步
ocx sync [--restart-codex]

# 状态检查
ocx status
ocx health --json
ocx ready --json
```

---

## 六、日志与数据

```bash
# 服务日志
tail -n 50 "$USERPROFILE/.opencodex/service.log"
# 包含：启动时间、OAuth 刷新、模型发现、代理生效确认

# 崩溃日志
tail -n 50 "$USERPROFILE/.opencodex/crash.log"

# 配置
cat "$USERPROFILE/.opencodex/config.json"

# 模型目录（Codex 可见的模型列表）
cat "$USERPROFILE/.codex/opencodex-catalog.json" | python -c "import json,sys; d=json.load(sys.stdin); print('Models:', len(d.get('data',[])))"

# 用量统计
ocx usage --range 7d
```

---

## 七、判断树（快速对照）

```
报错内容                              → 最可能原因
─────────────────────────────────────────────────────────────
502 Bad Gateway: Provider unreachable → 代理未配置或节点失效
502 Bad Gateway (timeout)             → 上游网络不通
404 Unknown endpoint: /v1/live        → OpenCodex 版本过旧
503 / 连接被拒                         → 网关未启动
400 Bad Request: Input must be a list → 客户端请求格式问题（非网关故障）
"none is configured in opencodex"     → authMode 不是 forward
healthz 200 但 v1/models 超时         → 代理配置问题
端口监听但无响应                       → 进程假死，需 kill 重启
```

---

## 八、本机环境快照（排错参考）

| 项目             | 值                                                       |
| -------------- | ------------------------------------------------------- |
| OpenCodex 安装路径 | `%APPDATA%\npm\node_modules\@bitkyc08\opencodex`        |
| 全局 CLI         | `ocx`（`%APPDATA%\npm\ocx`）                              |
| 配置目录           | `%USERPROFILE%\.opencodex`                              |
| 网关端口           | 10100                                                   |
| 代理端口           | 7890（Clash）                                             |
| 服务日志           | `%USERPROFILE%\.opencodex\service.log`                  |
| Codex 配置       | `%USERPROFILE%\.codex\config.toml`（含 `openai_base_url`） |
| 模型目录           | `%USERPROFILE%\.codex\opencodex-catalog.json`           |
| OAuth 令牌       | `%USERPROFILE%\.opencodex\auth.json`                    |
