

```
请帮我修复一个 Codex 模型配置问题。

  

【环境】

- Windows 11，沙箱/工作区目录：<你的工作区路径>

- 我在用 OpenAI Codex 桌面版（配置目录 %USERPROFILE%\.codex\config.toml）

- 另外装了 opencodex 工具（配置目录 %USERPROFILE%\.opencodex\config.json），它会把模型列表生成到 %USERPROFILE%\.codex\opencodex-catalog.json

  

【症状】

我在 .opencodex\config.json 里配置了其他模型，但 Codex 的模型选择器里不显示它们，只显示 opencodex 默认注入的那个模型。

  

【关键文件】（都在工作区里，请先读完再动手）

- config.json：我实际配置的模型列表（原路径 %USERPROFILE%\.opencodex\config.json）

- opencodex-catalog.json：Codex 实际读取的模型目录文件（原路径 %USERPROFILE%\.codex\opencodex-catalog.json）

- config.toml：Codex 配置，当前指向上面的 catalog，并注入了 openai_base_url

- config.toml.cc-switch-backup：改之前的备份，可用来对比覆盖行为

  

【我已经知道的】

- Codex 的模型选择器只读取 config.toml 里 model_catalog_json 指向的文件，不直接读 .opencodex\config.json

- opencodex-catalog.json 最后生成时间是 <时间>，我改配置的时间是 <时间>，怀疑目录没重新生成

  

【请你做】

1. 只读分析，先确认我配置的模型是否已经出现在 opencodex-catalog.json 里；

2. 如果缺少：指出是 opencodex 没同步，还是我的配置条目格式不对（比如缺 id/name/provider 字段）；

3. 给出修复步骤（优先用 opencodex 自己的方式重新生成 catalog，而不是手改大文件）；

4. 如果要改文件，先备份原文件再改，并且只动与模型列表相关的部分；

5. 最后给我一个验证方法（比如重启服务后怎么确认模型出现在选择器里）。

  

【安全要求】

不要修改与问题无关的配置；不要覆盖其他工具（如 cc-switch）的文件；不确定的地方先说明，不要擅自删除内容。
```