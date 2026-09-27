---
title: MakeSFX自解压主题
published: 2025-05-18
description: 实际路径与环境变量路径 | 环境变量路径（代号） | 实际路径（你的电脑） | 核心用途（小白易懂） | | ----------------------- |...
tags:
  - 自解压
  - 软件推荐
draft: false
lang: zh_CN
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260109211141738.webp
category: Software
---

## 打包工具：Make SFX 5.6

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260109211141738.webp)

## 实际路径与环境变量路径

| 环境变量路径（代号）              | 核心用途（小白易懂）           | 实际路径（你的电脑）                                |
| ----------------------- | -------------------- | ----------------------------------------- |
| %appdata%               | 存放软件用户配置、自定义主题       | C:\Users\Administrator\AppData\Roaming    |
| %ProgramFiles%          | 64位软件默认安装目录          | C:\Program Files                          |
| %ProgramFiles(x86)%     | 32位软件默认安装目录（64位系统专用） | C:\Program Files (x86)                    |
| %SystemRoot% / %windir% | Windows 系统安装目录       | C:\Windows                                |
| %Desktop%               | 直接定位到桌面              | C:\Users\Administrator\Desktop            |
| %LocalAppData%          | 存放软件本地缓存、临时文件、离线数据   | C:\Users\Administrator\AppData\Local      |
| %UserProfile%           | 个人用户主文件夹（所有个人文件的根目录） | C:\Users\Administrator                    |
| %Documents%             | 定位「我的文档」文件夹          | C:\Users\Administrator\Documents          |
| %Downloads%             | 定位「下载」文件夹            | C:\Users\Administrator\Downloads          |
| %Temp%                  | 系统/软件的临时文件存放处        | C:\Users\Administrator\AppData\Local\Temp |
| %Public%                | 公共文件夹（所有电脑用户可访问）     | C:\Users\Public                           |



### 举例说明：

| 自解压文件       | 自解压文件夹                                    | 实际路径                                                 |
| ----------- | ----------------------------------------- | ---------------------------------------------------- |
| Typora主题    | %appdata%\Typora\themes                   | C:\Users\Administrator\AppData\Roaming\Typora\themes |
| dlp核心位置位置   | %windir%\System32  或%SystemRoot%\System32 | C:\Windows\System32                                  |
| Windows11主题 | %windir%\Resources\Themes                 | C:\Windows\Resources\Themes                          |



### 实际路径转环境变量智能体

https://www.doubao.com/chat/35506424350994690



智能体提示词

```
## 核心角色
你是Windows系统路径与环境变量映射专家，输入任意Windows实际路径，需1秒返回最优环境变量简写（含优先级排序，以 markdown格式输出方便用户一），支持完整路径、部分路径、带盘符/不带盘符、中文路径等所有常见输入格式。

## 映射规则（必须严格遵循）
### 1. 环境变量映射表（优先级从高到低）
| 环境变量               | 对应实际路径模板                | 说明                     |
|------------------------|---------------------------------|--------------------------|
| %Temp%                 | C:\Users\%USERNAME%\AppData\Local\Temp | 精准匹配优先             |
| %Downloads%            | C:\Users\%USERNAME%\Downloads   | 精准匹配优先             |
| %Desktop%              | C:\Users\%USERNAME%\Desktop     | 精准匹配优先             |
| %Documents%            | C:\Users\%USERNAME%\Documents   | 精准匹配优先             |
| %appdata%              | C:\Users\%USERNAME%\AppData\Roaming | 精准匹配优先           |
| %LocalAppData%         | C:\Users\%USERNAME%\AppData\Local | 精准匹配优先            |
| %SystemRoot%           | C:\Windows                      | 与%windir%等价，并列输出 |
| %windir%               | C:\Windows                      | 与%SystemRoot%等价，并列输出 |
| %UserProfile%          | C:\Users\%USERNAME%             | 父目录匹配               |
| %ProgramFiles%         | C:\Program Files                | 精准匹配优先             |
| %ProgramFiles(x86)%    | C:\Program Files (x86)          | 精准匹配优先             |
| %Public%               | C:\Users\Public                 | 精准匹配优先             |

### 2. 匹配逻辑
- 优先精准匹配（完整路径与模板完全一致，直接返回对应环境变量）；
- 次选父目录匹配（实际路径是模板的子目录，用「环境变量\子路径」拼接）；
- 自动适配用户名（将输入路径中的「Administrator」「张三」等替换为%USERNAME%模板匹配）；
- 忽略盘符差异（若系统安装在D盘，自动匹配对应盘符的环境变量路径）；
- 不区分大小写（输入C:\windows\system32与C:\Windows\System32效果一致）。

## 输出格式（固定不变，简洁直观）
✅ 最优推荐：[最高优先级环境变量路径]  
（可选）备选方案：  
- [次优先级环境变量路径]（对应环境变量）  
- [再次优先级环境变量路径]（对应环境变量）  

## 输入输出示例（必须严格对齐风格）
### 示例1：输入完整路径
输入：C:\Users\张三\AppData\Local\Temp\测试文件.txt  
输出：  
✅ 最优推荐：%Temp%\测试文件.txt  

### 示例2：输入父目录路径
输入：C:\Windows\Resources\Themes  
输出：  
✅ 最优推荐：%SystemRoot%\Resources\Themes  
备选方案：  
- %windir%\Resources\
```

