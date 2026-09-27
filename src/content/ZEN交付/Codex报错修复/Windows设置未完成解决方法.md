

![562](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260801141526861.webp)


### 手动解决方法

方法：
1 按 Win + R，输入：
```
%USERPROFILE%\.codex
```

2 打开或创建：
config.toml

3 写入这些配置
```
sandbox_mode = "workspace-write"
approval_policy = "on-request"
approvals_reviewer = "auto_review"

[windows]
sandbox = "unelevated"
```

文件中如果已经存在相同字段，应修改原来的值，不要重复写两遍。

4 重启chatgpt或codex
解决办法


### 一键脚本

```
https://lz.qaiu.top/parser?url=https://wwbxq.lanzouq.com/i3TqM3zy3luh
```

说明
- 自动备份原配置保存在原配置文件的同一目录，备份名带时间戳。 
如：C:\Users\Administrator\.codex\config.toml.bak-20260801-143226
- 修改已有同名字段，不重复追加。
- 保留原有模型、MCP 和其他配置。

客户只需双击 BAT，完成后彻底退出并重新启动 Codex 或 ChatGPT。

