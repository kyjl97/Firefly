---
author: 小栗子
source: 微信公众号
url: https://mp.weixin.qq.com/s?__biz=MzIwMTU5OTQ1Nw==&mid=2653726780&idx=1&sn=c372bbdcc52eb2254d40cd42f09e8288&chksm=8c52035d0dba83db65fde68b60f74e7daf09b2dbb47c1ed9f60b8c1e07d31f251c62e22529ce&mpshare=1&scene=1&srcid=0526uecO3RsVXfoCLGVYFzrx&sharer_shareinfo=9c0480af9440ce07dcda852b02305a35&sharer_shareinfo_first=9c0480af9440ce07dcda852b02305a35#rd
saved: 2026-05-26 13:11:54
tags:
  - 笔记同步助手
id: 17ecf466-91de-4d74-97b7-cb9f0dad6c44
---

公众号名称：沃垠AI

作者名称：小栗子

发布时间：2026-05-02 10:30

大家好，我是小栗子。

冷逸上篇《[最值得安装的20个Skills](https://mp.weixin.qq.com/s?__biz=MzIwMTU5OTQ1Nw==&mid=2653726437&idx=1&sn=45628619fa1b8f611e794de75b742792&scene=21#wechat_redirect)》发布之后，很多朋友跑来问：还有没有更小众、更接地气、专门给国内创作者用的Skill？有没有按场景直接拿来就能用的？

我花了一周时间，把GitHub上跟中文创作相关的Skills翻了个遍。按照场景挑出这20个，全部亲测好用，并且跟上一篇文章零重复。

这些Skills全部来自于国内的宝藏博主们以及社区中的精选。有的是博主做的超级合集，有的是解决单一问题的利器。

先给大家一张速查表，按你的场景对号入座：

![[images/ab6b75e5f46f2472e9747e8fa8e25812_MD5.png]]

## 一、博主精选合集

四位顶流AI大佬，把自己的全套方法论打包成了Skills仓库。每个仓库都是一个领域的解决方案集合，不是单个工具。

### 1\. 李继刚 · ljg-skills — 写作·思考·认知工具箱

🔗 https://github.com/lijigang/ljg-skills

安装命令：

```
npx skills add lijigang/ljg-skills
```

![[images/958e4550f3602a346a7ddfd714f6dd68_MD5.png]]

李继刚的底层逻辑是四个字：精准压缩——把复杂的东西压进高密度核心，让AI自己展开细节。推荐以下五个核心skill覆盖从阅读到表达的完整认知链。

ljg-plain（逼AI说人话）：把复杂内容改写成12岁小孩也能看懂的样子，剥掉所有虚的、模糊的、绕来绕去的东西。

ljg-learn（概念解剖器）：一层一层往里拆一个概念。读论文卡住了、看技术文档晕了，扔给它就行。

ljg-read（伴读教练）：陪你读长文，自动检测语言、英文翻译成中文、标注结构、追问深层问题。

ljg-card（认知可视化）：把文字变成可分享的信息图。

ljg-think（追本之箭）：给一个观点一路向下钻到本质。写深度文章前用它把核心观点想透。

---

### 2\. 花叔 · huashu-skills — 内容创作21合1工厂

🔗 https://github.com/alchaincyf/huashu-skills

安装命令：

```
npx skills add alchaincyf/huashu-skills
```

花叔，30万粉AI博主，代表作「小猫补光灯」。他把从选题到数据分析的整条内容生产线做成了21个Skill。

![[images/641c4a74ad3ac7a515e91257a7da437c_MD5.png]]

这里列举几个我常用的：

![[images/bd0b4fa88b8eba03d6015943e869420c_MD5.png]]

huashu-slides（PPT制作）：一句话出标准PPTX，18种设计风格，三种协作模式。

huashu-topic-gen（选题生成）：输入方向输出3-4个选题方案，含标题、大纲、优劣分析和工作量评估。

huashu-proofreading（三遍审校）：系统化降AI味——事实核查→AI腔识别改写→节奏打磨。

huashu-article-to-x（长文转社交媒体）：3000字公众号文章浓缩成微博/小红书版。

huashu-wechat-image（公众号配图）：封面图、正文插图、信息图，AI生成和HTML渲染两条路径。

huashu-research（结构化调研）：每搜一轮保存一轮，不怕会话截断。

huashu-data-pro（数据分析报告）：Excel到专业报告，5种报告风格。

huashu-material-search（个人素材库）：从你的笔记中检索素材，让AI写的内容有你的"人味"。

---

### 3\. 苍何 · canghe-skills — 配图·发布·格式全链路

🔗 https://github.com/freestylefly/canghe-skills

安装命令：

```
npx skills add freestylefly/canghe-skills
```

![[images/cebc00e88337fe5ef67efebb0ac7598a_MD5.png]]

苍何的仓库，是内容创作者的瑞士军刀——从下载素材到生成配图到发布公众号，全流程覆盖。

douyin-downloader（抖音下载+分析）：一条链接，视频+文字全搞定，文本层面拆解爆款结构。

xhs-images（小红书配图系列）：9种视觉风格×6种排版密度，从封面到知识卡片全覆盖。

article-illustrator（文章插图）：自动识别文章中需要配图的位置，6种信息图类型×8种视觉风格。

cover-image（封面图）：五维封面系统——类型×配色×渲染×文字×情绪，54种组合。

post-to-wechat（发布到公众号）：API和浏览器两种模式，图文、长文、HTML都能发。

wechat-article-extractor（公众号文章提取）：公众号链接一键转Markdown，素材收集神器。

url-to-markdown（网页转Markdown）：任何网页转Markdown，支持需登录的页面。

format-markdown（MD格式化）：自动排版——YAML头信息、标题层级、列表、代码块，一键搞定。

---

### 4\. 袋鼠帝 · kangarooking-skills — 起号·配图·自动化

🔗 https://github.com/kangarooking/kangarooking-skills

安装命令：

```
npx skills add kangarooking/kangarooking-skills
```

![[images/718d96b340b70f462cb842570b67288a_MD5.png]]

袋鼠帝的仓库虽小但实用，围绕内容创作者的日常需求做了7个Skill。

以这四个我常用的为例：

ai-article-daily（起号SOP）：选题→搜集资料→切入角度→初稿和标题→配图→排版→发布草稿箱，全流程内置Prompt模板。可以设成定时任务每天自动跑。

book-illustration-workflow（书稿配图流程）：梳理章节需要的截图和配图，统一图号→文件名→原文位置，回填到Markdown正确位置，同步到飞书文档。写书或做长教程的人能省大量时间。

multi-agent-image（多Agent图片生成）：基于gpt-image-2的异步生成+轮询+下载流程，支持批量生成和系列套图。适合需要大量一致性配图的场景。

twitter-monitor（X/Twitter监控）：按博主抓取最新推文，输出JSON/CSV，可选同步到飞书多维表格。做海外资讯追踪的利器。

---

## 二、写作与深度调研

以下四个Skill各解决一个具体问题：怎么写、怎么自动写、怎么研究、怎么理解人。

### 5\. 冷逸 · Auto-WeChat-Writing — 一句话出公众号全文

🔗 https://github.com/lengyi2030/Auto-wechat-writing

安装步骤：​git clone​ 后 ​npm start​（本地Web应用）

冷逸用GLM-5.1搓出来的写作神器。输入主题+创作要求→自动生成正文、标题、摘要和封面图，一条龙。

![[images/31efe0161b8908f5640babd42106d3ba_MD5.png]]

支持自由接入各种模型（GPT、Qwen、DeepSeek、GLM），内置styles写作风格系统。不是demo——冷逸老师烧掉1300万tokens、30多次对话、近10个版本迭代出来的生产工具。完全开源。

感兴趣的可以看看之前这篇文章：

《[我用2天搓了一个写作神器，可以自动写文章，已免费开源](https://mp.weixin.qq.com/s?__biz=MzIwMTU5OTQ1Nw==&mid=2653726226&idx=1&sn=f1a55757e3791dabeb70bc124e754386&scene=21#wechat_redirect)》

---

### 6\. 卡兹克 · khazix-writer — 不像AI写的公众号长文

🔗 https://github.com/KKKKhazix/khazix-skills

安装命令：

```
npx skills add KKKKhazix/khazix-skills --skill khazix-writer
```

卡兹克把自己写公众号长文的完整方法论封装成了Skill。

![[images/37c7dd83b40ec7474c3a58b6b14af2af_MD5.png]]

四层自检体系：事实核查→逻辑链排查→AI腔识别与改写→节奏打磨。不是套模板，是把一个人写了好几年爆款文章才积累下来的判断力变成了一套可执行的规则。Skill不能替代你的思想和观点，它更像一个"比你更挑剔的编辑"。

---

### 7\. 卡兹克 · hv-analysis — 横纵分析法深度研究

🔗 https://github.com/KKKKhazix/khazix-skills

安装命令：

```
npx skills add KKKKhazix/khazix-skills --skill hv-analysis
```

这个skills做深度研究非常好用。纵向沿时间线还原完整故事，横向跟同赛道竞品逐一对比——技术路线、用户口碑、生态位。

![[images/ea30906b2a1584b0d56a3823d600b72b_MD5.png]]

丢一个研究对象进去——产品、公司、技术概念——自动联网搜索、调arxiv查论文，半小时出一份万字PDF报告。

比如研究雷军：

![[images/40773b49d86ec568182cef0bf0cea82e_MD5.png]]

### 8\. 废墟里 · soul.skill — 灵魂提取术

🔗 https://github.com/larashero3-dotcom/soul.skill

安装命令：

```
npx skills add larashero3-dotcom/soul.skill --skill soul.skill
```

Moxt团队的小伙伴做了一个疯狂实验：把老板Ryan的583份输出素材喂给AI，用"双轨蒸馏"方法——一条轨道提取人格信号，另一条轨道提取知识体系——产出AI Ryan。

一位同事试了后沉默十秒："它比我理解的Ryan还Ryan。"

用来深度理解一个人（包括你自己）的思维模式。如果要复刻别人，务必先征得同意。

这个Skill也是冷逸的心头大爱，前两天刚用它蒸馏了一个「AI冷逸」。

详情在这里：

[这次，我可能真的把自己蒸馏出来了](https://mp.weixin.qq.com/s?__biz=MzIwMTU5OTQ1Nw==&mid=2653726751&idx=1&sn=cbd68f14da0767d2b7701b2f56dda44d&scene=21#wechat_redirect)

---

## 三、配图·设计·PPT

四个工具，覆盖了从信息图到PPT到设计规范的全部视觉需求。

### 9\. 半大熊猫 · any2html — 复古风HTML信息卡片

🔗 https://github.com/blockpanda/any2html

安装命令：

```
npx skills add blockpanda/any2html --skill any2html
```

半大熊猫做的这个skill，专治"文章写好了不知道怎么配图"，分成两步走：AI深度提炼你的内容→你审核大纲→自动生成Tailwind CSS纯静态HTML卡片，直接截图就能用。

三种尺寸适配不同场景：小红书轮播图、长信息图、公众号封面图。复古羊皮纸风默认配色，留白和行高控制得很讲究。数据型内容自动触发ECharts图表，对比数据超过3个就给你画出来。做知识卡片和信息图的人，用了就不用再开Canva了。

![[images/fe37c312074596f230c64b9054f6d4ba_MD5.png]]

### 10\. 向阳乔木 · info-card-designer — 文字一键变杂志风卡片

🔗 https://github.com/joeseesun/qiaomu-info-card-designer

安装命令：

```
npx skills add joeseesun/qiaomu-info-card-designer
```

向阳乔木出品，跟any2html互为补充——any2html走手绘复古风，info-card-designer走杂志排版路线。任意文本或网页链接丢进去，自动生成杂志质感的HTML信息卡片然后截图输出。

内置字体和版式规则，不需要描述"我要什么风格"，AI会根据内容自动匹配排版方案。适合做小红书封面、公众号配图、长图信息图。用的是纯静态HTML，截图后导出PNG，发到哪都高清。

如果你觉得any2html的复古风太"糙"，选这个更精致。

---

### 11\. 归藏 · guizang-ppt-skill — 电子杂志风网页PPT

🔗 https://github.com/op7418/guizang-ppt-skill

安装命令：

```
npx skills add op7418/guizang-ppt-skill --skill guizang-ppt-skill
```

归藏出品，刚上线一周，在Github上已经4.5k star了。走的是"电子杂志×电子墨水"路线——生成单文件HTML，浏览器打开横向翻页，像在读一本精致的设计杂志。

十种页面布局可选（封面页、要点页、对比页、时间线页等等），五套主题色预设一键切换。跟花叔的PPTX比，这个更偏视觉冲击力和氛围感——适合线下分享、产品发布、私享会这种"需要让台下的人抬头看屏幕"的场合。

如果你要的是装进U盘带去客户那讲方案的正式PPTX，用花叔的；如果你要的是屏幕上看起来"哇"的那一下，用归藏的。

![[images/4e914a94ab7cd69eddfed644d808bb99_MD5.png]]

### 12\. pbakaus · impeccable — 防止AI生成"辣眼睛"设计

🔗 https://github.com/pbakaus/impeccable

安装步骤：手动 ​git clone​ 或从 ​impeccable.style​ 下载

23.7k星的设计反模式词典——它不告诉AI"你要做什么好设计"，而是告诉AI"绝对不能犯哪些低级错误"。

禁用Purple渐变、别嵌套圆角卡片套圆角卡片、别用Inter字体、别加过度的box-shadow、别在深色背景上用纯白文字……这些规则来自pbakaus多年做前端和设计的血泪教训。装了之后AI生成的设计至少不会再"一眼AI"。

23.7k stars说明一件事：被AI辣眼睛设计折磨过的人比想象中多得多。不会帮你做出完美的设计，但能帮你避免犯下最蠢的那些。

![[images/f008d955838a3ace4d79b430b15e8277_MD5.png]]

## 四、效率工具

让日常琐事变快的四个利器。

### 13\. 小互 · tacit-mining — 隐性知识挖掘

🔗 https://github.com/xiaohuailabs/tacit-mining

安装命令：

```
npx skills add xiaohuailabs/tacit-mining
```

小互做这个skill的出发点很有意思：你的AI不懂你，因为你最重要的判断标准——你自己也说不清楚。比如你为什么觉得这篇写得好那篇不行，为什么选这个选题不选那个？这些判断在你脑子里是直觉，从来没有被写下来过。

![[images/93c948561cff9c69577b953c4f71f2b1_MD5.png]]

基于Polanyi隐性知识理论，用结构化对话从你的行为中反推你的判断标准。覆盖五个维度：写作品味、选题直觉、产品判断、视觉审美、读者感知。挖出来的结果可以保存成你的"创作DNA"，以后让AI按你的标准干活。做内容的越做越久，越需要这种东西——不然你攒的都是文章，不是方法论。

---

### 14\. kepano · obsidian-skills — 让AI懂你的Obsidian知识库

🔗 https://github.com/kepano/obsidian-skills

安装命令：

```
npx skills add kepano/obsidian-skills
```

![[images/36bf1ddf814afea267330fadac00b4b3_MD5.png]]

如果你用Obsidian做知识管理，这个skill是必装的。

Obsidian CEO kepano亲自做的，教AI正确处理Obsidian特有的格式——wiki链接\[笔记名\]不会被当成错误、frontmatter元数据正确读写、Bases数据库结构和视图、Canvas画布节点和连线。

装之前AI会把你的\[链接\]当成死链接，装之后能直接在你的知识库里读写笔记、搜索关联、批量整理。

对于把Obsidian当第二大脑的人来说，这相当于给AI装上了你知识库的驱动程序。

一个细节：支持Obsidian Flavored Markdown的全部语法，包括callout、标签嵌套、嵌入块。

---

### 15\. coffee · csv-data-summarizer — 一行命令分析CSV

🔗 https://github.com/coffeefuelbump/csv-data-summarizer-claude-skill

安装命令：

```
npx skills add coffeefuelbump/csv-data-summarizer-claude-skill
```

做内容的人经常要跟数据打交道——后台导出的用户数据、公众号后台的阅读量表格、广告投放的转化率CSV。

以前得开Excel做透视表、手动算均值和增长率。这个技能一行命令搞定：自动识别每一列的类型（数值、日期、文本），计算均值/中位数/标准差/分布区间，抓出异常值和缺失值，生成可视化图表。

对数字头疼的文科生尤其友好——你只需要把文件路径给它，剩下的它包了。分析完直接告诉你"这组数据的核心问题是……"，省掉你在Excel里晕头转向的半小时。

---

### 16\. deusyu · translate-book — 整本书翻译

🔗 https://github.com/deusyu/translate-book

安装命令：

```
npx skills add deusyu/translate-book
```

![[images/f0bc66146ec057a74030564acd5935d3_MD5.png]]

做内容的人常常需要啃英文书、外网论文、海外行业报告。一句一句贴进翻译工具太慢，扔给通用AI又容易丢上下文——翻到第三章忘了第一章的术语怎么译的。

translate-book专门解决这个问题。支持PDF、DOCX、EPUB三种格式，用并行子代理（默认8个并发）分工处理不同章节，每个子代理有独立上下文窗口，不会因为整本书太长而丢失信息。

翻译前自动从书中抽取关键术语构建glossary.json，确保专有名词、人名、品牌名在全书翻译中保持一致。最终输出可选PDF、DOCX或EPUB，拿到的就是一本完整翻译好的书。

---

## 五、开发与创业

从创业方法论到编码工作流，四套不同维度的工具箱。

### 17\. Sahil Lavingia · 极简创业十件套

🔗 https://github.com/slavingia/skills

![[images/ce184f2d0467853ddc5b48bed950f4bf_MD5.png]]

《小而美：持续盈利的经营法则》的作者，把创业方法论做成了10个Skills：

```
Find Community — 找种子用户
Validate Idea — 验证想法
Processize — 先手工交付再写代码
MVP — 构建最小可行产品
First Customers — 前100个付费客户
Pricing — 定价策略
Marketing Plan — 内容营销
Grow Sustainably — 可持续增长
Company Values — 公司文化
Minimalist Review — 极简决策检查
```

从找社区→验证→构建→销售→定价→营销→增长，完整创业路径。"Processize（先手工再代码）"这个理念对想做SaaS但卡在开发上的人是醍醐灌顶。

---

### 18\. ReScienceLab · opc-skills — 独立开发者创业十件套

🔗 https://github.com/ReScienceLab/opc-skills

安装命令：

```
npx skills add ReScienceLab/opc-skills
```

![[images/e03172814112929334c639c199385e6a_MD5.png]]

Sahil Lavingia亲自教创业思维，10个Skill专为独立开发者设计。

```
requesthunt（需求挖掘）：从Reddit、X、GitHub发掘用户真实需求。
seo-geo（AI搜索优化）：针对ChatGPT、Perplexity等AI搜索引擎做内容优化。
domain-hunter（域名猎手）：搜索域名、比价、找优惠码，一站式搞定。
logo-creator / banner-creator：Logo和横幅一键生成，基于nanobanana引擎。
nanobanana（AI生图）：Gemini 3 Pro Image驱动。
reddit / twitter：直接从Reddit和X搜索、抓取内容，做竞品调研和趋势跟踪。
producthunt（产品发现）：搜索Product Hunt帖子、话题、用户，竞品分析和灵感获取。
archive（知识存档）：对话学习自动归档，构建可检索的知识库。
```

包含从需求验证→域名→Logo→横幅→SEO→知识管理，独立开发者从零到一的工具链。

---

### 19\. Matt Pocock · mattpocock-skills — 工程化编码工作流

🔗 https://github.com/mattpocock/skills

安装命令：

```
npx skills@latest add mattpocock/skills
```

Matt Pocock是TypeScript领域最有名的教育者之一，Total TypeScript作者。

他的20多个Skill核心哲学是"Process over Prompt"——不让AI上来就直接写代码，而是先确认需求、拆解任务、设计方案、写测试，再动手实现。

覆盖从需求分析→架构设计→代码生成→测试→代码审查→文档生成的完整链路。跟直接让AI写代码的区别在于：你拿到的不只是一段能跑的代码，而是一套可维护、可复现的工程化产出。

即使你不是专业程序员，偶尔让AI帮你写个脚本、搭个小工具，这套流程也能让你少踩很多坑。

---

### 20\. jnMetaCode · superpowers-zh — AI编程超能力中文版

🔗 https://github.com/jnMetaCode/superpowers-zh

安装命令：

```
npx superpowers-zh
```

superpowers是GitHub上最火的AI编程提示词集之一。

jnMetaCode做了中文增强版——不仅是全文汉化，还专门为国内开发者加了6个专属Skill：中文代码审查规范（按国内团队习惯来）、Gitee和Coding.net平台支持、中文注释和文档生成规范、中文排版适配、国内云服务API适配。

自动识别你当前用的是Claude Code、Cursor、Windsurf还是其他14款AI编程工具，20个Skill全配好。对英文不太熟的开发者来说，比啃原版superpowers的效率高太多了。即使你是编程老手，里面那些经过社区验证的中文Prompt模板也能让你少打很多字。

最后，再贴一次速查表方便回看：

![[images/ab6b75e5f46f2472e9747e8fa8e25812_MD5.png]]

---

写在最后

推荐了那么多Skills，最后想说几句真心话。

别贪多。如果一口气装完所有的，大概率一个都用不起来。挑2-3个跟你现在最相关、最能解决眼前问题的，先用起来，用顺了再加。装一堆不用的Skills不仅占空间，还会让你的Agent在每次对话里翻一遍所有Skill描述，反而拖慢响应速度。

看一眼源码再装。Skills本质上是别人写的代码和指令集，理论上可以做任何事。大部分创作者开源都是真心分享，但基本的警惕要有——先点进GitHub仓库看看README、看看文件结构、看看Issues里有没有人报问题。花叔、卡兹克、归藏这些有粉丝基础的Skills安全性更有保障，但哪怕是你信任的人，也值得花两分钟扫一眼。

保持更新。Skills圈发展极快，很多仓库一周能更新好几次。装了之后偶尔关注一下原仓库的Release，看看有没有新功能、修了什么bug。也可以定期让Agent帮你git pull更新。

别把工具当拐杖。好朋友袋鼠帝这句话我很认同——"AI只是辅助创作，它并不能替代你的审美、你的价值判断、你的网感。核心还是账号背后的我们。"Skills帮你省时间、帮你避坑、帮你把想法落地，但它不能替你想选题、不能替你感受读者情绪、不能替你判断"这句话对不对味"。

最好的Skill是你自己做的那一个。别人的Skill再好，也是按别人的习惯设计的。用了一段时间后，你一定会发现有些地方不顺手、有些流程不适应。这时候不要去抱怨，自己马上去改。哪怕只是改一个Prompt、加一个步骤——你改过的那版，就是最适合你的版本。

装起来，用起来，改起来。

---

![[images/cdb1c0cdba31f03928e1d916a3a64d46_MD5.jpg|cover_image]]

Original 小栗子 沃垠AI

---

内容效果不满意？[点此反馈](https://feedback.notebooksyncer.com/feedback/34ec70a9_1779772311548?u=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzIwMTU5OTQ1Nw%3D%3D%26mid%3D2653726780%26idx%3D1%26sn%3Dc372bbdcc52eb2254d40cd42f09e8288%26chksm%3D8c52035d0dba83db65fde68b60f74e7daf09b2dbb47c1ed9f60b8c1e07d31f251c62e22529ce%26mpshare%3D1%26scene%3D1%26srcid%3D0526uecO3RsVXfoCLGVYFzrx%26sharer_shareinfo%3D9c0480af9440ce07dcda852b02305a35%26sharer_shareinfo_first%3D9c0480af9440ce07dcda852b02305a35%23rd&s=obsidian)