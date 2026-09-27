# kyjl97

在终端搜索并打开得救之道博客文章。

## 本机测试

在这个目录执行：

```powershell
npm link
kyjl97
```

也可以直接运行：

```powershell
node .\bin\kyjl97.js
```

交互界面支持：

- 输入关键词，搜索文章标题、摘要和正文；空格可以分隔多个关键词。
- 上下键移动高亮文章，右侧查看摘要预览。
- 按 Enter 在默认浏览器打开当前文章。
- 鼠标单击选择文章，再次单击当前文章可打开。
- 按 Esc 或 Ctrl+C 退出。

## 发布给粉丝

当前目录是本地验证版本，还没有发布到 npm 或 GitHub。公开发布后，用户可以通过 npm 安装：

```powershell
npm install --global kyjl97-cli
kyjl97
```

这个交互命令本身读取博客公开的 `rss.xml`，不需要登录。OpenCLI 插件仍然保留，用于 Agent 或脚本场景：

```powershell
opencli kyjl97 search OpenCLI
opencli kyjl97 article opencli
```
