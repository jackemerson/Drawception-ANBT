import { colorToRgba } from './colorToRgba'

export function colorToDword(color) {
  return colorToRgba(color)
    .map(value => String.fromCharCode(value))
    .join('')
}
