---
title: 封装生图skill
published: 2026-06-17
tags:
  - skill
  - Gemini
  - image
  - tutorial
category: AIHacks
draft: false
pinned: false
image: 
---


自动识别领域（人像/艺术/设计/产品/视频），调用对应专家
https://github.com/huangserva/skill-prompt-generator




逆向gemini网页接口，调用Nano Banana 模型，Agent调网页版生图 → 下载本地
https://github.com/HanaokaYuzu/Gemini-API

```bash
# 1. 装依赖（python-dotenv 用于读 .env，脚本会自动尝试导入）
pip install -U gemini_webapi python-dotenv

# 2. 配 cookie
#    浏览器无痕窗口登录 防风控  gemini.google.com
#    F12 → Application → Cookies → 复制 __Secure-1PSID 和 __Secure-1PSIDTS
#    把 .env.example 复制为 .env，填进去

# 3. 验证
python scripts/gemini_image_gen.py gen "Generate a small black creature holding a sign that says 测试"
```

