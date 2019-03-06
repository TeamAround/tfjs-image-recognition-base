import { env } from '../env';
export function isMediaElement(input) {
    var _a = env.getEnv(), Image = _a.Image, Canvas = _a.Canvas, Video = _a.Video;
    return (Image && input instanceof Image)
        || (Canvas && input instanceof Canvas)
        || (Video && input instanceof Video);
}
//# sourceMappingURL=isMediaElement.js.map