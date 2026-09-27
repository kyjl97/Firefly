---
title: push泄露API
published: 2026-04-21
tags:
  - 经验复盘
  - 博客
category: Technical
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260421233006929.webp
---
今天在推送 `fuwari` 博客仓库到 GitHub 时，遭遇了一个意料之外但又在情理之中的拦截。GitHub 直接拒绝了我的推送，提示发现了「Secret（密钥）」泄露。经过排查和修复，两个仓库的 API Token 泄露风险已解除。写下这篇文章，既是复盘，也是给有类似经历的朋友一个参考。
![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260421233006929.webp)


## 事件回顾

像往常一样，我在 Obsidian 中写完一篇博客后，执行 `git push` 准备推送到 GitHub。然而这次推送失败了，错误信息如下：

```
remote: error: GH013: Repository rule violations found for refs/heads/main.
remote:
remote: - Push cannot contain secrets
remote:
remote:  — Notion API Token ——————————————————————————————————
remote:    locations:
remote:      - commit: 25f1c5df1c410ba48f6890a8961371de5cf6cef8
remote:        path: src/content/.obsidian/plugins/share-to-notionnext/data.json:29
```

GitHub 的 **Push Protection（推送保护）** 功能检测到了我的 Notion API Token 泄露。问题出在 Obsidian 插件 `Share to NotionNext` 的配置文件 `data.json` 中，我配置了 Notion 的 API 密钥，而这个文件被 Git 跟踪并推送到了远程仓库。

有趣的是，同步排查另一个仓库 `zhishiku` 时，我发现它虽然也安装了同样的插件、同样包含 API Token，却没有被拦截。这可能是因为 Token 格式（`ntn_` 开头）的识别率不同，或者该仓库的 Push Protection 设置没有 fuwari 那么严格。但不管怎样，这确实是一个安全隐患。

## 问题根因

**为什么 API Token 会泄露到 GitHub？**

核心原因是：**Obsidian 的 `.obsidian` 目录被 Git 跟踪了。**

`.obsidian` 是 Obsidian 的配置目录，里面包含了插件配置、主题设置、工作区状态等信息。当我们安装像 `Share to NotionNext` 这类需要 API 密钥的插件时，插件会把配置（包括 Token）保存在 `data.json` 文件中。如果这个目录被 Git 跟踪，每次推送都会把这些敏感信息一起送到远程仓库。

GitHub 提供了 Secret Scanning（密钥扫描）功能，会自动扫描推送的内容，识别常见的密钥格式（如 AWS Key、Notion Token、OpenAI API Key 等），发现后会拦截推送并通知开发者。这就是为什么 fuwari 仓库被拦截的原因。

## 解决方案

### 方案一：修改 .gitignore（推荐）

最简单有效的方案是把 `.obsidian/` 目录加入 `.gitignore`，让 Git 忽略这个目录。具体步骤如下：

1. 在项目根目录的 `.gitignore` 文件中添加：
   ```
   .obsidian/
   ```

2. 从 Git 跟踪中移除已存在的 `.obsidian` 目录：
   ```bash
   git rm --cached -r .obsidian/
   ```

3. 提交并推送：
   ```bash
   git add .gitignore
   git commit -m "chore: ignore .obsidian directory"
   git push
   ```

这样操作后，`.obsidian` 目录会保留在本地，但不会被 Git 跟踪，API Token 也就不会再泄露了。

### 方案二：清理 Git 历史

如果已经推送了包含 Token 的提交，需要从 Git 历史中彻底删除它。可以使用 `git filter-repo` 工具：

```bash
# 安装工具
pip install git-filter-repo

# 从历史中移除指定文件
git filter-repo --path .obsidian/plugins/share-to-notionnext/data.json --invert-paths --force

# 重新添加 remote 并推送
git remote add origin your-repo-url
git push --force
```

注意：这种方法会重写 Git 历史，如果与其他开发者共享仓库，需要协调好。

### 方案三：轮换 API Token

无论采用哪种方案，都建议**重新生成 API Token**。即使已经修复了泄露问题，旧的 Token 可能已经在某个时刻被恶意获取。前往相关服务的设置页面（如 Notion 集成设置）生成新的密钥，并更新本地配置。

## 经验总结

这次事件虽然是个「事故」，但也带来了几点有价值的思考：

**第一，敏感配置一定要排除在 Git 跟踪之外。** 不只是 `.obsidian`，任何包含 API Key、Token、密码的文件都应该加入 `.gitignore`。常见的包括 `.env`、`.env.local`、`config/secrets.json` 等。

**第二，GitHub 的 Push Protection 是最后一道防线，而非第一道。** 这次能被拦截是幸运的，说明 GitHub 的密钥扫描确实在起作用。但并非所有格式的密钥都能被识别，这次 `zhishiku` 仓库的 Token 就漏过了扫描。所以不能依赖 GitHub 的保护，自己做好防范才是根本。

**第三，本地配置不影响使用。** 很多人担心忽略 `.obsidian` 后会影响 Obsidian 的功能。实际上 `.gitignore` 只是阻止 Git 跟踪，不影响文件的本地存在和使用。插件配置会正常读取本地文件，只是不会同步到远程仓库。

**第四，定期排查仓库安全。** 建议定期检查自己的仓库是否有敏感信息泄露，可以用 GitHub 的「Secret scanning alerts」功能查看已泄露的密钥（如果有的话）。

## 附：两个仓库的修复记录

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260422222241120.webp)

修复完成后，两个仓库都安全了，以后再也不用担心 API Token 泄露的问题。

文章来源：[kyjl97.github.io](https://kyjl97.github.io/)  远程技术支持：[fix.kyjl97.github.io](https://github.com/kyjl97/)