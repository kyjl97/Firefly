# opencli-plugin-kyjl97-blog

把得救之道博客 `https://kyjl97.github.io/Firefly` 接入 OpenCLI，当前只提供公开只读命令，不读取本地草稿，也不包含后台发布或修改权限。

## 本机安装

在这个目录的父目录执行：

```powershell
opencli plugin install file://D:\project2026\fuwari\opencli-plugin-kyjl97-blog
```

验证命令是否注册：

```powershell
opencli list | Select-String kyjl97
```

## 命令

```powershell
opencli kyjl97 latest --limit 5
opencli kyjl97 search OpenCLI
opencli kyjl97 article opencli
```

`latest` 和 `search` 从公开归档页读取文章索引；`article` 从公开文章页读取正文。文章参数也可以使用 `/posts/.../` 路径或完整的 `https://jieliu.me/posts/.../` URL。

## 发布给其他人

把这个目录单独发布成 GitHub 仓库后，其他 OpenCLI 用户可以安装：

```powershell
opencli plugin install github:你的账号/opencli-plugin-kyjl97-blog
```
