<template>
    <div id='Header'>
        <span>
            <img @click='this.$router.push("/Home")' src="../../assets/icon/home-icon-white-256.png">

            <!-- <router-link to='/Home'> -->
            <!-- <img src="../../assets/icon/home-icon-white-256.png"> -->
            <!-- </router-link> -->
        </span>
        <span>
            <span id='Theme' @click='ChangeTheme'>Theme: {{this.ThemeName}}</span>
            <p>UncleDon</p>
        </span>
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
    data(){
        return{
            ThemeName: 'Dark'
        }
    },
    methods:{
        ChangeTheme(){
            if (this.ThemeName == 'Light'){
                this.ThemeName = 'Dark'
            } else {
                this.ThemeName = 'Light'
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* header */
#Header{
    width: 100vw;
    height: 4vh;
    background-color: var(--color-black-light);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

#Header span{
    height: 4vh;
    display: flex;
    flex-direction: auto;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

#Theme{
    color: aliceblue;
    font-size: 15px; 
    line-height: 4vh;
    margin-right: 80px;
    justify-content: left;
    overflow: hidden;
    
    padding-left: 16px;
}

#Header span p{
    color: aliceblue;
    font-size: 20px; 
    line-height: 4vh;
    margin-right: 120px;
    justify-content: center;
    overflow: visible;
}

#Header span img{
    width: 3vh;
    height: 3vh;
    display: flex;
    flex-direction: auto;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
}
/* end header */

</style>
