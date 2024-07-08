<template>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
</template>

<script>
import Header from './components/public/header.vue'
import Footer from './components/public/footer.vue'

export default {
    name: 'App',
    mounted(){
        this.InitPage();
    },
    components: { Header, Footer },
    methods:{
        InitPage(){
            const ws_url = "ws://106.15.228.55:9002"
            this.websock = new WebSocket(ws_url)
            this.websock.onmessage = this.websocketonmessage
            this.websock.onopen = this.websocketonopen
            this.websock.onerror = this.websocketonerror
            this.websock.onclose = this.websocketclose
        },
        websocketonopen(){ //连接建立之后执行send方法发送数据

            this.websocketsend("welecome_new_visitor");
        },
        websocketonerror(){//连接建立失败重连
            console.log("Connect failed...")
        },
        websocketonmessage(e){ //数据接收
            console.log(e.data);
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

<style>
:root{
    --link-color: #4298BA;
    
    /* Black */
    --color-black: #121212;
    --color-black-light: #404041;
    --color-black-green-sea: #2C3E50;
    --color-black-wet-asphalt: #34495E;

    /* Gray */
    --color-gray-concrete: #95A5A6;
    --color-gray-silver: #BDC3C7;
    --color-gray-asbestos: #7F8C8D;
    --color-gray-clouds: #ECF0F1;

    /* Green */
    --color-green-turquoise: #1ABC9C;
    --color-green-emerald: #2ECC71;
    --color-green-green-sea: #16A085;
    --color-green-nephritis: #27AE60;

    /* Blue */
    --color-blue-river: #3498DB;
    --color-blue-belize-hole: #2980B9;

    /* Purple */
    --color-purple-amethyst: #9B59B6;
    --color-purplr-wisteria: #8E44AD;

    /* Red */
    --color-red-alizarin: #E74C3C;
    --color-red-pomegranate: #C0392B;
    --color-red-pumpkin: #D35400;

    /* Orange */
    --color-orange: #F39C12;
    --color-orange-sunflower: #F1C40f;
    --color-orange-carrot: #E67E22;
}

/* hide scroll bar */
::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    text-align: center;
    align-items: center;
}

a:link,a:active,a:hover,a:visited, a:default { 
    color: var(--link-color);
    text-decoration: none;
}

.public{
    display: flex;
    flex-direction: column;
    background-color: var(--color-black);
}

</style>
