
### 现象
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/307cfbca28adb9f9f6909bca5a75edcb.webp)

正常逻辑：模型输出这套标签 → Codex 插件解析识别 → 执行 PowerShell 命令；

异常现状：**解析器没识别到指令，标签直接当成普通文本打印出来，命令不会执行**。
### 根因

1. 模型与 Codex 工具协议不匹配（最高概率）

DSML 是 DeepSeek V4-Flash 专属工具调用协议；如果你当前选择：V3 / V3.5 / 第三方蒸馏微调版，**原生不支持 DSML 格式调用**。或是使用中转 API 服务商，默认禁用原生 DSML 流式工具调用，强制转换成标准 OpenAI FunctionCall，模型依旧输出 DSML 标签，插件无法解析。

解决：
切换模型为 deepseek-v4-flash 官方直连测试；如果用中转 API，联系服务商确认是否开启原生 DSML 工具调用支持。


在系统 Prompt 强制约束

```
禁止输出 DSML 原生标记、`<｜DSML｜>`标签。所有本地文件读取操作，使用标准 JSON 格式工具调用，不要输出底层内部标记。
```

- 直连 DeepSeek：必须选用 v4-flash；
- 代理中转：确认服务商支持原生 DSML，不要强制 FunctionCall 兼容模式。
- 权限 设置 → 启用允许命令执行，将你的工作目录加入信任沙箱。
- 