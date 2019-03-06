import { Environment } from './types';

export function createBrowserEnv(): Environment {

  const windowExists = typeof window === 'object';
  const selfExists = typeof self === 'object';
  const documentExists = typeof document === 'object';

  const fetch = windowExists && window['fetch'] ? window['fetch'] : selfExists && self['fetch'] ? self['fetch'] : function() {
    throw new Error('fetch - missing fetch implementation for browser environment')
  }

  const readFile = function() {
    throw new Error('readFile - filesystem not available for browser environment')
  }

  return {
    Canvas: windowExists ? window['OffscreenCanvas'] : selfExists ? self['OffscreenCanvas'] : HTMLCanvasElement,
    Image: windowExists ? window['HTMLImageElement'] : selfExists ? self['HTMLImageElement'] : null,
    ImageData: ImageData,
    Video: windowExists ? window['HTMLVideoElement'] : selfExists ? self['HTMLVideoElement'] : null,
    createCanvasElement: () => (windowExists && ('OffscreenCanvas' in window)) || (selfExists && ('OffscreenCanvas' in self)) ? new OffscreenCanvas(1, 1) : documentExists ? document.createElement('canvas') : {} as HTMLCanvasElement,
    createImageElement: () => documentExists ? document.createElement('img') : {} as HTMLImageElement,
    fetch,
    readFile
  }
}