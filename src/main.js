import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import baiduAnalytics from 'vue-baidu-analytics'
// eslint-disable-next-line
import { VueAnalytics } from 'vue-analytics'

const app = createApp(App)

// 百度统计
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

// Google统计
window.dataLayer = window.dataLayer || []
function gtag() {
    window.dataLayer.push(arguments)
}
gtag('js', new Date())
gtag('config', 'G-WPJZN1Y7D8')

let firstFlag = true
router.beforeEach((to, from, next) => {
    var path =  window.location.pathname + '#' + to.fullPath
    firstFlag ? (firstFlag = false) : () => {
        if (!path){
            return
        } 
        window.ga('set', 'page', path)
        window.ga('send', 'pageview')
    }
  next()
})


// Sitemap
function getRoutesList(routes, pre){
    return routes.reduce((array, route) =>{
        const path = `${pre}${route.path}`
        if (route.path !== '*'){
            array.push(path)
        }

        if (route.children){
            array.push(...getRoutesList(route.children, `${path}/`))
        }

        return array
    }, [])
}
// eslint-disable-next-line
function getRoutesXML(){
    const list = getRoutesList(router.options.routes, 'http://www.uncledon.cn')
        .map(route => `<url><loc>${route}</loc></url>`)
        .join('\r\n');
    return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${list}
  </urlset>`;
}

// console.log(getRoutesXML())
app.use(router)
    .use(baiduAnalytics, {
       router: router,
       siteIdList: ['c500c2f60566cd72fe2e3340b58da756'],
       isDebug: false
   })
   .use(VueAnalytics, {
       id: 'G-WPJZN1Y7D8',
       router
   })
   .mount('#app')

