---
title: "ComfyUI工作流：基于Stable Diffusion生成图像的详细流程"
created: 2025-03-15 15:14:34
tags:
  - 图片笔记
  - ComfyUI
  - Stable_Diffusion
  - 图像生成
  - AI工具
---

![tmp_95c23a757b4ef9e48091c0197ff5d516.jpg](<01-输入/02-get笔记/get attachment/getnotes_img_19f54a3640001568.jpg>)

这是一张展示如何使用ComfyUI工具进行Stable Diffusion图像生成的工作流示意图。以下是该工作流的详细步骤和模块说明：
1. **UNet模块**
- 使用了`luz1-dye-dpl_safe6ensons`模型作为UNet的基础。
- 该模块负责对潜变量进行处理，生成最终图像的细节。
1. **CLIP Text Encode模块**
	- 输入了一个正向提示词（Positive Prompt），内容为： `sophisticated and elegant young woman sits poised on a plush sofa, wearing a delicate and stylish beige dress, soft lighting, cinematic atmosphere, professional studio photography, ultra-realistic, intricate details, photorealistic.`
	- 该模块用于将文本提示转化为潜变量，提供生成图像的语义信息。
2. **VAE解码模块**
	- 使用了`vae_safe6ensons`模型。
	- 将潜变量解码为实际的图像数据。
3. **随机种子生成模块**
	- 设置了随机种子值为`4650377c8278fb`，以确保生成图像的随机性和可重复性。
4. **分辨率设置模块**
	- 图像宽度和高度均设置为1024像素，确保生成高分辨率图像。
5. **基础引导模块（Flux引导）**
	- 设置了引导强度为3.5，控制生成图像时对提示词的依赖程度。
6. **潜变量处理模块**
	- 通过多个节点对潜变量进行操作，包括调整宽高、随机性以及与其他模块的连接。
7. **保存图像模块**
	- 最终生成了一张分辨率为1024x1024的图像，展示了一位优雅的女性坐在沙发上的场景，符合提示词描述。
8. **注意事项**
	- 图中包含一个Note节点，提示如果上述模块出现错误，可参考以下文档解决： `ComfyUI教程文档： https://github.com/comfyanonymous/ComfyUI`
	- 提供了错误排查和配置文件路径的说明。