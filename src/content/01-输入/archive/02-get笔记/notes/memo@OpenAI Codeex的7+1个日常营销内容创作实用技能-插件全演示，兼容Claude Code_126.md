---
title: "OpenAI Codeex的7+1个日常营销内容创作实用技能/插件全演示，兼容Claude Code"
created: 2026-05-23 21:46:29
source: "[Codex: Build Your Full AI Marketing Team (Agents + Skills)](https://youtu.be/sL_KBnYB17I?si=Q3dtJg8fauwRkJrw)"
tags:
  - AI链接笔记
  - AI工具
  - Codeex
  - Claude_Code
---

### 📑 智能总结

#### 内容信息

- **时长**：约 0小时 49分钟
- **内容类型**：工具教程 / 知识分享

#### 内容总结

博主分享了自己在OpenAI新AI超级应用Codeex中日常使用的7个核心技能加1个 bonus技能，所有技能可一键获取，兼容Codeex和Claude Code，帮助内容创作者和营销人员通过AI agent提升 workflows 效率。
**Codeex基础介绍与技能概念**
- **Codeex产品定位**：Codeex是OpenAI推出的全新AI超级应用，整合了Claude桌面版的聊天、协作、Claude Code所有功能到统一体验中。博主95%的内容和营销电脑任务都在Codeex内完成。
- **Codeex核心能力**：AI模型拥有完整的电脑控制权，可以编辑、删除、创建本地文件，支持生成幻灯片、表格、文档、应用、网页，还支持computer use和browser use，可自动控制浏览器，能力每月都在提升。
- **技能与插件的定义与调用**：插件是技能和能力的集合，技能是给AI agent的指令文件；使用已创建技能按/，调用插件按@，都可在左上角plugins入口访问。示例中Vercel插件包含多个技能，@Vercel调用插件自动选技能，/+Vercel+具体技能名可直接调用指定技能。
- **获取地址**：本次分享的所有技能都可以在chorus.com/skills一键获取，可在Codeex、Claude Code或Chorus中直接使用。
**技能1：YouTube Researcher（接地内容生成）**
- **核心原理**：该技能核心是**接地**，即连接AI agent到用户需要的参考点，解决原生ChatGPT生成内容不符合用户个人风格或特定创作者风格的问题。
- **使用场景演示**：用户可以指定生成Theo Brown风格的视频intro，要求拉取他最新10个视频的文字稿，生成5个intro钩子选项；也可以指定要求Andrej Karpathy风格解释LLM相关概念，最终生成内容的风格高度匹配目标创作者。
- **依赖要求**：需要搭配Super Data的API获取文字稿，该API支持YouTube、Instagram、TikTok、X平台的内容文字抓取。
**技能2：Readwise CLI （第二脑内容创意生成）**
- **核心功能**：基于Readwise的第二脑知识库生成内容创意，Readwise可同步Twitter书签保存，用户可通过Chrome extension一键保存并添加备注，所有内容存入中央数据库。
- **使用演示**：博主输入指令要求基于过去一周保存的内容，寻找共性生成30个短内容视频创意，搭配YouTube Researcher技能还可以加入自己过往YouTube内容做参考，两个任务可并行运行。
- **自定义与自动化**：生成创意后用户可以直接要求修改技能，要求未来输出必须添加原推文链接，一次修改永久生效；还可以设置每日自动化，每天早上8点自动生成过去3天保存内容的创意文档，发送到指定聊天。
**技能3：Excalidraw Diagrams（手绘示意图生成）**
- **使用方法**：输入/excalidraw即可调用，可要求生成指定主题的简化示意图，可搭配YouTube Researcher和Readwise技能获取上下文，还可以要求用子任务并行加快速度。
- **生成结果**：本次任务耗时10分50秒完成，生成结果提供可直接打开的分享链接，默认输出无多余文字的呈现格式，类似演示文稿，用户可以全屏查看并直接在线修改。
- **自定义调整**：默认输出文字偏多，用户可以直接要求修改技能调整文字量，支持自定义增加文字说明，适配不同用户的偏好。
**技能4：Paper（AI专属设计工具）**
- **产品定位**：Paper是专门为AI agent设计的类Figma工具，HTML架构，内置优秀的MCP工具，可连接Codeex使用，支持创建更专业的交互式示意图。
- **实时编辑演示**：要求生成讲解技能和插件概念的带动画示意图，AI可实时设计，用户发现格式问题可直接截图反馈，通过steering功能实时修正，最终导出PNG格式图片。
- **常用场景**：博主常用来做创意构思、落地页设计、lead magnet、封面图、品牌规划，可和图片生成技能搭配使用。
**技能5：Remotion + Hyperframes（AI动画视频生成）**
- **产品对比**：两个都是Codeex内置的动效插件，需要手动开启；用户反馈Hyperframes物理效果更好，支持更高级的动效，Remotion上线更久编辑器更专业。
- **功能演示**：用户可以精确控制时间线，指定第8秒放大手机、第11秒缩小、0秒手机从左侧飞入、10秒渐变变红、出场360度旋转等细节，修改响应速度快。
- **使用场景与复用**：适合发布视频、转场B-roll、YouTube视频页面 overlay，博主之前一个12万播放量的视频intro就使用了该功能；模板可复用，可基于已有模板快速生成新的多版本方案，最终渲染导出视频到本地，可导入Premiere Pro等剪辑软件使用。
**技能6：Gen Media（AI生成多媒体mini app）**
- **核心架构**：该技能整合FAL API，FAL平台托管所有主流AI创作模型，包含文生图、图生视频、视频补全、Topaz放大等所有类型的生成能力；技能自带mini app，AI可调用API，用户也可手动在app内操作，生成内容存在本地数据库。
- **开发过程**：第一个版本仅用1个提示词生成，全程花费40分钟整合完所有FAL的API，直接启动app。
- **使用流程演示**：AI生成4张博主的YouTube封面图放入网格后，用户可以直接选中图，要求修改细节，比如添加文字、调暗背景做成电影感，整个过程快速完成；还可以预存创作者风格参考，比如要求生成Matt Wolf风格的博主封面，AI可直接调用预存参考元素。
**技能7：Gmail/品牌合作管理器**
- **核心流程**：该技能基于Gmail插件，自动搜索收件箱，过滤低价合作、去重，结合YouTube Researcher判断匹配度，生成高优先级品牌合作表格；搭配日历插件，自动查找空闲时间推荐会议时段，用户确认后可直接预约。
- **自动化设置**：博主设置了每日自动化，每天早上自动生成当日品牌合作 outreach 表格，同时发送邮件到自己邮箱，方便随时查看。
- **运行结果示例**：本次运行7分钟生成文档，表格按优先级分类，Hyper Agent、HubSpot、Canva、Opus等品牌都被分到高优先级分组。
**Bonus技能：Buffer Publisher（社交内容 idea 管理）**
- **核心功能**：利用Buffer新开放的API，Codeex可以读取自身聊天和记忆中的内容，提取5个内容创意自动添加到Buffer社交调度工具中。
- **使用价值**：用户每天可以把Codeex中产生的创意一键导出存储到Buffer，避免idea丢失，方便后续创作安排，Buffer支持全渠道发布短内容。
**即将推出的云AI agent产品介绍**
- **产品特性**：推出的实验性新产品是云端运行的虚拟电脑，支持Codeex和Claude Code，用Codeex账号登录，永远不会关机，支持连接iMessage，可添加到群聊和朋友一起使用。
- **测试状态**：该产品几天前静默上线测试，正在收集早期反馈，完整版发布前还会开发更多功能。

### 📅 章节概要

\[00:00:00\] **开场介绍：分享背景与核心主题**
博主提到自己95%的内容和营销任务都在Codeex内完成，Codeex是OpenAI的全新AI超级应用。博主依靠自定义技能实现从150万粉丝增长到目标明年年底1000万粉丝，本次将分享博主日常使用的7个Codeex插件/技能，这些技能同样兼容Claude Code，对内容创作者和个人品牌都有帮助。
\[00:01:10\] **Codeex基础介绍：产品定位与界面布局**
Codeex整合了Claude桌面版的聊天、协作、Claude Code功能到统一体验。支持生成幻灯片、表格、文档、应用、网页，AI可完全控制本地电脑，实现增删改文件。界面布局为左侧是agent聊天列表和功能入口，中间是对话区域，右侧是动态预览区，可预览应用、浏览器、表格、演示文稿等不同内容。Codeex支持computer use和browser use，可自动控制浏览器，能力每月都在提升。
\[00:03:47\] **技能与插件的调用规则与定义**
使用已创建技能需要输入斜杠/，可直接选择历史添加过的技能，比如YouTube researcher、Excalidraw diagram等；调用插件需要输入@符号，比如computer use、Gmail、日历都是插件。插件是多个技能和能力的集合，技能是给AI agent的指令文件；举例：Vercel插件包含多个技能，@Vercel会自动匹配合适技能，斜杠+技能名可直接调用插件内指定技能。所有本次分享的技能都可在chorus.com/skills一键获取，支持Codeex、Claude Code、Chorus。
\[00:06:03\] **技能1：YouTube Researcher：接地式内容生成原理与演示**
技能1和技能2都围绕**接地**概念，即把AI连接到用户需要的参考点，解决原生ChatGPT基于OpenAI训练的通用标准生成内容，不符合用户个人风格需求的问题。YouTube Researcher可拉取目标创作者的YouTube文字稿，生成符合该创作者风格的内容。演示：生成Theo Brown风格的视频intro，要求拉取他最新10个视频，生成5个intro钩子；Codeex支持多任务并行，可同时生成Cleo Abram风格的短内容脚本，也可要求用Andrej Karpathy的风格解释技能概念，生成内容风格高度匹配原作者。该技能需要Super Data API获取文字稿，支持YouTube、Instagram、TikTok、X平台。
\[00:11:39\] **技能2：Readwise CLI：基于第二脑生成内容创意**
Readwise可用来保存网页、Kindle高亮，博主用它同步Twitter书签，自动每日同步，也可通过Chrome extension一键保存，并添加备注“用于下一个视频”，所有内容存入中央第二脑数据库。通过Readwise的CLI工具，Codeex可访问所有保存内容，演示中要求基于过去一周保存内容，生成30个短内容创意，可搭配YouTube Researcher加入博主过往YouTube内容做参考，两个任务可并行运行。生成后博主发现缺少原推文链接，直接要求修改技能，要求未来输出必须添加原链接，一次修改永久生效；还可设置自动化，每天早上8点自动生成过去3天保存内容的创意文档，博主已经成功设置该自动化。
\[00:17:59\] **技能3：Excalidraw Diagrams：内容示意图生成**
博主所有内容的示意图都使用Excalidraw制作，调用方式是输入/excalidraw，可要求生成指定主题的简化示意图，本次要求生成技能和插件的解释示意图，同时要求用YouTube Researcher匹配博主的内容风格，结合Readwise获取额外参考。为加快速度，可以要求主agent生成两个子agent分别处理YouTube和Readwise任务，并行运行。本次任务耗时10分50秒完成，生成可直接打开的分享链接，输出遵循技能预设格式，文件夹包含技能文件、脚本、参考、示例、输出，呈现类似演示文稿，文字少，以视觉为主，用户可以全屏直接编辑。默认文字偏多，用户可以直接要求修改技能，自定义增加或减少文字量。
\[00:22:01\] **技能4：Paper：专业交互式AI示意图工具**
Paper是专为AI agent设计的类Figma工具，HTML架构，内置优秀的MCP工具，可连接Codeex使用，适合创建更专业的交互式示意图。演示中要求生成讲解技能和插件的带动画示意图，要求第一部分不带动画，后续部分添加动画。AI可实时设计，用户发现元素重叠排版拥挤，可直接截图反馈，通过默认开启的steering功能实时修正，AI会实时调整排版，最终可导出PNG格式图片保存。博主常用场景包括创意构思、落地页设计、lead magnet、封面图、品牌规划，可和图片生成技能搭配使用。
\[00:27:11\] **技能5：Remotion + Hyperframes：AI动效视频生成**
Remotion和Hyperframes都是Codeex内置的动效插件，需要手动开启；用户普遍反馈Hyperframes物理效果更好，支持更高级动效，Remotion上线时间更长，编辑器更专业，博主两个都使用。演示中用Hyperframes制作手机界面动画，支持精确控制时间线，可指定第8秒放大手机、0秒手机从左侧飞入、10秒背景变红、出场360度旋转、文本入场动画，修改响应速度快。适合制作发布视频、B-roll、YouTube视频 overlay，博主一个12万播放量的视频intro就使用了该功能；模板可复用，可基于已有模板快速生成4个不同版本的技能目录动画，用户可截图修改问题，最终渲染导出视频到本地，可导入Premiere Pro等剪辑软件使用。
\[00:35:01\] **技能6：Gen Media：可人机共用的AI多媒体生成mini app**
该技能是博主基于FAL API开发，FAL托管了所有主流AI创作模型，支持文生图、图生视频、视频转视频、Topaz视频放大等所有类型创作，技能内置mini app，所有生成内容存在本地数据库，AI可调用API，用户也可手动操作。第一个版本仅用1个提示词生成，花费40分钟整合完所有FAL API直接启动。演示中要求AI生成4张博主的YouTube封面图放入网格，生成后用户可直接拖动选中图片，要求添加白色文字“Oh my god”、调暗背景做成电影感，快速完成修改；可预存参考元素，比如预存博主照片和Matt Wolf的封面风格，可直接要求生成对应风格的封面，人机都可以调用该功能。该模式的核心是AI完成大部分工作，用户做最后10%的修改，这是博主偏好的AI使用方式。
\[00:40:54\] **技能7：品牌合作邮件与日程管理器**
该技能先使用Gmail插件自动搜索收件箱，过滤低价品牌合作、去除重复，结合YouTube Researcher判断品牌和博主内容的匹配度，生成按优先级排序的品牌合作表格，再搭配日历插件，自动查找博主下周空闲时间，推荐合适的会议时段，用户确认后可直接发送邮件预约。博主设置了每日自动化，每天早上自动生成当日品牌合作 outreach 表格，同时发送到自己邮箱，方便随时查看。本次运行7分钟生成文档，输出的表格中Hyper Agent、HubSpot、Canva、Opus等多个品牌被分到高优先级分组，整理清晰，可直接让AI回复选中的品牌。
\[00:45:43\] **Bonus技能：Buffer Publisher社交创意存储与新产品预告**
额外分享Buffer Publisher技能，Buffer是博主的社交内容调度工具，最新开放了API，Codeex可读取自身聊天记忆，提取5个内容创意自动添加到Buffer的创意库。博主每天都会清理Buffer创意库，把确定创作的idea推进流程，清理没用的idea，该技能可以自动把Codeex中产生的创意导出，避免idea丢失。所有技能都可在chorus.com/skills获取，即将推出实验性云端AI产品：云端虚拟电脑，支持Codeex和Claude Code，用Codeex账号登录，永远不会关机，可连接iMessage，添加到群聊和朋友共用，该产品几天前静默上线，正在收集早期反馈，完整版发布前会补充更多功能。

### ✨ 金句精选

- “Think of Codeex as a little operating system around a language model. At the center there is the model. The model can read text, write text, reason, and decide what to do next. But by itself, it doesn’t know your personal workflows.” (战略洞见)
- “That knowledge has to live somewhere and that is what a skill is.” (战略洞见)
- “I don’t like to rely on AI to do everything for me. I wanted to create a bunch of options and then I want to take it the final 10% because that’s where all the value is.” (思考启发)
- “I just use AI to organize all the information so I can make really, really quick decisions.” (方法技巧)

### 💡 关键洞察

- **技能的可编辑性降低了自定义门槛**：用户不需要编写代码，仅需要自然语言就可以修改已有技能的逻辑，比如要求Readwise技能添加原链接，这种低门槛定制让AI工具可以快速适配个人 workflow，这是AI生产力工具的核心优势。
- **技能可堆叠是放大效率的关键**：多个基础技能可以组合使用，比如YouTube Researcher+Readwise+Excalidraw可以直接完成从找参考到生成内容示意图的完整流程，子任务并行还能进一步提升速度，复合技能的效率远高于单个技能。
- **人机协作模式比纯AI自动化更实用**：博主设计的Gen Media技能采用AI生成初稿，用户做最后10%修改的模式，既利用AI快速生成多个选项，又保留人类对最终输出的把控，符合内容创作的实际需求。
- **云端永久AI agent是新的产品方向**：即将推出的云端虚拟电脑解决了本地Codeex依赖电脑开机的问题，还支持多端协作，可接入iMessage和群聊，打开了AI agent的新使用场景。