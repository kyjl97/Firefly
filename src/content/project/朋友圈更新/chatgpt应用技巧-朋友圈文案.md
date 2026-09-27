# ChatGPT 应用技巧 · 朋友圈文案

> 来源：posts/AIHacks/chatgpt应用技巧.md
> 拆分日期：2026-08-03
> 共 18 条，每条独立，可直接复制发布

---

## 第 1 条｜Luna Max 才是日常主力

```
很多人还在用 GPT-5 Sol 消耗高额额度——其实完全没必要。

Luna Max 的表现已经接近 Sol Medium，但额度消耗低了整整一个数量级。

开启方法：
Settings → Configuration → Available reasoning efforts → 勾选 Max
然后选 GPT-5.6 Luna + Max reasoning，直接当默认模型用。

日常写代码、debug、PR 全用它，遇到深度架构决策再切 Sol。
额度省下来的，才是真省。
```

📎 来源：
https://x.com/ForwardEditor/status/2083162509692076153
- [ ] 待发布（对外）
- [x] 自己实践

---

## 第 2 条｜Luna Max 作为默认执行模型

```
用 AI 工具最怕额度烧光——这个问题其实有解法。

Luna Max 表现接近 Sol Medium，但消耗只有 Sol 的十分之一。
把它设成日常默认模型，遇到真正需要深度推理的任务再切换 Sol。

将下面这段话发给你的5.6 sol

https://github.com/DannyMac180/sol-advisor
帮我配置：Luna 5.6 Max 负责执行、Terra 处理常规任务，Sol 承担复杂任务；规划类工作固定启用 Sol High 模式

这不是将就，是把资源用在刀刃上。
```

📎 来源：
https://x.com/AYi_AInotes/status/2083867265179537565
📎 补充：
https://x.com/DeryaTR_/status/2084006620074311946
- [ ] 待发布
- [x] 自己实践

---

## 第 3 条｜让 AI 帮你"几乎免费"完成部署

```
部署这件事，其实可以几乎不花 Sol token。

在 agents.md 里加一句指令：

当我说‘deploy’时，完成测试、提交并推送此任务的更改。然后使用 gpt-5.6-luna 创建一个新的 Codex 项目任务，启用最大推理来审查并合并 PR，监控 exact-main CI 和自动部署，并验证生产环境。按照该任务完成并在此处报告结果。防止递归移交。

遇到需要批量执行的子任务，自己spawn独立的Luna Max对话线程去跑，跑完把结果汇总回来。

Sol 的宝贵额度，留给真正需要推理的地方。
这种分工思路，值得所有 Codex 用户学一遍。
```

📎 来源：
https://x.com/MatthewBerman/status/2084060433233907875
- [ ] 待发布
- [x] 自己实践

---

## 第 4 条｜一条命令，把 Luna 变成你的 Subagent

```
想让 AI 真正"帮你干活"，不是用一个模型，是让两个模型协作。

对 Sol 说：
在 ~/.codex/agents/luna-worker.toml 创建一个名为 luna_worker 的自定义代理。

使用以下设置：

model = "gpt-5.6-luna"
model_reasoning_effort = "max"

为其提供描述和用于界定委托工作的指令。保留我配置的其余部分。对其与我安装的 Codex 版本进行验证，向我显示差异，然后使用 luna_worker 处理子代理任务。

Sol 负责拆解和审查，Luna 负责落地实现。
这才是 Multi-Agent 的正确打开方式。
```

📎 来源：
https://x.com/Voxyz_ai/status/2083545774768402673
📎 补充：
https://x.com/RoundtableSpace/status/2084130890507329609
- [ ] 待发布
- [x] 自己实践

---

## 第 5 条｜开启 Multi-Agent v2，并发跑 10 个任务

```
你知道 Codex 可以同时跑 10 个并发任务吗？

在 config.toml 里开启 multi_agent_v2，
把 max_concurrent_threads 设为 10，
default_subagent_model 设为 gpt-5.6-luna。

12 个 Luna Max 并发，效果超过默认 4 个 Sol Ultra。
速度快了，额度还省了。
```

📎 来源：
https://x.com/pedronauck/status/2083594702620631231
📎 补充：
https://x.com/pvncher/status/2083947504614121542
- [ ] 待发布
- [x] 自己实践

---

## 第 6 条｜用独立 Thread 代替 Subagent，更省更灵活

```
Subagent 不是唯一的并行方案。

直接告诉 Sol：遇到批量子任务时，spawn 独立的 Luna Max 对话线程去跑，跑完汇总结果回来。

每个 thread 独立上下文，互不干扰，跑完各自交差。
比硬塞进一个 session 更清晰，也更省。
```

📎 来源：
https://x.com/The_Alex/status/2083253595290628146
- [ ] 待发布
- [x] 自己实践

---

## 第 7 条｜20 分钟自动清理一次，电脑永远不卡

```
用 AI 帮自己维护电脑，是很多人没想到的用法。

让 Codex 创建一个每 20 分钟运行一次的自动化：
清理僵尸进程、清除可再生缓存、做低风险性能优化——
但永远不打断正在进行的任务，不删用户数据。

创建自动化提示词：
创建一个自动化任务，每 20 分钟运行一次，以保持 Codex 顺畅运行。安全地停止陈旧或孤立的 headless 进程，在安全时清除一次性缓存，并审计其他低风险的性能改进。绝不中断活跃工作、关闭 Codex 或删除用户数据。立即运行它。

设置一次，之后什么都不用管。
AI 帮你养机器，你只管做事。
```

📎 来源：
https://x.com/ForwardEditor/status/2083936363657810177
📎 补充：
https://x.com/ForwardEditor/status/2083991888827191806
- [ ] 待发布
- [x] 自己实践

---

## 第 8 条｜Nightly 自动清理，每天凌晨 3 点悄悄跑

```
每天凌晨 3 点，让 Codex 自动清理一遍：
node_modules、cache 文件、旧 worktree——
只清理安全可再生的，绝不碰用户代码和凭据。

早上醒来，电脑干干净净。
这种自动化，设置一次就够了。
```

📎 来源：
https://x.com/BradGroux/status/2084081541676744740
- [ ] 待发布
- [x] 自己实践

---

## 第 9 条｜长任务跑偏了？别一直插嘴

```
很多人在 AI 跑长任务时会忍不住不断插话——这反而是最低效的做法。

正确姿势：
发现方向不对，直接打断。
写一份详细的 course correction prompt，用 side chat 帮你整理清楚再发出去。

一次说清楚，胜过十次催。
AI 需要的是清晰的目标，不是实时盯着它。
```

📎 来源：
https://x.com/pvncher/status/2083602795391782927
- [ ] 待发布
- [ ] 自己实践

---

## 第 10 条｜遇到困难任务，让 AI 去"管"另一个 AI

```
有时候任务太难，一个 thread 跑不出来。

试试这句话：
「write a goal for another thread to achieve this and babysit it until it figures it out」

让当前的 AI 派生一个新线程，并持续跟进直到搞定。
你只需要等结果。
```

📎 来源：
https://x.com/nickbaumann_/status/2077098302475227595
- [ ] 待发布
- [x] 自己实践

---

## 第 11 条｜AI 让你去点按钮？直接回它"自己去做"

```
遇到 AI 说"你去登录一下""你去点这个按钮"的情况——
直接回：just do it yourself

好的 AI 工具应该能自己处理，不该把操作甩回给你。
搞定之后，让它把这个能力固化成 skill，以后不用再说第二遍。
```

📎 来源：
https://x.com/AlexFinn/status/2075634231469101063
- [ ] 待发布
- [ ] 自己实践

---

## 第 12 条｜用语音描述任务，效果比打字强

```
你有没有发现，语音描述任务比打字更自然、更完整？

安装 微信输入输入法，并在语音输入设置中开启语音智能整理
启动语音输入，设置右Alt，按住说话不开启

用说话的方式把任务背景、上下文、预期结果一口气讲清楚。

AI 拿到的信息越完整，输出就越准。
嘴比手快，用起来。
```

📎 来源：
https://x.com/aidan_mclau/status/1971042682794598545
- [ ] 待发布
- [x] 自己实践

---

## 第 13 条｜用 /goal + Token Budget，任务更可控

```
跑长任务时，加一个 token budget 能让 AI 更专注。

使用 /goal 命令时，同时设定 token 预算上限。
AI 会在预算范围内更高效地规划步骤，而不是漫无边际地展开。

可控的任务，才是能交付的任务。
```

📎 来源：
https://x.com/simpsoka/status/2071975521051975706
- [ ] 待发布
- [ ] 自己实践

---

## 第 14 条｜用 Skill Backtest 让 AI 越用越聪明

```
AI 的 skill 不是一次性的，可以用历史 session 来反向优化。

告诉 Codex：
「read [skill 名称]，对比我过去相关 session，找出哪些步骤被跳过、哪里卡住了，先给我看 dry run，确认后再更新 skill。」

越用越顺手，不是靠感觉，是靠迭代。
```

📎 来源：
https://x.com/Voxyz_ai/status/2078175217839403150
- [ ] 待发布
- [ ] 自己实践

---

## 第 15 条｜一个 prompt 让 Codex 变身高级工程师

```
有一个通用的高价值 prompt，可以让 Codex 的输出质量大幅提升。

核心思路：让它在动手之前，先像资深工程师一样审题——
分析需求、列出假设、识别风险、再给方案。

先想清楚再动手，这是工程师和工具的本质区别。
```

📎 来源：
https://x.com/Voxyz_ai/status/2083950157884784774
- [ ] 待发布
- [ ] 自己实践

---

## 第 16 条｜任意 prompt 末尾加这句话，效果翻倍

```
一个超简单的技巧，但很多人不知道：

在任何 prompt 末尾加上：Use sub agents as needed

Codex 会自动判断哪些子任务可以并行，派出 subagent 分头执行。
一句话，让 AI 主动提效。
```

📎 来源：
https://x.com/pvncher/status/2068061924915331127
- [ ] 待发布
- [ ] 自己实践

---

## 第 17 条｜长会话防变慢，四招搞定

```
用 AI 跑长会话，越跑越慢？试试这四招：

1. 设置 process_narration=false，减少废话输出
2. 用 orchestrator + 并行 agent 分担上下文压力
3. 强制"想清楚再动手"原则
4. 保持代码库干净，无临时文件、无死代码

会话不卡，效率才真的高。
```

📎 来源：
https://x.com/cjzafir/status/2052801300627435996
- [ ] 待发布
- [ ] 自己实践

---

## 第 18 条｜想甩手不管？先把任务写成一份完整文档

```
把任务扔给 AI 然后走开，是可以的——但要先做好一件事：

写一份完整的 task doc，包含需求、上下文、最终愿景，然后发：
「accomplish this and test until done」

然后去干别的。
AI 自己跑完，你回来验收结果。
这才是"AI 打工"的正确姿态。
```

📎 来源：
https://x.com/DeRonin_/status/2051699072298328245
- [ ] 待发布
- [ ] 自己实践

---

*共 18 条，建议每天发 1-2 条，搭配截图或录屏效果更好。*