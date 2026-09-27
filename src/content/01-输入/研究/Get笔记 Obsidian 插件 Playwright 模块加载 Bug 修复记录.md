

**日期**：2026-05-27
**插件**：get-to-obsidian (Get笔记 Importer) v3.7.1
**环境**：macOS Apple Silicon + Obsidian 1.12.7

---

## 一、问题现象

Get笔记 Obsidian 插件的 Playwright 自动登录功能报错：

```
Cannot find module 'playwright'
请确保开发目录下或系统全局已执行 'npm install playwright' 且正确下载了浏览器包。
```

手动 ZIP 导入功能正常，但点击"发送验证码"时始终失败。

---

## 二、根因分析

### 2.1 问题定位

查看插件 `main.js` 源码，定位到两个关键函数：

**`initModulePaths()`**（约 16637 行）和 **`getPlaywright()`**（约 16671 行）。

这两个函数负责在运行时动态加载 `playwright` 模块。逻辑是：

1. 先尝试标准 `require("playwright")`
2. 如果失败，fallback 到绝对路径加载
3. 绝对路径的候选列表中包含一个**硬编码的 Windows 路径**

### 2.2 真正的根因

```js
// main.js 第 16655 行 & 第 16683 行（原始代码）
const buildDevDir = typeof process !== "undefined" 
  ? "E:\\GitHub\\get-to-obsidian-main\\get-to-obsidian-enhance" 
  : null;
```

这个路径是**插件作者本机 Windows 开发目录**，在 macOS 上完全不存在。虽然代码也尝试了基于 `__dirname` 的 fallback（`__dirname/node_modules/playwright`），但因为：

- 插件目录下没有安装 playwright 的 `node_modules`
- Obsidian 的 Electron 环境可能对 `require` 有限制，`eval("require")` 获取的 `require` 函数在 fallback 时也无法正常加载

最终所有候选路径全部失败，抛出 "Cannot find module 'playwright'"。

### 2.3 为什么其他用户也遇到

这个 hardcoded 路径只对插件作者本人有效。任何其他用户（无论 Windows 还是 macOS）安装插件后，这个路径都不存在。GitHub Issue #1 中有 3 位用户报告了同样的问题。

---

## 三、修复步骤

### 步骤 1：在插件目录安装 playwright

```bash
cd "<vault>/.obsidian/plugins/get-importer-sync/"
npm init -y
npm install playwright@1.43.1
```

这创建了 `node_modules/playwright`，使得 `__dirname/node_modules/playwright` 路径生效。

浏览器二进制文件（Chromium）之前已通过 `npx playwright@1.43.1 install` 下载到 `~/Library/Caches/ms-playwright/chromium-1112/`。

### 步骤 2：全局安装 playwright（双重保险）

```bash
npm install -g playwright@1.43.1
```

全局安装到 `~/.npm-global/lib/node_modules/playwright`。

### 步骤 3：在 Vault 根目录创建 node_modules 软链接

```bash
ln -sf "<vault>/.obsidian/plugins/get-importer-sync/node_modules" "<vault>/node_modules"
```

这样 Node.js 模块解析沿目录树向上查找时也能找到。

### 步骤 4：修改 `initModulePaths()` 函数

**原始代码问题**：硬编码 Windows 路径，且没有全局 npm 路径。

**修改内容**：
- 移除 `buildDevDir2` 硬编码 Windows 路径逻辑
- 添加全局 npm 安装路径：`/Users/yuyue/.npm-global/lib/node_modules`

```js
// 修改后
const globalNodeModules = "/Users/yuyue/.npm-global/lib/node_modules";
if (!modulePaths.includes(globalNodeModules)) {
  modulePaths.push(globalNodeModules);
}
```

### 步骤 5：修改 `getPlaywright()` 函数

**原始代码问题**：
- 使用 `eval("require")` 获取 require 函数，可能在 Electron 沙箱中行为异常
- 硬编码 Windows 路径
- fallback 失败时静默，无调试信息

**修改内容**：
- 用直接 `require(绝对路径)` 替代 `eval("require")`
- 添加全局 npm 路径作为额外候选
- 每个候选路径加载失败时**输出详细日志**（之前是空 catch 块）

```js
// 修改后的核心逻辑
var candidates = [];
if (typeof __dirname !== "undefined") {
  candidates.push(path.join(__dirname, "node_modules", "playwright"));
  candidates.push(path.join(__dirname, "..", "node_modules", "playwright"));
  candidates.push(path.join(__dirname, "..", "..", "node_modules", "playwright"));
}
candidates.push("/Users/yuyue/.npm-global/lib/node_modules/playwright");

for (var i = 0; i < candidates.length; i++) {
  try {
    console.log("[ModuleLoader] Attempting fallback load from: " + candidates[i]);
    playwrightModule = require(candidates[i]);
    console.log("[ModuleLoader] Success! Loaded playwright from: " + candidates[i]);
    break;
  } catch (err2) {
    console.log("[ModuleLoader] Failed: " + candidates[i] + " - " + (err2.message || err2));
  }
}
```

---

## 四、当前状态

所有修改已应用到 vault 的插件文件。**需要重启 Obsidian 才能生效。**

如果重启后仍然失败，打开 Obsidian 开发者控制台（Cmd+Opt+I），查看 `[ModuleLoader]` 日志，可以看到每个候选路径的加载结果，精确定位失败原因。

---

## 五、经验总结

1. **永远不要在发布代码中硬编码本机路径**。这是一个典型的"在我机器上能跑"问题。应该使用 `__dirname`、环境变量或配置项来动态获取路径。

2. **catch 块不要吞掉错误**。原始代码中 fallback 循环的 catch 块完全为空，导致无法排查具体是哪个路径、什么原因导致的失败。添加日志是调试的第一步。

3. **了解运行环境的限制**。Obsidian 插件运行在 Electron 的沙箱化渲染进程中，`require` 的能力可能与标准 Node.js 不同。`eval("require")` 这类技巧在某些环境下可能失效。

4. **双重通道设计是好架构**。这个插件提供了 Playwright（浏览器自动化）和 OpenAPI（REST API）两种同步通道。当 Playwright 通道不可用时，用户可以降级到 OpenAPI 通道，不影响核心功能。
