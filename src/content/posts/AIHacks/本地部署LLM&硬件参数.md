---
title: LLM本地部署
published: 2026-05-07
tags:
  - LLM
  - 本地部署
category: AIHacks
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260507191110816.png
---

> 随着大语言模型的开源生态日趋成熟，本地部署不再是极客的专属游戏。本文精选**国产开源大模型**，按显卡显存分档，给出硬件建议与部署方案。无论你是想用 RTX 4060 Ti 跑日常文案，还是用 RTX 4090 跑编程 Agent，都能找到适合的配置。

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260507191110816.png)

## 一、旗舰梯队（多卡/服务器级）

> ⚠️ **注意**：以下模型参数量极大，**单张 RTX 4090 无法运行**，需要多卡 A100/H100 集群或服务器级配置。适合企业、实验室或重度发烧友。

### 1. 小米 MiMo-V2.5-Pro
- **架构**：MoE，总参 309B / 激活 15B，上下文 1M tokens（2026年4月开源，MIT 协议）
- **核心优势**：代码/数学推理顶尖，超长上下文，MoE 高效稀疏架构
- **开源地址**：[HuggingFace](https://huggingface.co/XiaomiMiMo/MiMo-V2.5-Pro) / [魔搭](https://www.modelscope.cn/models/XiaomiMiMo/MiMo-V2.5-Pro) / [AtomGit](https://ai.atomgit.com/XiaomiMiMo/MiMo-V2.5-Pro)
- **硬件**：单卡最低 RTX 4090 24GB（INT4 量化，约 18GB 显存）；推荐 2×A100 40GB 或 4×RTX 4090（长上下文/高并发）；内存 ≥64GB
- **部署**：SGLang / vLLM

### 2. 月之暗面 Kimi-K2.6
- **架构**：MoE，总参 1T，上下文 128K tokens（2026年4月开源）
- **核心优势**：代码 Agent 能力顶尖，综合均衡，长文档处理强
- **开源地址**：[HuggingFace](https://huggingface.co/moonshotai/Kimi-K2.6)
- **硬件**：预计需多卡 A100/H100 集群（具体配置待社区验证）；内存 ≥128GB
- **部署**：vLLM / SGLang

### 3. DeepSeek-V4-Pro
- **架构**：MoE，总参 1.6T / 激活 49B，上下文 1M tokens
- **核心优势**：数学推理、代码逻辑顶尖，思维链（CoT）表现优异
- **开源地址**：[deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- **硬件**：最低 16×H100 80GB（FP8，约 500GB 显存）；推荐 32×H100 80GB 集群；内存 ≥512GB
- **部署**：vLLM / SGLang

### 4. 智谱 GLM-5.1
- **架构**：MoE，总参 754B，长上下文（2026年4月开源，MIT 协议）
- **核心优势**：编程能力全球第一（SWE-bench Pro 58.4 分），中文理解强
- **开源地址**：[HuggingFace](https://huggingface.co/ZhipuAI/GLM-5.1) / [魔搭](https://www.modelscope.cn/models/ZhipuAI/GLM-5.1)
- **硬件**：最低 8×H100 80GB（INT4，约 380GB 显存）；推荐 16×H100 80GB 集群；内存 ≥512GB
- **部署**：vLLM / SGLang

---

## 二、高性能梯队（单卡 RTX 4090 可跑）

> RTX 4090/5090D 24GB · 编程 / 长文档 / Agent

### 1. DeepSeek-V4-Flash
- **架构**：MoE，总参 284B / 激活 13B，上下文 1M tokens
- **核心优势**：性价比版旗舰，推理成本低，适合个人开发者
- **开源地址**：[deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)
- **硬件**：单卡 RTX 4090 24GB（INT4，约 55GB 显存——需配合内存 Offload 或更高压缩量化）；推荐 2×RTX 4090 或 A100 80GB；内存 ≥64GB
- **部署**：vLLM / Ollama（需量化）

### 2. 阿里 Qwen 3.6-35B-A3B
- **架构**：MoE，总参 35B / 激活 3B，上下文 128K tokens（2026年4月开源，Apache 2.0）
- **核心优势**：消费级天花板，中文/代码/推理均衡，支持思考模式
- **开源地址**：[HuggingFace](https://huggingface.co/Qwen/Qwen3.6-35B-A3B) / [魔搭](https://www.modelscope.cn/models/Qwen/Qwen3.6-35B-A3B)
- **硬件**：单卡 RTX 4090 24GB（INT4，约 18GB 显存）满血运行；内存 ≥32GB
- **部署**：Ollama / vLLM / llama.cpp

### 3. 阿里 Qwen3-14B-Instruct
- **架构**：稠密 Transformer，14B，上下文 128K tokens
- **核心优势**：16GB 显存机型综合天花板，中文/代码/推理均衡，Qwen3 系列支持思考模式
- **开源地址**：[Qwen/Qwen3-14B-Instruct](https://huggingface.co/Qwen/Qwen3-14B-Instruct) / [魔搭](https://www.modelscope.cn/models/Qwen/Qwen3-14B-Instruct)
- **硬件**：最低 RTX 4060 Ti 16GB（INT4）；推荐 RTX 4090 24GB（可跑 FP16）；内存 ≥32GB
- **部署**：Ollama / vLLM / llama.cpp

### 4. 阿里 Qwen2.5-32B-Instruct
- **架构**：稠密 Transformer，32B，上下文 128K tokens
- **核心优势**：32B 中大参数，综合性能强，显存友好
- **开源地址**：[Qwen/Qwen2.5-32B-Instruct](https://huggingface.co/Qwen/Qwen2.5-32B-Instruct) / [魔搭](https://www.modelscope.cn/models/Qwen/Qwen2.5-32B-Instruct)
- **硬件**：最低 RTX 4080 16GB（INT4）；推荐 RTX 4090 24GB；内存 ≥32GB
- **部署**：vLLM / Ollama

---

## 三、入门梯队

> 8~16GB 显存 · 轻量对话 / 简单任务

| 模型 | 开源地址 | 最低显存 | 特点 |
|------|----------|----------|------|
| **阿里 Qwen3-8B-Instruct** | [Qwen/Qwen3-8B-Instruct](https://huggingface.co/Qwen/Qwen3-8B-Instruct) | RTX 4060 8GB (INT4) | 性价比极高，8GB 显存可流畅运行 |
| **深度求索 DeepSeek-R1-7B** | [deepseek-ai/DeepSeek-R1-Distill-Qwen-7B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-7B) | RTX 4060 8GB (INT4) | 数学推理突出，蒸馏版轻量高效 |
| **智谱 GLM-4-9B-Chat** | [ZhipuAI/glm-4-9b-chat](https://huggingface.co/ZhipuAI/glm-4-9b-chat) / [魔搭](https://www.modelscope.cn/models/ZhipuAI/glm-4-9b-chat) | RTX 4060 Ti 16GB | 逻辑推理强，长对话稳定，适合办公日常 |
| **智谱 GLM-4-4B-Chat** | [ZhipuAI/glm-4-4b-chat](https://huggingface.co/ZhipuAI/glm-4-4b-chat) | 6GB 显存 (INT4) | 超轻量入门，低显存设备友好 |

---

## 四、显卡适配速览

| 显卡配置 | 可流畅运行最强国产模型 | 主机预算参考 |
|----------|------------------------|---------------|
| RTX 4060 Ti 16GB | Qwen3-14B、GLM-4-9B | 7000-10000 元 |
| RTX 4090 / 5090D 24GB | Qwen 3.6-35B-A3B、DeepSeek-V4-Flash（需量化） | 15000-20000 元 |
| 2×RTX 4090 24GB | DeepSeek-V4-Flash 满血、MiMo-V2.5-Pro | 30000-40000 元 |
| 8×H100 80GB | GLM-5.1、DeepSeek-V4-Pro | 80万-120万元 |

---

## 五、通用部署规范

1. **量化方案**：消费级显卡推荐 **INT4 (Q4_K_M)**，在质量和显存占用间取得最佳平衡；服务器级可尝试 FP8/BF16
2. **内存搭配**：建议系统内存 ≥ 显存 × 2（如 24GB 显存配 64GB 内存）。大模型（100B+）建议内存 ≥ 显存 × 4
3. **部署工具**：
   - **Ollama**：一键部署、CLI 友好，适合 30B 以下模型
   - **vLLM**：高吞吐量推理框架，适合 72B+ 大模型
   - **SGLang**：适合 MoE 架构模型（如 MiMo、DeepSeek-V4）
   - **llama.cpp**：纯 CPU / Apple Silicon 推理首选
4. **系统环境**：推荐 Ubuntu 22.04 + CUDA 12.4+；Windows 11 也可运行，但 Linux 性能更优

---

## 六、硬件检测工具

在正式部署前，建议先用以下工具评估本机硬件的模型运行能力：

| 工具                                                                               | 类型  | 特点                                            |
| -------------------------------------------------------------------------------- | --- | --------------------------------------------- |
| [llmfit](https://github.com/AlexsJones/llmfit)                                   | CLI | 实时检测 CPU/RAM/GPU/VRAM，结合模型数据库直接给出可运行模型及推荐量化版本 |
| [whichllm](https://github.com/Andyyyy64/whichllm)                                | CLI | 这个工具把基准测试和硬件匹配做得像查配置表                         |
| [BenchLoop](https://x.com/berryxia/status/2054390836721553487)                   | CLI | 本地大模型进行基准测试                                   |
| [llm-capability-checker](https://github.com/random-llama/llm-capability-checker) | gui | 图形界面显示0-100分硬件评分，提供瓶颈分析，分级推荐模型\|              |
| [AIBase PC 检测](https://model.aibase.com/zh/tools/pc-check)                       | 在线  | 快速检查设备能否运行不同规模模型，无需安装                         |
| [Can I Run AI?](https://www.canirun.ai/)                                         | 在线  | 主流大模型兼容性检查                                    |

---

## 延伸阅读

- [Ollama 官方文档](https://github.com/ollama/ollama) — 主流本地大模型运行时
- [vLLM](https://github.com/vllm-project/vllm) — 高吞吐量推理框架，适合 72B+ 大模型
- [llama.cpp](https://github.com/ggerganov/llama.cpp) — 纯 CPU/Apple Silicon 推理首选
- [SGLang](https://github.com/sgl-project/sglang) — 适合 MoE 架构的高效推理框架
- **[OpenCompass](https://opencompass.org.cn/leaderboard-llm-v2)**:开源评测框架


> **提示**：实际显存需求受量化精度、上下文长度、batch size 影响。本文数据基于 INT4 量化、单 batch、默认上下文长度估算。如需长上下文（64K+），建议显存预留额外 4-8GB。MoE 模型的显存占用需同时考虑总参数量和激活参数量，建议使用 vLLM 或 SGLang 以获得最佳效率。



### 开源模型

### MiniMax H3 本地运行门槛大降！
GGUF 量化版来了 Q2 量化版本仅 8.49 GB，
主流消费级显卡（如 RTX 3060 12G）也能轻松跑起来！以前跑本地视频生成模型极吃显存，
现在轻量化方案（GGUF / nvfp4）百花齐放，本地生成视频终于接地气了。
https://huggingface.co/realrebelai/MiniMax-H3_GGUFs/tree/main