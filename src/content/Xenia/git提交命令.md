---
title: Bash上传代码到github命令
published: 2025-04-26
tags: []
category: Xenia
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260426215604902.webp
---

本教程详细介绍如何将本地项目通过Bash 终端上传代码到 GitHub

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260426215604902.webp)

## 准备工作

### 1. 安装 Git

一款免费、开源的「本地版本管理工具」，只负责一件事：**追踪你文件夹里所有文件的修改、保存版本、记录改动**。

```powershell
winget install Git.Git
```

集成右键上下文菜单参照→[bash右键.reg](https://jieliu.me/posts/software/terminal-/#%E9%99%84bash%E5%8F%B3%E9%94%AEreg)


**外观设置**：打开终端后，在标题栏右键选择“选项”→窗口，窗口建议调整至合适的大小，*界面语言*也可以在这里更改。。此外，默认字体可能较小，请选择合适的字体及大小。若觉得背景不舒适，可从内置主题中选择喜欢的背景。

推荐的主题
- dracula---推荐
- tender---棕色背景
- monokai-dimmed--灰色
- xterm、mintty---蓝色
- rosipov---黑色背景
- kohlrausch--米色

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260426222838103.webp)


### 2. 配置 Git 用户信息

```bash
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"
```

### 3. 生成 SSH 密钥（可选，推荐）

```bash
ssh-keygen -t ed25519 -C "你的邮箱"
```

然后将 `~/.ssh/id_ed25519.pub` 的内容添加到 GitHub → Settings → SSH Keys

### 4.Git 全局配置改成默认 main

```
git config --global init.defaultBranch main
```

### 5.检查是否配置成功
```
git config --list
```

---

## 上传步骤

### 方法一：命令行上传（推荐）

#### 1. 初始化 Git 仓库

进入项目目录，初始化仓库：

```bash
cd /path/to/your/project
git init
git init -b main  #初始化 main 分支
```

#### 2. 添加文件到暂存区

```bash
git add .
```

或者添加指定文件：

```bash
git add README.md
```

#### 3. 提交改动

```bash
git commit -m "first commit"
```

#### 4. 创建远程仓库并上传

一条命令 = 网页建仓 + 手动关联远程 + 首次推送。

也就是说，会全自动在GitHub 网页端创建一个空私有仓库，名字默认和当前文件夹同名，自动帮你把本地关联到远程 origin

```
gh repo create --source=. --private --push
```

自定义仓库名

```
gh repo create 你想要的仓库名 --source=. --private --push
```

#### 5. 查看你的仓库地址

```
git remote -v
```


### 方法二：命令行上传


#### 1. 初始化 Git 仓库

进入项目目录，初始化仓库：

```bash
cd /path/to/your/project
git init
```

#### 2. 添加文件到暂存区

```bash
git add .
```

或者添加指定文件：

```bash
git add README.md
```

#### 3. 提交改动

```bash
git commit -m "first commit"
```

#### 4. 在 GitHub建空仓库

访问 https://github.com/new 创建空仓库，**不要勾选** README Initialize this repository with:

获取仓库地址，格式如：
- HTTPS: `https://github.com/用户名/仓库名.git`
- SSH: `git@github.com:用户名/仓库名.git`

#### 5. 关联仓库

```bash
git remote add origin https://github.com/用户名/仓库名.git
```

#### 6. 推送到 GitHub

```bash
git push -u origin master
```

如果是 main 分支：

```bash
git push -u origin main
```

---

### 方法三：使用 gh CLI

#### 1. 安装 gh

```powershell
winget install GitHub.cli
```

#### 2. 登录 GitHub

```bash
gh auth login
```

按提示选择：
- GitHub.com → Yes
- HTTPS → Yes
- 登录方式 → GitHub CLI

#### 3. 创建仓库并推送

```bash
cd /path/to/project
gh repo create my-repo --public --source=. --push
```

或者分步操作：

```bash
gh repo create username/my-repo --public
git remote add origin https://github.com/username/my-repo.git
git push -u origin master
```

---

### 方法四：使用 GitHub Desktop

1. 下载 GitHub Desktop: https://desktop.github.com/
2. 登录 GitHub 账号
3. File → Add Local Repository
4. 选择项目文件夹，点击 "Publish repository"

---

## 常用命令速查
在你原有表格基础上**无缝扩充、格式统一、极简好记**，直接复制即用：

| 命令 | 说明 |
|------|------|
| `git status` | 查看仓库修改、暂存、文件状态 |
| `git add .` | 添加**全部**改动文件到暂存区 |
| `git add 文件名` | 添加指定单个文件到暂存区 |
| `git commit -m "信息"` | 本地提交改动，填写备注说明 |
| `git remote -v` | 查看已关联的远程仓库地址 |
| `git push` | 推送本地代码到远程默认分支 |
| `git push origin main` | 强制指定推送到远程 main 分支 |
| `git pull` | 拉取远程仓库最新代码并合并 |
| `git pull origin main` | 拉取远程 main 分支最新代码 |
| `git log` | 查看完整本地提交历史记录 |
| `git log --oneline` | 精简一行式查看提交历史 |
| `git branch` | 查看本地所有分支 |
| `git branch -m master main` | 将本地 master 分支重命名为 main |
| `git remote add origin 仓库地址` | 手动关联远程 GitHub 仓库 |
| `git fetch` | 仅拉取远程更新、不自动合并 |
| `git reset` | 撤销暂存区，保留本地文件修改 |
| `git init` | 初始化全新本地 Git 仓库 |


## 常见问题
---
### Q:一键推送的BAT脚本编写

拿Snaply项目示例：
新建文本文档，粘贴下面代码，后缀改成 `.bat` 放到 `Snaply` 文件夹里即可。

```
@echo off
chcp 65001
:: 进入项目根目录
cd /d "D:\project2026\github\Snaply"

:: 拉取远程最新（避免冲突）
git pull

:: 添加所有变更
git add .

:: 自动获取时间作为提交备注
set "commit_msg=auto update: %date% %time%"
git commit -m "%commit_msg%"

:: 推送到远程 main 分支
git push origin main

echo.
echo ======================
echo 推送完成！
echo ======================
pause
```

远程分支还是 `master`，只需要把最后一行改成：

```
git push origin master
```

**不需要 pull，纯快速推送**

```
@echo off
chcp 65001
cd /d "D:\project2026\github\Snaply"
git add .
git commit -m "auto commit"
git push
echo 推送完毕
pause
```

### Q:本地远程仓库变成普通文件夹

.git 也被标记为隐藏文件，可以执行`ls -a`查看
删删掉根目录下的隐藏 .git 文件夹

```
rd /s /q .git
```

### Q:本地 `IPS` 文件夹 → 初始化 → 建主分支 → 新建多个分支 → 全部推送到 GitHub，全程复制即用。

日常开发中，不要直接在主分支 main 上修改代码：开发新功能、修复漏洞、测试新方案、迭代版本时，都要新建独立分支隔离操作，避免改动影响稳定主线；仅轻微修改文档、注释或确定无误的简单配置时，可直接在主分支编辑，无需新建分支。

示例：本地IPS项目文件夹

```
# 1. 进入你的 IPS 项目根目录
cd /c/你的路径/IPS

# 2. 初始化git仓库
git init

# 3. 绑定全局用户信息(仅首次配置)
git config --global user.name "GitHub用户名"
git config --global user.email "GitHub绑定邮箱"

# 4. 暂存所有文件 + 首次提交
git add .
git commit -m "初始化：IPS项目基础文件"

# 5. 设置主分支为 main
git branch -M main

# 6. 关联远程GitHub仓库（替换成你自己的仓库地址）
git remote add origin https://github.com/xxx/xxx.git

# 7. 推送主分支 main
git push -u origin main

# ---------- 新建多个分支 开始 ----------
# 新建并切换到 dev 开发分支
git checkout -b dev
# 提交一次空记录（保证分支完整可推送）
git commit --allow-empty -m "初始化dev分支"
# 推送dev到远程
git push -u origin dev

# 新建并切换到 test 测试分支
git checkout -b test
git commit --allow-empty -m "初始化test分支"
git push -u origin test

# 新建并切换到 fix 修复分支
git checkout -b fix
git commit --allow-empty -m "初始化fix分支"
git push -u origin fix

# 切回主分支
git checkout main
```
### Q:当前的 master 分支改成 main

```
# 1. 把本地 master 重命名为 main
git branch -m master main

# 2. 让本地 main 分支关联远程 main（自动创建远程 main）
git push -u origin main

# 3. 删除远程的旧 master 分支（可选，干净一点）
git push origin --delete master
```
---

### Q: 提交后想撤销？

```bash
git reset --soft HEAD~1
```

### Q: 修改了远程仓库地址？

```bash
git remote set-url origin 新地址
```

### Q: 推送到另一个分支？

```bash
git push origin master:develop
```

### Q: 每次推送都要输入账号密码？

推荐使用 SSH 方式，或配置 Credential Helper：

```bash
git config --global credential.helper store
```
