---
title: 筛查无tags与分类笔记
published: 2025-05-01
tags:
  - dataview模板
category: Zen
draft: false
pinned: false
image: 
---

```dataview
TABLE WITHOUT ID
  category AS "分类",
  dateformat(file.ctime, "yyyy/MM/dd") AS "创建日期",
  file.link AS "笔记名称",
  file.tags AS "标签"
WHERE 
  contains(file.folder, "posts")
  AND (category = null OR file.tags = null OR length(file.tags) = 0)
SORT category ASC, file.ctime DESC
```

