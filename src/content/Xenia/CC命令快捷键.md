---
title: Claude code命令&快捷键
published: 2026-04-02
tags:
  - Claudecode
category: Xenia
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/PixPin_2026-04-02_23-31-00.webp
---

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/PixPin_2026-04-02_23-31-00.webp)



## 终端启动命令（Windows）
- claude --dangerously-skip-permissions 跳过权限校验启动
- claude -v  查询版本信息
- claude update 更新软件
- claude mcp servers list 查看MCP服务器
- npm list -g --depth=0  检查 npm 全局包来源
- claude tools list 查看全部工具
- claude -c 恢复最近会话

## 常用命令
- /tools 查看可用工具
- /skills 查看可用技能
- /context 查看上下文占用
- /diff 查看代码修改对比
- /compact 压缩上下文节省Token
- /clear 清空对话历史
- /btw 无上下文干扰插问
- /init 生成项目规范文件
- /model 切换指定模型
- /loop---定时重复执行任务
- /model opusplan 智能切换模型，节省Pro额度
- /remote-control---手机远程操控会话（/rc简写）
- /plugin 插件管理
- /doctor 环境检测诊断
- /branch 创建分支会话
- /memory 管理持久记忆
- /rewind 回退对话代码
- /export 导出对话为Markdown
- /insights 生成使用报告
- /simplify 三维度并行代码审查

## 快捷键

- Ctrl+C 中断生成
- Ctrl+L 清屏
- Ctrl+J换行
- Ctrl+R搜历史
- Alt+Enter 换行不提交
- Ctrl+U 删除整行输入
- Ctrl+A 光标至行首
- Ctrl+E 光标至行尾
- Ctrl+G 打开长文本编辑器
- Alt+P 快速切换模型
- Ctrl+D 退出会话
- 双击Esc 对话回退

## 补充：Terminal使用

Terminal中启动Claude code注意：
1. ALt+V粘贴截图
2. 开启无闪烁模式后，右键自动粘贴会用不了 直接禁用即可

> NO_FLICKER 模式（无闪烁模式）开启方法：[点此查看](https://github.com/kyjl97)

3. 拖动文件是形成不了文件目录

> 如果你装机使用了管理员用户，你启动Terminal一直是管理员权限，所以，拖动文件是形成不了文件目录，目前木有解决办法，只有创建一个电脑新用户，也就是标准用户。

4. 自动将所选内容复制到剪贴板

设置-交互,然后开启这个选项即可

## 补充：自动记忆整理

Claude Code Auto Dream 操作步骤
1. 执行命令：claude -v 校验版本，建议更新至最新版
2. 输入/memory 查看是否拥有Auto Dream灰度权限
3. 开启Auto-dream为on状态，激活自动记忆整理
5. 依托CLAUDE.md自动记录与优化项目记忆
6. 配合/compact 压缩上下文，减轻整理负载
7. 切勿手动修改系统自动生成的记忆文件

## 补充：孵化宠物

- /buddy   \# 首次执行有孵化动画，生成专属AI宠物（名字/性格/物种）
- /buddy feed   # 喂食

> C:\Users\你的Windows用户名\.claude.json
>
> 找到 / 新增 `companion` 字段
>
> - name：宠物名字
> - species：物种
> - personality：性格描述
> - rarity：稀有度
> - stats：5 项属性
