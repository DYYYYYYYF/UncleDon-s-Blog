// File: core/init.ts
export async function initWebGPU(canvas: HTMLCanvasElement) {
  if (!navigator.gpu) throw new Error('WebGPU not supported.')

  const adapter = await navigator.gpu.requestAdapter()
  const device = await adapter!.requestDevice()
  const context = canvas.getContext('webgpu') as GPUCanvasContext
  const format = navigator.gpu.getPreferredCanvasFormat()

  context.configure({
    device,
    format,
    alphaMode: 'opaque',
    size: [canvas.width, canvas.height], // 👈 Retina 尺寸
  })

  return { device, context, format }
}

