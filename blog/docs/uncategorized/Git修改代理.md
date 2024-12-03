---
title: Git修改代理
author: UncleDon
createTime: 2024/12/02 23:39:21
permalink: /article/66w0s4u5/
---
查看代理：
```shell
git config --global http.proxy
git config --global https.proxy
```

设置代理，用于开启VPN后，能够走代理端口：

```shell
git config --global http.proxy localhost:1080
git config --global https.proxy localhost:1080
```

删除已有代理：

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

如果存在多个代理删除时：

```shell
git config --global --unset-all http.proxy
git config --global --unset-all https.proxy
```

