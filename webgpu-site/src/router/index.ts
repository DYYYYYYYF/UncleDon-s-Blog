import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WebGPUView from '../views/webgpu/TriangleView.vue'
import WebGPUPoint from '../views/webgpu/PointsView.vue'
import WebGPULine from '../views/webgpu/LineView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/points', name: 'example_point', component: WebGPUPoint},
    { path: '/lines', name: 'example_line', component: WebGPULine},
    { path: '/triangles', name: 'example_triangle', component: WebGPUView },
  ],
})

export default router
