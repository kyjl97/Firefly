---
title: 18条codex实战清单
published: 2026-08-04
tags:
  - ai
  - codex
  - agent
  - workflow
  - token
  - api
  - gpt
category: AIHacks
draft: false
pinned: false
image:
---
## Luna Max 核心技巧
### 设置 Luna Max 才是日常主力

1. 进入设置：`Settings` → `Configuration` → `Available reasoning efforts` → 勾选 `Max`。
2. 选择模型：选择 `GPT-5.6 Luna + Max reasoning`，直接设为默认模型。


```
https://github.com/DannyMac180/sol-advisor
帮我配置：Luna 5.6 Max 负责执行、Terra 处理常规任务，Sol 承担复杂任务；规划类工作固定启用 Sol High 模式


# Advisor — orchestrator prompt

You are the orchestrator. You do not write production code. You decompose,
delegate, gate, and integrate. Every line of shipped code comes from an
implementer subagent and passes a reviewer subagent that never saw the
implementation reasoning.

## Roles
| Role | Who | Job |
| Orchestrator | you | Read repo, split task, route, gate, integrate |
| Implementer-fast | cheap/fast model | Routine: known pattern, bounded diff |
| Implementer-deep | strongest model | Complex: unclear shape, cross-cutting, perf/concurrency/security |
| Reviewer | fresh instance, no prior context | Adversarial review of diff alone |

## Step 1 — Understand before splitting
- Read every file the change touches. Trace flow end to end.
- Grep every caller of any function you plan to modify.
- State root cause in one sentence. Symptom is not root cause.
If you cannot state root cause, you are not ready to delegate.

## Step 2 — Route
Fast when ALL: ≤2 files; pattern already in codebase (name the file);
no concurrency/auth/money/migrations/public-API change; acceptance check
writable in one line first.
Deep when ANY: 3+ files or shape unclear; concurrency/ordering/retries;
trust boundary (input, auth, secrets, payments); schema or hard-to-reverse;
two prior attempts already failed review.
Ambiguous → deep.

## Step 3 — Delegation contract
GOAL / FILES / PATTERN (path:line to imitate) / CONSTRAINTS / DONE WHEN.
Third paragraph means unit too big — split it.

## Step 4 — Review gate
Reviewer gets diff + GOAL + CONSTRAINTS. Not your plan, not implementer
reasoning. Fresh eyes or review is theater.
Blocker → same implementer, reviewer lines verbatim, no paraphrase.
Second blocker same unit → escalate to deep. risk → you decide, state it.

## Step 5 — Integrate
Run DONE WHEN yourself. Report what shipped, what failed, what skipped.
```

在新任务中后面可以直接说

```
使用 advisor-orchestration 完成这个任务
```

### 在 agents.md 添加以下内容 部署成本降低到0

```
当我说‘deploy’时，完成测试、提交并推送此任务的更改。然后使用 gpt-5.6-luna 创建一个新的 Codex 项目任务，启用最大推理来审查并合并 PR，监控 exact-main CI 和自动部署，并验证生产环境。按照该任务完成并在此处报告结果。防止递归移交。

遇到需要批量执行的子任务，自己spawn独立的Luna Max对话线程去跑，跑完把结果汇总回来。
```

### 把 Luna 变成你的 Subagent

```
在 ~/.codex/agents/luna-worker.toml 创建一个名为 luna_worker 的自定义代理。

使用以下设置：

model = "gpt-5.6-luna"
model_reasoning_effort = "max"

为其提供描述和用于界定委托工作的指令。保留我配置的其余部分。对其与我安装的 Codex 版本进行验证，向我显示差异，然后使用 luna_worker 处理子代理任务。
```

## 自动化与系统维护

### 设立自动化任务清理电脑永远不卡

```
创建一个自动化任务，每 20 分钟运行一次，以保持 Codex 顺畅运行。安全地停止陈旧或孤立的 headless 进程，在安全时清除一次性缓存，并审计其他低风险的性能改进。绝不中断活跃工作、关闭 Codex 或删除用户数据。立即运行它。
```

### 每天凌晨 3 点定时自动清理

```
你正在运行 Codex 桌面循环自动化“Nightly Cleanup”。目标是在本机保守回收磁盘空间，不删除用户工作，并输出一份简洁的清理报告和持久化的本地运行台账。

先遵守这些安全边界：

- 不得打印或写入秘密、令牌、环境变量值、私信、文件内容或其他敏感数据；只报告路径、大小、数量、时间戳、分支名和状态摘要。

- 不得删除已跟踪或未跟踪的工作、主 Git 仓库工作树、凭据、项目说明、锁文件、Codex sessions/memories/automations、Docker volumes、虚拟机数据、模型存储、Downloads 或项目源代码。

- 磁盘占用大小、Git ignore 状态或文件年龄单独都不能证明可以删除。

- 所有权、活动状态、仓库状态或用途不清楚时，必须保留并列入“Needs review”。

- 不得执行广泛递归删除，不得使用 force 参数；任何不安全或含糊的情况都 fail closed。

- 每次实际清理前，都要重新检查活动进程、打开句柄、所有权和仓库状态。

工作流程：

1. 先测量系统盘和用户数据盘的剩余空间；再测量主要用户缓存、包管理器、项目、Downloads、容器和 Codex 存储面的占用。测量结果只是清单，不是删除授权。

2. 保守清理 Git worktree：在用户常用项目根目录下发现 Git 仓库，排除缓存、依赖、虚拟环境、构建输出和系统目录；按解析后的 Git common directory 去重；永不删除主 worktree。只有当辅助 worktree 已解锁、干净、不活跃、没有打开句柄，并且已合并、上游已删除，或明确是临时 worktree 且超过 14 天时，才允许移除。状态检查必须有时间上限，超时就列入“Needs review”。处理每个仓库后运行 git worktree prune。

3. 清理项目生成物：只考虑 Git-ignored 且可再生成的目录，例如不活跃的 node_modules、虚拟环境、测试缓存、coverage、临时输出和 build 目录。删除前必须确认当前用户所有、没有嵌套仓库、没有打开句柄、没有被当前 PATH 或环境引用，并满足年龄门槛；每次删除前后都核对仓库状态。

4. 使用工具原生的缓存清理命令，禁止直接删除缓存存储：可用时使用 npm cache verify；可用时使用 brew cleanup -s；仅当 uv 不活跃时使用 uv cache prune。对于 pnpm，发现当前 pnpm 二进制和已安装的托管 pnpm 二进制，解析各自 store 路径并按规范化路径去重；单独枚举标准用户级 pnpm store 的各代目录，确保孤儿 store 也被报告。只允许处理标准用户级 store 根目录下的规范化、带版本号目录。每个 store prune 前重新检查 pnpm 进程和 store 句柄；按版本匹配执行一次 pnpm store prune，并显式传入已验证的 --store-dir；不得使用 --force，也不得直接删除 pnpm store 目录。分别报告 pruned、skipped、failed 和 orphaned stores。推文中的 pnmp 是拼写错误，实际命令统一使用 pnpm。

5. 保守审计容器：只收集容器、镜像、构建缓存和卷的元数据；只允许移除未被引用的镜像、停止超过 14 天的容器和过期构建缓存。不得 prune volumes、停止正在运行的容器或删除容器虚拟机数据。如果容器运行时开始时已停止，除非有界审计确实需要，否则不得改变其状态；如改变，结束后恢复原状态。

6. 报告并写入持久化的本地运行台账：包括时间戳、范围、检查的仓库和 worktree、保留/移除的 worktree、项目产物结果、各类缓存结果、pnpm stores 的 pruned/skipped/failed/orphaned 分类、各类别回收空间、容器结果、最终剩余空间、活动进程导致的跳过项、受保护存储和 Needs review 项。台账只写元数据，不写秘密或文件内容；清理流程成功退出后，最终台账才视为权威。

首次配置或辅助脚本不存在时，创建或更新可复用的本地 helper script，验证其 shell 语法，确认自动化仍保持每天本地时间 03:00 活跃，并验证 pnpm store discovery。不要为了测试自动化而触发完整的破坏性清理；配置阶段只做脚本/语法/发现能力验证。若已有名为“Nightly Cleanup”的自动化，更新它而不是创建重复任务。每次运行结束后只输出简洁的中文摘要和本地台账路径；如果任何判断不安全或含糊，停止相应操作并明确报告原因。
```

## Multi-Agent / Subagent 配置

### 开启 Multi-Agent v2 并提高并发


   ```
   在 `~/.codex/config.toml` 添加：

   [features]
   multi_agent = true
   multi_agent_v2 = true

   [agents]
   enabled = true
   max_concurrent_threads_per_session = 10
   default_subagent_model = "gpt-5.6-luna"
   default_subagent_reasoning_effort = "max"

   为其提供描述和用于界定委托工作的指令。保留我配置的其余部分。对其与我安装的 Codex 版本进行验证，向我显示差异，然后使用 luna_worker 处理子代理任务。
   ```



### 让codex启动“独立审核线程”

```
请为执另一个线程写一个目标，让它完成这项任务。你负责持续监督和检查，必要时给它反馈，直到它真正弄明白并通过验证。

```

```
这是一个难度较高的任务。请先制定计划并完成开发。完成后，启动一个独立线程作为严格审查者。
审查线程不要直接修改代码，而是从需求完整性、逻辑正确性、边界情况、代码质量、测试覆盖和实际运行结果六个方面进行验证。
不要只通过阅读代码判断任务已经完成，必须尽可能运行测试、执行程序，并核对真实结果。将发现的问题整理成修复清单交回主线程。
主线程修复后，再由审查线程重新验证。持续循环，直到审查线程确认目标已经完整实现，并给出测试结果、运行记录或其他验证依据。
```

## 长任务与 Prompt 技巧
### 用语音描述任务，效果比打字强

安装 微信输入输入法，并在语音输入设置中开启语音智能整理
启动语音输入，设置右Alt，按住说话不开启

用说话的方式把任务背景、上下文、预期结果一口气讲清楚。

让你输出的效果高出打字时 3 倍以上

### 让codex启动“独立审核线程”

```
请为执另一个线程写一个目标，让它完成这项任务。你负责持续监督和检查，必要时给它反馈，直到它真正弄明白并通过验证。
```

### Just do it yourself

当 Codex 让你登录/下载/点按钮时，直接回复 “just do it yourself”。完成后让它转成 skill。

```
自动动手做
```


### 使用 /goal 时加上 token budget（可让 Codex 自己开启 flag）。



## Skill 与长期优化

续迭代优化 Skill

```
read [skill name, workflow file, or folder path] and run a backtest against my past sessions related to it.

prefer sessions from the same project and same task type. first list the samples you plan to use and why you picked them. if you can't access enough sessions, say so directly instead of guessing.

compare what the skill assumes vs how i actually work. focus on:

- steps i often skip, rewrite, or run more than once
- work i still do manually that the skill never covers
- the order i actually do things in
- spots that keep causing rework, getting stuck, or needing extra clarification

separate stable patterns from one-off exceptions. never rewrite a rule over a single anomaly.

output a dry run first, nothing else:

- keep / modify / add / remove
- session evidence for each item
- proposed diff and reasoning

do not modify any files until i confirm.

after i confirm, update the skill, run existing checks, and summarize before / after. if there's no existing way to verify, say so.

finally, based on how fast new sessions accumulate, suggest a weekly or biweekly review. show me the schedule, scope, and trigger conditions first, then create the recurring task after i confirm.

every scheduled review outputs a dry run only. no auto-modifying the skill without confirmation.
```

### 在输入具体需求前要求 Agent完整的审题与风险评估

核心思路：让它在动手之前，先像资深工程师一样审题——
分析需求、列出假设、识别风险、再给方案。

```
𝗕𝗲𝗳𝗼𝗿𝗲 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁𝗶𝗻𝗴

Work like a contractor who pays for rework. Catch wrong assumptions early, and don't make me answer questions the repository already answers.

𝟭. 𝗜𝗻𝘃𝗲𝘀𝘁𝗶𝗴𝗮𝘁𝗲 𝗯𝗲𝗳𝗼𝗿𝗲 𝗮𝘀𝗸𝗶𝗻𝗴

Read the relevant code, tests, configs, dependency manifests, and documentation first. Search the repository and use the available tools before asking me anything. If the answer is discoverable in under a minute, investigate it yourself.

Do not ask about the test framework, language version, lint rules, error-handling conventions, directory layout, or existing abstractions when the repository already answers them. If the codebase contradicts itself, or a missing answer would change the design, raise it.

A question you could have answered by searching the repo is billed as rework.

𝟮. 𝗣𝗿𝗼𝗱𝘂𝗰𝗲 𝘁𝗵𝗶𝘀, 𝘁𝗵𝗲𝗻 𝘀𝘁𝗼𝗽

𝗚𝗼𝗮𝗹
Restate the task in one paragraph in your own words, including the acceptance criteria. If the restatement is wrong, this is the cheapest place to catch it.

𝗕𝗹𝗼𝗰𝗸𝗶𝗻𝗴 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻𝘀 (𝟬-𝟯)
Ask only when a wrong answer would force us to throw work away, not merely adjust it. Include your recommended default with every question so I can reply "use all defaults." If nothing truly blocks the work, write "none."

𝗔𝘀𝘀𝘂𝗺𝗽𝘁𝗶𝗼𝗻𝘀
Max five. Every assumption must be load-bearing: if being wrong wouldn't change the design, delete it. List only specific, falsifiable assumptions, covering only the areas this task touches:

- Data: shape, volume, trust level, encoding, and malformed inputs
- Failure: timeout, partial write, or downstream error; retry, fail loudly, or degrade
- Boundaries: callers, public vs. internal APIs, and backwards compatibility
- State: concurrency, idempotency, transactions, and ordering guarantees
- Environment: runtime version, deployment target, and allowed external access
- Scope: what you will not do and what remains TODO
- Testing: what you will test and what will remain uncovered

𝗣𝗹𝗮𝗻
List the files you will create or modify, the key function or type signatures, and the order of work. Where real alternatives exist, name the rejected option and explain why in one clause.

Then stop. Do not implement.

𝟯. 𝗠𝗮𝘁𝗰𝗵 𝘁𝗵𝗲 𝗽𝗿𝗼𝗰𝗲𝘀𝘀 𝘁𝗼 𝘁𝗵𝗲 𝗿𝗶𝘀𝗸

For a typo, rename, or an obvious change under ~20 lines with one clear solution, skip the rest of this process and just do it.

For a new module, schema change, auth, money, migrations, or deletion, use the full process.

For everything in between, one rule: if you can't say what makes a change safe, treat it as risky.

𝟰. 𝗔𝗳𝘁𝗲𝗿 𝗮𝗽𝗽𝗿𝗼𝘃𝗮𝗹

Implement the plan as approved. If an assumption fails during implementation, or the plan no longer fits the code, stop and tell me. Do not switch designs without telling me or continue with an approach you now believe is wrong.

𝟱. 𝗣𝗿𝗼𝘃𝗲 𝗶𝘁 𝘄𝗼𝗿𝗸𝗲𝗱

Run the tests you promised in Assumptions and paste the output. List every file you touched, with one line of why for each.

Change only what the plan names. A drive-by refactor is work I didn't order. Code without evidence is a claim, not a deliverable.
```

###  任意 Prompt 末尾加这句话，效果翻倍

在任何 prompt 末尾加上：Use sub agents as needed
Codex 会自动判断哪些子任务可以并行，派出 subagent 分头执行。
一句话，让 AI 主动提效。

```Plain
Use sub agents as needed
```

###  任意 Prompt 末尾加这句话，效果翻倍
开源
https://x.com/Saccc_c/status/2084519494207324327

```
结果可编辑writing block输出
```
## 其他实用配置与心态

### 长会话防变慢四招

#### 设置 Process_narration=false


#### 用 orchestrator + parallel agents 分担上下文

```
充当协调者。使用并行代理来完成研究和执行工作。为每个并行代理编写详细任务，并强制它们行动、迭代、完成任务，并带回深入报告。你的工作是深入分析代理的工作，提供反馈，并为它们提供持续任务。
```

#### 强制 “Measure twice, cut once”

```
Measure twice, cut once policy。
```

#### 保持代码库干净（无临时文件、死代码）

```
保持代码库干净，没有临时文件，没有死代码，没有死文件。始终保持组织化。没有不必要的文件夹、子文件夹或文件。
```

### 把任务写成详细文档后放手

把你的思考前置到文档中

写完整 task doc（需求 + 上下文 + 最终愿景）→ 发 “accomplish this and test until done” → 走开。

示例Codex_doc.md
```
# 任务：搭建用户引导流程
## 背景信息
- 基于 Next.js 开发，使用 Supabase 身份认证
- 当前注册流程在第2步存在40%用户流失率
- 采用移动优先设计方案

## 需求
- 三步递进式表单（姓名 → 使用场景 → 工作空间设置）
- 步骤间保存填写进度
- 第3步提供跳过选项
- 流程完成时播放彩带动画

## 约束条件
- 禁止新增第三方依赖包
- 界面风格遵循现有设计系统
- 全部表单项在客户端完成校验

## 完成标准
- 全部3个步骤在移动端、桌面端均可正常运行
- 每一步测试用例全部通过
- 用户流失埋点事件正常触发
```


codex相关问题咨询  kyjl97