export function createBrowserEnv() {
    var windowExists = typeof window === 'object';
    var selfExists = typeof self === 'object';
    var documentExists = typeof document === 'object';
    var fetch = windowExists && window['fetch'] ? window['fetch'] : selfExists && self['fetch'] ? self['fetch'] : function () {
        throw new Error('fetch - missing fetch implementation for browser environment');
    };
    var readFile = function () {
        throw new Error('readFile - filesystem not available for browser environment');
    };
    return {
        Canvas: windowExists ? window['OffscreenCanvas'] : selfExists ? self['OffscreenCanvas'] : HTMLCanvasElement,
        Image: windowExists ? window['HTMLImageElement'] : selfExists ? self['HTMLImageElement'] : null,
        ImageData: ImageData,
        Video: windowExists ? window['HTMLVideoElement'] : selfExists ? self['HTMLVideoElement'] : null,
        createCanvasElement: function () { return (windowExists && ('OffscreenCanvas' in window)) || (selfExists && ('OffscreenCanvas' in self)) ? new OffscreenCanvas(1, 1) : documentExists ? document.createElement('canvas') : {}; },
        createImageElement: function () { return documentExists ? document.createElement('img') : {}; },
        fetch: fetch,
        readFile: readFile
    };
}
//# sourceMappingURL=createBrowserEnv.js.map