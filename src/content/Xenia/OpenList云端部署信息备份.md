==============================================
OpenList 云端部署信息备份（Fly.io）
备份时间：2026-08-12（第二次更新）
==============================================

【访问地址】
https://kyjl97.github.io/remote/

【登录信息】
账号：admin
初始密码：sxFFvpSY
⚠️ 登录后请立即修改密码！

【应用信息】
应用名：kyjl97
（原 lushi-openlist-v3 因名字太长更换，Fly.io 不支持改名，
  采用新建短名应用方案，旧应用 lushi-openlist-v3 已废弃）
所属组织：personal（kyjl97）
登录邮箱：kyjl97@users.noreply.github.com

【磁盘卷（数据持久化）】
卷 ID：vol_re1d72z0xn3pz654
卷名称：data
大小：1GB
区域：nrt（东京）
加密：是
自动快照：开启（保留 5 份）

【IP 地址】
IPv6：2a09:8280:1::168:1a5d:0
共享 IPv4：66.241.124.192
（如需独立 IPv4 可执行：fly ips allocate-v4）

【机器状态】
机器 ID：7811d0ddf52148
区域：nrt
状态：started
镜像：registry.fly.io/kyjl97

【部署项目信息】
项目目录：D:\project2026\openlist-fly
镜像：openlistteam/openlist:latest-lite-aio（自带 Aria2 离线下载）
Fly.io 官方监控页：https://fly.io/apps/kyjl97/monitoring

==============================================
【登录后必做 3 件事】
1. 修改密码：后台登录后立即修改，或命令行：
   flyctl ssh console -a kyjl97
   ./openlist admin set 你的新密码
2. 开启 guest 访问：后台「设置 → 用户管理」启用 guest 用户，
   否则别人访问会显示 "Guest user is disabled" 看不到文件。
3. 挂载网盘：后台「存储」添加阿里云盘 / 123云盘 / WebDAV 等，
   配置存储在卷中，重启不丢。

【常用运维命令】
查看状态：flyctl status -a kyjl97
查看日志：flyctl logs -a kyjl97
连接终端：flyctl ssh console -a kyjl97
重新部署：flyctl deploy（在项目目录下）
删除卷：flyctl vol destroy <卷ID>
==============================================
