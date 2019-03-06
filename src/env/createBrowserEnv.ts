import { Environment } from './types';

export function createBrowserEnv(): Environment {

  const fetch = window && window['fetch'] ? window['fetch'] : function() {
    throw new Error('fetch - missing fetch implementation for browser environment')
  }

  const readFile = function() {
    throw new Error('readFile - filesystem not available for browser environment')
  }

  return {
    Canvas: window ? window['OffscreenCanvas'] : self ? self['OffscreenCanvas'] : HTMLCanvasElement,
    Image: window ? window['HTMLImageElement'] : self ? self['HTMLImageElement'] : null,
    ImageData: ImageData,
    Video: window ? window['HTMLVideoElement'] : self ? self['HTMLVideoElement'] : null,
    createCanvasElement: () => (window && ('OffscreenCanvas' in window)) || (self && ('OffscreenCanvas' in self)) ? new OffscreenCanvas(1, 1) : document ? document.createElement('canvas') : {} as HTMLCanvasElement,
    createImageElement: () => document ? document.createElement('img') : {} as HTMLImageElement,
    fetch,
    readFile
  }
}