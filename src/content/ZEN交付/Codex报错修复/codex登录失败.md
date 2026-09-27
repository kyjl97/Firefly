### 问题现象
```
登录失败：Login server error: Token exchange failed: error sending request for url (https://auth.openai.com/oauth/token)
```

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260620133608654.webp)

### 诊断

```
curl -I https://auth.openai.com
```

 Codex 桌面客户端无法连接到 OpenAI 的认证服务器，但网页版能用，所以账号没问题，是网络/连接问题。

### 解决办法
win+R 输入以下命令，打开环境变量

```
rundll32 sysdm.cpl,EditEnvironmentVariables
```

在用户环境变量中添加以下4个变量
```
HTTP_PROXY    http://127.0.0.1:端口号
HTTPS_PROXY   http://127.0.0.1:端口号
ALL_PROXY     http://127.0.0.1:端口号
NO_PROXY      localhost,127.0.0.1,: :1
```

然后测试，如果有输出正常，再登录这个codex就没有问题了

```
curl -I https://auth.openai.com
```


来源
https://mp.weixin.qq.com/s/TCuMgfMNAjvVcNwOcCH5Qw