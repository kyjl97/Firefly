---
title: 零基础AI学习路线：5大领域 + 一个月速成计划
published: 2026-05-29
tags:
  - ai-learning
  - roadmap
  - skill
category: AIHacks
draft: false
pinned: true
image:
---

> 面向完全零基础的 AI 小白，从实用角度出发，选出 2026 年最值得投入的 AI 方向。附带一个月学习计划和精选 YouTube 视频。

---

## 一、五大 AI 学习方向总览

### 🔥 必须掌握（4个方向）

| # | 方向 | 一句话定位 | 为什么必须学 |
|---|------|-----------|-------------|
| 1 | **Prompt Engineering 与 AI 基础素养** | 学会跟 AI 高效对话 | 2026 年所有岗位的通用底层技能，门槛最低、回报最快 |
| 2 | **AI Agent 开发** | 让 AI 自主执行任务 | 2025-2026 最火赛道，企业招聘需求暴涨 |
| 3 | **RAG 系统构建** | 让 AI 基于你的数据回答 | 企业级 AI 应用的核心架构，几乎每个 AI 产品都用到 |
| 4 | **LLM 微调（Fine-Tuning）** | 训练专属 AI 模型 | 高薪技能，能把通用模型变成行业专家 |

### 🚀 进阶储备（1个方向）

| # | 方向 | 一句话定位 | 为什么提前布局 |
|---|------|-----------|-------------|
| 5 | **多模态 AI（Multimodal）** | AI 同时理解文字+图片+视频+语音 | 下一波技术浪潮的核心，2026 年正在爆发 |

---

## 二、各方向详细解读

### 方向 1：Prompt Engineering 与 AI 基础素养

**什么是 Prompt Engineering？**

简单说就是"怎么跟 AI 说，它才能给你最好的答案"。这不是随便打几个字就行的——同样的问题，不同的问法，AI 输出的质量可以差 10 倍。

**为什么要学？**
- 2026 年，**所有岗位**都在要求"AI 素养"（AI Literacy）
- 学会 Prompt Engineering，你使用任何 AI 工具都能事半功倍
- 不需要写代码，零基础第一天就能上手

**核心学习内容：**
- 基础提示词技巧（角色设定、上下文控制、输出格式约束）
- Chain-of-Thought（让 AI 分步推理）
- Few-Shot Learning（给 AI 举例学习）
- 系统级 Prompt 设计（System Prompt 架构）

**推荐学习资源：**
| 资源 | 类型 | 说明 |
|------|------|------|
| [DeepLearning.AI: AI Prompting for Everyone](https://www.deeplearning.ai/courses/) | 免费短课 | Andrew Ng 出品，最权威入门 |
| [OpenAI: ChatGPT Prompt Engineering for Developers](https://www.deeplearning.ai/courses/chatgpt-prompt-engineering-for-developers/) | 免费短课 | OpenAI 官方教学，30分钟搞定 |
| [Prompt Engineering Guide](https://www.promptingguide.ai/) | 开源文档 | 最全面的提示词工程指南 |

---

### 方向 2：AI Agent 开发

**什么是 AI Agent？**

传统 AI 只能"你问我答"。AI Agent 是能**自主规划、使用工具、完成复杂任务**的 AI 系统。比如你对 Agent 说"帮我分析竞品并生成报告"，它会自己搜索数据、写代码分析、生成图表、输出文档——全程不需要你干预。

**为什么要学？**
- 2025-2026 年 AI Agent 是**最热门赛道**，没有之一
- OpenAI、Google、Anthropic 都在重押 Agent 方向
- 企业正在从"用 ChatGPT 聊天"转向"用 Agent 自动化业务"
- 招聘市场上 AI Agent 开发工程师薪资远高于普通开发

**核心学习内容：**
- Agent 架构设计（ReAct、Plan-and-Execute 等范式）
- 工具调用（Function Calling / Tool Use）
- 多 Agent 协作系统（CrewAI、AutoGen、LangGraph）
- MCP（Model Context Protocol）协议
- Computer Use（AI 操控浏览器/桌面）

**推荐学习资源：**
| 资源 | 类型 | 说明 |
|------|------|------|
| [DeepLearning.AI: Agentic AI](https://www.deeplearning.ai/courses/) | 免费短课 | Andrew Ng 出品，Agent 入门必看 |
| [Anthropic: Agent Skills](https://www.deeplearning.ai/courses/) | 免费短课 | Claude Agent 官方教程 |
| [LangGraph 官方文档](https://langchain-ai.github.io/langgraph/) | 文档 | Agent 开发的事实标准框架 |

---

### 方向 3：RAG 系统构建

**什么是 RAG？**

RAG（Retrieval-Augmented Generation，检索增强生成）解决了一个核心问题：**AI 的知识是过时的，它不知道你的私有数据**。

RAG 的原理是：先从你的文档库中检索相关信息，然后把检索结果交给 LLM 生成回答。比如公司内部知识库、个人笔记库、产品文档——通过 RAG，AI 就能基于这些私有数据精准回答问题。

**为什么要学？**
- 几乎**所有企业级 AI 产品**都用到 RAG
- RAG 工程师是目前最热门的 AI 岗位之一
- 个人也可以用 RAG 搭建自己的"第二大脑"

**核心学习内容：**
- 向量数据库（Pinecone、Chroma、Weaviate）
- 文档切片与 Embedding 策略
- 检索优化（混合搜索、重排序）
- Agentic RAG（Agent + RAG 的进阶组合）
- 评估与调试（RAGAS、TruLens）

**推荐学习资源：**
| 资源 | 类型 | 说明 |
|------|------|------|
| [LangChain: RAG from Scratch](https://www.youtube.com/playlist?list=PLfaIDREXDKrkrRjBlazqDfzYjU_iY4dKu) | YouTube 系列 | LangChain 官方，从零手写 RAG |
| [DeepLearning.AI: Building and Evaluating Advanced RAG](https://www.deeplearning.ai/courses/) | 免费短课 | LlamaIndex + TruEra 联合出品 |
| [DeepLearning.AI: Retrieval Augmented Generation](https://www.deeplearning.ai/courses/) | 免费短课 | RAG 全流程实战 |

---

### 方向 4：LLM 微调（Fine-Tuning）

**什么是 Fine-Tuning？**

如果 Prompt Engineering 是"教 AI 怎么说话"，Fine-Tuning 就是"教 AI 新的知识"。通过在特定数据集上训练，让通用大模型变成**你行业的专家**。比如让 ChatGPT 懂医学术语、让 AI 能理解你的代码风格等。

**为什么要学？**
- 2026 年企业越来越需要**定制化 AI**
- 微调工程师是高薪稀缺岗位
- LoRA/QLoRA 等技术让微调成本暴降，普通开发者也能玩

**核心学习内容：**
- 有监督微调（SFT）
- LoRA / QLoRA 高效微调技术
- RLHF（人类反馈强化学习）
- 数据准备与清洗
- Unsloth、Hugging Face Transformers 实战

**推荐学习资源：**
| 资源 | 类型 | 说明 |
|------|------|------|
| [DeepLearning.AI: Finetuning Large Language Models](https://www.deeplearning.ai/courses/) | 免费短课 | AMD + Meta 出品，LoRA 实战 |
| [DeepLearning.AI: RLHF](https://www.deeplearning.ai/courses/) | 免费短课 | Google Cloud 出品，RLHF 原理 |
| [Unsloth 文档](https://unsloth.ai/) | 工具 | 最流行的高效微调框架 |

---

### 方向 5：多模态 AI（进阶储备）

**什么是多模态 AI？**

2025 年之前，大部分 AI 只能处理文字。多模态 AI 能**同时理解文字、图片、音频、视频**，就像人类用眼睛看、耳朵听、嘴巴说一样。

**为什么现在就要了解？**
- OpenAI Sora 2（AI 视频生成）、Google Veo 3 等产品已经发布
- GPT-4o、Gemini 2.0 都是原生多模态模型
- 2026-2027 年，多模态 AI 将重塑内容创作、教育、医疗等行业
- 提前布局，未来转型成本更低

**核心学习内容：**
- 多模态模型架构（Vision Transformer、CLIP、Flamingo）
- 文生图（Stable Diffusion、DALL-E、Midjourney）
- 文生视频（Sora 2、Veo 3、Runway）
- 语音 AI（Whisper、ElevenLabs）

---

## 三、NotebookLM 笔记本搭建指南

> ⚠️ **重要提示**：NotebookLM 是 Google 的产品（[notebooklm.google.com](https://notebooklm.google.com)），需要 Google 账号登录。我无法自动帮你创建笔记本，但下面给出**每个笔记本的完整搭建步骤和资料清单**，你可以快速复制。

### 笔记本 1：Prompt Engineering 与 AI 基础素养

**笔记本名称**：`AI 基础素养 - Prompt Engineering`

**添加以下 Sources（源文件）：**

| # | 来源类型 | 具体内容 | 操作 |
|---|---------|---------|------|
| 1 | 网页 | [promptingguide.ai](https://www.promptingguide.ai/) | 粘贴 URL |
| 2 | 网页 | [DeepLearning.AI Courses 页面](https://www.deeplearning.ai/courses/) | 粘贴 URL |
| 3 | YouTube | 搜索 "Prompt Engineering Tutorial freeCodeCamp" 添加视频 | 粘贴 URL |
| 4 | YouTube | 搜索 "ChatGPT Prompt Engineering for Developers DeepLearning.AI" | 粘贴 URL |
| 5 | 文本 | 复制以下内容到"粘贴文本"：

```
Chain-of-Thought Prompting 核心要点：
1. 让AI逐步推理，而非直接给答案
2. 在Prompt中加入"Let's think step by step"
3. Few-shot示例：给出带推理过程的例子
4. Zero-shot CoT：仅加"Think carefully"即可提升

常用Prompt框架：
- RTF框架：Role（角色）+ Task（任务）+ Format（格式）
- CO-STAR框架：Context + Objective + Style + Tone + Audience + Response
- 结构化Prompt：System Message + User Message + Constraints
```
| 粘贴文本 |

---

### 笔记本 2：AI Agent 开发

**笔记本名称**：`AI Agent 开发指南`

**添加以下 Sources：**

| # | 来源类型 | 具体内容 | 操作 |
|---|---------|---------|------|
| 1 | 网页 | [LangChain Agent 文档](https://python.langchain.com/docs/concepts/agents/) | 粘贴 URL |
| 2 | 网页 | [LangGraph 文档](https://langchain-ai.github.io/langgraph/) | 粘贴 URL |
| 3 | YouTube | 搜索 "Agentic AI Andrew Ng DeepLearning.AI" | 粘贴 URL |
| 4 | YouTube | 搜索 "AI Agent Tutorial for Beginners Mervin Praison" | 粘贴 URL |
| 5 | YouTube | 搜索 "CrewAI Tutorial Multi Agent" | 粘贴 URL |
| 6 | 文本 | 粘贴文本：

```
AI Agent 核心概念：
1. Agent = LLM + Tools + Memory + Planning
2. ReAct模式：Reasoning + Acting 交替执行
3. Plan-and-Execute：先规划再执行
4. Multi-Agent：多个Agent协作完成任务

主流框架对比：
- LangGraph：LangChain出品，图结构编排，最灵活
- CrewAI：角色扮演式多Agent，上手快
- AutoGen：微软出品，适合企业级
- Anthropic Agent：Claude生态，Computer Use能力强

MCP协议：
- Model Context Protocol，Anthropic提出的开放标准
- 让AI连接外部工具和数据的标准接口
- 2026年已成为行业事实标准
```
| 粘贴文本 |

---

### 笔记本 3：RAG 系统构建

**笔记本名称**：`RAG 检索增强生成`

**添加以下 Sources：**

| # | 来源类型 | 具体内容 | 操作 |
|---|---------|---------|------|
| 1 | 网页 | [LlamaIndex 文档](https://docs.llamaindex.ai/) | 粘贴 URL |
| 2 | 网页 | [ChromaDB 文档](https://docs.trychroma.com/) | 粘贴 URL |
| 3 | YouTube | 搜索 "RAG from Scratch LangChain YouTube" | 粘贴 URL |
| 4 | YouTube | 搜索 "Building and Evaluating Advanced RAG DeepLearning.AI" | 粘贴 URL |
| 5 | 文本 | 粘贴文本：

```
RAG 系统架构：
1. 文档加载 → 2. 文本切片 → 3. Embedding向量化 → 4. 存入向量数据库
5. 用户提问 → 6. 问题向量化 → 7. 相似度检索 → 8. 检索结果+问题送入LLM → 9. 生成回答

关键优化技术：
- 混合搜索（Hybrid Search）：向量搜索 + 关键词搜索结合
- 重排序（Re-ranking）：用Cross-encoder对结果二次筛选
- Chunk优化：合理设置切片大小和重叠
- Query改写：将用户问题改写为更精准的检索查询
- Agentic RAG：让Agent决定何时检索、检索什么

向量数据库选择：
- Chroma：开源、轻量、适合原型
- Pinecone：全托管、适合生产
- Weaviate：开源、支持混合搜索
- Qdrant：开源、高性能
```
| 粘贴文本 |

---

### 笔记本 4：LLM 微调（Fine-Tuning）

**笔记本名称**：`LLM 微调实战`

**添加以下 Sources：**

| # | 来源类型 | 具体内容 | 操作 |
|---|---------|---------|------|
| 1 | 网页 | [Hugging Face Transformers 文档](https://huggingface.co/docs/transformers/) | 粘贴 URL |
| 2 | 网页 | [Unsloth 文档](https://unsloth.ai/) | 粘贴 URL |
| 3 | YouTube | 搜索 "LLM Fine Tuning Course freeCodeCamp" | 粘贴 URL |
| 4 | YouTube | 搜索 "Fine-Tuning LLMs in 2025 sami malik" | 粘贴 URL |
| 5 | YouTube | 搜索 "19 Tips to Better AI Fine Tuning Matt Williams" | 粘贴 URL |
| 6 | 文本 | 粘贴文本：

```
LLM 微调路线：
1. SFT（有监督微调）：用标注数据教模型回答格式
2. LoRA/QLoRA：只训练少量参数，大幅降低显存需求
   - LoRA：在权重矩阵旁插入低秩矩阵
   - QLoRA：4-bit量化 + LoRA，4GB显存即可微调7B模型
3. RLHF：人类反馈强化学习，让模型输出更符合人类偏好
4. DPO：Direct Preference Optimization，RLHF的简化版

工具选择：
- Unsloth：最流行的高效微调框架，速度提升2-5倍
- Hugging Face TRL：官方RLHF工具
- Axolotl：一站式微调框架

数据准备要点：
- 格式：instruction-input-output 三元组
- 质量 > 数量：1000条高质量数据 > 10万条垃圾数据
- 清洗：去重、去噪、格式统一
```
| 粘贴文本 |

---

### 笔记本 5：多模态 AI（进阶）

**笔记本名称**：`多模态 AI 前沿`

**添加以下 Sources：**

| # | 来源类型 | 具体内容 | 操作 |
|---|---------|---------|------|
| 1 | YouTube | 搜索 "Introducing Sora 2 OpenAI" | 粘贴 URL |
| 2 | YouTube | 搜索 "What is Multimodal AI Beginner Guide" | 粘贴 URL |
| 3 | YouTube | 搜索 "Stanford CS231N Deep Learning Computer Vision 2025" | 粘贴 URL |
| 4 | 网页 | [Stable Diffusion 官方文档](https://stability.ai/) | 粘贴 URL |
| 5 | 文本 | 粘贴文本：

```
多模态AI技术栈：
- 文本理解：GPT-4o, Gemini 2.0, Claude 3.5
- 图像生成：Stable Diffusion (SDXL/SD3.5/Flux), DALL-E 3, Midjourney
- 视频生成：Sora 2 (OpenAI), Veo 3 (Google), Runway Gen-3
- 语音AI：Whisper (语音识别), ElevenLabs (语音合成), GPT-4o语音

核心模型架构：
- Vision Transformer (ViT)：将图像切分为patch，用Transformer处理
- CLIP：对比学习，连接文本和图像的桥梁
- Diffusion Model：从噪声中逐步生成图像/视频

2026年关键趋势：
1. 原生多模态：模型从训练开始就同时学习多种模态
2. 实时交互：GPT-4o语音可以实时对话，延迟<500ms
3. 视频理解：模型可以"看懂"长视频并回答问题
4. 世界模型：AI通过视频学习物理世界的规律
```
| 粘贴文本 |

---

### NotebookLM 信息图制作

在每个笔记本中：
1. 点击右下角 **"生成"** 按钮
2. 选择 **"信息图"（Infographic）**
3. NotebookLM 会根据你的 Sources 自动生成可视化信息图
4. 生成后点击 **"分享"** 获取链接

---

## 四、一个月学习计划

> 每周约 **10-15 小时**，每天 1.5-2 小时。

### 第 1 周（5/29 - 6/4）：Prompt Engineering + AI 基础素养

**目标**：掌握所有主流 Prompt 技巧，能用 AI 提升日常工作效率。

| 日 | 任务 | 时间 | YouTube 视频 |
|----|------|------|-------------|
| 周四 | AI 基础概念 + ChatGPT/Gemini 上手体验 | 2h | [freeCodeCamp: AI for Beginners](https://www.youtube.com/watch?v=i_LwzRVP7bg) |
| 周五 | Prompt Engineering 基础：RTF、CO-STAR 框架 | 2h | [DeepLearning.AI: Prompt Engineering for Developers](https://www.youtube.com/watch?v=7RhozJCM3E8) |
| 周六 | Chain-of-Thought、Few-Shot 进阶技巧 | 2h | [freeCodeCamp: Prompt Engineering Tutorial](https://www.youtube.com/watch?v=8MhE3nIaP1c) |
| 周日 | 实战练习：用 AI 写周报、翻译、总结、写代码 | 2h | [Fireship: Prompt Engineering is NOT What You Think](https://www.youtube.com/watch?v=wWBBDOVz0gs) |
| 周三 | 复习 + 整理 NotebookLM 笔记本 1 | 1h | — |

**本周检验标准**：能用 Prompt 在 30 秒内让 AI 输出高质量的结构化内容。

---

### 第 2 周（6/5 - 6/11）：AI Agent 基础 + RAG 入门

**目标**：理解 Agent 架构，搭建第一个 RAG 应用。

| 日 | 任务 | 时间 | YouTube 视频 |
|----|------|------|-------------|
| 周四 | AI Agent 概念 + ReAct 范式 | 2h | [DeepLearning.AI: Agentic AI with Andrew Ng](https://www.youtube.com/watch?v=XzZk11Jb-6Y) |
| 周五 | LangChain 入门：Chain、Tool、Agent | 2h | [freeCodeCamp: LangChain Full Course](https://www.youtube.com/watch?v=8JtHYI67cSE) |
| 周六 | RAG 原理 + 向量数据库概念 | 2h | [LangChain: RAG from Scratch Part 1-3](https://www.youtube.com/playlist?list=PLfaIDREXDKrkrRjBlazqDfzYjU_iY4dKu) |
| 周日 | 动手搭建第一个 RAG Demo | 2h | [DeepLearning.AI: Building RAG Apps](https://www.youtube.com/watch?v=TChRTxwZpFc) |
| 周三 | 复习 + 整理 NotebookLM 笔记本 2 & 3 | 1.5h | — |

**本周检验标准**：能用自己的文档搭建一个简单的问答机器人。

---

### 第 3 周（6/12 - 6/18）：RAG 进阶 + Fine-Tuning 入门

**目标**：掌握 RAG 优化技术，理解微调全流程。

| 日 | 任务 | 时间 | YouTube 视频 |
|----|------|------|-------------|
| 周四 | RAG 优化：混合搜索、重排序、Chunk 策略 | 2h | [LangChain: RAG from Scratch Part 4-7](https://www.youtube.com/playlist?list=PLfaIDREXDKrkrRjBlazqDfzYjU_iY4dKu) |
| 周五 | Fine-Tuning 概念 + LoRA/QLoRA 原理 | 2h | [freeCodeCamp: LLM Fine-Tuning Course](https://www.youtube.com/watch?v=CcrC5zSv1iA) |
| 周六 | Unsloth 实战：微调一个小模型 | 2h | [sami malik: Fine-Tuning LLMs in 2025](https://www.youtube.com/watch?v=7ZlMMbHAXUo) |
| 周日 | RLHF + DPO 概念理解 | 2h | [Matt Williams: 19 Tips to Better AI Fine Tuning](https://www.youtube.com/watch?v=W2QuK9TwYXs) |
| 周三 | 复习 + 整理 NotebookLM 笔记本 4 | 1.5h | — |

**本周检验标准**：能用自己的数据集微调一个开源小模型并测试效果。

---

### 第 4 周（6/19 - 6/25）：项目实战 + 职业规划

**目标**：完成一个完整 AI 项目，规划下一步学习路径。

| 日 | 任务 | 时间 | YouTube 视频 |
|----|------|------|-------------|
| 周四 | 多模态 AI 速览：了解图像/视频生成现状 | 2h | [OpenAI: Introducing Sora 2](https://www.youtube.com/watch?v=gzneGhpXwjU) |
| 周五 | 项目实战：用 LangChain + RAG 搭建个人知识库 | 3h | [Dave Ebbelaar: Build End-to-End GenAI Project](https://www.youtube.com/watch?v=E8zpgNPx8jE) |
| 周六 | 部署上线：用 FastAPI 将项目暴露为 API | 2h | [Siddhardhan: Deploying ML Model with FastAPI](https://www.youtube.com/watch?v=EUWLdW_i0EQ) |
| 周日 | 职业规划：AI 工程师 vs ML 工程师 vs AI 产品经理 | 1.5h | [Marina Wyss: AI Engineer vs ML Engineer](https://www.youtube.com/watch?v=NmBW49OBeBU) |
| 周三 | 复习 + 整理全部 NotebookLM 笔记本 + 输出学习总结 | 2h | [Arsh Goyal: AI Engineering Roadmap 2025](https://www.youtube.com/watch?v=NpBtzz55vJE) |

**本周检验标准**：能独立完成一个 AI 应用的开发、测试、部署全流程。

---

## 五、YouTube 视频筛选说明

以上视频经过以下标准筛选：
- ✅ **发布时间**：优先 2025 年下半年 - 2026 年（标注了具体时间的已确认在 6 个月内）
- ✅ **播放量**：优先选择频道订阅量 10 万+ 的知名创作者
- ✅ **内容质量**：来自 freeCodeCamp、DeepLearning.AI、LangChain 官方等权威来源
- ✅ **适合零基础**：所有视频都有从零讲解的部分

> **注意**：部分经典视频（如 3Blue1Brown 神经网络系列）虽然发布较早，但因其无与伦比的讲解质量仍被推荐。YouTube 视频的精确播放量和发布日期需要你自行在 YouTube 上确认。

---

## 六、免费学习平台速查

| 平台 | 网址 | 特点 |
|------|------|------|
| DeepLearning.AI | deeplearning.ai/courses | 100+ 免费短课，Andrew Ng 出品 |
| freeCodeCamp | youtube.com/@freecodecamp | 5-10 小时完整课程，完全免费 |
| fast.ai | course.fast.ai | 实战导向，从代码入手 |
| Hugging Face | huggingface.co/learn | NLP/Transformer 最佳教程 |
| Kaggle | kaggle.com | 数据竞赛 + 免费 GPU + 微课程 |

---

## 七、学习建议

1. **不要贪多**：先把一个方向学扎实，再扩展下一个
2. **边学边做**：每学一个概念，立刻动手实践
3. **用 AI 学 AI**：遇到不懂的概念，直接问 ChatGPT/Claude
4. **建立知识库**：用 Obsidian 或 NotebookLM 整理笔记，方便复习
5. **加入社区**：Reddit r/LocalLLaMA、Discord AI 社群、GitHub Discussions
6. **关注趋势**：每周花 1 小时看 AI 新闻（Matt Wolfe、AI Explained 等频道）

> **最重要的一句话**：2026 年学 AI，不需要你是程序员。会用 Prompt、能搭建 RAG、理解 Agent 原理，你就已经超过了 90% 的人。
