# Mac 代理冲突导致 Codex 与 Work Body 异常排错指南

在为使用 macOS 的客户排查 Codex/Work Body 的网络问题时，常会遇到本地端口冲突、系统代理接管冲突、以及网络节点未连通等交织在一起的情况。

以下是针对该案例的详细诊断、Mac 端口查询命令及沉淀方案。

---

## 一、 问题诊断与原因分析

### 1. 现象一：使用机场专属客户端时，Chrome 正常，Work Body 报错（端口错误），Codex 异常

* **Chrome 正常**：机场专属客户端通常会自动修改系统代理（如 HTTP/HTTPS 代理），并将流量引向它们自家的特定端口（如 `10809` 或 `25800`）。因为代理节点可用，Chrome 网页能正常打开。
* **Work Body 端口错误**：Work Body 在初始化时，会固定去探测本地是否有 `7890` 端口的服务处于监听状态。由于机场客户端使用的是其他端口，Work Body 无法在其期望的端口上建立通信，直接抛出端口网络异常。
* **Codex 异常**：终端命令行工具（如 Codex / Claude Code）默认不主动读取系统代理设置。此时它处于直连状态（导致连不上国外 API），或者因为机场客户端的分流规则屏蔽了流式连接，导致大模型常用的 SSE（Server-Sent Events，流式打字机输出）协议包发生截断或输出异常。

---

### 2. 现象二：切换为 Clash 并改端口为 7890，开启代理后，Work Body 恢复，但 Chrome 和 Codex 均挂掉

* **Work Body 正常**：你将 Clash 的混合端口（Mixed Port）修改为了 `7890`。此时 Work Body 在 `7890` 探测到了活动的代理服务，连接成功，因此“网络异常”报错消失。
* **Chrome 与 Codex 挂掉**：当你开启 Clash 代理并勾选“System Proxy（系统代理）”时，所有对外流量都被强行接管到 Clash。然而，**此时你的 Clash 订阅节点并没有真正通网**（常见原因：没有在 Clash 中手动点选可用节点、订阅链接已过期、或者节点全部超时）。系统代理不通导致了 Chrome 无法加载网页，Codex 同样因 API 无法触达而无法加载。

---

### 3. 现象三：关掉 Clash，打开机场网站，一切又恢复正常

* **Clash 关闭**：Clash 关闭后，系统代理控制权被释放。
* **打开机场网站**：这一行为通常会通过浏览器唤醒后台常驻的机场客户端守护进程（Daemon），或者由于网络恢复直连，绕过了 Clash 失败的全局劫持，使原本能直连或能通过机场走老通道的 Work Body 和 Codex 重新连通。

---

### 4. 现象四：卸载 Clash 换回机场客户端，报错 `stream disconnected before completion`（重新连接 2/2）

当用户将代理工具从 Clash 换回自带的机场专属客户端后，Codex 会在运行一段时间后弹出如下报错：

```text
正在重新连接2/2
Error running remote compact task: stream disconnected before completion: error sending request for url (https://chatgpt.com/backend-api/codex/responses)
```

* **根本原因**：
  * **流式连接被阻断（SSE 兼容差）**：大模型（ChatGPT/Codex）输出时采用的是 HTTP 长连接的流式传输（SSE, Server-Sent Events）模式。大部分机场自研客户端为了节省自身网关连接数，会设置极其激进的闲置超时或字节过滤，导致数据传输到一半就被代理网关或本地客户端强行切断（Disconnected）。
  * **域名分流与 SSL 握手问题**：该 URL 对应 OpenAI 的接口域名。机场客户端在处理终端通过 HTTPS 握手发出的请求时，若无 TUN 虚拟网卡代理拦截，经常会发生 SSL 握手失败或重置（Error sending request），导致连接彻底中断。

---

## 二、 Mac 端口查询命令指南

在 macOS 下，可以通过终端（Terminal）使用以下命令精准排查是哪个程序占用了端口，或者某个端口是否处于监听状态。

### 1. 检查指定端口是否被占用（最常用）

如果想看哪个程序占用了 `7890` 端口：

```bash
lsof -i :7890
```

* **输出示例**：

  ```text
  COMMAND   PID          USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
  clash   82914 Administrator    3u  IPv4 0xde39fa123456789b      0t0  TCP *:7890 (LISTEN)
  ```

* **关键字段说明**：
  * `COMMAND`：运行该代理的软件名称（例如 `clash`、`v2ray` 等）。
  * `PID`：进程 ID。如果需要强制杀掉该进程，可以使用 `kill -9 <PID>`（例如 `kill -9 82914`）。
  * `(LISTEN)`：代表该端口正在等待连接（即已启动监听）。

### 2. 列出系统当前所有处于监听状态的端口

如果不知道当前代理软件到底用的是什么端口，可以用以下命令列出所有正在监听的端口：

```bash
lsof -i -P -n | grep LISTEN
```

或者使用 `netstat`：

```bash
netstat -anp tcp | grep LISTEN
```

### 3. 根据 PID 查询具体是哪个应用

如果在端口查询中只拿到了 `PID`，想确认它是哪个软件的后台程序：

```bash
ps -p <PID>
```

### 4. 查找指定应用程序所占用的端口（以 ChatGPT 桌面端为例）

如果想看某个特定的软件（如 `ChatGPT` 桌面端）在本地使用了哪些端口或网络连接，可以分两步或一步直接查询：

* **方法一：直接通过软件名称搜索网络连接与端口**

  ```bash
  lsof -i -P -n | grep -i chatgpt
  ```

  * `lsof -i` 用于列出网络连接。
  * `-P` 强制显示数字端口号（如 `7890`，而不是端口名如 `socks`）。
  * `-n` 强制显示 IP 物理地址（而不是域名）。
  * `grep -i` 用来不区分大小写地过滤软件名 `chatgpt`。

* **方法二：先查进程 ID (PID)，再查其网络占用**

  1. 第一步：获取软件的 `PID`：

     ```bash
     pgrep -i chatgpt
     # 或者用常规进程搜索：ps aux | grep -i chatgpt
     ```

  2. 第二步：根据返回的 `PID`（假设 PID 为 `98765`），精准查看它的网络细节：

     ```bash
     lsof -i -P -n -p 98765
     ```

### 5. 查找浏览器（如 Google Chrome）的连接与端口占用

像 Google Chrome 这种网页浏览器，与 Clash、Work Body 等“监听本地服务端口以等待连接（LISTEN）”的软件不同，浏览器平时主要用于向外部建立**出站连接（ESTABLISHED）**。但在某些开发或调试场景（例如开启了 Chrome DevTools 协议调试）下，它也会占用特定的本地端口。

* **方法一：查看 Chrome 当前所有网络出站连接**

  如果你想知道 Chrome 正在与外网哪些服务器、哪些端口进行通信，可以直接搜索进程：

  ```bash
  lsof -i -P -n | grep -i "chrome"
  ```

  > 终端中会输出很多带有 `ESTABLISHED` 或 `SYN_SENT` 状态的行，通常目标端口都是外部的 `*:443` 或 `*:80`。

* **方法二：查找 Chrome 远程调试所监听的本地端口**

  如果需要排查 Chrome 调试端口（例如 `--remote-debugging-port=9222`）是否正常开启，应单独过滤 `LISTEN` 状态：

  ```bash
  lsof -i -P -n | grep -i "chrome" | grep LISTEN
  ```

  > 如果你开启了调试，这里通常会输出 `Google 127.0.0.1:9222 (LISTEN)`。

---

## 三、 落地解决建议流程

如果后续遇到类似客户，建议按照以下标准流程排除网络故障：

1. **统一代理客户端**：建议客户彻底退出或卸载机场自带的定制客户端，统一使用开源的 Clash（如 Clash Verge / Clash Nyanpasu）以规避规则和兼容性问题。
2. **将 Clash 端口锁定为 7890**：在 Clash 的设置（Settings/Mixin）中，将混合端口（Mixed Port）固定为 `7890`，以满足 Work Body 等软件的默认依赖。
3. **测试节点通畅度**：在 Clash 的代理界面点击延迟测试，**必须确保能看到绿色延迟数字**，并手动点选一个可用的代理节点。再去 Chrome 验证是否可以正常打开 Google。
4. **开启 TUN 模式（Tun Mode）**：
   * 勾选 Clash 中的 **Tun 模式**。
   * Tun 模式会接管系统网卡层面的所有流量，不需要再去为命令行工具手动配置 `export http_proxy` 环境变量。这是解决 Codex 闪退、不走代理或报错的最佳实践。
