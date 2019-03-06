export function createBrowserEnv() {
    var fetch = window && window['fetch'] ? window['fetch'] : function () {
        throw new Error('fetch - missing fetch implementation for browser environment');
    };
    var readFile = function () {
        throw new Error('readFile - filesystem not available for browser environment');
    };
    return {
        Canvas: window ? window['OffscreenCanvas'] : self ? self['OffscreenCanvas'] : HTMLCanvasElement,
        Image: window ? window['HTMLImageElement'] : self ? self['HTMLImageElement'] : null,
        ImageData: ImageData,
        Video: window ? window['HTMLVideoElement'] : self ? self['HTMLVideoElement'] : null,
        createCanvasElement: function () { return (window && ('OffscreenCanvas' in window)) || (self && ('OffscreenCanvas' in self)) ? new OffscreenCanvas(1, 1) : document ? document.createElement('canvas') : {}; },
        createImageElement: function () { return document ? document.createElement('img') : {}; },
        fetch: fetch,
        readFile: readFile
    };
}
//# sourceMappingURL=createBrowserEnv.js.map