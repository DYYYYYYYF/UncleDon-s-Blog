import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import DefaultView from '../components/layouts/DefaultView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            component: Home
        },
        {
            path:'/Home',
            name:'Home',
            component: Home
        },
        {
            path:'/UncleDon',
            name:'UncleDon',
            component: DefaultView,
            children: [
                {
                    path:'VulkanRenderEngine',
                    name:'VulkanRenderEngine',
                    component:()=>import("../components/uncledon/applications/RenderEngine/index.vue"),
                }
            ]
        },
        {
            path:'/Header',
            name:'Header',
            component:()=>import("../components/public/header.vue")
        }
    ]
})

export default router
