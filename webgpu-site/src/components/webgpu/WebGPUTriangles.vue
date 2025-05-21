<!-- File: components/WebGPUTriangles.vue -->
<template>
  <div class="canvas-wrapper">
    <canvas ref="canvasEl" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { initWebGPU } from '@/core/init'
import { setupHiDPICanvas } from '@/core/resizeCanvas'
import { PipelineManager } from '@/core/pipelineManager'
import { drawCustom } from '@/core/draw'

const canvasEl = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
  const canvas = canvasEl.value!
  console.log(canvas)
  setupHiDPICanvas(canvas)
  console.log(canvas)

  const { device, context, format } = await initWebGPU(canvas)
  const pipelineManager = new PipelineManager(device, format)

  const triangleData = new Float32Array([
      // Triangle 1
      -0.8, -0.6,
      -0.6,  0.0,
      -0.4, -0.6,

      // Triangle 2
       0.0, -0.4,
       0.2,  0.2,
       0.4, -0.4,

      // Triangle 3
      -0.2,  0.5,
       0.0,  0.9,
       0.2,  0.5,
    ])

  function frame() {
    const encoder = device.createCommandEncoder()
    const view = context.getCurrentTexture().createView()
    const pass = encoder.beginRenderPass({
      colorAttachments: [{
        view,
        loadOp: 'clear',
        storeOp: 'store',
        clearValue: { r: 0.1, g: 0.1, b: 0.1, a: 1.0 },
      }],
    })

    const pipeline = pipelineManager.getPipeline('triangle-list')
    drawCustom(device, pipeline, pass, triangleData, triangleData.length)

    pass.end()
    device.queue.submit([encoder.finish()])
    requestAnimationFrame(frame)
  }

  frame()
})
</script>

<style scoped>
.canvas-wrapper {
  border-radius: 16px;
  overflow: hidden; 
  width: 100%;
  height: 600px; 
}
canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
