import { env } from '../env';

export function isMediaElement(input: any) {

  const { Image, Canvas, Video } = env.getEnv()

  return (Image && input instanceof Image)
    || (Canvas && input instanceof Canvas)
    || (Video && input instanceof Video)
}