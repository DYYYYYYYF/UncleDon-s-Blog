// File: core/PipelineManager.ts
export type PrimitiveType = 'point-list' | 'line-list' | 'triangle-list'

export class PipelineManager {
  private device: GPUDevice
  private format: GPUTextureFormat
  private pipelines: Map<PrimitiveType, GPURenderPipeline> = new Map()

  constructor(device: GPUDevice, format: GPUTextureFormat) {
    this.device = device
    this.format = format
  }

  getPipeline(topology: PrimitiveType): GPURenderPipeline {
    if (this.pipelines.has(topology)) {
      return this.pipelines.get(topology)!
    }

    const pipeline = this.createPipeline(topology)
    this.pipelines.set(topology, pipeline)
    return pipeline
  }

  private createPipeline(topology: PrimitiveType): GPURenderPipeline {
    return this.device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: this.device.createShaderModule({
          code: `@vertex
          fn main(@location(0) pos: vec2<f32>) -> @builtin(position) vec4<f32> {
            return vec4<f32>(pos, 0.0, 1.0);
          }`,
        }),
        entryPoint: 'main',
        buffers: [{
          arrayStride: 8,
          attributes: [{ shaderLocation: 0, format: 'float32x2', offset: 0 }],
        }],
      },
      fragment: {
        module: this.device.createShaderModule({
          code: `@fragment
          fn main() -> @location(0) vec4<f32> {
            return vec4<f32>(1.0, 0.8, 0.3, 1.0);
          }`,
        }),
        entryPoint: 'main',
        targets: [{ format: this.format }],
      },
      primitive: {
        topology,
      },
    })
  }
}

