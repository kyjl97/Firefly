---
title: Codex制作历史人物视频
published: 2026-07-03
description: 从一个历史人物名字开始，自动生成脚本、图片、首尾帧动态视频，并写入剪映草稿。
tags:
  - AI视频
  - Codex
  - 剪映
  - 自动化
category: AIHacks
draft: false
pinned: false
image:
---

这篇教程讲一个很实用的自动化流程：

你只输入一个历史人物名字，比如“诸葛亮”，然后让 AI 帮你一路生成：

1. 视频标题
2. 生平经历脚本
3. 每一段画面描述
4. 9:16 人物场景图
5. 首尾帧动态视频
6. 剪映草稿
7. 字幕、标题、背景音乐

最后你打开剪映，就能看到一个已经排好时间线的草稿。

它不是“AI 直接变出一个成片”，而是把短视频制作拆成一条流水线。每一步都有明确产物，失败了也知道卡在哪里。

## 这条流水线的原理

先讲清楚原理，后面操作就不迷糊。

整个流程可以理解成：

```text
人物名
  -> 脚本和分镜
  -> 生成图片
  -> 图片变动态视频
  -> 写入剪映草稿
  -> 人工打开剪映检查和导出
```

其中最关键的有两件事。

第一，首尾帧视频。

如果我们有 8 张图片，就可以这样组合：

```text
第 1 张图 -> 第 2 张图 = 第 1 段视频
第 2 张图 -> 第 3 张图 = 第 2 段视频
第 3 张图 -> 第 4 张图 = 第 3 段视频
...
第 7 张图 -> 第 8 张图 = 第 7 段视频
```

这就是“首尾帧”。第一张图规定视频开头，第二张图规定视频结尾，中间的动作由图生视频模型补出来。

第二，剪映草稿不是神秘文件。

剪映草稿本质上是一组 JSON 文件和素材文件。里面记录了：

- 视频素材在哪里
- 音频素材在哪里
- 字幕写什么
- 每段素材从第几秒开始，到第几秒结束
- 标题和字幕的字体、颜色、位置
- 草稿分辨率和轨道信息

`capcut-mate` 这个开源工具做的事，就是帮我们自动写这些剪映草稿文件。它不是模拟鼠标去点剪映，而是直接生成剪映能识别的草稿。

## 前置准备

下面以 Windows 为例。小白按顺序装就行。

## 1. 安装剪映专业版

先安装剪映，因为最终草稿要在剪映里打开。

官网：

```text
https://www.capcut.cn/
```

安装完成后，记住你的剪映草稿目录。一般在：

```text
C:\Users\你的用户名\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft
```

如果你不知道自己的用户名，可以打开 PowerShell，输入：

```powershell
echo $env:USERNAME
```

例如用户名是 `Administrator`，草稿目录通常就是：

```text
C:\Users\Administrator\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft
```

后面生成的草稿要放到这个目录里。

## 2. 安装 Python

`capcut-mate` 是 Python 项目，所以必须安装 Python。

建议安装 Python 3.11 或更新版本。

下载地址：

```text
https://www.python.org/downloads/
```

安装时注意勾选：

```text
Add python.exe to PATH
```

安装好以后，打开 PowerShell，检查：

```powershell
python --version
```

看到类似下面的输出就说明成功：

```text
Python 3.11.x
```

## 3. 安装 Git

Git 用来下载开源项目。

下载地址：

```text
https://git-scm.com/download/win
```

安装后检查：

```powershell
git --version
```

能看到版本号就可以。

## 4. 安装 FFmpeg

FFmpeg 用来处理视频。

如果你只是调用云端图生视频，理论上可以不装。但建议安装，因为本地测试、抽帧、转码都很有用。

最简单的方法是用 winget：

```powershell
winget install Gyan.FFmpeg
```

安装后重新打开 PowerShell，检查：

```powershell
ffmpeg -version
ffprobe -version
```

都能看到版本信息就可以。

## 5. 安装 uv

`capcut-mate` 官方推荐用 `uv` 管理 Python 依赖。

在 PowerShell 里运行：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

安装后重新打开 PowerShell，检查：

```powershell
uv --version
```

## 6. 安装 capcut-mate

找一个你准备放项目的目录，例如：

```powershell
cd D:\
mkdir ai-video-workflow
cd D:\ai-video-workflow
```

下载项目：

```powershell
git clone https://github.com/Hommy-master/capcut-mate.git
cd capcut-mate
```

安装依赖：

```powershell
uv sync
uv pip install -e .[windows]
```

启动服务：

```powershell
uv run main.py
```

启动成功后，浏览器打开：

```text
http://127.0.0.1:30000/docs
```

如果能看到 API 文档，就说明 `capcut-mate` 跑起来了。

这个工具的官方文档在这里：

```text
https://docs.jcaigc.cn/
```

常用接口有：

- `create_draft`：创建剪映草稿
- `add_videos`：添加视频
- `add_captions`：添加标题和字幕
- `add_audios`：添加音频
- `save_draft`：保存草稿

## 7. 准备 AI 接口 Key

完整流水线需要三类能力。

第一类：文本生成。

用来生成标题、人物生平脚本、画面描述。你可以用 ChatGPT、Claude、DeepSeek、豆包、Kimi 等模型。

第二类：图片生成。

用来根据画面描述生成 9:16 图片。可以用豆包 Seedream、即梦、Midjourney、可灵、通义万相等。

第三类：图生视频。

用来把两张图做成首尾帧动态视频。PDF 里用的是火山方舟里的 Seedance / 即梦接口，示例模型是：

```text
doubao-seedance-1-5-pro-251215
```

这一类接口通常需要：

- API Key
- 首帧图片 URL
- 尾帧图片 URL
- 提示词
- 视频时长
- 分辨率

注意，很多云端视频接口不接受你电脑里的本地图片路径，必须给它公网图片 URL。

所以你还需要一个图床，或者一个能把图片上传成公网链接的工具。

## 推荐目录结构

为了不乱，建议新建一个工作目录：

```text
D:\ai-video-workflow\historical-video-demo
```

里面放这些文件夹：

```text
historical-video-demo
├─ script.json
├─ images
├─ videos
├─ drafts
└─ logs
```

解释一下：

- `script.json`：保存标题、字幕、画面描述
- `images`：保存生成出来的 8 张图
- `videos`：保存生成出来的 7 段动态视频
- `drafts`：保存剪映草稿或草稿链接
- `logs`：保存每一步 API 返回结果

## 详细步骤

下面按“诸葛亮”举例。

## 第一步：让 AI 生成脚本和分镜

你可以直接把下面这段发给 AI：

```text
帮我做一个历史人物短视频，人物是：诸葛亮。

请输出 JSON，结构如下：
{
  "title": "视频标题",
  "scenes": [
    {
      "caption": "这一段字幕，适合 5 秒内读完",
      "image_prompt": "这一段画面描述，用于生成 9:16 图片"
    }
  ]
}

要求：
1. 一共 8 段 scenes
2. 每段 caption 讲诸葛亮的一段生平经历
3. 每段 image_prompt 要适合生成竖屏历史人物画面
4. 风格统一，电影感，古代中国，真实质感
5. 不要输出多余解释，只输出 JSON
```

你会得到类似这样的结构：

```json
{
  "title": "诸葛亮：乱世里的清醒头脑",
  "scenes": [
    {
      "caption": "诸葛亮年轻时隐居隆中，读书、观天下，也等一个值得托付的人。",
      "image_prompt": "古代中国雪夜草庐，年轻诸葛亮在烛光下读书，竹简与地图铺在案上，9:16，电影感"
    }
  ]
}
```

把完整结果保存为：

```text
D:\ai-video-workflow\historical-video-demo\script.json
```

## 第二步：生成 8 张图片

拿 `script.json` 里的 8 个 `image_prompt` 去生图。

生图时统一要求：

```text
比例：9:16
风格：电影感、真实质感、古代中国、人物一致性尽量保持
输出格式：png 或 jpg
```

生成后命名为：

```text
scene-01.png
scene-02.png
scene-03.png
scene-04.png
scene-05.png
scene-06.png
scene-07.png
scene-08.png
```

放到：

```text
D:\ai-video-workflow\historical-video-demo\images
```

到这里，你应该有 8 张竖屏图片。

## 第三步：把图片上传成公网 URL

如果你要走真正的 AI 首尾帧视频，这一步很重要。

云端图生视频接口通常不能读取：

```text
D:\ai-video-workflow\historical-video-demo\images\scene-01.png
```

它需要类似这样的公网链接：

```text
https://example.com/scene-01.png
```

你可以用这些方式：

- 自己的对象存储，例如阿里云 OSS、腾讯云 COS、Cloudflare R2
- 图床工具，例如 PicList
- 你自己的服务器

上传后保存一个图片链接清单：

```json
{
  "images": [
    {
      "name": "scene-01.png",
      "url": "https://你的图床/scene-01.png"
    },
    {
      "name": "scene-02.png",
      "url": "https://你的图床/scene-02.png"
    }
  ]
}
```

保存为：

```text
D:\ai-video-workflow\historical-video-demo\image_links.json
```

## 第四步：生成 7 段首尾帧动态视频

有 8 张图后，按相邻图片生成 7 段视频：

```text
scene-01 -> scene-02
scene-02 -> scene-03
scene-03 -> scene-04
scene-04 -> scene-05
scene-05 -> scene-06
scene-06 -> scene-07
scene-07 -> scene-08
```

每段 5 秒。

提示词可以这样写：

```text
首帧中的人物和场景自然过渡到尾帧画面，镜头缓慢推进，人物动作克制自然，衣袖和环境有轻微运动，历史电影质感，一镜到底，画面稳定，不要突然变脸，不要出现文字。
```

如果调用火山方舟 Seedance，核心请求大概长这样：

```bash
curl -X POST https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 你的ARK_API_KEY" \
  -d '{
    "model": "doubao-seedance-1-5-pro-251215",
    "content": [
      {
        "type": "text",
        "text": "首帧中的人物和场景自然过渡到尾帧画面，镜头缓慢推进，人物动作克制自然，历史电影质感，一镜到底。 --duration 5 --camerafixed false --watermark false"
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://你的图床/scene-01.png"
        }
      },
      {
        "type": "image_url",
        "image_url": {
          "url": "https://你的图床/scene-02.png"
        }
      }
    ]
  }'
```

不同平台的参数名可能不一样，但思路一样：

```text
模型 + 提示词 + 首帧图 + 尾帧图 + 时长 + 分辨率
```

生成成功后，把 7 个视频链接保存为：

```text
D:\ai-video-workflow\historical-video-demo\video_links.json
```

格式建议：

```json
{
  "videos": [
    {
      "start_image": "scene-01.png",
      "end_image": "scene-02.png",
      "video_url": "https://生成的视频链接/01.mp4"
    },
    {
      "start_image": "scene-02.png",
      "end_image": "scene-03.png",
      "video_url": "https://生成的视频链接/02.mp4"
    }
  ]
}
```

## 如果你暂时没有图生视频 API

没有 API Key 也可以先跑通本地测试版。

这一步不是 AI 真图生视频，而是用 FFmpeg 做动态过渡，用来验证剪映草稿流水线。

在图片目录有 8 张图的情况下，可以先生成 7 段本地过渡视频。

PowerShell 示例：

```powershell
$src = "D:\ai-video-workflow\historical-video-demo\images"
$out = "D:\ai-video-workflow\historical-video-demo\videos"
New-Item -ItemType Directory -Force -Path $out | Out-Null

for ($i = 1; $i -le 7; $i++) {
  $a = Join-Path $src ("scene-{0:D2}.png" -f $i)
  $b = Join-Path $src ("scene-{0:D2}.png" -f ($i + 1))
  $mp4 = Join-Path $out ("transition-{0:D2}-{1:D2}.mp4" -f $i, ($i + 1))

  ffmpeg -y -loop 1 -t 5 -i $a -loop 1 -t 5 -i $b `
    -filter_complex "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0008,1.10)':d=150:s=1080x1920:fps=30,setsar=1[v0];[1:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='max(1.10-0.0008*on,1.0)':d=150:s=1080x1920:fps=30,setsar=1[v1];[v0][v1]xfade=transition=smoothleft:duration=5:offset=0,format=yuv420p[v]" `
    -map "[v]" -t 5 -r 30 -c:v libx264 -pix_fmt yuv420p -movflags +faststart $mp4
}
```

检查视频：

```powershell
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,nb_frames -of json "D:\ai-video-workflow\historical-video-demo\videos\transition-01-02.mp4"
```

看到 `width` 是 `1080`，`height` 是 `1920`，`duration` 是 `5` 左右，就说明视频正常。

## 第五步：让 capcut-mate 读取视频

`capcut-mate` 的 `add_videos` 接口需要视频 URL。

如果你的视频已经是公网链接，可以直接用。

如果你只是本地测试，可以在视频目录启动一个本地静态服务：

```powershell
cd D:\ai-video-workflow\historical-video-demo\videos
python -m http.server 30003 --bind 127.0.0.1
```

然后本地视频 URL 就是：

```text
http://127.0.0.1:30003/transition-01-02.mp4
http://127.0.0.1:30003/transition-02-03.mp4
...
```

浏览器打开其中一个链接，如果能下载或播放，就说明服务正常。

## 第六步：创建剪映草稿

确保 `capcut-mate` 正在运行：

```text
http://127.0.0.1:30000/docs
```

创建草稿，宽高是 1080x1920：

```powershell
Invoke-RestMethod `
  -Uri "http://127.0.0.1:30000/openapi/capcut-mate/v1/create_draft" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"width":1080,"height":1920}'
```

成功后会返回一个 `draft_url`。后面所有操作都要带着它。

## 第七步：按时间线添加视频

假设 7 段视频，每段 5 秒，总长 35 秒。

剪映接口里的时间单位通常是微秒。

所以：

```text
1 秒 = 1000000
5 秒 = 5000000
35 秒 = 35000000
```

7 段时间线应该这样排：

```text
第 1 段：0        -> 5000000
第 2 段：5000000  -> 10000000
第 3 段：10000000 -> 15000000
第 4 段：15000000 -> 20000000
第 5 段：20000000 -> 25000000
第 6 段：25000000 -> 30000000
第 7 段：30000000 -> 35000000
```

`video_infos` 的结构类似这样：

```json
[
  {
    "video_url": "http://127.0.0.1:30003/transition-01-02.mp4",
    "width": 1080,
    "height": 1920,
    "start": 0,
    "end": 5000000,
    "duration": 5000000,
    "volume": 0
  },
  {
    "video_url": "http://127.0.0.1:30003/transition-02-03.mp4",
    "width": 1080,
    "height": 1920,
    "start": 5000000,
    "end": 10000000,
    "duration": 5000000,
    "volume": 0
  }
]
```

真实调用时，把 7 段都放进去，然后请求 `add_videos`。

## 第八步：添加标题

标题用第一次 `add_captions` 单独添加。

例如标题是：

```text
诸葛亮：乱世里的清醒头脑
```

标题覆盖整条视频时间线：

```json
[
  {
    "start": 0,
    "end": 35000000,
    "text": "诸葛亮：乱世里的清醒头脑",
    "font_size": 15
  }
]
```

标题样式：

```text
border_color #000000
font 江湖体
font_size 15
line_spacing 10
text_color #ffffff
transform_y 1369
```

注意，标题和字幕要分两次调用 `add_captions`，不要混在一起。

## 第九步：添加字幕

字幕用第二次 `add_captions` 添加。

字幕要和每段视频对应：

```json
[
  {
    "start": 0,
    "end": 5000000,
    "text": "诸葛亮年轻时隐居隆中，读书、观天下，也等一个值得托付的人。",
    "font_size": 12
  },
  {
    "start": 5000000,
    "end": 10000000,
    "text": "刘备三顾茅庐，不只是请一位军师，更是在请一套改变命运的判断。",
    "font_size": 12
  }
]
```

字幕样式：

```text
border_color #000000
font 江湖体
font_size 12
line_spacing 10
text_color #ffde00
transform_y -794
```

## 第十步：添加背景音乐

调用 `add_audios`。

示例音频：

```text
https://od.cdnux.com/3561/i/2026/02/20/3kvn0.mp3
```

音频时间线要和视频总长一致。

如果视频总长 35 秒，就写：

```json
[
  {
    "audio_url": "https://od.cdnux.com/3561/i/2026/02/20/3kvn0.mp3",
    "start": 0,
    "end": 35000000,
    "duration": 35000000,
    "volume": 1.0
  }
]
```

如果你做的是 8 段视频，总长 40 秒，那就改成：

```text
40000000
```

## 第十一步：保存草稿

最后调用 `save_draft`。

它会把当前草稿状态保存下来。

保存成功后，你会得到草稿链接，类似：

```text
http://127.0.0.1:30000/openapi/capcut-mate/v1/get_draft?draft_id=xxxx
```

这个链接可以查看草稿文件列表。

如果你要在剪映里直接看到草稿，还需要把生成的草稿目录复制到剪映草稿目录。

例如：

```text
capcut-mate\output\draft\xxxx
```

复制到：

```text
C:\Users\你的用户名\AppData\Local\JianyingPro\User Data\Projects\com.lveditor.draft\诸葛亮-自动视频测试
```

然后重启剪映。

## 一个完整的 Python 调用脚本

如果你不想一个接口一个接口手动点，可以写一个 Python 脚本统一调用。

下面是最小示例。你需要按自己的路径和视频链接改一下。

```python
import json
from pathlib import Path

import requests


BASE = "http://127.0.0.1:30000/openapi/capcut-mate/v1"
RUN_DIR = Path(r"D:\ai-video-workflow\historical-video-demo")
SCRIPT = json.loads((RUN_DIR / "script.json").read_text(encoding="utf-8-sig"))

SEGMENT_US = 5_000_000
SEGMENT_COUNT = 7
TOTAL_US = SEGMENT_US * SEGMENT_COUNT

VIDEO_URLS = [
    f"http://127.0.0.1:30003/transition-{i:02d}-{i + 1:02d}.mp4"
    for i in range(1, SEGMENT_COUNT + 1)
]


def post(name, payload):
    response = requests.post(f"{BASE}/{name}", json=payload, timeout=180)
    data = response.json()
    if not response.ok or data.get("code") not in (None, 0):
        raise RuntimeError(f"{name} failed: {data}")
    return data.get("data", data)


created = post("create_draft", {"width": 1080, "height": 1920})
draft_url = created["draft_url"].replace(
    "https://capcut-mate.jcaigc.cn/openapi/capcut-mate/v1",
    BASE,
)

video_infos = []
for index, url in enumerate(VIDEO_URLS):
    start = index * SEGMENT_US
    end = (index + 1) * SEGMENT_US
    video_infos.append({
        "video_url": url,
        "width": 1080,
        "height": 1920,
        "start": start,
        "end": end,
        "duration": SEGMENT_US,
        "volume": 0,
    })

post("add_videos", {
    "draft_url": draft_url,
    "video_infos": json.dumps(video_infos, ensure_ascii=False),
    "alpha": 1.0,
    "scale_x": 1.0,
    "scale_y": 1.0,
    "transform_x": 0,
    "transform_y": 0,
})

post("add_captions", {
    "draft_url": draft_url,
    "captions": json.dumps([
        {
            "start": 0,
            "end": TOTAL_US,
            "text": SCRIPT["title"],
            "font_size": 15,
        }
    ], ensure_ascii=False),
    "border_color": "#000000",
    "font": "江湖体",
    "font_size": 15,
    "line_spacing": 10,
    "text_color": "#ffffff",
    "transform_y": 1369,
})

caption_infos = []
for index, scene in enumerate(SCRIPT["scenes"][:SEGMENT_COUNT]):
    start = index * SEGMENT_US
    end = (index + 1) * SEGMENT_US
    caption_infos.append({
        "start": start,
        "end": end,
        "text": scene["caption"],
        "font_size": 12,
    })

post("add_captions", {
    "draft_url": draft_url,
    "captions": json.dumps(caption_infos, ensure_ascii=False),
    "border_color": "#000000",
    "font": "江湖体",
    "font_size": 12,
    "line_spacing": 10,
    "text_color": "#ffde00",
    "transform_y": -794,
})

post("add_audios", {
    "draft_url": draft_url,
    "audio_infos": json.dumps([{
        "audio_url": "https://od.cdnux.com/3561/i/2026/02/20/3kvn0.mp3",
        "start": 0,
        "end": TOTAL_US,
        "duration": TOTAL_US,
        "volume": 1.0,
    }], ensure_ascii=False),
})

saved = post("save_draft", {"draft_url": draft_url})
print(saved.get("draft_url", draft_url))
```

运行：

```powershell
python run_capcut_workflow.py
```

如果最后打印出 `draft_url`，说明整条剪映写入流程跑通了。

## 常见问题

## 1. 为什么 8 张图只生成 7 段视频？

因为首尾帧是相邻两张图生成一段视频。

8 张图之间只有 7 个间隔，所以是 7 段。

如果你想要 8 段视频，可以让最后一张图单独生成一个 5 秒镜头，或者再补一张第 9 张图。

## 2. 为什么云端视频接口不认本地图片？

因为云端服务器访问不到你电脑的 `D:\xxx\scene-01.png`。

它只能访问公网 URL，所以要先上传图床。

## 3. 为什么剪映里看不到草稿？

常见原因有三个：

- 草稿没有复制到剪映草稿目录
- 剪映没有重启
- 草稿 JSON 里的素材路径不对

先检查草稿目录里是否有：

```text
draft_content.json
draft_info.json
assets
```

如果这些都有，再重启剪映。

## 4. 为什么视频总长不对？

大概率是时间线单位写错。

记住：

```text
1 秒 = 1000000 微秒
5 秒 = 5000000 微秒
35 秒 = 35000000 微秒
```

每段视频的 `start` 和 `end` 必须首尾相接，不能都写 0。

## 5. 为什么字幕和视频对不上？

字幕数组要和视频数组顺序一致。

例如第 3 段视频是 `scene-03 -> scene-04`，那第 3 条字幕也应该讲第 3 个场景。

## 最后总结

这套流水线最重要的不是某一个模型，而是结构化。

你要把每一步都保存成文件：

```text
script.json
image_links.json
video_links.json
capcut_api_run.json
```

这样一来，哪一步失败都可以单独重跑。

真正稳定的自动化不是“一句话生成大片”，而是把一件复杂的事拆成很多可检查的小步骤：

```text
脚本可检查
图片可检查
视频可检查
时间线可检查
剪映草稿可检查
```

当你能把“诸葛亮”跑通，换成“李白”“王阳明”“苏轼”“武则天”，本质上只是换一个人物名。

这就是这条历史人物视频流水线的价值。
