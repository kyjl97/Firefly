
### 第一步：将机场的订阅转成clash 订阅文件
工具
https://suburl.v1.mk/
张后打开地址，全选复制内容


### 第二步：将clash 文件转换 成socks 端口的yaml 文件
打开clsh节点换为本地socks节点工具
https://bulianglin.com/archives/tosocks.html
然后粘贴第一步复制的内容，生成节点文件


### 第三步：导入v2rayn 建立支持socks 端口的自定义服务器

配置项目→添加自定义配置→
```
別名：随便写
地址：点击浏览，然后导入第二步生成的节点文件
Core 类型：mihomo
Socks 端口：随便写 比如111111
```

### 第四步：配置ip 和端口 完成

#### 在指纹浏览器中使用
代理类型：Socks5
主机：端口：127.0.0.01  端口（ 想要用哪个地区，在第二步生成的节点文件当中复制）

#### 在本地浏览器中使用
Proxy Switcher插件，在Manual Proxy页面填写端口
https://chromewebstore.google.com/detail/proxy-switcher/iejkjpdckomcjdhmkemlfdapjodcpgih

```
Manual Proxy页面
Fallback Proxy: 可以是软件路由ip地址或者本地127.0.0.1
Port：端口号（软路由端口或本地节点文件中的端口）

软路由配置参考
https://www.youtube.com/watch?v=B4jPvMgp2Kk
```

模拟指纹插件
https://chromewebstore.google.com/detail/all-fingerprint-defender/meojnmfhjkahlfcecpdcdgjclcilmaij?hl=zh-CN&utm_source=ext_sidebar

模拟设备设备插件
https://chromewebstore.google.com/detail/user-agent-switcher-and-m/bhchdcejhohfmigjafbampogmaanbfkg?hl=zh-CN&utm_source=ext_sidebar

chrome同步操作工具项目地址：
https://github.com/devilflasher/Chrome-Manager
https://mp.weixin.qq.com/s/LNcMkpjwB7WSi9uTRgS95A