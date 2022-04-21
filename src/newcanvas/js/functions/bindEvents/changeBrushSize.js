import { anbt } from '../../anbt'
import { globals } from '../../globals'
import { setSize } from '../anbt/setSize'
import { strokeBegin } from '../anbt/strokeBegin'
import { strokeEnd } from '../anbt/strokeEnd'
import { ID } from '../idSelector'

let incrementalSize = anbt.size;

export function changeBrushSize(event) {
  event.preventDefault()
  const size = [...event.currentTarget.classList]
    .filter(htmlClass => htmlClass.startsWith('size-'))[0]
    .match(/\d+/)[0]

  setSize(size)
  resetIncrement();

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
  
  const MIN = 0, MAX = globals.brushSizes.length - 1;
  const size = globals.brushSizes.indexOf(anbt.size);
  const newSize = Math.min(Math.max(MIN, size - modifier), MAX); // clamp value

  setSize(globals.brushSizes[newSize]);
  resetIncrement();

  if (!anbt.isStroking) return
  strokeEnd();
  const lastPoint = anbt.points[anbt.points.length - 1];
  strokeBegin(lastPoint.x, lastPoint.y, anbt.lastColourChoice);
}

/**
 * 
 */
export function softModifyBrushSize(step) {
  let index = globals.brushSizes.indexOf(anbt.size);
  
  if ( (index === 0 && step < 0) ||
       (index === (globals.brushSizes.length-1) && step > 0) ) { 
    return;
  } // can't step further in that direction
  let currentSize = anbt.size;
  let nextSize = globals.brushSizes[index + step];


  incrementalSize += step;

  let currentDiff = Math.abs(currentSize - incrementalSize);
  let nextDiff = Math.abs(nextSize - incrementalSize);

  if (nextDiff < currentDiff) { // if the difference to the next step is smaller
    modifyBrushSize(step);
  }

}

export function resetIncrement() {
  incrementalSize = anbt.size;
}