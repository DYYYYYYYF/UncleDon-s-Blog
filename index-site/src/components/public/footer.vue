<template>
    <div id='Footer'>
        <p>合作联系V: UncleD-0829</p>
        <p>ICP证：<a href="http://beian.miit.gov.cn">苏ICP备2024059295号-1</a></p>
    </div>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* footer */
#Footer{
    width: 100vw;
    height: 3vh;
    background-color: var(--color-black-light);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

#Footer p{
    width: 30vw;
    text-align: center;
    font-size: 10px;
    color: aliceblue;
    align-items: center;
    padding-right: 5px;
}
/* end footer */
</style>
