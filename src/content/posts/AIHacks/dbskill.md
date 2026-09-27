---
title: dbskill使用说明书
published: 2026-01-01
tags: []
category: 未分类
draft: false
pinned: false
image: 
---

dbskill 是一套装在 Agent 里的“商业工具箱”技能，包含 30 个分工明确的子技能（如商业模式诊断、对标研究、内容诊断、知识库搭建、微信号排版等），不管你是分析生意、打磨内容还是搭建工作流，只要说一句“不知道下一步该干嘛”，它就帮你路由到对应的技能。


开源地址
https://github.com/dontbesilent2025/dbskill


skill能力

| SKILL                 | 能力                                     | 适用场景                                             |
| --------------------- | -------------------------------------- | ------------------------------------------------ |
| dbs                   | dontbesilent 商业工具箱主入口：新手教程、任务前路由与任务后导航 | 不知道该用哪个 dbs Skill、分析商业问题或询问下一步时                  |
| dbs-action            | 用阿德勒心理学框架诊断执行阻滞                        | 知道该做却迟迟不做、反复拖延或行动中断时                             |
| dbs-agent-migration   | 把项目迁移成多端一致的 Agent 工作台                  | 迁移 Claude Code、Codex、Grok 或整理 AGENTS.md 时        |
| dbs-ai-check          | 扫描文案中的 AI 写作特征并输出检测报告                  | 检查 AI 味、AI 痕迹或机器化表达时                             |
| dbs-benchmark         | 用五重过滤法寻找值得模仿的对标                        | 找对标、选模仿对象或分析竞争参照时                                |
| dbs-bridge            | 将单个 Skill 或技能集合桥接到多端 Agent             | 跨 Claude Code、Codex、WorkBuddy、Grok 安装或同步 Skill 时 |
| dbs-chatroom          | 模拟多角色定向聊天并总结分歧                         | 想要专家讨论或继续聊天室对话时                                  |
| dbs-chatroom-austrian | 哈耶克、米塞斯视角的奥派经济学讨论                      | 用奥派视角分析问题或进入奥派聊天室时                               |
| dbs-content           | 诊断已定选题如何做成好内容                          | 设计内容、检查文案或改善表达时                                  |
| dbs-content-system    | 把本地素材搭成可持续生长、可重组的内容工程                  | 结构化内容资产、整理旧素材或建立主题地图时                            |
| dbs-decision          | 把长期问题建成决策知识工程                          | 决策立案、结果回填、状态画像或长期复盘时                             |
| dbs-deconstruct       | 拆解模糊的商业概念与术语边界                         | 解释一个词、澄清概念边界或识别概念混用时                             |
| dbs-diagnosis         | 用问诊和体检模式诊断商业问题                         | 拆解业务、检查商业模式或消解商业困境时                              |
| dbs-goal              | 把模糊目标整理成可行动、可检查的交付物                    | 澄清目标、检查任务是否说清或定义交付结果时                            |
| dbs-good-question     | 把模糊问题改写成 Agent 可推理的问题说明书               | 把问题说清、生成好问题、评估 Agent 可解性时                        |
| dbs-hook              | 诊断短视频开头并生成优化方案                         | 修改开头、提高吸引力或降低开头流失时                               |
| dbs-knowledge         | 把本地文件夹建成 Agent 可稳定使用的知识库               | 搭建、查询、更新、整理或瘦身知识库时                               |
| dbs-learning          | 把课题拆成连续学习篇目并按反馈调整                      | 系统学习一个主题、继续下一篇或调整课程时                             |
| dbs-report            | 把多次存档合并成 Markdown 报告                   | 汇总诊断、整理报告或生成可分享材料时                               |
| dbs-resonate          | 从传播心理学诊断文稿能否引发共鸣                       | 担心没流量、没戳中观众或完播率低时                                |
| dbs-restore           | 恢复由 dbs-save 保存的最近诊断状态                 | 想接着上次继续或查看此前结论时                                  |
| dbs-save              | 把当前诊断状态保存到本地                           | 保存结论、跨会话续接或修改存档位置时                               |
| dbs-script-flow       | 检查逐字稿的衔接、信息密度与口播流畅度                    | 排查逻辑断裂、卡顿或观众流失位置时                                |
| dbs-skill-cleaner     | 扫描本地 Skill 的广告、劫持与敏感读取风险               | 审查、清理或隔离可疑 Skill 时                               |
| dbs-slowisfast        | 识别贪快陷阱，寻找长期复利路径                        | 反复返工、急于求成或想设计长期积累时                               |
| dbs-spread            | 用 5 个传播学理论解码共鸣机制                       | 分析内容为什么火、打中什么情绪时                                 |
| dbs-standard-answer   | 从历史同构案例中提炼带条件的重复机制                     | 需要历史类比、经典解法或标准答案时                                |
| dbs-update            | 更新官方 dbskill 并保留存档                     | 升级、检查或对比 dbskill 版本时                             |
| dbs-wechat-html       | 把 Markdown 转成公众号可粘贴的 HTML              | 排版公众号文章或生成微信版本时                                  |
| dbs-xhs-title         | 从 75 个验证过的小红书标题公式中选标题                  | 起小红书标题、改标题或选公式时                                  |

使用示例


| SKILL                 | 自然语言示例                               |
| --------------------- | ------------------------------------ |
| dbs                   | 我不知道该用哪个技能，帮我判断一下下一步                 |
| dbs-action            | 我知道该做但一直拖，帮我看问题出在哪                   |
| dbs-agent-migration   | 帮我把 Claude Code 的工作台规则迁移成 Codex 也能用的 |
| dbs-ai-check          | 帮我看这段文案是不是 AI 味太重                    |
| dbs-benchmark         | 帮我找 3 个值得模仿的对标账号                     |
| dbs-bridge            | 把这个技能同步安装到 Grok 和 WorkBuddy          |
| dbs-chatroom          | 拉几个不同立场的专家来聊聊我这个选题                   |
| dbs-chatroom-austrian | 用奥派经济学的视角聊聊我的定价                      |
| dbs-content           | 我这个选题定下来了，内容该怎么做才有人看？                |
| dbs-content-system    | 把这几年积压的稿子整理成能反复用的内容素材库               |
| dbs-decision          | 帮我把这个问题立个决策案，之后每次结果都回填               |
| dbs-deconstruct       | “个人 IP”到底是个什么东西，帮我拆到能落地              |
| dbs-diagnosis         | 帮我诊断一下现在这个收费模式有没有问题                  |
| dbs-goal              | “我想把公众号做起来”太模糊了，帮我说清楚                |
| dbs-good-question     | 帮我整理成 AI 能准确执行的提问                    |
| dbs-hook              | 视频前三秒留不住人，帮我改开头                      |
| dbs-knowledge         | 把这个文件夹整理成一个 AI 能长期使用的知识库             |
| dbs-learning          | 我想系统学一遍定价，从第一篇开始                     |
| dbs-report            | 把最近十几次诊断存档汇总成一份报告                    |
| dbs-resonate          | 我担心这篇稿子发出去没人共鸣，帮我诊断一下                |
| dbs-restore           | 接着上次的诊断继续，不用重新讲                      |
| dbs-save              | 把这次的结论存档，下次接着聊                       |
| dbs-script-flow       | 检查这份逐字稿逻辑顺不顺、哪些地方观众会划走               |
| dbs-skill-cleaner     | 扫一遍我装的技能，看有没有夹带广告或偷偷收集数据的            |
| dbs-slowisfast        | 我是不是又在贪快？帮我找条能长期积累的路                 |
| dbs-spread            | 帮我拆一条火的笔记为什么能火                       |
| dbs-standard-answer   | 商业史上有没有和我处境很相似的案例？                   |
| dbs-update            | 检查一下 dbskill 有没有新版本可更新               |
| dbs-wechat-html       | 把这篇内容排版成能直接粘贴进公众号后台的 HTML            |
| dbs-xhs-title         | 帮这篇文章起 5 个小红书标题                      |
