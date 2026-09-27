---
title: Obsidian + Git 备份
published: 2026-05-24
tags: []
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-obsidian-git-backup-20260524-195651.webp
---
Obsidian 的核心价值在于「本地优先」——你的笔记数据完全归你所有。但「本地优先」也意味着你需要自己兜底数据安全：写了几百天的笔记，可能因为一次硬盘故障、误删、代码翻车甚至电脑丢失就全部消失。

而这套 Git 备份方案，用不到 15 分钟就能让你的知识库拥有：**定时自动备份 + 完整历史版本控制 + 免费远程存储**。电脑坏了就换新电脑，一条 `git clone` 就能完整恢复——不需要额外付费，不需要复杂操作，一次配置终身受用。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/cover-obsidian-git-backup-20260524-195651.webp)

### 一、前期准备：安装必备工具
### 1. 安装 Git 与 GitHub CLI
1.  前往 [Git 官网](https://git-scm.com/) 下载并安装 Git，安装时保持默认选项即可。
2.  前往 [GitHub CLI 官网](https://cli.github.com/) 下载并安装 GitHub CLI。
3.  安装完成后，打开终端验证是否安装成功：


### 2. 在 Obsidian 中安装核心插件
1.  打开 Obsidian → 设置 → 第三方插件，关闭「安全模式」。
2.  进入「社区插件市场」，安装以下两个插件：
      - **Obsidian Git**：核心备份插件，负责自动提交与推送。
      - **Terminal**：终端插件，可直接在 Obsidian 中执行 Git 命令。
3.  安装完成后启用插件，在 Terminal 插件设置中开启「整合式终端」。



### 二、初始化本地 Git 仓库
如果你的 Obsidian 本地仓库还不是一个 Git 仓库，需要先完成初始化：
1.  打开 Terminal 插件（Obsidian 左侧边栏或命令面板中启动）。
2.  在终端中输入以下命令，初始化本地仓库：

```
git init
```

### 三、创建 GitHub 远程仓库
1.  前往 GitHub 官网，新建一个 **private（私人）仓库**。
2.  注意：本地数据一定要选择不公开，这个仓库就是你 Obsidian 的远程备份空间。
3.  它的核心作用是：一旦本地发生错误，可以随时回退到历史版本。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260524200529686.webp)



### 四、连接本地仓库与 GitHub

直接使用下面这段提示词，发给 AI 帮你一键配置：

```
我已安装 Obsidian Git 插件，初始化了本地仓库，
并在 GitHub 创建了 private 仓库。

我的 GitHub 仓库地址是：xxx（你的仓库地址）

请帮我完成以下配置：
1. 添加远程仓库地址
2. 配置 Git 用户信息（名字：Your Name，邮箱：your@email.com）
3. 创建第一次提交：git add . && git commit -m "Initial commit"
4. 推送到 GitHub：git push -u origin main
5. 验证连接是否成功
```



### 五、配置 Obsidian Git 自动备份
连接成功后，在 Obsidian 的「设置 → Git 插件」中：

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260524200937180.webp)
-   自动提交和同步间隔（分钟）设置为 1-10 分钟（或你觉得合适的时间）。
-   停件编辑后自动提交和同步开启✅

示例图解释：**当我们停止编写文件1分钟以后，git插件就会尝试自动往GitHub上面同步一次**

所以，日常使用无需手动操作，每隔几分钟插件就会自动提交并推送到 GitHub。你的知识库会拥有一个**实时备份 + 完整历史版本控制**的安全兜底。


另外，✅开启Pull on startup

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260524201534262.webp)

意思是：每当你启动Obsidian的时间，插件会先去Github上面pull一下，看看有没有新的改动，保证我们的本地文件跟Github上面的同步

### 六、进阶优化与排错建议

 **GitHub CLI 认证（可选推荐）**：
安装 GitHub CLI 后，在终端运行以下命令完成认证，避免推送时反复输入账号密码：
```
gh auth login
```
按提示选择 HTTPS 方式登录，绑定你的 GitHub 账号即可。

 **遇到问题直接交给 Ai**：
如果配置过程中出现报错，直接把报错信息或这段完整文档发给 AI，让它帮你根据 Git 版本控制内容进行针对性配置与修复。

---

到这里，你的 Obsidian 知识库就已经拥有了全自动的 Git 备份能力。整个过程的核心思路其实很简单：本地 Git 记录每一次改动，GitHub 做远程备份，Obsidian Git 插件让它变成全自动。

从此之后，你只管写笔记，备份这件事不用再操心。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/a40746dd7c4aef1a757eedac61ca79e9.webp)

- [一键把 Get 笔记同步到 Obsidian](https://mp.weixin.qq.com/s/2eqmgz77JXHaYgL6-TWBdA)
- [Obsidian同步Notion最佳实践](https://mp.weixin.qq.com/s/24oTrC1tttUs18Qv7cRwRQ)
- [Obsidian附件图片管理插件](https://mp.weixin.qq.com/s/lgdJ7DYSqRIS1b13QQnk3A)
- [Obsidian插件LinkStowr最佳实践](https://mp.weixin.qq.com/s/45pUXcmcifTzTcdrlrTWHQ)
- [Dataview与Templater插件联动](https://mp.weixin.qq.com/s/LvxZCJG99fzyYbgmDJ73fA)
- [Obsidian日记半自动化](https://mp.weixin.qq.com/s/kPjIpHmzciWY8_3ettEVsg)
- [Obsidian的插件Claudian报错](https://mp.weixin.qq.com/s/pdbv5g8wGVga9z4n52homw)
- [Karpathy 的 LLM Wiki最佳实践](https://mp.weixin.qq.com/s/9qTRLHvoNQKUF2Ac2iVRvA)
- [Obsidian推送微信插件配置CF Worker代理方案](https://mp.weixin.qq.com/s/4SEsM-AWoEhPXiD49oNB9g)
- [19 个 Obsidian 神仙插件](https://mp.weixin.qq.com/s/8kCbGmeXvB7cuJZGHaCdkw)

以上，既然看到这里了，如果觉得不错，随手**点个赞、在看、转发**三连吧，如果想第一时间收到推送，也可以给我个星标⭐️～

谢谢你看我的文章，我们，下次再见。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/未命名的设计.webp)

*\>/ 作者：得救之道*
*\>/ 更多干货，请访问：[kyjl97.github.io](https://kyjl97.github.io/)*