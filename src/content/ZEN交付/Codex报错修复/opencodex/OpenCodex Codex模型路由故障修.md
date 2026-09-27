

> 适用于：Codex 桌面版/CLI 通过 opencodex 代理使用第三方模型（Kimi、DeepSeek、GLM 等）时，
> 出现 401 / 403 / 502 / 404 / 模型不显示 / 模型路由错误等问题的修复。
> 使用方式：把下面【提示词模板】整段复制，替换尖括号占位符，发给任意 AI。

---

## 使用前 30 秒准备（可选，但强烈推荐）

把下面这段命令的输出一起发给 AI，能让它少走一半弯路：

```powershell
Write-Output '=== 1. opencodex 运行时状态 ==='; ocx status
Write-Output '=== 2. 运行时 provider 列表 ==='; ocx provider list
Write-Output '=== 3. 配置中的 provider 名称 ==='; (Get-Content "$env:USERPROFILE\.opencodex\config.json" -Raw | ConvertFrom-Json).providers.PSObject.Properties.Name
Write-Output '=== 4. Codex 当前模型指向 ==='; Select-String -Path "$env:USERPROFILE\.codex\config.toml" -Pattern '^model\s*=|^model_catalog_json\s*=|^openai_base_url\s*=' | ForEach-Object { $_.Line }
Write-Output '=== 5. 模型目录中的相关条目 ==='; (Get-Content "$env:USERPROFILE\.codex\opencodex-catalog.json" -Raw | ConvertFrom-Json).models | ForEach-Object { $_.slug }
```

如果 `ocx` 不在 PATH，用完整路径：

```powershell
& "$env:APPDATA\npm\node_modules\@bitkyc08\opencodex\node_modules\bun\bin\bun.exe" "$env:APPDATA\npm\node_modules\@bitkyc08\opencodex\src\cli\index.ts" status
```

---

## 提示词模板

```text
请帮我修复一个 OpenCodex 代理 + Codex 的模型路由/鉴权问题。

【环境与架构】
- 操作系统：Windows（PowerShell）
- Codex 桌面版/CLI 通过本地代理 opencodex 路由第三方模型
- 代理监听 127.0.0.1:10100（bun 进程），默认端口 10100
- 配置关系（务必先全部读完再动手）：
  * %USERPROFILE%\.opencodex\config.json —— opencodex 的 provider 配置（用户维护的源头）
  * %USERPROFILE%\.codex\config.toml —— Codex 主配置；其中 openai_base_url 指向代理，
    model_catalog_json 指向模型目录文件
  * %USERPROFILE%\.codex\opencodex-catalog.json —— Codex 模型选择器实际读取的模型列表
    （由 opencodex 自动生成，手改会被覆盖）
  * %USERPROFILE%\.codex\opencodex.config.toml —— opencodex 注入的 fallback 配置
  * opencodex CLI：ocx（npm 全局包 @bitkyc08/opencodex）

【症状】
<粘贴完整报错，例如：>
unexpected status 401 Unauthorized: Provider error 401: The API Key appears to be
invalid or may have expired., url: http://127.0.0.1:10100/v1/responses

【我（用户）已经尝试过的】
<例如：更换了 API key、改过 config.json、重启过 Codex；尽量写清楚时间顺序>

【请先做只读诊断，确认根因前不要修改任何文件】
1. 读取上面 4 个关键文件，明确：
   - Codex 当前 model 指向哪个 provider/模型（config.toml 里的 model 行）
   - catalog 里有哪些相关模型条目（slug 列表）
   - 每个相关 provider 的 baseUrl、apiKey（脱敏）、defaultModel、models 列表
2. 用 CLI 检查「运行时」状态，注意磁盘配置 ≠ 运行时配置：
   - ocx status
   - ocx provider list / ocx provider show <名称>
   - ocx config show（对比磁盘 config.json）
   - 如果有管理 token（%USERPROFILE%\.opencodex\admin-api-token 或 service-api-token），
     用 x-opencodex-api-key 头 GET http://127.0.0.1:10100/api/providers 对比运行时
3. 直连 provider API 验证 key（这一步很关键，先绕过代理）：
   - 用 Authorization: Bearer <key> 分别请求：
     GET  <provider>/v1/models
     POST <provider>/v1/chat/completions（最小请求，max_tokens=16）
   - 如果 provider 有多个地区域名（如国际 api.moonshot.ai 与中国 api.moonshot.cn），
     全部试一遍，记录哪个域名通过、哪个返回什么错误
4. 走代理测试并抓「实际转发目标」：
   - ocx debug provider on
   - POST http://127.0.0.1:10100/v1/chat/completions
   - 再测 POST http://127.0.0.1:10100/v1/responses（Codex 实际使用的协议）
   - ocx debug provider logs —— 重点看 host 字段，确认代理实际连到哪个域名
5. 如果代理实际转发域名和配置不一致，定位路由逻辑：
   - 检查 opencodex 源码 router.ts 中 routedProviderConfig 的 baseUrl 解析
   - 路径：%APPDATA%\npm\node_modules\@bitkyc08\opencodex\src\router.ts
   - 以及 registry.ts 中该 provider 的注册表条目（%APPDATA%\npm\node_modules\@bitkyc08\opencodex\src\providers\registry.ts）

【已知陷阱清单（逐条核对）】
1. provider 名可能被注册表「钉死」endpoint：注册表里的 provider（例如 moonshot 固定
   api.moonshot.ai、kimi-code 固定 api.kimi.com/coding/v1）会忽略用户配置的 baseUrl，
   强行使用注册表地址。想用不同地区/自定义 endpoint，必须使用不在注册表里的自定义名
   （如 moonshot-cn），否则配置写了也白写。
2. API key 分地区：中国区平台签发的 key 在国际域名 401，反之亦然；报错文案可能混同
   （如 Invalid Authentication 与 The API Key appears to be invalid or may have expired），
   不要只凭文案判断，要逐个域名实测。
3. 磁盘配置 ≠ 运行时配置：改完 config.json 必须 ocx restart 才会重新加载；
   ocx status / ocx config show / ocx provider list 反映的是运行时内存。
4. config.json 可能被代理/服务在运行中重写：编辑前先备份；编辑后立即复查，
   防止自己刚写的 provider 被覆盖或旧 key 被回写。
5. ocx sync 会重写 catalog 和 config.toml：可能移除根级 model 行、按实时发现裁剪模型列表；
   默认模型改用 Codex 选择器设置，不要依赖手写的 model 行。
6. Codex 实际走 /v1/responses（openai-responses 适配器转换），而很多 provider 是
   openai-chat 适配器；测试时两个端点都要试，只测一个可能漏掉问题。
7. 代理日志默认不输出转发详情：需要 ocx debug provider on 之后发一次请求，
   再 ocx debug provider logs 查看，里面有 host / model / hasCredential 字段。
8. opencodex 代理进程（bun）不读 Windows 系统代理设置：如果本机开了 代理
   （系统代理指向 127.0.0.1:<端口>），Codex App 能上网但代理转发到 chatgpt.com 等
   境外域名会 502 "Provider unreachable"。修复方式：
   ocx config set proxy http://127.0.0.1:<你的代理端口>
   （会镜像到 HTTP(S)_PROXY，并自动把 localhost/127.0.0.1 加入 NO_PROXY）
9. 区分「网络不通」和「模型不支持」：连不上上游是 502 Provider unreachable；
   模型权限问题是 400，例如 The 'gpt-5.6-sol' model is not supported when using
   Codex with a ChatGPT account —— 后者是账户/模型授权问题，改网络配置无效。
   ChatGPT 账户模式（forward/pool）不支持某些模型时，需要 openai-apikey provider
   或账户获得权限，不是代理故障。

【修复要求】
1. 动手前把涉及的文件备份到工作区，文件名带时间戳（如 config.json.bak-20260802-1630）。
2. 优先使用 opencodex CLI（ocx provider add / edit / remove、ocx sync、ocx restart），
   不要手改大 JSON/目录文件，除非 CLI 无法表达。
3. 只动与问题相关的 provider/模型配置，不影响其他 provider（如 OpenAI、DeepSeek）。
4. 修复后用真实请求验收（全部通过才算完成）：
   - 直连 provider API（/v1/chat/completions）通过
   - 走代理 /v1/chat/completions 通过
   - 走代理 /v1/responses 通过（关键验收）
   - ocx status 健康、ocx sync 后 catalog 包含正确模型
5. 交付说明：改了什么、为什么这么改、怎么回滚、Codex 选择器里该选哪个模型。

【安全约束】
- API key 一律脱敏展示（只显示前几位），不要完整输出到回复中
- 不要修改与问题无关的配置/文件
- 不确定的操作先说明原因再执行，删除前确认目标
- 所有结论基于实测（命令输出），不要凭猜测下结论
```

---

## 本次案例复盘（2026-08-02，Kimi 401 修复）

### 现象
Codex 报错：
`unexpected status 401 Unauthorized: Provider error 401: The API Key appears to be invalid or may have expired., url: http://127.0.0.1:10100/v1/responses`

### 诊断链（按顺序）
1. 读配置：Codex 默认模型是 `kimi-code/kimi-k2.7-code-highspeed`。
2. 查运行时：`ocx provider list` 显示有 openai / deepseek / kimi-code / moonshot 四个 provider。
3. 直连测试：新 key 在 `api.moonshot.cn` 通过（模型列表 + 对话都成功），
   在 `api.moonshot.ai` 和国际站报 401。
4. 走代理 + 抓日志：`ocx debug provider logs` 显示实际转发 host 是 `api.moonshot.ai`，
   与配置的 `.cn` 不一致。
5. 查源码定位根因：router.ts 对注册表内 provider 的 baseUrl 有「钉死」逻辑——
   `moonshot` 注册表条目固定 `https://api.moonshot.ai/v1` 且不允许覆盖；
   而 `kimi-code` 条目固定 `https://api.kimi.com/coding/v1`（Kimi 编程套餐入口），
   两个入口都不认中国区开放平台 key。

### 根因（两个叠加）
- 模型路由到了错误的 provider 入口：`kimi-code/...` 走 `api.kimi.com/coding/v1`，
  用户的 key 是 Moonshot 开放平台（中国区）key，不通用。
- 注册表钉死 endpoint：即使用 `moonshot` 名称配置 `.cn`，代理仍强制转发到 `.ai`。

### 修复动作
1. 用自定义名添加 provider：`ocx provider add moonshot-cn --adapter openai-chat --base-url https://api.moonshot.cn/v1 --api-key <key> --default-model kimi-k2.7-code-highspeed`
   （自定义名不在注册表，baseUrl 不会被覆盖）
2. 删除误导的 provider：`ocx provider remove moonshot`、`ocx provider remove kimi-code`
3. `ocx sync` 重新生成模型目录
4. `ocx restart` 让运行时加载新配置
5. 验收：`POST /v1/responses` 请求 `moonshot-cn/kimi-k2.7-code-highspeed`，0.8 秒返回 pong

### 沉淀出的规则（已内化进上面的模板）
- 凡「配置写的 baseUrl 与代理实际转发不一致」，先怀疑注册表钉死；
- 凡第三方 key 401，先分地区域名逐个直连实测；
- 凡改完配置不生效，先对比磁盘与运行时，再重启代理。

---

## 案例二（2026-08-02，GPT-5.6 Sol 502 修复）

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
