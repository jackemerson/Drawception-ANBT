import { anbt } from '../../anbt'
import { colorToHex } from '../conversions/colorToHex'

export function setBackground(color) {
  const transparent = color === 'eraser'
  anbt.transparent = transparent
  anbt.canvas.style.background = transparent ? 'none' : color
  // Normalize the color representation
  color = transparent ? '#ffffff' : colorToHex(color)
  anbt.background = color
  anbt.svg
    .querySelectorAll('.eraser')
    .forEach(erased =>
      erased.setAttribute(erased.nodeName === 'path' ? 'stroke' : 'fill', color)
    )
}
