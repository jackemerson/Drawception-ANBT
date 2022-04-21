import { anbt } from '../../../anbt'
import { globals } from '../../../globals'
import { eyedropper } from '../../anbt/eyedropper'
import { setColor } from '../../anbt/setColor'
import { strokeBegin } from '../../anbt/strokeBegin'
import { ID } from '../../idSelector'
import { checkPlayingAndStop } from '../checkPlayingAndStop'
import { getPointerType } from '../getPointerType'
import { updateColorIndicators } from '../updateColorIndicators'
import { windowMouseMove } from '../windowEvents/mouseMove'
import { mouseUp } from './mouseUp'

const MOUSE = {LEFT: 0, MIDDLE: 1, RIGHT: 2};

export function mouseDown(event) {
  const { options } = window
  if (event.button === MOUSE.LEFT || event.button === MOUSE.RIGHT) {
    if (anbt.isStroking) return mouseUp(event)
    if (checkPlayingAndStop()) return
    event.preventDefault()
    globals.rectangle = event.currentTarget.getBoundingClientRect()
    const x = event.pageX - globals.rectangle.left - pageXOffset
    const y = event.pageY - globals.rectangle.top - pageYOffset

    if (anbt.eyedropperActive) {
      let primary = event.button === MOUSE.LEFT ? 0 : 1;
      setColor(primary, eyedropper(x, y))
      updateColorIndicators()
    } else {
      // PointerType == 3 is pen tablet eraser
      const left = event.button === MOUSE.LEFT && getPointerType() !== 3
      if (options.hideCross) ID('svgContainer').classList.add('hidecursor')
      strokeBegin(x, y, left)
      window.addEventListener('mouseup', mouseUp)
      window.addEventListener('mousemove', windowMouseMove)
    }
  }
}


