<template>
    <div class='outer'>
        <div id='NavigationBar'>
            <h2 style='margin: 10px; color: var(--color-black-light)'>Navigation bar</h2>
            <ul></ul>
        </div>
        <div id="Context">
            <router-view></router-view>
        </div>
        <div id="Adv"></div>
    </div>
</template>

<script>
export default {
    name: 'DocumentsPage',
    mounted(){
        var NavigationBar = document.getElementById('NavigationBar')
        var list = NavigationBar.getElementsByTagName('ul')
        var contexts = document.getElementsByClassName('Title')

        if (list.length < 0) {
            return
        }

        for (let index = 0; index < contexts.length; index++){
            var title = contexts[index].getElementsByClassName('Navigation')
            for (let i = 0; i < title.length; i++){
                var newEle = document.createElement('li')
                var link = document.createElement('a')

                let len = title[i].innerHTML.length * 1.5

                link.href = '#' + title[i].innerHTML
                link.innerHTML = title[i].innerHTML
                link.style.color = 'black'

                newEle.style.width = len +'vw'
                newEle.style.marginTop = '10px'
                newEle.style.borderBottom = '1px solid white'
                newEle.appendChild(link)

                list[0].appendChild(newEle)
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.outer{
    width: 100vw;
    min-height: 93vh;
    display: flex;
    flex-direction: row;
    justify-content: center;

    background: linear-gradient(var(--color-gray-clouds), var(--color-gray-asbestos));
}

#NavigationBar{
    color: white;
    width: 15vw;
    min-height: 93vh;

/*
    background-image: url("../../assets/image/programmer.png");
    background-repeat: no-repeat;
    background-size: 16vw auto;
    background-position: bottom;
*/
}

#NavigationBar > a:link,#NavigationBar > a:active,
#NavigationBar > a:hover,#NavigationBar > a:visited, 
#NavigationBar > a:default { 
    color: white;
    text-decoration: none;
}

ul{
    display: flex;
    flex-direction: column;
    justify-content: center;
    item-aligns: center;
    list-style: none;
}

#Context{
    width: 70vw;
    height: 93vh;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: var(--color-gray-clouds);
}

#Adv{
    width: 15vw;
    height: 93vh;
    overflow-y: scroll;
    overflow-x: hidden;
}

</style>
