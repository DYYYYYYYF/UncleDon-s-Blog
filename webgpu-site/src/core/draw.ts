// File: core/draw.ts
import type { GPUPrimitiveTopology } from './PipelineManager'

export function drawCustom(
  device: GPUDevice,
  pipeline: GPURenderPipeline,
  pass: GPURenderPassEncoder,
  data: Float32Array,
  vertexCount: number
) {
  const vertexBuffer = device.createBuffer({
    size: data.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    mappedAtCreation: true,
  })

  new Float32Array(vertexBuffer.getMappedRange()).set(data)
  vertexBuffer.unmap()

  pass.setPipeline(pipeline)
  pass.setVertexBuffer(0, vertexBuffer)
  pass.draw(vertexCount / 2, 1, 0, 0)
}

