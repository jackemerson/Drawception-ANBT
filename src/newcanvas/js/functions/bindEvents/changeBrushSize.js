import { anbt } from '../../anbt'
import { globals } from '../../globals'
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
  strokeBegin(lastPoint.x, lastPoint.y, anbt.lastColourChoice)
}

/**
 * @param {Number} modifier - step down or up
 */
export function modifyBrushSize(modifier) {

  
  const MIN = 0, MAX = globals.brushSizes.length;
  const size = globals.brushSizes.indexOf(anbt.size);
  const newSize = Math.min(Math.max(MIN, size - modifier), MAX); // clamp value

  setSize(globals.brushSizes[newSize]);

  if (!anbt.isStroking) return
  strokeEnd();
  const lastPoint = anbt.points[anbt.points.length - 1];
  strokeBegin(lastPoint.x, lastPoint.y, anbt.lastColourChoice);
}