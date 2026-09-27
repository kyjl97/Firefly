
| Skill / 调用方式             | 用途                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| /Workflow Packaging Audi | 回看近期 Codex 会话、Memories、Chronicle、现有技能和自动化，找重复手工流程，并只创建高置信、最小必要的 skill/subagent/automation 建议。     |
| `$cowart-open-canvas`    | Cowart 本地无限画布插件。打开 Codex 里的 tldraw 画布，默认本地地址 `http://127.0.0.1:43217/`，画布数据保存到当前项目的 `canvas/` 目录。 |
| `$cowart-image-gen`      | 在 Cowart 画布里生成图片。选中 `AI 图片` holder 后，可以把 AI 生成图直接填入选中的画布占位框；没有选中 holder 时，也可以作为普通图片插入当前画布。        |
| `$cowart-image-edit`     | 根据 Cowart 标注截图改图。读取截图里的箭头、文字批注和修改要求，生成一张干净的新图，并放到原图旁边，原图和批注不会被删除或移动。                              |

> 备注：Cowart 是 Codex 插件，不是普通全局斜杠命令。新安装后通常需要新开 Codex 对话或重启 Codex 才会加载这 3 个 skill。调用时优先用 `$skill-name`，也可以直接说“打开 Cowart 画布”“把图片放进选中的 Cowart AI image holder”“根据截图标注修改”。
