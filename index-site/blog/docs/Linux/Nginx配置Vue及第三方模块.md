---
title: Nginx配置Vue及第三方模块
author: UncleDon
createTime: 2025/02/21 16:12:23
permalink: /article/yx891aua/
tags:
  - Linux
  - Ubantu
---
# 安装Nginx

#### 安装依赖（gcc/zlib/ssl/pcre），按需下载

```shell
apt install gcc libpcre-dev libssl-dev
```

#### 下载Nginx

```shell
wget https://nginx.org/download/nginx-1.22.1.tar.gz
tar zxf nginx-1.22.1.tar.gz
```

#### 下载第三方模块（可以不需要）

第三方模块如果需要可以单独下载，这里以rtmp（流媒体服务）举例。

```shell
wget https://github.com/arut/nginx-rtmp-module/archive/refs/tags/v1.2.2.tar.gz
tar -xvf v1.2.2.tar.gz
```

#### 编译安装

```
cd nginx目录
./configure --add-module=第三方模块路径 --with-Nginx自带模块（如--with-http_ssl_module）
make
sudo make install
```

# 配置Nginx

#### 修改配置文件

```shell
sudo vi /usr/local/nginx/conf/nginx.conf
```

## 例1. Vue配置Nginx

```nginx.conf
 server {
        listen       80;
        server_name  localhost;
		.
		.
		.
        root   html; #配置自己的静态文件的路径，就是Vue编译后的dist文件夹路径

        location / {
             # root   html;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
            #需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404，两种写法，这里需要在下边配置router
           # try_files $uri $uri/ @router;
 
        }
       .
       .
       .

```



## 例2. 第三方配置Nginx（rtmp举例）

在nginx.conf配置文件中新增，不同的第三方模块可以在官网查看如何配置。

```nginx.conf
rtmp {
    server {
        listen 1935;
        chunk_size 4000;
        application hls {  #rtmp推流请求路径: rtmp://nginx服务器ip:1935/hls
			live on;
			hls on;
			hls_path /usr/local/nginx/html/hls;
			hls_fragment 5s;
		}
        }
}
```

# 启动/停止Nginx

```shell
#启动
./nginx
#停止
./nginx -s stop
```

