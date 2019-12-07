import { anbt } from '../../anbt'
import { setSize } from '../anbt/setSize'
import { strokeBegin } from '../anbt/strokeBegin'
import { strokeEnd } from '../anbt/strokeEnd'
import { ID } from '../idSelector'

export function changeBrushSize(event) {
  event.preventDefault()
  const size = [...event.currentTarget.classList]
    .filter(htmlClass => htmlClass.startsWith('size-'))[0]
    .match(/\d+/)[0]
  setSize(size)
  const element = ID('tools').querySelector('.sel')
  if (element) element.classList.remove('sel')
  event.currentTarget.classList.add('sel')
  if (!anbt.isStroking) return
  strokeEnd()
  const lastPoint = anbt.points[anbt.points.length - 1]
  strokeBegin(lastPoint.x, lastPoint.y)
}
