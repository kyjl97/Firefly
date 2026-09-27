## 问题现象

Codex 桌面版（Windows App）启动时崩溃，错误信息：

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/dc54be601b8edb2fb49406fd55838454.webp)
## 根本原因

**Astrill VPN 的 LSP（Layered Service Provider，分层服务程序）导致。**

Astrill 安装时会往 Windows 网络栈里插入一个名为 **ASProxy**（ASProxy64.dll / ASProxy.dll）的 LSP 组件。这个 LSP 会被注入到所有网络进程中，包括 Codex 的 app-server，触发 aws-lc-rs 加密库初始化崩溃。

### 用快递传送带比喻

你的网络像一条快递传送带：
- 正常情况：包裹（网络数据）从程序 → 传送带 → 网卡 → 互联网
- 装了 Astrill 后：Astrill 在传送带中间**硬塞了一个自己的检查站**（LSP），每个包裹都要经过它
- 这个检查站（ASProxy.dll）在某些 CPU/系统组合下会"卡死崩溃"，导致 Codex 启动失败

---

## 解决方案（二选一）

### 方法一：netsh winsock reset（推荐）

**`netsh winsock reset` 是什么？**

- **netsh** = Network Shell，Windows 自带的网络配置命令行工具
- **winsock** = Windows Socket，Windows 的网络套接字编程接口
- **reset** = 重置到默认状态

**作用：** 清除所有第三方软件（VPN、防火墙、代理工具）往 Winsock 管道里插入的额外组件（LSP），恢复成 Windows 默认的干净网络栈。

**⚠️ 唯一影响：** 如果你有其他依赖 LSP 的老式代理软件，可能需要重新配置。Astrill 的 OpenWeb/WireGuard 协议不走 LSP，所以不影响 VPN 使用。

**操作步骤（以管理员身份运行 PowerShell 或 CMD）：**

```powershell
# 1. 先检查是否存在 ASProxy
netsh winsock show catalog | findstr ASProxy

# 2. 如果看到了 ASProxy 条目，执行重置
netsh winsock reset

# 3. 重启电脑

# 4. 重启后验证 ASProxy 已消失
netsh winsock show catalog | findstr ASProxy    # 应无输出
```

---

### 方法二：Astrill 自带 LSP 卸载

登录 Astrill → 按住键盘 **Ctrl 键** → 点击菜单栏 **Help** → 会出现隐藏选项：
- **LSP Install**（安装 LSP）
- **LSP Uninstall**（卸载 LSP）

点击 **LSP Uninstall** 即可。

---

## 后续保持

在 Astrill 中使用 **OpenWeb** 或 **WireGuard** 协议（使用虚拟网卡，不会安装 LSP），避免使用老旧的代理模式（否则会重新装回 ASProxy）。

---

## 参考来源

GitHub Issues（openai/codex）：
- [#23672](https://github.com/openai/codex/issues/23672) — 主问题，评论区有完整排查过程
- [#25600](https://github.com/openai/codex/issues/25600) — 同样问题
- [#24408](https://github.com/openai/codex/issues/24408) — AMD 用户
- ### 参考来源
https://github.com/openai/codex/issues/11967

---

## 其他尝试（如果上面没解决）

### 重装

### config.toml
```
%USERPROFILE%\.codex
```

```
[wsl]
enabled = false
```

文件路径：`C:\Users\你的用户名\.codex\config.toml`

### DLL修复
```
https://feishu.doubao.com/drive/file/CeHtbxqMHoaj8mxGIdec4smMndc
```