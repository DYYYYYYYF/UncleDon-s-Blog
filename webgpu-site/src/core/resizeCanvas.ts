// File: core/resizeCanvas.ts
export function setupHiDPICanvas(canvas: HTMLCanvasElement, container?: HTMLElement) {
  const dpr = window.devicePixelRatio || 1

  function resize() {
    const parent = container || canvas.parentElement
    if (!parent) return

    const { clientWidth, clientHeight } = parent
    canvas.width = clientWidth * dpr
    canvas.height = clientHeight * dpr
    canvas.style.width = `${clientWidth}px`
    canvas.style.height = `${clientHeight}px`
  }

  resize()
  window.addEventListener('resize', resize)
}

