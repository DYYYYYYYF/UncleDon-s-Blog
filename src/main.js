import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import { baiduAnalytics } from 'vue-baidu-analytics'

const app = createApp(App)

var _hmt = _hmt || [];
_hmt.push(['_setPageviewProperty', {
    // 已关联的自定义属性
}]);

(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?c501c2f60566cd72fe2e3340b58da756";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

window._hmt = _hmt
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if ( !token ){
        // window._hmt.push(['_trackPageview', '/'])
        window._hmt.push(['_setPageviewProperty', to.path]);
        next()
    } else {
        if (to.path){
            console.log('SetPageview: ' + to.path)
            window._hmt.push(['_setPageviewProperty', to.path]);
        }
        next()
    }
})


app.use(router)
app.mount('#app')
app.use(baiduAnalytics, {
    router: router,
    siteIdList: ['c501c2f60566cd72fe2e3340b58da756'],
    isDebug: false
})

