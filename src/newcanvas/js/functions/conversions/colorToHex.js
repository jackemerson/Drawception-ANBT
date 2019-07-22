import colorToRgba from './colorToRgba'
import rgbToHex from './rgbToHex'

const colorToHex = color => rgbToHex(colorToRgba(color))

export default colorToHex
