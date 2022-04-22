import { anbt } from '../../../anbt'
import { strokeBegin } from '../../anbt/strokeBegin'
import { strokeEnd } from '../../anbt/strokeEnd'
import { ID } from '../../idSelector'
import { windowMouseMove } from '../windowEvents/mouseMove'

export function mouseUp(event) {
  const { options } = window

  // add check to see if other drawing button is active
  
  
  if (event.button === 0 || event.button === 2) { // if we just released one of these
    event.preventDefault()
    if (anbt.isStroking) strokeEnd()

    if (event.buttons & 3) { // bitwise check for left or right mouse button still active
      const lastPoint = anbt.points[anbt.points.length - 1];
      const leftUp = (event.button === 0); // true if left button was released

      strokeBegin(lastPoint.x, lastPoint.y, !leftUp);
      
      console.log(`Released: ${event.button ? 'right' : 'left'}, Still pressed: ${event.buttons}`);
    } else { // no longer drawing
      if (options.hideCross) { ID('svgContainer').classList.remove('hidecursor'); }
      window.removeEventListener('mouseup', mouseUp)
      window.removeEventListener('mousemove', windowMouseMove)
   }
  }
}
