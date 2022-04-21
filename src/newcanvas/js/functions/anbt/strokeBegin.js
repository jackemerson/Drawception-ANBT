import { anbt } from '../../anbt'
import { createSvgElement } from '../createSvgElement'
import { drawDisplayLine } from './drawDisplayLine'
import { drawDisplayLinePresto } from './drawDisplayLinePresto'

export function strokeBegin(x, y, left, forceEraser=false) {
  if (anbt.locked) return

  let color;
  if (forceEraser) {
    color = 'eraser';
  } else {
    if (!left) {
      left = anbt.lastLeft
    } else {
      anbt.lastLeft = left
    }
    color = left ? anbt.colors[0] : anbt.colors[1]
  }

  const cls = color === 'eraser' ? color : null
  color = color === 'eraser' ? anbt.background : color
  console.log(color);
  anbt.path = createSvgElement('path', {
    class: cls,
    stroke: color,
    'stroke-width': anbt.size,
    'stroke-linejoin': 'round',
    'stroke-linecap': 'round',
    fill: 'none'
  })
  anbt.lastColor = color
  anbt.path.pattern = anbt.pattern
  //anbt.svgDisplay.insertBefore(anbt.path, anbt.svgDisplay.firstChild);
  anbt.path.pathSegList.appendItem(anbt.path.createSVGPathSegMovetoAbs(x, y))
  anbt.path.pathSegList.appendItem(
    anbt.path.createSVGPathSegLinetoAbs(x, y + 0.001)
  )
  if (navigator.userAgent.match(/\bPresto\b/)) {
    drawDisplayLinePresto(true)
  } else {
    drawDisplayLine(x, y, x, y + 0.001)
  }
  anbt.points = []
  anbt.points.push({ x, y })
  anbt.blot = true
  anbt.isStroking = true
}
