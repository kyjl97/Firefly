### 常用命令

> 适用于 Windows PowerShell。发帖、回复、转推、点赞、关注、删除等外部可见操作，必须先获得用户明确确认后再执行。

### 工具来源 & 安装

twitter-cli 是 [Agent-Reach](https://github.com/Panniantong/Agent-Reach) 的 Twitter/X 上游 CLI 工具。

GitHub：https://github.com/public-clis/twitter-cli （2.1K Star）

安装方式：

```powershell
pipx install twitter-cli
# 安装后版本: 0.8.5
# 可执行文件路径:
#   C:\Users\Administrator\AppData\Local\Programs\Python\Python314\Scripts\twitter.exe
#   C:\Users\Administrator\.local\bin\twitter.exe
```

> ⚠️ pipx 安装的 twitter.exe 可能丢失（被清理或 PATH 变更）。如果 `twitter --version` 找不到命令，重新跑 `pipx install twitter-cli` 即可恢复。

### Claude Code 环境

当前可用版本：

```powershell
twitter --version
# twitter, version 0.8.5
```

当前命令路径：

```text
C:\Users\Administrator\AppData\Local\Programs\Python\Python314\Scripts\twitter.exe
C:\Users\Administrator\.local\bin\twitter.exe
```

Windows 下**必须**设置 UTF-8，否则 `twitter --help` 可能因为 emoji 在 GBK 编码下报错：

```powershell
$env:PYTHONIOENCODING = "utf-8"
$env:PYTHONUTF8 = "1"
```

### 认证方式

`twitter-cli` 认证优先级：

1. 先读取环境变量 `TWITTER_AUTH_TOKEN` + `TWITTER_CT0`
2. 如果环境变量不存在，再尝试从本地浏览器提取 `x.com` / `twitter.com` cookies

当前 Claude Code 进程里已经设置：

```text
TWITTER_AUTH_TOKEN
TWITTER_CT0
```

不要把这两个值写进代码、日志或公开文档。另一个 Agent 要复用时，在启动它的同一个 shell / 环境里设置：

```powershell
$env:PYTHONIOENCODING = "utf-8"
$env:PYTHONUTF8 = "1"
$env:TWITTER_AUTH_TOKEN = "<从安全位置读取 auth_token>"
$env:TWITTER_CT0 = "<从安全位置读取 ct0>"
```

#### 跨 Agent 传递 Token（安全方式）

Token 是登录凭证，**不能明文输出到聊天记录或 transcript**。安全做法：

1. **源 Agent**（已有环境变量的）写入临时文件：

```powershell
# 在 Claude Code / 源 Agent 中执行
$env:TWITTER_AUTH_TOKEN | Out-File -FilePath "$env:USERPROFILE\.workbuddy\twitter_env.tmp" -Encoding utf8NoBOM
$env:TWITTER_CT0 | Add-Content -Path "$env:USERPROFILE\.workbuddy\twitter_env.tmp" -Encoding utf8NoBOM
```

2. **目标 Agent** 读取 → 使用 → 立即删除：

```bash
# 目标 Agent（Bash 环境）
export TWITTER_AUTH_TOKEN=$(sed -n '1p' ~/.workbuddy/twitter_env.tmp)
export TWITTER_CT0=$(sed -n '2p' ~/.workbuddy/twitter_env.tmp)
# ...使用 twitter 命令...
rm -f ~/.workbuddy/twitter_env.tmp  # 用完立即删除
```

测试认证：

```powershell
twitter status --json
twitter whoami --json
```

看到 `authenticated: true`，并且账号为 `kyjl97`，说明配置成功。

当前账号信息（2026-05-17 验证）：

| 字段 | 值 |
|------|-----|
| 用户名 | @kyjl97 |
| 显示名 | kyjl97 |
| ID | 1833289287040647168 |
| 关注者 | 122 |
| 推文数 | 595 |

### 只读命令

查看帮助和版本：

```powershell
twitter --help
twitter post --help
twitter --version
```

查看当前账号：

```powershell
twitter status --json
twitter whoami --json
```

读取首页时间线：

```powershell
twitter feed -n 20 --json
twitter -c feed -n 20
```

读取单条推文和回复：

```powershell
twitter tweet "URL_OR_ID" --json
```

读取 X Article：

```powershell
twitter article "URL_OR_ID" --json
```

查看用户资料：

```powershell
twitter user @username --json
```

查看用户推文：

```powershell
twitter user-posts @username -n 20 --json
```

搜索推文：

```powershell
twitter search "关键词" -n 10 --json
```

如果搜索返回 404，通常是 Twitter GraphQL 端点变化，先尝试升级 `twitter-cli`；如果最新版仍失败，用 `twitter feed` 或用户时间线替代。

### 写入命令

这些命令会改变外部平台状态，执行前必须确认用户明确授权。

发布推文：

```powershell
twitter post @'
推文内容
'@ --json
```

**带图片发推**（支持最多 4 张图）：

```powershell
# 单张图
twitter post "推文内容" -i "C:\path\to\image.png" --json

# 多张图（最多4张）
twitter post "推文内容" -i a.png -i b.jpg -i c.webp --json
```

> ⚠️ **字数限制**：Twitter 标准推文上限约 280 字符（中文约 140 字）。超出会报 `Tweet needs to be a bit shorter` 错误。发帖前先估算长度，超了就压缩。实测 186 字符的中文推文被拒，精简后成功。
>
> 发帖成功返回示例：
> ```json
> {
>   "ok": true,
>   "data": {
>     "success": true,
>     "action": "post",
>     "id": "2055913594504794289",
>     "url": "https://x.com/i/status/2055913594504794289"
>   }
> }
> ```

回复推文：

```powershell
twitter reply "TWEET_ID" @'
回复内容
'@ --json
```

引用推文：

```powershell
twitter quote "TWEET_ID" @'
引用内容
'@ --json
```

删除推文：

```powershell
twitter delete "TWEET_ID" --json
```

点赞 / 取消点赞：

```powershell
twitter like "TWEET_ID" --json
twitter unlike "TWEET_ID" --json
```

转推 / 取消转推：

```powershell
twitter retweet "TWEET_ID" --json
twitter unretweet "TWEET_ID" --json
```

收藏 / 取消收藏：

```powershell
twitter bookmark "TWEET_ID" --json
twitter unbookmark "TWEET_ID" --json
```

关注 / 取消关注：

```powershell
twitter follow @username --json
twitter unfollow @username --json
```

### 常见问题

**`twitter --help` 报 `UnicodeEncodeError: 'gbk' codec can't encode character`**：

Windows 默认编码 GBK 不支持 emoji。解决：

```powershell
$env:PYTHONIOENCODING = "utf-8"
$env:PYTHONUTF8 = "1"
```

**`twitter status` 报 `not_authenticated / No Twitter cookies found`**：

原因：环境变量未设置，且浏览器 Cookie 提取失败（Chrome 运行中会锁数据库）。

排查步骤：

```powershell
# 1. 检查环境变量是否存在
[bool]$env:TWITTER_AUTH_TOKEN
[bool]$env:TWITTER_CT0

# 2. 如果为空，需要从安全位置重新注入 cookie
# 3. 如果存在但仍失败，可能是 cookie 过期，需要重新登录 X 后更新 auth_token 和 ct0
```

**`twitter post` 报 `Tweet needs to be a bit shorter (186)`**：

推文超字数限制。中文推文控制在 135 字以内比较安全（留余量给图片链接等元数据）。压缩文案后重试即可。

**找不到 twitter 命令 / `command not found`**：

pipx 安装的可执行文件可能丢失。重装即可：

```powershell
pipx install twitter-cli
```

### 配套工具：jike-web-cli

即刻 CLI，同样来自 Agent-Reach 生态。与 twitter-cli 常搭配使用（同时发两个平台）。

GitHub：https://github.com/doublewater777/jike-web-cli

安装 & 状态：

```powershell
pipx install jike-web-cli   # v0.1.1
jike auth status            # Logged in ✓
```

发即刻动态：

```bash
# 即刻用 Bash 执行（pipx 装的 jike.exe）
jike posts create "动态内容"                          # 纯文字
jike posts create "动态内容" --image "/path/to/img.png" # 带图

# 返回示例：
# Image uploaded: FkoOMWtVHrPzjNUiQgdQh3imPI1vv3.png
# Post created: 6a096a41c2dc8bf83fa5ed6e
```

查看动态：

```bash
jike posts get "POST_ID"
jike feed                    # 浏览时间线
jike search "关键词"          # 搜索
```