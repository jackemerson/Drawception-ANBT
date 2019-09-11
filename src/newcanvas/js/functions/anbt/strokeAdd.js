import anbt from '../../anbt'
import drawDisplayLine from './drawDisplayLine'
import drawDisplayLinePresto from './drawDisplayLinePresto'

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
  if (navigator.userAgent.match(/\bPresto\b/)) drawDisplayLinePresto(false)
  else drawDisplayLine(point.x, point.y, x, y)
  anbt.points.push({ x, y })
}

export default strokeAdd
