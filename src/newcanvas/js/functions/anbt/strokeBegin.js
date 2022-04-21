import { anbt } from '../../anbt'
import { createSvgElement } from '../createSvgElement'
import { drawDisplayLine } from './drawDisplayLine'
import { drawDisplayLinePresto } from './drawDisplayLinePresto'

export function strokeBegin(x, y, left=null, forceEraser=false) {
  if (anbt.locked) return

  
  
  let color;
  if (forceEraser) {
    color = 'eraser';
  } else if (left !== null) {
    anbt.lastPalette = left;
    color = left ? anbt.colors[0] : anbt.colors[1];
  } else {
    // in case we call strokeBegin without knowledge of original input, e.g., by altering brush stroke
    color = anbt.colors[(anbt.lastPalette ? 1 : 0) ?? 0];
  }

  const cls = color === 'eraser' ? color : null
  color = color === 'eraser' ? anbt.background : color
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
