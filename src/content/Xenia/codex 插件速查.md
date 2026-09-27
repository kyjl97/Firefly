

> 用途：想不起插件名时，直接复制第一列到 Codex 里调用。

| 插件调用全名         | 作用                                          | 来源       |
| -------------- | ------------------------------------------- | -------- |
| /browser       | 控制 Codex 应用内浏览器，用来打开网页、本地服务、测试页面和检查前端效果。    | 官方插件     |
| /chrome        | 控制本机 Chrome，适合需要登录态、Cookie、已有标签页的网页操作。      | 官方插件     |
| /computer-use  | 控制 Windows 桌面应用和系统界面。                       | 官方插件     |
| /documents     | 创建、编辑、渲染和检查 Word / DOCX 文档。                 | 官方插件     |
| /pdf           | 读取、生成、检查和渲染 PDF 文件。                         | 官方插件     |
| /spreadsheets  | 处理 Excel、CSV、表格公式、格式和图表。                    | 官方插件     |
| /presentations | 创建和编辑 PowerPoint / 演示文稿。                    | 官方插件     |
| /cowart        | 自己安装的 Cowart 本地无限画布插件，用于打开画布、生成图片、根据标注截图改图。 | **自己安装** |

## Cowart 里的 3 个 Skill

| 插件调用全名              | 作用                                              |
| ------------------- | ----------------------------------------------- |
| $cowart-open-canvas | 打开 Cowart 本地无限画布，默认地址是 http://127.0.0.1:43217/。 |
| $cowart-image-gen   | 生成图片并放进选中的 Cowart AI image holder。              |
| $cowart-image-edit  | 根据 Cowart 标注截图生成干净修改版，并放到原图旁边。                  |
### 

|              |            |                                                         |
| ------------ | ---------- | ------------------------------------------------------- |
| /obscura<br> | 自动化任务、网页抓取 | https://x.com/pritipatelfgoo/status/2071867431346417850 |
|              |            |                                                         |


## 安装位置备注

官方插件一般在这些位置：

```text
C:\Users\Administrator\.codex\plugins\cache\
C:\Users\Administrator\.cache\codex-runtimes\
```

自己安装的 Cowart 插件在：

```text
C:\Users\Administrator\plugins\cowart
```

Cowart 也有一份缓存快照：

```text
C:\Users\Administrator\.codex\plugins\cache\personal\cowart\0.1.2
```

判断真实生效路径，优先看：

```powershell
codex plugin list
```
