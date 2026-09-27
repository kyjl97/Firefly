---
title: dataview脚本
published: 2026-04-12
tags:
  - Obsidian插件
category: Workflow
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260412210757952.webp
---

很多 Obsidian 深度用户在积累了上千篇笔记后，都会面临一个共同的痛点：**存入容易，提取困难。** 知识库逐渐变成了一个只进不出的“数据黑洞”。



如果你还在使用基础的文件夹和标签管理笔记，那你就错过了 Obsidian 最强大的黑魔法。



今天，我们将结合 Obsidian 生态中的两大超神插件——**Dataview**（数据查询引擎）和 **Templater**（动态模板引擎），为你展示 6 个开箱即用的高级自动化脚本。



这 6 个案例将把你的 Obsidian 从“静态的纯文本仓库”彻底升级为**带有弹窗交互、自动化整理和数据可视化分析的私人应用程序**。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260412210757952.webp)

## 🛠️ 食用指南
在开始之前，请确保你已经安装并启用了 `Dataview` 和 `Templater` 插件，并完成以下核心设置：
1. **Dataview 设置**：必须开启 **Enable JavaScript Queries**（启用 JavaScript 查询）。
2. **Templater 设置**：建议绑定一个快捷键（如 `Alt+E`）用于一键呼出模板列表。
注意快捷键的设置，不然“全局搜索器”**不会弹出输入框**

| 模板: 插入模板                              | `Alt+E` | ❌   |
| ------------------------------------- | ------- | --- |
| Templater: Open insert template modal | `Alt+E` | 对   |

将下方的代码分别复制并保存到你的“模板文件夹”中。使用时，在任意笔记中通过 Templater 插入该模板，即可触发极具交互感的弹窗查询！

## 案例 1：全局搜索器

Obsidian 自带搜索虽好用，但没法把结果固定在笔记里形成动态看板。输入关键词就能扫描整个知识库，精准提取包含关键词的内容，自动汇总成表格。



原生搜索做不到的 “结果留存” 它能实现，还能给不同核心项目建专属 “搜索看板笔记”。

````dataviewjs
```dataviewjs
// 1. 设置你要搜索的关键词（测试成功后可换回 Templater 标签）
const prompt = "chrome";
// const prompt = "<% tp.system.prompt('Query for') %>";

const files = app.vault.getMarkdownFiles();
const results = [];

// 2. DataviewJS 支持直接 await，使用 for...of 循环最稳定
for (const file of files) {
    // 排除当前文件自身（测试成功后可换回 Templater 标签）
    const isCurrentFile = file.basename === "未命名";
    // const isCurrentFile = file.basename === "<% tp.file.title %>";

    if (isCurrentFile) continue;

    // 读取文件内容
    const content = await app.vault.cachedRead(file);

    // 使用正则匹配包含 prompt 的行
    const lines = content.split("\n").filter(line => line.match(new RegExp(prompt, "i")));

    // 如果有匹配结果，存入数组
    if (lines.length > 0) {
        const fileLink = `[[${file.basename}]]`;
        results.push([fileLink, lines.join("\n")]);
    }
}

// 3. 渲染标题和表格
dv.header(1, prompt);
if (results.length > 0) {
    dv.table(["File", "Lines"], results);
} else {
    dv.paragraph("没有找到匹配的结果。");
}
```
````
## 案例 2：待办聚合器

待办事项散落在日记、项目笔记、会议记录里，根本记不清自己到底留了多少没完成的任务。



一键汇总全库所有未打勾的 [ ] 任务，还支持关键词过滤。更方便的是，在生成的表格里直接打勾，原笔记的任务状态会自动同步更新！



借助 DataviewJS 的双向绑定属性，完美契合 GTD（搞定一切）的做事理念。

````dataviewjs
```dataviewjs
// 1. 弹窗输入任务关键词 (留空直接回车则显示所有未完成任务)
const keyword = "<% tp.system.prompt('搜索未完成任务的关键词 (留空则显示所有):') %>";

// 2. 获取整个库中所有未完成的任务
let tasks = dv.pages().file.tasks.where(t => !t.completed);

// 3. 如果输入了关键词，则进行过滤
if (keyword) {
    tasks = tasks.where(t => t.text.includes(keyword));
}

// 4. 渲染任务列表
dv.header(2, keyword ? `🎯 包含 "${keyword}" 的未完成任务` : "🎯 所有未完成任务");

if (tasks.length > 0) {
    // 使用 Dataview 原生的任务列表渲染，勾选后会自动同步到原文件！
    dv.taskList(tasks, false);
} else {
    dv.paragraph("🎉 太棒了！没有找到符合条件的未完成任务。");
}
```
````

## 案例 3：近期动态板
写周报、隔几天打开软件时，完全想不起来最近一周在 Obsidian 里写了什么。输入天数，就能按时间倒序排列最近修改过的所有笔记，自己的数字足迹一眼看清。



结合 luxon 时间库，能精准复盘个人知识产出节奏，是写复盘报告的神器。。

````dataviewjs
```dataviewjs
// 1. 弹窗询问天数，默认值为 7
const daysInput = "<% tp.system.prompt('查看最近几天修改过的笔记？(输入数字)', '7') %>";
const days = parseInt(daysInput);

if (isNaN(days)) {
    dv.paragraph("⚠️ 请输入有效的数字！");
} else {
    // 2. 计算目标时间线
    const pastDate = luxon.DateTime.now().minus({ days: days });

    // 3. 筛选并按修改时间倒序排列
    const recentPages = dv.pages()
        .where(p => p.file.mtime >= pastDate)
        .sort(p => p.file.mtime, 'desc');

    // 4. 渲染表格
    dv.header(2, `📅 最近 ${days} 天修改的笔记`);

    if (recentPages.length > 0) {
        dv.table(
            ["📝 笔记名称", "🕒 修改时间", "📁 所在文件夹"],
            recentPages.map(p => [
                p.file.link,
                p.file.mtime.toFormat("yyyy-MM-dd HH:mm"),
                p.file.folder || "根目录"
            ])
        );
    } else {
        dv.paragraph("这段时间内没有修改过任何笔记。");
    }
}
```
````

## 案例 4：低质扫描器

随手建的笔记、只写了标题的占位符、没意义的空文件，就像知识库里的 “电子垃圾”，影响图谱整洁。



自动扫描全库，找出所有真实字符数低于你设定阈值的笔记，让你批量处理或补充内容。用 trim() 过滤无意义空格和换行，比系统自带的文件大小排序精准得多，强迫症必备。

````dataviewjs
```dataviewjs
// 1. 弹窗询问字数阈值，默认 50 个字符
const minLengthInput = "<% tp.system.prompt('查找字符数少于多少的笔记？', '50') %>";
const minLength = parseInt(minLengthInput);

const files = app.vault.getMarkdownFiles();
const results = [];
const currentTitle = "<% tp.file.title %>";

// 2. 遍历检查文件内容长度
for (const file of files) {
    if (file.basename === currentTitle) continue;

    const content = await app.vault.cachedRead(file);
    // 剔除空白字符后计算真实长度
    const realLength = content.trim().length;

    if (realLength < minLength) {
        results.push([`[[${file.basename}]]`, realLength]);
    }
}

// 3. 渲染结果，按字数从少到多排序
dv.header(2, `🗑️ 字数少于 ${minLength} 的笔记 (共 ${results.length} 篇)`);

if (results.length > 0) {
    results.sort((a, b) => a[1] - b[1]);
    dv.table(["📝 笔记名称", "📊 实际字符数"], results);
} else {
    dv.paragraph("你的库很干净，没有找到超短笔记！");
}
```
````

## 案例 5：灵感随机机

写文章、做策划时没头绪，大脑陷入思维定势，想不出新点子。



像抽盲盒一样，从知识库中绝对随机抽取指定数量的笔记，让毫不相干的知识点强制碰撞，激发跨界灵感。



真正践行卢曼卡片盒笔记法 “发现意外连接” 的核心，让死知识 “活” 起来

````dataviewjs
```dataviewjs
// 1. 弹窗询问抽取几条随机笔记 (默认抽 3 条)
const countInput = "<% tp.system.prompt('想要碰撞几个随机灵感？(输入数字)', '3') %>";
const count = parseInt(countInput);

if (isNaN(count) || count <= 0) {
    dv.paragraph("⚠️ 请输入大于 0 的有效数字！");
} else {
    // 2. 获取所有笔记
    const allPages = dv.pages().array();

    // 3. 排除当前笔记（避免抽到这个模板本身）
    const currentTitle = "<% tp.file.title %>";
    const validPages = allPages.filter(p => p.file.name !== currentTitle);

    // 4. 洗牌算法 (Fisher-Yates) 实现真正的随机抽卡
    for (let i = validPages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [validPages[i], validPages[j]] = [validPages[j], validPages[i]];
    }

    // 5. 截取前 count 个笔记
    const randomNotes = validPages.slice(0, count);

    // 6. 渲染结果
    dv.header(2, `🎲 你的 ${count} 个随机灵感`);
    dv.list(randomNotes.map(p => p.file.link));
    dv.paragraph("> *试着找出这些笔记之间的隐藏联系，写一段话把它们串起来吧！*");
}
```
````

## 案例 6：孤岛探测仪

Obsidian 的灵魂是双向链接，但经常只记录不整理的话，很多笔记会变成既没连出去、也没被别人连进来的 “孤儿”。



直接读取底层连接图谱数据，一键筛查所有孤岛笔记，还能排除模板、日记等特定文件夹。



从宏观视角给知识库 “体检”，促使我们从单纯的知识 “收集者” 变成 “编织者”，最大化知识的复利效应。

````dataviewjs
```dataviewjs
// 1. 弹窗确认是否扫描（可以用来做简单的交互确认）
const confirm = "<% tp.system.prompt('输入 Y 开始扫描全局孤岛笔记：', 'Y') %>";

if (confirm.toUpperCase() === 'Y') {
    // 2. 筛选条件：既没有出链 (outlinks)，也没有入链 (inlinks)
    const orphans = dv.pages()
        .where(p => p.file.outlinks.length === 0 && p.file.inlinks.length === 0);

    // 3. 排除特定文件夹（例如排除模板、日记等本就不需要强链接的文件夹）
    // 你可以根据自己的习惯修改这里的路径，例如 !p.file.path.includes("Templates")
    const filteredOrphans = orphans.where(p => !p.file.path.includes("模板"));

    // 4. 渲染结果
    dv.header(2, `🏝️ 发现 ${filteredOrphans.length} 篇孤岛笔记`);

    if (filteredOrphans.length > 0) {
        dv.table(["笔记名称", "创建时间"],
            filteredOrphans.map(p => [
                p.file.link,
                p.file.ctime.toFormat("yyyy-MM-dd")
            ])
        );
        dv.paragraph("💡 **建议**：点进去看看，尝试给它们加上标签，或者用 `[[ ]]` 链接到某个相关的主题笔记中。");
    } else {
        dv.paragraph("🌟 你的知识网非常紧密，没有任何孤岛！");
    }
}
```
````

Obsidian 从来不仅是一个编辑器，它是一个你可以用代码自由定义的 **IDE（集成知识环境）**。



Templater 负责赋予笔记交互的灵魂，DataviewJS 负责榨干数据的价值。



快把这些代码搬进你的知识库，去体会那种让数据为你服务、呼之即来的爽快感吧！



*ps*.

***得救之道：[kyjl97.github.io](https://kyjl97.github.io/)***

***远程服务:[fix.kyjl97.github.io](https://github.com/kyjl97/)***































