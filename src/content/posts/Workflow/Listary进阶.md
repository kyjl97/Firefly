---
title: Listary进阶
published: 2026-04-12
tags:
  - 工作流
  - 软件推荐
  - 技术教程
category: Workflow
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/PixPin_2026-04-13_21-38-23.webp
---

Listary是一款知名的效率工具，以用户友好，使用方式简单而备受好评。



单论文件搜索，Listary 和 Everything 属于同一梯队，在搜索速度和内存占用上秒杀任何其他软件。



任何文件，只要你知道他的名称（或者部分名称），就能迅速找到并打开。



**官方网站**：https://www.listary.netdownload

**官方说明文档**：https://help.listary.com/zh-Hans/search-file

**升级到Listary Pro优惠通道**：[点此购买](https://lizhi.shop/products/listary-pro?cid=wbm93g4b)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/PixPin_2026-04-13_21-38-23.webp)

## 热键

Listary的**灵魂功能**，全局快捷键是效率核心：

- 「双击 Ctrl」一键唤起搜索

- 「Ctrl+G」快速切换

> 在任何软件的「打开文件」「保存文件」对话框里，按下 Ctrl+G，就能直接呼出 Listary 的快速跳转面板，一键跳转到你最近访问过的文件夹、收藏夹目录、常用项目路径，彻底不用再一层层点目录树找位置。

## 文件搜索

Listary 最核心的功能，秒级搜索的核心配置

*过滤器：仅支持pro用户*

*索引“添加网络驱动器或本地文件夹”仅支持pro用户*

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260412214257275.webp)

## 动作

自定义文件 / 文件夹的快捷操作菜单

可以自定义添加动作或删除默认不需要的动作

## 命令

常用的内置命令

mkdir---创建文件夹


cmd---打开命令行窗口

psh---PowerShell
hosts---编辑 Hosts

这些你可以增删、修改关键词



**比如增加的：**

ip----查看IP配置

liantong---网络连通性测试

wifi---查看WiFi密码

chongqi---重启资源管理器

linshi---打开临时文件夹并清理

guanbi---一键关闭所有窗口

shangban---上班一键打开常用软件/文件

xiaban---下班一键关闭+睡眠（配置参考⬇️）

> 路径：powershell.exe
>
> 参数：-NoProfile -Command "Get-Process | Where-Object { $_.MainWindowTitle -ne '' -and $_.ProcessName -ne 'explorer' -and $_.Id -ne $PID } | Stop-Process -Force; rundll32.exe powrprof.dll,SetSuspendState 0,1,0"
>
> 静默启动：☑️



**我总共大概添加了覆盖个人高频的场景的所有命令，还有接下来说的一些脚本**

***PS.这些东西，确实花了时间的，我把我的配置打包成自解压文件，你拿到点击下就变成了你的设置***

***需要的可以找我，99米。我的号是kyjl97***



### **进阶玩法**示例：

- 批量搜索
- 一键打开多个常用的工具
- 一键关闭任务栏所有显示的任务
- 一键清理垃圾
- 一备份Listary设置.bat

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260413184612222.webp)

批量搜索.bat示例（ANSI格式）

```
@echo off
chcp 65001 > nul
:: 接收 Listary 传入的关键词
set "kw=%~1"
if "%kw%"=="" (
    echo 请输入搜索关键词！
    pause
    exit /b
)
:: 编码关键词（处理中文/特殊字符）
for /f "delims=" %%a in ('powershell -Command "[System.Web.HttpUtility]::UrlEncode('%kw%')"') do set "encoded_kw=%%a"
:: 各平台搜索链接（排序：谷歌 → 推特 → GitHub → 油管 → B站）
set "google=https://www.google.com/search?q=%encoded_kw%"
set "twitter=https://twitter.com/search?q=%encoded_kw%"
set "github=https://github.com/search?q=%encoded_kw%"
set "youtube=https://www.youtube.com/results?search_query=%encoded_kw%"
set "bilibili=https://search.bilibili.com/all?keyword=%encoded_kw%"
:: 按排序批量打开
start "" "%google%"
start "" "%twitter%"
start "" "%github%"
start "" "%youtube%"
start "" "%bilibili%"
```



## 网络搜索

左键双击-选项-网络搜索，可以增删添加搜索

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260413185036625.webp)

建议保留谷歌/百度/必应（g/b/ing/）这**3**个

再配置添加如下**18*个规则“”

| 项目   | URL                                                         | 搜索提示&Custom                                             |
| ------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| X-sou          | https://x-sou.com/search?q={query}&tab=tweets&sort=latest    | Google                                                       |
| Luxirty Search | https://s.ccino.org/search?q={query} | Bing |
| GitHub | https://github.com/search?q={query} | cmd /k gh {query} |
| 即刻 | https://web.okjike.com/search?q={query} | Baidu |
| 推特 | https://twitter.com/search?q={query} | http://suggestqueries.google.com/complete/search?client=witter&ds=yt&client=firefox&q={query} |
| 小红书 | https://www.xiaohongshu.com/search_result?keyword={query} | https://www.xiaohongshu.com/search_result?keyword={query} |
| 抖音 | https://www.douyin.com/search/{query} | cmd /k tt {query} |
| 油管   | http://youtube.com/results?q={query}                        | http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q={query} |
| B站    | https://search.bilibili.com/all?keyword={query}&order=click | https://search.bilibili.com/all?keyword={query}&tids=36      |
| csdn | https://so.csdn.net/so/search?q={query} | https://www.csdn.net/api/v1/search/suggestion?keyword={query} |
| 知乎 | https://www.zhihu.com/search?type=content&q={query} | Google |
| Kimi | https://kimi.moonshot.cn/_prefill_chat?send_immediately=true&prefill_prompt={query} | Baidu |
| 秘塔AI搜索 | https://metaso.cn/?q={query} | https://suggestqueries.google.com/complete/search?client=chrome&q={query} |
| Perplexity | https://www.perplexity.ai/search?q={query} | https://suggestqueries.google.com/complete/search?client=chrome&q={query} |
| Grok | https://grok.com/?q={query}https://www.zhihu.com/search?type=content&q={query} | GoogleGoogle |
| X Grok | https://x.com/i/grok?text={query}https://web.okjike.com/search?q={query} | Google |
| Greasy Fork | https://greasyfork.org/zh-CN/scripts?q={query} | Google |
| chrome商店 | https://chromewebstore.google.com/search/{query}?hl=zh-CN | Google |



## 菜单

自定义 Listary 的**左键菜单与快捷菜单**，深度整合文件管理器

- 在文件夹任意位置**左键双击**调快捷菜单，一键添加收藏
- 可手动删减左键菜单项
- 可手动添加以下类型的左键菜单项

> 文件夹
>
> 子菜单
>
> 分隔符
>
> 自定义命令（如果跟我一样懒惰，把设置的常用自定义命令添加到左键，不要不要添加太多）
>
> 命令
>

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260413183546110.webp)



## 设置项迁移新设备

你需要手动复制配置文件，配置文件位于
C:\Users\%username%\AppData\Roaming\Listary\UserProfile\Settings\Preferences.json

**具体步骤如下**：
1.新设备完全退出 Listary。
2.按 Win + R，输入下面路径后回车

```
%appdata%\Listary\UserProfile\Settings
```

将配置好的Preferences.json粘贴进去替换掉即可
3.重新打开 Listary。



**同类的产品还有**

-  [Everything](https://ftp.voidtools.com/zh-cn/downloads/)
-  [Flow Launcher](https://github.com/Flow-Launcher/Flow.Launcher)
- [燕子启动器](https://github.com/luoluoluo22/yanzi)



以上，后续我学到新的东西，会持续更新这篇文章！

*ps*.

***得救之道：[kyjl97.github.io](https://kyjl97.github.io/)***

***远程服务:[fix.kyjl97.github.io](https://github.com/kyjl97/)***
