import { colorToRgba } from './colorToRgba'
import { rgbToHex } from './rgbToHex'

export function colorToHex(color) {
  return rgbToHex(colorToRgba(color))
}
