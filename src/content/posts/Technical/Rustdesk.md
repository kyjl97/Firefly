---
title: 开发Rustdesk编译工具
published: 2026-03-23
tags:
  - 工作流
  - 技术教程
category: Technical
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260323223059574.webp
---

作为一名技术爱好者，偶然在闲鱼上刷到定制化的Rustdesk客户端，简洁的界面和实用的功能让我萌生了自研同款编译工具的想法。虽花费数百元向卖家请教却因对方忙碌无疾而终，但也坚定了我靠技术实现需求的决心——最终借助Codex从命令行版本起步，迭代出可视化网页面板的Rustdesk一键编译工具，现将整个开发过程与成果分享如下。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/image-20260323223059574.webp)

## 一、成品核心优势
相较于原生Rustdesk，定制编译后的工具在使用体验上做了针对性优化：
1. **无感连接**：控制端与客户端建立连接时无感知，无需繁琐确认步骤；
2. **免安装特性**：客户端和控制端均为绿色单文件，无需安装即可运行；
3. **隐私化展示**：控制端界面隐藏设备ID，仅客户端显示ID，兼顾使用便捷性与设备安全性。

## 二、开发环境准备
为保证编译流程的稳定性和兼容性，需提前配置以下开发环境：
- 脚本执行环境：PowerShell 7（推荐版本，兼容更多命令）；
- 主开发语言：Python 3.10+（适配第三方库及语法特性）；
- 底层编译依赖：Rust（通过rustup管理版本）、LLVM（clang编译器）；
- 依赖库管理：vcpkg（用于管理C/C++依赖库）；
- 代码拉取工具：Git（获取Rustdesk源码及依赖）。

## 三、项目结构梳理
整个编译工具的目录结构清晰划分，便于维护和扩展：
```
D:\project2026\rustdesk
├─ tools\one_click_pack.ps1                     # 命令行版一键出包脚本（核心逻辑）
├─ tools\pack_web_ui.py                         # 可视化网页面板核心代码
├─ tools\start_pack_web_ui.ps1                  # 网页面板一键启动脚本
├─ src\ui\index.tis / index.css / ab.tis        # Rustdesk UI定制化改动文件
├─ libs\portable\generate.py                    # 便携包生成逻辑
└─ target\release\rustdesk-portable-packer.exe  # 编译后生成的单文件打包器

C:\Users\Administrator\rustdesk-build-platform\storage\artifacts
├─ vfun-client-complete                         # 客户端打包素材（资源、配置模板等）
└─ vfun-controller-complete                     # 控制端打包素材
```

## 四、编译流程解析
整个编译过程实现全自动化，仅需输入核心参数即可生成定制化exe文件，流程如下：

```
输入客户参数
   ↓
one_click_pack.ps1 / 网页面板
   ↓
生成 customer.json（client/controller）
   ↓
同步 UI 文件到 artifacts
   ↓
generate.py 打包
   ↓
输出 2 个 exe（客户端 + 控制端）
```

1. **参数输入**：在命令行/网页面板中填写域名、公钥、品牌名称、访问密码等定制化参数；
2. **脚本触发**：执行`one_click_pack.ps1`命令行脚本或通过网页面板触发编译；
3. **配置生成**：自动生成`customer.json`配置文件（区分客户端/控制端参数）；
4. **资源同步**：将定制化UI文件同步到打包素材目录`artifacts`；
5. **打包编译**：调用`generate.py`执行便携包打包逻辑；
6. **成果输出**：最终生成2个独立exe文件（客户端+控制端）。

### 快速运行方式
只需执行以下PowerShell命令，即可启动可视化网页面板：
```powershell
& 'D:\project2026\rustdesk\tools\start_pack_web_ui.ps1'
```

## 五、编译成果展示
整个编译流程耗时约4分钟，最终输出按“品牌-类型-时间戳”命名的可执行文件，示例如下：
- 得救之道-控制端-20260323-102318.exe
- 得救之道-客户端-20260323-102318.exe

目前该工具仅支持Windows版本的Rustdesk控制端/客户端编译，若有定制编译需求，可访问 GitHub https://github.com/kyjl97交流。

## 六、写在最后
本次开发从闲鱼灵感出发，基于Python、PowerShell等技术栈实现了Rustdesk定制化编译工具，核心优化了连接体验、免安装和隐私展示三大特性；工具实现了从命令行到网页可视化面板的迭代，编译流程自动化，仅需输入核心参数即可快速生成定制化exe文件；项目结构清晰，依赖环境明确，编译耗时约4分钟，仅支持Windows版本的Rustdesk控制端/客户端编译。
