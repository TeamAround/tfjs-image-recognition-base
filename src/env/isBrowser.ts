export function isBrowser(): boolean {
  return (typeof window === 'object' || typeof self === 'object')
    // && typeof document !== 'undefined'
    // && typeof HTMLImageElement !== 'undefined'
    // && typeof HTMLCanvasElement !== 'undefined'
    // && typeof HTMLVideoElement !== 'undefined'
    && (typeof OffscreenCanvas !== 'undefined' || typeof HTMLCanvasElement !== 'undefined')
    && typeof ImageData !== 'undefined'
}