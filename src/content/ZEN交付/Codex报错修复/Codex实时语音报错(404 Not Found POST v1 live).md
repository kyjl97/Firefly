# Codex 实时语音报错：unexpected status 404 Not Found (POST /v1/live) 修复方法

在近期使用 OpenAI Codex 客户端的实时语音功能（Realtime Voice Mode / Frameless Bidi）时，部分用户会触发以下弹框报错：

![](D:\software\weixin\xwechat_files\wxid_5qwohuewwhsk22_da64\business\favorite\temp\微信图片_20260724152812_10.jpg)

```text
unexpected status 404 Not Found: Unknown endpoint: POST /v1/live, url: http://127.0.0.1:10100/v1/live
```

本文将详细拆解该报错的排查过程、根本原因以及完整的修复方案。

---

## 1. 报错原因拆解

### ① 全局代理接管 API 请求
在本地 Codex 配置文件 `C:\Users\Administrator\.codex\config.toml` 中，通常配置了本地代理服务地址：
```toml
openai_base_url = "http://127.0.0.1:10100/v1"
```
这使得 Codex 的所有 OpenAI API 请求（包含文本生成、图像生成、语音呼叫等）都会导向运行在 `10100` 端口的本地代理工具 **OpenCodex (`ocx`)**。

### ② 代理端点缺失与版本滞后
Codex 最新推出的实时语音模式在发起通话时，会向 `openai_base_url` 发送 `POST /v1/live` 或 `POST /v1/realtime/calls` 请求，并建立 WebRTC/WebSocket 双向语音中继。
但在较低版本的 OpenCodex（如 `2.7.28` 或更早期版本）中，尚未接入此语音端点中继逻辑，代理服务直接拦截并返回了 `404 Not Found: Unknown endpoint`。

---

## 2. 官方上游解决进展

OpenCodex 官方团队已完成对实时语音协议的适配（PR #379），并紧急发布了新版 **`2.7.39`**。
新版中已全面实现：
- `POST /v1/live` 与 `POST /v1/realtime/calls` 呼叫创建路由中继。
- ChatGPT 专属 Multipart 媒体格式向后端 JSON `{sdp, session?}` 的自动重写。
- `/v1/live/{callId}` 的双向 WebSocket 语音数据流全中继。

---

## 3. 完整修复方案

根据您的系统环境，选择以下对应的更新与排查方案：

### 方案一：标准升级 OpenCodex 代理服务（推荐）

1. **全局升级 OpenCodex**  
   打开 PowerShell 或 CMD（建议管理员权限），运行以下命令升级至最新版本：
   ```powershell
   npm install -g @bitkyc08/opencodex@latest
   ```
   *注意：如果本地首选 Bun 环境，可执行：*
   ```powershell
   bun add -g @bitkyc08/opencodex@latest
   ```

2. **验证升级版本**  
   确认安装版本大于等于 `2.7.39`：
   ```powershell
   npm list -g @bitkyc08/opencodex --depth=0
   ```

3. **重启代理服务**  
   停止并重新启动 `ocx` 代理：
   ```powershell
   ocx stop
   ocx start
   ```

4. **重新开启实时语音**  
   重启代理服务后，重新加载 Codex 桌面端，点击实时语音图标即可成功建立通话连接。

---

### 方案二：针对 Windows 精简版 / 离线安装环境处理

针对部分 Windows 精简版系统（由于环境限制，Codex 离线安装在自定义路径，如 `D:\software\OpenAI.Codex_26.721.3996.0_x64__2p2nqsd0c76g0\app\ChatGPT.exe`）：

1. **检测全局命令执行权限**  
   若运行 `ocx` 报 `EPERM` 权限错或环境解析异常，可以显式调用全局安装路径中的 JS 入口：
   ```powershell
   node "C:\Users\Administrator\AppData\Roaming\npm\node_modules\@bitkyc08\opencodex\bin\ocx.mjs" start
   ```

2. **直连官方 API 绕过代理（备选）**  
   若临时不需要第三方模型中继，仅需使用官方原生语音功能，可编辑 `C:\Users\Administrator\.codex\config.toml`，注释或删除 `openai_base_url` 行，使其直连 OpenAI 官方 API：
   ```toml
   # openai_base_url = "http://127.0.0.1:10100/v1"
   ```

---

## 4. 总结与日常排查 checklist

- **看端口与 URL**：报错中包含 `127.0.0.1:10100` 表示走的是本地代理。
- **看错误码与路径**：`404 Unknown endpoint: POST /v1/live` 说明代理工具版本落后于 Codex 客户端新上线的 API 特性。
- **排查第一步**：优先升级代理工具（`@bitkyc08/opencodex`）至最新发布版本。



OpenCodex 官方团队已于本日（2026年7月24日）完成了针对该问题的修复（PR #379），并紧急发布了最新版本 **2.7.39**。
来源https://github.com/lidge-jun/opencodex/pull/379
### 关于“仅重启代理就成功恢复语音”的原因

这是因为 OpenCodex（`ocx`）本身具备运行时自动更新与动态热补丁机制：

1. **旧进程常驻内存**：先前报错时，后台的 `ocx` 代理守护进程一直在运行旧的内存路由规则，因此拦截并返回了 404。
2. **重启触发热加载**：在运行 `ocx stop` -> `ocx start` 重启代理服务时，OpenCodex 在启动阶段自动拉取/加载了最新的服务端中继规则与脚本，无需手动重新运行全局 `npm` 安装命令便完成了端点修复。
