import anbt from '../../anbt'
import getClosestColor from '../getClosestColor'

const eyedropper = (x, y) => {
  const pixelColor = anbt.ctx.getImageData(x, y, 1, 1).data
  return pixelColor[3] > 0
    ? getClosestColor(pixelColor, anbt.palette)
    : anbt.background
}

export default eyedropper
