<template>
    <div id="UncleDonHome">
        <div id="Intro" style='font-size: 200%;'>
            <h1>UncleDon Home Page</h1>
        </div>
        <div id="ProgramLanguage">
            <div>
                <span @click="this.$router.push('/UncleDon/VulkanRenderEngine')">RenderEngine</span>
                <span @click="this.RouteToBlog('/blog/')">Blog</span>
            </div>
        </div>
    </div>
</template>

<script>

import BackGroundRow from '../assets/image/HomePageBackGround-row.png'
import BackGroundCol from '../assets/image/HomePageBackGround-col.png'

export default {
    name: 'UDHome',
    methods:{
        SelectBackImage(){
            var windowWidth = document.body.clientWidth
            var windowHeight = document.body.clientHeight

            var HomeSpace = document.getElementById('UncleDonHome')
            if (windowWidth > windowHeight){
                HomeSpace.style.backgroundImage = "url(" + BackGroundRow + ")"
            } else {
                HomeSpace.style.backgroundImage = "url(" + BackGroundCol + ")"
            }
        },

        RouteToBlog(url){
            window.location.href = url
        }
    },
    mounted(){
        if (this.UseBackImage){
            window.addEventListener('resize', this.SelectBackImage());
        }
    },
    data(){
        return {
            BackGroundRow,
            BackGroundCol,
            UseBackImage: false,
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: aliceblue;
}

a:link,a:active,a:hover,a:visited, a:default { 
    color: white;
    text-decoration: none;
}

#UncleDonHome{
    min-height: 93vh;
    background-color: black;
    background-repeat: no-repeat;
    background-size: 20% auto;
    background-position: bottom left;
}

#Intro{
    height: 20vh;
    item-algins: center;
}

#ProgramLanguage{
    height: 73vh;
}

#ProgramLanguage div{
    width: 60vw;
    height: 11vh;
    flex-direction: row;
    item-algins: center;
    justify-content: space-between;
}

span{
    width: 18vw;
    height: 10vh;
    border-radius: 30px;
    color: aliceblue;
    background-color: #050505;
    border: 1px solid white;
    font-size: 150%;
    overflow: hidden;
    padding: 2px
}

span:hover{
    color: black;
    background-color: white;
}

button{
    color: black;
    width: 120px;
}

</style>
