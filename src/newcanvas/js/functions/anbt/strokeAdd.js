import anbt from '../../anbt'
import drawDispLine from './drawDispLine'
import drawDispLinePresto from './drawDispLinePresto'

const strokeAdd = (x, y) => {
  if (anbt.locked) return
  if (!anbt.isStroking) throw new Error('StrokeAdd without StrokeBegin!')
  const point = anbt.points[anbt.points.length - 1]
  if (point.x === x && point.y === y) return
  if (anbt.blot) {
    anbt.path.pathSegList.removeItem(1)
    anbt.blot = false
  }
  anbt.path.pathSegList.appendItem(anbt.path.createSVGPathSegLinetoAbs(x, y))
  if (navigator.userAgent.match(/\bPresto\b/)) drawDispLinePresto(false)
  else drawDispLine(point.x, point.y, x, y)
  anbt.points.push({ x, y })
}

export default strokeAdd
