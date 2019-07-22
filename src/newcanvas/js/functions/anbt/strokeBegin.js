import anbt from '../../anbt'
import createSvgElement from '../createSvgElement'
import drawDispLine from './drawDispLine'
import drawDispLinePresto from './drawDispLinePresto'

const strokeBegin = (x, y, left) => {
  if (anbt.locked) return
  if (!left) left = anbt.lastleft
  else anbt.lastleft = left
  let color = left ? anbt.colors[0] : anbt.colors[1]
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
  anbt.lastcolor = color
  anbt.path.pattern = anbt.pattern
  //anbt.svgDisp.insertBefore(anbt.path, anbt.svgDisp.firstChild);
  anbt.path.pathSegList.appendItem(anbt.path.createSVGPathSegMovetoAbs(x, y))
  anbt.path.pathSegList.appendItem(
    anbt.path.createSVGPathSegLinetoAbs(x, y + 0.001)
  )
  if (navigator.userAgent.match(/\bPresto\b/)) drawDispLinePresto(true)
  else drawDispLine(x, y, x, y + 0.001)
  anbt.points = []
  anbt.points.push({ x, y })
  anbt.blot = true
  anbt.isStroking = true
}

export default strokeBegin
