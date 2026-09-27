---
title: 技能链接指南
published: 2026-04-24
tags:
  - skill
  - tools
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260424220829071.webp
---

你是否也有这样的困扰？在多个 AI 工具里安装了同样的技能（Skills），修改一次要同步多次，麻烦！

**Skills-Link** 就是来解决这个问题的 —— 让所有 AI 编程工具共享同一个 Skills 文件夹。

**相关文档**

https://github.com/shanliuling/skills-link/blob/main/README.zh.md

https://www.npmjs.com/package/skills-link?activeTab=readme

https://github.com/kyjl97/skills-manage

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260424220829071.webp)




## 快速上手

### 安装skills-link

```bash
npm i -g skills-link
```


### skill配置

交互式引导命令

```bash
skills-link
```

PS.默认`C:\Users\Administrator\AISkills`做为中央仓库，也可以填写其他自定义路径作为中央仓。工具会自动创建Agent软连接执行同步



### 推送GitHub

```
 skills-link sync
```

这里注意：需要配置github用户身份，没有配置你的用户名和邮箱，无法识别提交者身份，所以拒绝提交代码，只需要两行命令就能解决。

```
git config --global user.name "My Name"
git config --global user.email "myemail@example.com"
```

运行以下命令查看 Git 配置：

```
git config --list
```

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260426012834135.webp)

参考方式

```bash
# 方式1：双击运行
D:\project2026\skills-manage\push.bat

# 方式2：命令行
cd C:\Users\Administrator\AISkills
git init
git add .
git commit -m "新增 xxx skill"
git push

# 方式3：命令行
skills-link sync
```


### 配置文件修

在哪里运行这个命令，就会产生这个配置文件

```
C:\Users\Administrator\AISkills\config.yaml
```

中央仓库masterDir 也可以在这里进行后续更换，另外有些skill目前他扫描不到，你需要手动添加后在运行命令比如zed中使用opencode插件skill目录：
C:\Users\Administrator\.config\opencode\skills\
她是扫描不到的，你就需要手动添加：

```yaml
language: zh
masterDir: ~/AISkills

git:
  enabled: true
  remote: https://github.com/you/skills.git
  autoPush: true

watch:
  enabled: false
  debounceMs: 3000

apps:
  - name: Claude Code
    skillsPath: ~/.claude/skills
    enabled: true
  - name: Cursor
    skillsPath: ~/.cursor/skills
    enabled: true
```

### 添加新Skills说明

把想用的 skills 放到 `C:\Users\Administrator\AISkills`
`
**⚠️ 重要：让 AI 安装 skill 时，一定要指定安装到中央仓库目录！**
示例

```bash
# 先 cd 到中央仓库再安装
cd C:\Users\Administrator\AISkills
# 然后再让 AI 安装 skill
```

否则 skill 会安装到 Agent 的本地目录，不会同步到其他工具！

然后运行 `skills-link`，会分两步：

**第一步：导入**
- 扫描中央仓库，发现新 skills，git同步已启用
- 显示"已导入 xxx"

**第二步：创建链接**
- 为各 Agent 的 skills 目录创建软链接
- 这样 Qwen Code、Claude Code 才能看到这个 skill

## 多电脑同步

假设你在公司电脑配置好了，现在要在家里电脑用。


###  安装 skills-link
```
npm install -g skills-link
```

### 创建各 AI 工具的软链接
```
skills-link
```

中文→中央仓库选择(默认)
```
~/AISkills
```

github仓库填写
```
https://github.com/kyjl97/skills-manage
```
会自动拉去仓库skill到中央仓库~/AISkills，然后为应用路径创建软链接，


这台电脑想要同步github也可以执行
⚠️需要配置github用户身份
```
skills-link sync
```

## 我的实际情况

### 读懂原理

```
┌─────────────────────────────────────────────────────────────────────┐
│                         本地电脑                                    │
│                                                                     │
│   .qwen/skills ──┐                                                 │
│   .claude/skills ──┤     ┌──────────────────┐                       │
│   .codex/skills ──┤     │  .skillshub      │◀─── 软链接           │
│   .trae/skills ───┼────▶│  (D:\project2026 │                       │
│   ...            │     │   \skills-manage)│                       │
│                   │     └──────────────────┘                       │
│                              │                                      │
│                              ▼ GitHub                              │
│                   https://github.com/你的账号/skills-manage         │
└─────────────────────────────────────────────────────────────────────┘
```

**一句话解释**：所有 AI 工具的 Skills 目录都指向同一个地方，修改一次，所有工具都生效。

| 目录                                      | 性质   | 存什么                   |
| --------------------------------------- | ---- | --------------------- |
| `D:\project2026\skills-manage`          | 真实目录 | GitHub 仓库，67 个 Skills |
| `C:\Users\Administrator\.skillshub`     | 软链接  | 指向上面那个目录              |
| `C:\Users\Administrator\.qwen\skills`   | 软链接  | 指向中央仓储                |
| `C:\Users\Administrator\.claude\skills` | 软链接  | 指向中央仓储                |

**软链接就像快捷方式** —— 不占硬盘空间，指向同一个地方。


### 验证方法

```bash
dir /a C:\Users\Administrator\.qwen\skills
```

- `<SYMLINKD>` = 软链接 ✅
- `<DIR>` = 本地目录

### 常用命令

交互式启动 — 导入、链接、同步
```
skills-link
```

列出本地 skills（自动去重）
```
skills-link list
```

从 Master 目录删除 skills
```
skills-link remove
```

切换启用的应用
```
skills-link app
```

推送github
```
skills-link sync
```

文件监听
```
skills-link watch
```

检查符号链接状态
```
skills-link health
```

撤销所有操作，恢复初始状态
```
skills-link reset
```

全局卸载
```
npm uninstall skills-link --global
```

