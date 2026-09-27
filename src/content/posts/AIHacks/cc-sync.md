---
title: cc-sync
published: 2026-04-18
tags:
  - Claudecode
  - 命令行工具
  - AI
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260419155321814.webp
---

> 换电脑后，你最怕什么？不是装机，而是你和 Claude 聊了半天的代码、需求、方案——全没了。

直到我发现 cc-sync，这个问题终于解决了。

**GitHub地址**：[https://github.com/ikook-wang/cc-sync](https://github.com/ikook-wang/cc-sync)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260419155321814.webp)


### 01 一键安装
**前置条件**
- 已安装Claude code并使用≥1次
- 已安装-Git
- 一个 GitHub 仓库（建议 private）用于存放配置

**运行代码安装（windows Git Bash）：**

```bash
# 方式1: 直接管道（可能不显示交互，但能运行）
curl -fsSL https://raw.githubusercontent.com/ikook-wang/cc-sync/main/install.sh | bash

# 方式2: 先下载再运行（推荐，能看到交互）
curl -fsSL -o /tmp/install.sh https://raw.githubusercontent.com/ikook-wang/cc-sync/main/install.sh
bash /tmp/install.sh
```
*安装脚本会交互式引导你完成配置：*
1. 输入 GitHub 仓库地址
2. 设置保留会话数（默认 3）
3. 自动配置 `.gitignore`、hooks、shell 包装函数
4. 完成首次同步
需同步电脑都运行一次即可装一次，用同一个仓库，就能随时继续。

### 02 无缝衔接
跨机器同步 Claude Code 的配置和会话。
在公司聊了一半，回家笔记本输入恢复会话命令
在家里聊了一半，出差在酒店的笔记本输入恢复会话命令
```
claude --resume 
```

执行这个命令，就是恢复之前会话的意思,直接继续。**像没换过电脑。**

同步内容：设置、命令、技能、最近 N 个会话。
凭据和缓存不同步，安全起见。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260419160330747.webp)
### 03 自动同步

另外,cc-sync 通过三个机制实现自动同步：

1. 打开 Claude Code，自动拉取最新
2. 退出Claude Code，，自动提交推送
3. 手动触发命令
```
bash ~/.claude/sync.sh
```


### 04 常用命令
```
# 手动同步
bash ~/.claude/sync.sh --verbose
git -C ~/.claude commit -m "sync: initial"
git -C ~/.claude push

#查询推送日志
cd ~/.claude && git status && git remote -v

# 详细模式（查看同步过程）
bash ~/.claude/sync.sh --verbose

# 卸载
bash ~/.claude/uninstall.sh
```

PS.卸载操作会移除sync.sh、sync.conf、uninstall.sh文件，同时会删除settings.json中的SessionStart hook以及Shell rc文件里的claude包装函数，但不会移除Git仓库和已同步的数据。

### 05 注意事项
- 建议两台电脑保持相同的用户名和目录结构。
- 编辑 `~/.claude/sync.conf` ,配置项 `KEEP_SESSIONS=3`每个项目所保留的会话数量。



换电脑最烦的不是重装软件，而是**丢失上下文**。

你和 Claude 聊了半小时的需求、写的代码片段——换台电脑全没了。

cc-sync 让你**永远从上次停下的地方继续**。

**工具不帮你做事，但帮你少重复做事。**