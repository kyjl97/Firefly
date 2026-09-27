github.com/xqnode/codex-zh-CN
中文汉化

### wiget安装
1. `Win + X,选「终端(管理员)」`
2. 粘贴命令
从微软商店（`msstore` 源）安装名为 `Codex` 的应用，自动同意微软商店源的使用协议，跳过手动确认步骤。
```
winget install Codex -s msstore --accept-source-agreements
```

使用 Windows 包管理器 winget，从微软商店安装 ID 为 `9plm9xgg6vks` 的应用
```
winget install 9plm9xgg6vks
```

**从 winget 官方社区仓库安装名为 Codex 的软件，并自动同意该软件的许可协议，跳过手动确认**。
```
winget install Codex -s nsstore --accept-source-agreements --accept-package-agreements
```

升级
```
winget upgrade Codex -s nsstore --accept-source-agreements --accept-package-agreements
```

卸载
```
winget uninstall Codex
```



### 离线安装

自解压包 **版本**：26.616.32156·**发布于**2026年6月19日
```
夸克链接：https://pan.quark.cn/s/92fc543b503a

迅雷链接：https://pan.xunlei.com/s/VOvYr1UBI-0sWIUpsXILOj-gA1?pwd=gwq4 

两个链接下载任意一个都可以。下载后直接双击，傻瓜式安装，它会自动解压并打开软件并且放到你的桌面
```


```
https://apps.microsoft.com/detail/9plm9xgg6vks?hl=zh-CN&gl=CN
```

https://store.rg-adguard.net/

```
https://store.rg-adguard.net/
```

cd 下载文件目录

Win + X, PowerShell**管理员运行**
```
Add-AppxPackage .\
```

```
%USERPROFILE%\.codex
```


### 离线包下载
https://github.com/Wangnov/codex-app-mirror/releases/latest



### 微软商店打不开

重置缓存
```
 wsrese
```
检查网络环境


### 接国产模型 Api工具

三个工具
https://github.com/BenedictKing/ccx/releases/
https://github.com/farion1231/cc-switch/releases   可接入，但不支持安装插件。
https://github.com/BigPizzaV3/CodexPlusPlus/releases/

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260608163958962.webp)


### Codex配置国产模型后手机没法远程控制电脑？

电脑找不到移动端入口，手机点击链接也毫无反应。

先关闭CC Switch中的国产模型，退出Codex重新登录；

找到左侧Codex移动端，跟着指引完成手机远程连接；

连接成功后再启动国产模型即可。

