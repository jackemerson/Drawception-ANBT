import { anbt } from '../../anbt'
import { bytesToString } from '../conversions/bytesToStrings'
import { colorToDword } from '../conversions/colorToDword'
import { stringToBytes } from '../conversions/stringToBytes'
import { packUint16be } from '../pack/packUint16be'

export function packPlayback(svg) {
  const { pako } = window
  const array = [colorToDword(anbt.background)]
  const last = {
    color: colorToDword('#000000'),
    size: 14,
    x: -1,
    y: -1,
    pattern: 0
  }
  svg.childNodes.forEach(element => {
    if (element.nodeName === 'path') {
      const color =
        element.getAttribute('class') === 'eraser'
          ? '\xFF\xFF\xFF\x00'
          : colorToDword(element.getAttribute('stroke'))
      const size = element.getAttribute('stroke-width')
      const pattern = element.pattern || 0
      if (color !== last.color || size !== last.size) {
        array.push(packUint16be(-1))
        array.push(packUint16be(size * 100))
        array.push(color)
        last.color = color
        last.size = size
      }
      if (pattern !== last.pattern) {
        array.push(packUint16be(-3))
        array.push(packUint16be(pattern))
        array.push('\x00\x00\x00\x00') // reserved for the future
        last.pattern = pattern
      }
      last.x = element.orig[0].x
      last.y = element.orig[0].y
      array.push(packUint16be(last.x))
      array.push(packUint16be(last.y))
      for (let j = 1; j < element.orig.length; j++) {
        const dx = element.orig[j].x - last.x
        const dy = element.orig[j].y - last.y
        // Ignore repeating points
        if (!dx && !dy) continue
        array.push(packUint16be(dx))
        array.push(packUint16be(dy))
        last.x = element.orig[j].x
        last.y = element.orig[j].y
      }
      array.push('\x00\x00\x00\x00')
    } else if (element.nodeName === 'rect') {
      const color = colorToDword(element.getAttribute('fill'))
      array.push(packUint16be(-2))
      array.push(packUint16be(0)) // reserved for the future
      array.push(color)
    } else {
      throw new Error('Unknown node name: ' + element.nodeName)
    }
  })
  return '\x04' + bytesToString(pako.deflate(stringToBytes(array.join(''))))
}
