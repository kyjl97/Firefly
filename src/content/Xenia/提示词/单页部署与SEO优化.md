# 单页部署与 SEO 优化 —— 复用提示词

> 适用场景：以后把本地保存的 HTML 单页部署到自有域名（Cloudflare Workers），并做 SEO 优化。
> 用法：把对应模板复制给 AI，按「填写说明」补全参数即可。

---

## 一、完整版：部署 + SEO 一条龙（推荐直接复制）

```
帮我把这个单页部署到 Cloudflare Workers 并做 SEO 优化：

【源文件】<粘贴 HTML 文件路径，例如 D:\客户交付流程\已部署\xxx站\xxx.html>
【资源目录】<粘贴 _files 目录路径（CSS/图片等），没有就写"无">
【目标域名】<例如 https://xxx.com/ >
【域名现状】<写清楚：DNS 是否已指向 Cloudflare？该域名目前是否有网站在跑？>
【网站名称】<例如 得救之道>
【业务描述】<例如 ChatGPT Plus 会员充值、闲鱼下单、GitHub: https://github.com/kyjl97、30天质保>
【要不要 SEO】<要 / 不要>
【SEO 关键词】<你希望被搜到的词，例如：ChatGPT Plus 充值、GPT 会员代充>

要求：
1. 部署前把浏览器扩展注入的垃圾（plasmo、沉浸式翻译、截图插件、Notab、EDM、原站 beacon）清理掉。
2. 部署到 <目标域名>，静态资源要能正常加载。
3. 如果域名已有 DNS 记录且没有 DNS 权限，直接用 legacy zone route 绑定，不要纠结 custom domain。
4. SEO 要做的：标题含关键词+品牌、description 重写、robots 必须是 index,follow、canonical、og:title/description/url/image、JSON-LD、robots.txt + sitemap.xml。
5. 部署完逐项 curl 验证：首页字节数、资源 content-type 和大小、关键内容标记、垃圾关键词 0 残留。
```

**填写说明**：
- 「域名现状」最关键：**域名已有 DNS 记录（A/CNAME）+ token 无 DNS 权限**时，AI 应直接走 legacy route（`pattern = "域名/*"` + `zone_id`），跳过 custom domain（会报 100117）。
- 需要 `og:image` 时，提供一张品牌图，或让 AI 用 PIL 生成（1200×630，含二维码）。
- 若需要 Google/百度收录验证：你在控制台选「HTML 标签」方式拿到 meta 标签后发给 AI，AI 会加进页面并重新部署。

---

## 二、纯部署（不 SEO，改完就上）

```
把 <HTML路径> 重新部署到 <域名>。桌面文件已改好，用部署目录的 build.py 重建并 wrangler deploy，然后验证。
```

---

## 三、小改 + 重新部署（日常迭代最常用）

```
页面里 <要改的位置和内容>，改成 <新内容>，改完同步部署到 <域名> 并验证。
```

示例（本次会话真实用法）：
```
把"进入卡网下单"改成"进入闲鱼下单"，改完部署并验证。
```

---

## 四、SEO 专项（已部署页面想再优化）

```
对 <域名> 做一次 SEO 体检和优化：
- 标题、description 是否符合搜索意图
- robots/canonical/OG/JSON-LD 是否齐全
- robots.txt / sitemap.xml 是否正常
- 关键词分布是否自然
输出：问题清单 + 已修复项 + 验证结果
```

---

## 五、搜索引擎收录提交流程（部署完成后手动操作）

> 前提：站点已部署、robots 是 index,follow、sitemap.xml 已上线。
> 通用技巧：各平台的 HTML 验证标签**互不冲突**，可以一次性把多个标签一起发给 AI，加到页面里部署一次，然后挨个平台点验证。

### 谷歌（Google Search Console）
1. 打开 [Google Search Console](https://search.google.com/search-console)，用谷歌账号登录
2. 「添加资源」→ 选「网址前缀」→ 输入 https://kyjl97.github.io/plus/ → 继续
3. 验证方式选「HTML 标签」→ 复制 `<meta name="google-site-verification" content="..." />` → 发给 AI
4. AI 加进页面并重新部署后，回到页面点「验证」
5. 验证通过 → 左侧「站点地图」→ 输入 https://kyjl97.github.io/plus/sitemap.xml → 提交
6. 「网址检查」→ 输入 https://kyjl97.github.io/plus/ → 点「请求编入索引」

### 必应（Bing Webmaster Tools）
1. 打开 [Bing Webmaster Tools](https://www.bing.com/webmasters)，用微软账号登录
2. 「添加站点」→ 选「手动添加」→ 输入 https://kyjl97.github.io/plus/ → 添加（或选「从 Google Search Console 导入」，一键带资源过来，最快）
3. 验证方式选「HTML 标签」→ 复制 `<meta name="msvalidate.01" content="..." />` → 发给 AI
4. AI 部署后回页面点「验证」
5. 左侧「站点地图」→ 提交 https://kyjl97.github.io/plus/sitemap.xml
6. （可选加速）「URL 提交 / IndexNow」：配置 IndexNow key，实现秒级收录

### 百度（百度搜索资源平台）
1. 打开 [百度搜索资源平台](https://ziyuan.baidu.com)，用百度账号登录
2. 「用户中心 → 站点管理 → 添加网站」→ 输入 https://kyjl97.github.io/plus/ → 添加
3. 验证方式选「HTML 标签」→ 复制 `<meta name="baidu-site-verification" content="..." />` → 发给 AI
4. AI 部署后回页面点「完成验证」
5. 「普通收录 → sitemap」→ 提交 https://kyjl97.github.io/plus/sitemap.xml
- 注意：境外服务器 + 未备案域名，百度收录慢、权重低，属正常，慢慢养

### 360（360 站长平台）
1. 打开 [360 站长平台](https://zhanzhang.so.com)，用 360 账号登录
2. 「添加网站」→ 输入 https://kyjl97.github.io/plus/ → 添加
3. 验证方式选「HTML 标签」→ 复制 `<meta name="360-site-verification" content="..." />` → 发给 AI
4. AI 部署后回页面点「验证」
5. 提交 sitemap：https://kyjl97.github.io/plus/sitemap.xml

### 搜狗（可选，低优先）
[搜狗站长平台](https://zhanzhang.sogou.com) 同样流程：添加站点 → HTML 标签验证 → 发 AI → 部署 → 验证

### 各平台验证标签示例（发给 AI 时按实际内容替换）
- 谷歌：`<meta name="google-site-verification" content="xxxxxxxx" />`
- 必应：`<meta name="msvalidate.01" content="xxxxxxxx" />`
- 百度：`<meta name="baidu-site-verification" content="xxxxxxxx" />`
- 360：`<meta name="360-site-verification" content="xxxxxxxx" />`

---

## 六、与 AI 沟通的注意事项（重要）

### 必须告诉 AI 的信息
1. **账号与权限现状**：
   - wrangler 已登录（请通过 jieliu.me 联系），token 权限：workers 写 ✅、zone 只读 ❌（**不能动 DNS**）。
   - 所以：域名已有记录 → legacy zone route；custom domain 会失败。
2. **域名现状**：是否已解析到 Cloudflare、有没有在跑的旧站（AI 会用 curl/nslookup 自查，但你提前说更快）。
3. **目标文件路径**：桌面 HTML + `_files` 资源目录；AI 只改桌面源文件，部署副本由 `build.py` 生成，两边不要手动分叉。

### AI 必须做的事（你可以这么要求）
4. 部署前清理扩展垃圾（218KB → ~13KB 是常态）；**不要把桌面源文件搞乱**。
5. 每次改完**必须 curl 验证**：首页内容标记、CSS/图片字节数、垃圾关键词 0 残留；部署后等几秒再验证（版本传播有延迟，第一次 404 可能是瞬时的）。
6. robots 必须 `index,follow`——原站保存下来的页面常带 `noindex`，不删等于没 SEO。

### 你做不了 / AI 做不了的事
7. **Google/百度收录提交**需要你的账号登录，AI 无法代登。流程：控制台选「网址前缀 + HTML 标签」验证 → 把 meta 标签发给 AI → AI 部署后你点验证 → 再提交 sitemap。
8. 删 DNS 记录/改 DNS 需要 dashboard 或 Zone:DNS:Edit 的 token；需要时在 Cloudflare 控制台手动操作。
https://search.google.com/

### 常用路径速查
- 源文件：`D:\客户交付流程\已部署\plus-kyjl97会员站\Chat.Gpt Plus 等会员服务 _ 文文AI.html`（源 HTML，改内容/SEO 都改它）
- 源资源目录：`D:\客户交付流程\已部署\plus-kyjl97会员站\Chat.Gpt Plus 等会员服务 _ 文文AI_files\`（professional.css、contact-qrcode.webp、og-image.png，必须与 HTML 同目录）
- 部署项目：`D:\客户交付流程\已部署\plus-kyjl97会员站\plus-kyjl97-site\`（`public/` + `worker.js` + `wrangler.toml` + `build.py`）
- 重建+部署：`cd D:\客户交付流程\已部署\plus-kyjl97会员站\plus-kyjl97-site && python build.py && wrangler deploy`
- 线上：`https://kyjl97.github.io/plus/`（zone id `5d0f86b59a70a5cd7229ecefe4729988`，route `plus.kyjl97.github.io/*`）
- 验证 URL（含空格/中文需 percent-encode）：`/assets/professional.css`、`/assets/contact-qrcode.webp`、`/assets/og-image.png`、`/robots.txt`、`/sitemap.xml`
- 踩坑日志：`D:\project2026\fuwari\src\content\Xenia\全局复利与踩坑日志.md`（2026-08-17 条目有完整部署方法论）

### 常用指令速查
- 「deploy」= 测试、提交并推送；如需要走 Codex 新任务审合并监控 CI。
- 遇到需要批量执行的子任务，AI 自己 spawn 独立线程跑，跑完汇总。
- 禁止批量删除文件；删文件一次只能删一个明确路径。
