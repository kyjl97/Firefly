GitHub 上 The Vibe Companion 这个开源项目，把 Claude Code 搬进了浏览器，挺有意思的。

通过逆向工程破解了 CLI 内部未公开的 WebSocket 协议，在它之上构建了一套可视化的 Web 界面。

支持多会话并行，能让我们同时运行多个 Claude Code 实例，每个实例拥有独立的进程和权限设置。

GitHub：
http://github.com/The-Vibe-Company/companion

官网
[官网](https://www.thecompanion.sh/)

具备可视化的工具调用流，无论是 Bash 命令、文件读写还是代码修改，都能以折叠块形式清晰呈现。

不需要额外的 API Key，直接复用现有的 Claude Code 订阅，通过 Bun 环境一行命令即可本地启动。

如果你习惯使用 Claude Code 辅助编程，但又苦于命令行的交互限制，这个项目能带来更直观的操作体验。

