---
title: 我的博客工作流bat
published: 2026-04-14
tags:
  - 工作流
  - 博客
category: Workflow
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260414140439305.webp
---

优化了下我的博客发布工作流bat脚本

这是一个典型的[DevOps 流程](https://www.doubao.com/thread/wad1cb0794ccb7f0c)在博客环境中的应用

## 工作流程

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260414140439305.webp)

## 脚本源码

```
@echo off
chcp 936 >nul
cd /d "%~dp0"
title 博客工作菜单

:menu
cls
echo.
echo ====================================================
echo                   得救之道博客「kyjl97.github.io」工作流菜单
echo ====================================================
echo.
echo  [1] 生成 YAML 文章模板
echo  [2] 启动本地构建预览 (localhost:4321)
echo  [3] Git 提交并推送代码
echo  [4] 退出程序
echo.
echo ====================================================
choice /c 1234 /n /m "请选择操作 [1-4]："

if errorlevel 4 goto exit
if errorlevel 3 goto gitpush
if errorlevel 2 goto preview
if errorlevel 1 goto template
goto menu

REM 1. 生成 YAML 文章模板
:template
cls
echo.
echo ==============================================
echo          正在生成 YAML 模板...
echo ==============================================
echo.
node scripts/add-frontmatter.cjs
echo.
echo ==============================================
echo      模板生成完成！请在 Typora 中编辑
echo ==============================================
echo.
pause
goto menu

REM 2. 启动本地构建预览
:preview
cls
echo.
echo ==============================================
echo         正在启动本地预览服务
echo ==============================================
echo.
echo  预览地址：http://localhost:4321
echo  停止预览：按 Ctrl + C
echo.
start http://localhost:4321
npm run dev
echo.
pause
goto menu

REM 3. Git 提交并推送代码 (已升级)
:gitpush
cls
echo.
echo ==============================================
echo           Git 提交与推送
echo ==============================================
echo.
echo [1/4] 正在检查文件变更...
echo.
git status --short
echo.
if errorlevel 1 (
    echo ⚠️  警告：未检测到 Git 仓库或无文件变更
    echo.
    pause
    goto menu
)

echo [2/4] 准备提交信息...
echo.
REM 获取当前时间并格式化 (兼容 Windows 默认格式)
for /f "tokens=1-6 delims=/-: " %%a in ("%date% %time%") do (
    set "year=%%c"
    set "month=%%a"
    set "day=%%b"
    set "hour=%%d"
    set "minute=%%e"
)
REM 补零处理 (防止个位数时间显示异常)
if %hour% lss 10 set "hour=0%hour%"
set "default_msg=更新博客内容 %year%-%month%-%day% %hour%:%minute%"

set "commit_msg="
set /p "commit_msg=请输入提交备注 (直接回车使用默认: %default_msg%)："

if not defined commit_msg (
    set "commit_msg=%default_msg%"
)

echo.
echo [3/4] 正在提交："%commit_msg%"
echo.
git add .
git commit -m "%commit_msg%"

echo.
echo [4/4] 正在推送到远程仓库...
echo.
git push

echo.
echo ==============================================
echo           ✅ Git 提交推送完成！
echo ==============================================
echo.
pause
goto menu

REM 4. 退出程序
:exit
echo.
echo 再见！
echo.
timeout /t 1 /nobreak >nul
exit
```

## 效果预览

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260414141123032.webp)

## 快速调出

Listary-命令添加脚本

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260414141249639.webp)

很多人可能没注意到：在桌面或任意文件夹里，想通过 Listary 搜索、打开文件时，不用先双击 Ctrl，直接敲键盘输入关键词就行，能省下不少操作时间。



写完文章，直接敲键盘输入gt，然后回车
