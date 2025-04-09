---
title: Nginx配置SSL
author: UncleDon
createTime: 2025/02/21 16:12:23
permalink: /article/527x1qt2/
---
# 确认SSL模块

```shell
./nginx -V
```

如果窗口中有 **--with-http_ssl_module** 则说明ok，如果没有则需要更新Nginx配置。

```
./configure --with-http_ssl_module
make
```

# 配置SSL证书

#### 获取SSL证书

这个就不用多解释了，证书需要在任意SSL授权点获取（一般都有免费的SSL证书）。申请到SSL证书之后，可以在对应授权网站下载SSL证书，Nginx的证书后缀为**.key/.pem**。下载后上传到服务器的任意位置。

#### 配置Nginx

```shell
vim /usr/local/nginx/conf/nginx.conf
```

修改如下配置：

```nginx.conf
http {
    .
    .
    .
  server {
  #监听443端口
    listen 443;
    #你的域名
    server_name localhost; 
    ssl on;
    #ssl证书的pem文件路径
    ssl_certificate  .pem文件路径;
    #ssl证书的key文件路径
    ssl_certificate_key .key文件路径;
    location / {
     proxy_pass  http://公网地址:项目端口号;
    }
}
server {
    listen 80;
    server_name localhost;
    #将请求转成https
    rewrite ^(.*)$ https://$host$1 permanent;
}
}
```

