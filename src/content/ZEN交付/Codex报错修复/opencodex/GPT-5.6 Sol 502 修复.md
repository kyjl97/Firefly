
### 现象
Codex 报错：
`unexpected status 502 Bad Gateway: Provider unreachable: Unable to connect. Is the computer able to access the url?, url: http://127.0.0.1:10100/v1/responses`

### 关键特征
- 只有走 ChatGPT 上游的模型报 502（gpt-5.6-sol 等），第三方模型（moonshot-cn、deepseek）正常。
- 直连 chatgpt.com 有响应（401 = 网络通，只是没凭证），但代理转发超时。
- 本机 Windows 系统代理开着：ProxyEnable=1、ProxyServer=127.0.0.1:7890（FlClash）。

### 诊断链
1. ocx doctor：WHAM reachability error=timeout，并提示
   "If Windows uses a proxy/VPN, set config.proxy or start ocx from a shell with HTTP(S)_PROXY"。
2. 查 Windows 系统代理注册表（HKCU\...\Internet Settings）：ProxyEnable=1、127.0.0.1:7890。
3. 确认 7890 端口在监听（FlClashCore）。
4. 源码 config.ts 的 applyProxyEnv：config.proxy 会镜像到 HTTP(S)_PROXY，
   并把 localhost/127.0.0.1 自动加入 NO_PROXY。

### 根因
opencodex 的 bun 进程不读 Windows 系统代理。Codex App 走了系统代理（Clash）能连
chatgpt.com，但 opencodex 代理进程直连境外域名超时 → 502。

### 修复动作
1. `ocx config set proxy http://127.0.0.1:7890`
2. `ocx restart`
3. 验收：/v1/responses 请求 gpt-5.6-terra / luna / gpt-5.5 / gpt-5.4-mini 全部 200；
   请求需要 store=false、stream=true（ChatGPT 账户模式的协议约束）。

### 遗留问题（非网络故障）
gpt-5.6-sol 在 ChatGPT 账户模式（forward/pool）下返回 400：
`The 'gpt-5.6-sol' model is not supported when using Codex with a ChatGPT account.`
这是上游账户/模型授权限制，需要 OpenAI API key（openai-apikey provider）
或账户获得权限，与代理配置无关。


如果需要远程协助解决
访问：https://github.com/kyjl97/
或者来kyjl97找我