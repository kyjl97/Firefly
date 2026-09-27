
### 开启功能
- Auto commit-and-sync only staged files 开启✅
- Auto commit-and-sync interval (minutes)
- Pull on startup 开启✅

```
注释：当我们停止编写文件1分钟以后，他就会尝试自动往GitHub上面同步一次
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260624011822166.webp)

```
每当你启动Obsidian的时间，插件会先去Github上面pull一下，看看有没有新的改动，保证我们的本地文件跟Github上面的同步
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260624011937656.webp)

### 链接远程仓库

1. 初始化本地仓库
```
git init
```

2.创建github仓库

```
https://github.com/new
```

3，让Claude code帮你配置
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

