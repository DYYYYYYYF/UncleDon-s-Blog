# MQTT服务搭建指南

## 什么是MQTT

MQTT (Message Queuing Telemetry Transport) 是一种轻量级的发布/订阅消息传输协议，专为物联网应用设计。它具有以下特点：

- **轻量级**：协议头部很小，适合带宽有限的网络环境
- **低功耗**：适合电池供电的设备
- **可靠性**：提供三种不同级别的服务质量(QoS)
- **异步通信**：基于发布/订阅模式

## MQTT核心概念

### 1. 基本架构

- **Broker (代理服务器)**：消息中间件，负责接收、存储和转发消息
- **Client (客户端)**：发布和订阅消息的设备或应用程序
- **Topic (主题)**：消息的分类标识，用于路由消息

### 2. 工作模式

- **Publisher (发布者)**：向特定主题发布消息
- **Subscriber (订阅者)**：订阅特定主题，接收相关消息
- **Publish/Subscribe**：解耦的消息传递模式

### 3. QoS级别

- **QoS 0**：最多交付一次，不保证消息到达
- **QoS 1**：至少交付一次，可能重复
- **QoS 2**：恰好交付一次，最高可靠性

# 服务器（EMQX）

### 安装EMQX：

#### 使用官方安装包

```shell
# 更新系统包
sudo apt update
# 安装必要依赖
sudo apt install -y curl wget gnupg2 software-properties-common
# 添加EMQX GPG密钥
curl -s https://assets.emqx.com/scripts/install-emqx-deb.sh | sudo bash
# 或者手动添加仓库
wget -qO - 'https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x3E640D53F7E5B595' | sudo apt-key add -
echo "deb https://repos.emqx.io/emqx-ce/deb/ubuntu/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/emqx.list
```

#### 使用DEB包安装

```shell
# 创建下载目录
mkdir -p ~/emqx-install && cd ~/emqx-install
# 下载EMQX 5.8.2版本（最后的Apache 2.0版本）
wget https://www.emqx.com/zh/downloads/broker/5.8.2/emqx-5.8.2-ubuntu22.04-amd64.deb
# 或下载最新版本（BSL许可证）
# wget https://www.emqx.com/zh/downloads/broker/latest/emqx-latest-ubuntu22.04-amd64.deb
```

## 基本服务操作

```bash
# 启动EMQX
sudo systemctl start emqx
# 停止EMQX
sudo systemctl stop emqx
# 重启EMQX
sudo systemctl restart emqx
# 查看状态
sudo systemctl status emqx
# 设置开机自启
sudo systemctl enable emqx
# 禁用开机自启
sudo systemctl disable emqx
```

# 客户端

## 测试MQTT服务端Broker

#### 安装paho-mqtt

```shell
pip install paho-mqtt
```

## 发布者

```python
import paho.mqtt.client as mqtt

broker = 'localhost'  # 或 EMQX IP，如 '127.0.0.1'
port = 1883
topic = "test/topic"

client = mqtt.Client()
client.connect(broker, port)
client.publish(topic, "Hello from Python!")
client.disconnect()

```

## 订阅者

```python
import paho.mqtt.client as mqtt

broker = 'localhost'
port = 1883
topic = "test/topic"

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    client.subscribe(topic)

def on_message(client, userdata, msg):
    print(f"Received message: {msg.payload.decode()} on topic {msg.topic}")

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect(broker, port)
client.loop_forever()
```

## 使用TLS连接（8883端口）

```python
import paho.mqtt.client as mqtt

broker = 'uncledon.cn'
port = 8883
topic = "test/secure"

client = mqtt.Client()
client.tls_set(
    ca_certs=None,  # 或指定 CA 证书路径
    certfile="/etc/emqx/certs/uncledon.cn.pem",
    keyfile="/etc/emqx/certs/uncledon.cn.key"
)
client.connect(broker, port)
client.publish(topic, "Secure Hello!")
client.disconnect()
```

