---
title: 跃星辰Token福利
published: 2026-08-01
tags:
- ai
- claude
- deepseek
- token
- api
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260731225750547.webp
---
阶跃星辰挺牛逼的，这个大家应该有所耳闻

现在免费送15天的Token 有需要的自取， 我看平台说 24点 结束这个活动了。
https://platform.stepfun.com/?invite_code=QPRXEYZH

要求好友的话再送15天，最多可以获取 90 天，加上你免费领取的 30 天，也就是说你最多可以免费白嫖使用 3 个月。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260731225750547.webp)


### 订阅后查看
订阅情况
https://platform.stepfun.com/plan-subscribe

接口文档
https://platform.stepfun.com/docs/zh/step-plan/integrations/reasoning-api

领取完后,查看你的 API Key 以及 Base URL，在 CC Switch开启路由，

下面我教你在把拿到的这个API keY配置到Claude 桌面版当中使用
![1322](https://gitee.com/da-qiang-classmate/typora/raw/master/image/503b17a8fdf886329b9832b0acd5651b.webp)

### 准备工作

- CC Switch
- Claude 桌面版



### CC Switch配置阶跃API

打开 CC Switch，然后在设置路由里面把 Cloud 路由开启，然后你会拿到一个路由地址。

我们在CC Switch界面添加阶跃星辰的 IPA 模型。
请求地址：https://api.stepfun.com/step_plan
模型：step-3.7-flash

### Claude 桌面版配置API

Help（帮助）→ Troubleshooting（故障排除）→ **Enable Developer Mode（启用开发者模式）**

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260731215959079.webp)
点完那一下，应用会自动重启。

**重启之后，你会发现顶部菜单多出了一个 Developer 选项**。这就是暗门已经被打开的标志。


最后一步，把 DeepSeek 的接口塞进去。

点顶部 **Developer → Configure third-party inference**。
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260731220155176.webp)

会弹出来一个配置面板，里面有几个字段要填。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260731222803258.webp)

Model ID填写
```
claude-opus-4
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260731222919724.webp)

最后Apply Changes（保存重启）

开始对话
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260731224808842.webp)

### 汉化与虚拟化

1. Claude桌面板是英文的界面，如何进行汉化？

汉化教程 https://github.com/javaht/claude-desktop-zh-cn

2. Claude Cowork “虚拟化不可用”
参考 https://www.reddit.com/r/ClaudeAI/comments/1ryk4km/solved_claude_cowork_virtualization_is_not/?tl=zh-hans


BIOS需开启
1. **VT-x**  # 开启VT
2. **SVM 模式**

**以上，既然看到这里了，如果对你有所帮助，还望不吝点赞与关注，这也是对我最大的鼓励与支持。**

感谢你拨冗阅读，山高水长，我们期待下篇文章与你再见。

个人主页：https://kyjl97.github.io/deepseek-imagegen/

个人作品集：https://kyjl97.github.io/oszen/

远程协助服务：https://github.com/kyjl97/