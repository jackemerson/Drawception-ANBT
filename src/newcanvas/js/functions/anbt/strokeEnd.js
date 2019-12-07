import { anbt } from '../../anbt'
import { buildSmoothPath } from '../buildSmoothPath'
import { simplifyDouglasPeucker } from '../simplifyDouglasPeucker'
import { addToSvg } from './addToSvg'

export function strokeEnd() {
  if (anbt.locked) return
  anbt.unsaved = true
  const points =
    anbt.points.length > 2 ? simplifyDouglasPeucker(anbt) : anbt.points
  buildSmoothPath(points, anbt.path)
  anbt.path.orig = points
  addToSvg(anbt.path)
  anbt.contextDisplay && anbt.contextDisplay.clearRect(0, 0, 600, 500)
  anbt.isStroking = false
}
