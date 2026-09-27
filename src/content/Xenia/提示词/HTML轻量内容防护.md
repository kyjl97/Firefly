
```
请帮我给当前网站加入“轻量内容防护”，目标是防止普通用户随手右键、复制和打开开发者工具。

要求：

1. 禁用右键菜单：
   - 拦截 `contextmenu`

2. 禁止选中文字：
   - CSS 加入 `user-select: none`
   - 同时兼容 `-webkit-user-select`、`-moz-user-select`、`-ms-user-select`
   - 移动端加 `-webkit-touch-callout: none`

3. 禁止复制、剪切、拖拽和选中：
   - 拦截 `copy`
   - 拦截 `cut`
   - 拦截 `dragstart`
   - 拦截 `selectstart`

4. 拦截常见快捷键：
   - `F12`
   - `Ctrl + U`
   - `Ctrl + S`
   - `Ctrl + P`
   - `Ctrl + A`
   - `Ctrl + C`
   - `Ctrl + X`
   - `Ctrl + Shift + I`
   - `Ctrl + Shift + J`
   - `Ctrl + Shift + C`
   - 如果是 Mac，也兼容 `Command` 键，也就是 `metaKey`

5. 如果页面里有输入框、搜索框、文本域或编辑器，不要影响用户正常输入；只禁用普通页面内容的选中和复制。如果当前页面没有输入区域，可以全站禁用。

6. 不要大改页面结构，不要重构样式，只在合适的位置加入最小 CSS 和 JS。

7. 完成后请回读验证：
   - 防护 CSS 已存在
   - 事件拦截代码已存在
   - HTML 结构没有被破坏

注意：这只是轻量防护，不能真正防止懂技术的人查看源码。静态网页源码已经加载到浏览器里，禁用 JS、浏览器菜单或其他方式都可能绕过。目标是提高普通用户复制和右键查看的门槛。
```