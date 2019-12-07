import { anbt } from '../../anbt'
import { getClosestColor } from '../getClosestColor'

export function eyedropper(x, y) {
  const pixelColor = anbt.context.getImageData(x, y, 1, 1).data
  return pixelColor[3] > 0
    ? getClosestColor(pixelColor, anbt.palette)
    : anbt.background
}
