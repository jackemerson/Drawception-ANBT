import { anbt } from '../../anbt'
import { createSvgElement } from '../createSvgElement'
import { drawDisplayLine } from './drawDisplayLine'
import { drawDisplayLinePresto } from './drawDisplayLinePresto'
import { getColor } from '../anbt/setColor';

export function strokeBegin(x, y, left=null, forceEraser=false) {
  if (anbt.locked) return
  
  let color;

  if (left !== null) {
    anbt.lastPalette = left;
  } else { // in case we call strokeBegin without knowledge of original input, e.g., by altering brush stroke
    anbt.lastPalette = anbt.lastPalette ?? 1;
  }

  if (forceEraser) {
    color = 'eraser'
  } else {
    color = getColor(!anbt.lastPalette);
    // color = anbt.lastPalette ? anbt.colors[0] : anbt.colors[1];
    // we've just set lastPalette (though it's global so uhh)
  }

  const cls = color === 'eraser' ? color : null;
  color = color === 'eraser' ? anbt.background : color;
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
