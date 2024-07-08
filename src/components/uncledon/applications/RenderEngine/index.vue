<template>
    <div id="Intro">
        <span>
            <h2 style="text-align:center">渲染引擎</h2>
            <h2>Vulkan Render Engine</h2>
        </span>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            基于Vulkan实现的渲染引擎，支持Windows及MacOS操作系统。项目原型为本科毕业设计，
            在之基础上进行重构将项目结构以及接口功能进行封装，可为之后开发游戏引擎
            以及物理引擎提供渲染基础，Debug绘制调试信息等。项目还在开发过程中，
            现阶段仅用于测试使用以及练习GLSL/HLSL语言，在Bilibi中会使用该引擎进行Shader教程编写以及调试。
        </p>
        <button><a target=“_blank” href="https://space.bilibili.com/14004754">Intro Video(Bilibili)</a></button>
        <button><a target=“_blank” href="https://github.com/DYYYYYYYF/DimensionEngine">Download(Github)</a></button><br>
        <button @click="downloadFile()"><a>DownLoad(暂时不能使用)</a></button>
    </div>

    <!-- Vulkan Render Engine -->
    <div class="program" style="background-color: #000000;">
        <div class='img'>
            <img src="@/assets/image/MutiObjects.png" alt="MutiObjects.png">
        </div>
        <div class='context'>
            <h1>Render Engine</h1>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                梦开始的地方，多对象渲染。
            </p>
        </div>
    </div>


    <!-- Light Shader --> 
    <div class="program" style="background-color: #000000;">
        <div class='context'>
            <h1>Light Shader</h1>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
               基础的Phone光照，具备漫反射、环境光以及高光效果。
            </p>
        </div>
        <div class='img'>
            <img src="@/assets/image/LightShader.png" alt="LightShader.png">
        </div>
    </div>

    <!-- Mesh Grid SHader --> 
    <div class="program" style="background-color: #000000;">
        <div class='img'>
            <img src="@/assets/image/MeshGrid.png" alt="GridShader.png">
        </div>
        <div class='context'>
            <h1>Mesh Grid Shader</h1>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                网格渲染，类似贴图应用于物体。（非全屏地面网格）
            </p>
        </div>
    </div>

    <!-- Edge Shader --> 
    <div class="program" style="background-color: #000000;">
        <div class='context'>
            <h1>Edge Shader</h1>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;
                通过FragmentShader实现的边缘检测。
            </p>
        </div>
        <div class='img'>
            <img src="@/assets/image/EdgeShader.png" alt="EdgeShader.png">
        </div>
    </div>

    <!-- Common Shape --> 
    <div class="program" style="background-color: #000000;">
        <div class='img'>
            <img src="@/assets/image/CommonShape.png" alt="CommonShader.png">
        </div>
        <div class='context'>
            <h1>Common Shape</h1>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;
                基础图形演示，点、线、面、圆、矩形等。
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VulkanRenderEngine',
    data() {
        return {
            websock: null,
            fileName: "DimensionEngine.zip",
        }
    },
    methods:{
        downloadFile(){
            const ws_url = "ws://106.15.228.55:9002"
            this.websock = new WebSocket(ws_url)
            this.websock.onmessage = this.websocketonmessage
            this.websock.onopen = this.websocketonopen
            this.websock.onerror = this.websocketonerror
            this.websock.onclose = this.websocketclose
        },
        websocketonopen(){ //连接建立之后执行send方法发送数据
            this.websocketsend("download_engine");
        },
        websocketonerror(){//连接建立失败重连
            console.log("Connect failed...")
        },
        websocketonmessage(e){ //数据接收
            console.log("Get message")
            if(e.data instanceof Blob){
                console.log("Blob file stream.")

                var fileData = e.data

                console.log("Download down.")
                // New blob object 
                var blob = new Blob([fileData], { type: 'application/octet-stream'})

                // Create download link
                var downloadLink = document.createElement('a')
                downloadLink.href = URL.createObjectURL(blob)
                downloadLink.download = this.fileName
                downloadLink.click()
            }

        },
        websocketsend(Data){//数据发送
            this.websock.send(Data);
        },
        websocketclose(e){  //关闭

            console.log('断开连接',e);
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.public{
    height: 94vh;
}

/* intro */
#Intro{
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: aliceblue;
    font-size: 30px;
    background-color: var(--color-black);
}

#Intro p{
    width: 40vw;
    font-size: 10px;
    text-align: left;
}

#Intro > h1, h2, h3, p{
    margin: 20px 0;
}
/* end intro */

/* program */
.program{
    height: 100vh;
    display: flex;
    color: aliceblue;
    flex-direction: row;
    justify-content: center;
}

.program div{
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.context{
    width: 45vw;
    text-align: left;
}

.context p{
    margin: 60px;
    text-align: left;
}

.img{
    width: 55vw;
    display: flex;
    justify-content: center;
}

.img img{
    width: 100%;
    object-fit: contain;
}

a:link,a:active,a:hover,a:visited, a:default { 
    color:black;
}

button{
    color: black;
    width: 120px;
}
/* end program */
/* end body */
</style>
