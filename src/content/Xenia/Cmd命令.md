---
title: Dos常用命令
published: 2024-05-18T10:30:00.000Z
tags:
  - DOS命令
category: Xenia
draft: false
pinned: false
image:
---



## <b style="color: red;">常用cmd/PowerShell命令</b>

### ✅PowerShell命令
| **说明**        | **命令**                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------- |
| 激活 Windows 系统 | irm https://get.activated.win \| iex（输入 3，稍后输入 1）                                                  |
| 激活 Office     | irm https://get.activated.win \| iex（输入 2，稍后输入 1）                                                  |
| 激活 IDM（需代理）   | iex(irm is.gd/idm_reset)（输入 1，稍后输入 9）                                                              |
| 开启电源卓越性能      | powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61                                     |
| win11恢复完整右键   | reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve |

### ✅CMD常用命令
| **说明**       | **命令**               |
| ------------ | -------------------- |
| 打开环境变量       | sysdm.cpl            |
| 重启进入 BIOS    | shutdown /r /fw /t 0 |
| 更改电脑用户名      | netplwiz             |
| 重启资源管理器      | explorer.exe         |
| 打开自启动文件夹     | shell:startup        |
| 打开注册表        | regedit              |
| 打开系统配置       | msconfig             |
| 查询 IP 地址     | ipconfig             |
| 打开网络适配器      | ncpa.cpl             |
| 清理 DNS 缓存    | ipconfig /flushdns   |
| 查询外网 IPv4 地址 | curl 4.ipw.cn        |
| 查看路由表        | route print          |
| 高级系统设置       | sysdm.cpl            |
| 卸载程序         | appwiz.cpl           |

### ✅控制面板命令
| **说明**               | **命令**                |
|------------------------|------------------------|
| 打开控制面板           | control              |
| 打开网络设置           | ncpa.cpl             |
| 打开注册表             | regedit              |
| 打开系统属性           | sysdm.cpl            |
| 打开设备管理器         | devmgmt.msc          |
| 打开用户管理           | netplwiz             |
| 打开系统配置           | msconfig             |
| 打开服务管理           | services.msc         |

### ✅系统工具&诊断
| **说明**        | **命令**                                    |
| ------------- | ----------------------------------------- |
| 查看事件日志        | eventvwr.msc                            |
| 查看 Windows 版本 | winver                                  |
| 查看系统信息        | msinfo32                                |
| 查看电脑配置        | dxdiag                                  |
| 查看已安装软件       | shell:AppsFolder                        |
| 磁盘检查          | dir /s                                  |
| 打开屏幕键盘        | osk                                     |
| 运行恶意软件删除工具    | mrt                                     |
| 系统垃圾清理        | cleanmgr /sagerun:1                     |
| 查询电脑序列号       | wmic bios get serialnumber              |
| 注册 DLL 文件     | regsvr32 dbghelp.dll                    |
| 强制关闭任务管理器     | taskkill /f /im taskmgr.exe             |
| 打开防火墙         | firewall.cpl                            |
| 扫描并修复系统文件     | sfc /scannow                            |
| 修复损坏的系统镜像     | DISM /Online /Cleanup-Image /ScanHealth |

### ✅无线网络密码查询
| **说明**               | **命令**                                |
|------------------------|----------------------------------------|
| 列出保存的 WiFi 网络   | netsh wlan show profiles             |
| 查看指定 WiFi 密码     | netsh wlan show profile name="WiFi名称" key=clear |


[快捷键备忘录](https://hotkeycheatsheet.com/zh) 


隐藏启动信息，目标加
```
-NoLogo
```

字体：MS Gothic

背景色RGB
(0, 55, 60)

![image.png](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260426201826440.webp)
