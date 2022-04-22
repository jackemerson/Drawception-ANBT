import { anbt } from '../../anbt'
import { globals } from '../../globals'
import { setSize } from '../anbt/setSize'
import { strokeBegin } from '../anbt/strokeBegin'
import { strokeEnd } from '../anbt/strokeEnd'
import { ID } from '../idSelector'

let incrementalSize = Number(anbt.size);

export function changeBrushSize(event) {
  
  event.preventDefault()
  const size = [...event.currentTarget.classList]
    .filter(htmlClass => htmlClass.startsWith('size-'))[0]
    .match(/\d+/)[0]

  setSize(Number(size));
  resetIncrement()
  // console.log(`Size reset: ${incrementalSize}, size ${anbt.size}`);

  if (!anbt.isStroking) return
  strokeEnd()
  const lastPoint = anbt.points[anbt.points.length - 1]
  strokeBegin(lastPoint.x, lastPoint.y)
}

/**
 * @param {Number} modifier - step down or up
 */
export function modifyBrushSize(modifier) {
  
  const MIN = 0, MAX = globals.brushSizes.length - 1;
  const size = globals.brushSizes.indexOf(Number(anbt.size));
  const newSize = Math.min(Math.max(MIN, size + modifier), MAX); // clamp value

  setSize(globals.brushSizes[newSize]);
  resetIncrement();
  
  if (!anbt.isStroking) return
  strokeEnd();
  const lastPoint = anbt.points[anbt.points.length - 1];
  strokeBegin(lastPoint.x, lastPoint.y);
}

/**
 * 
 */
export function softModifyBrushSize(step) {
  let currentBrush = globals.brushSizes.indexOf(Number(anbt.size));
  
  if ( (currentBrush === 0 && step === -1) ||
       (currentBrush === (globals.brushSizes.length-1) && step === 1)) { 
        //  console.log(`No further steps: ${step}`);
    return;
  } // can't step further in that direction
  
  let currentSize = Number(anbt.size);
  let nextSize = Number(globals.brushSizes[currentBrush + step]);

  const MIN = globals.brushSizes[0];
  const MAX = globals.brushSizes[globals.brushSizes.length - 1];


  incrementalSize = Math.min(MAX, Math.max(MIN, incrementalSize + step));

  // console.log(`Increment: ${incrementalSize}, Current: ${anbt.size}`);
  let currentDiff = Math.abs(currentSize - incrementalSize);
  let nextDiff = Math.abs(nextSize - incrementalSize);

  if (nextDiff < currentDiff) { // if the difference to the next step is smaller
    modifyBrushSize(step);
  }

}

export function resetIncrement() {
  incrementalSize = Number(anbt.size);
}