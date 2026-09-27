### 现象

```
stream disconnected before completion: Transport error: network error: error decoding response body
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260822144701380.webp)

### 背景
是Windows系统。
通过opencodex配置的路由网关。

### 根因分析

`Codex → 本机 OpenCodex 代理 → 上游服务`

初步推断OpenCodex 代理在“流式模型请求”阶段是否断流

Codex分析完这里补充结果。

### 解决办法
