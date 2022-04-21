import { anbt } from '../../../anbt'
import { strokeBegin } from '../../anbt/strokeBegin'
import { strokeEnd } from '../../anbt/strokeEnd'
import { ID } from '../../idSelector'
import { windowMouseMove } from '../windowEvents/mouseMove'

export function mouseUp(event) {
  const { options } = window

  //TODO: add check to see if other button is active
  if (event.button === 0 || event.button === 2) {

    

    event.preventDefault()
    if (anbt.isStroking) strokeEnd()

    if (event.buttons & 3) { // bitwise check for left or right mouse button still in use
      const lastPoint = anbt.points[anbt.points.length - 1];
      let button = event.button === 0; // true if left button
      strokeBegin(lastPoint.x, lastPoint.y, button);
    } else {
      if (options.hideCross) { ID('svgContainer').classList.remove('hidecursor'); }
      window.removeEventListener('mouseup', mouseUp)
      window.removeEventListener('mousemove', windowMouseMove)
    }
  }
}
