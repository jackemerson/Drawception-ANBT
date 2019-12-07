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

export function mouseDown(event) {
  const { options } = window
  if (event.button === 0 || event.button === 2) {
    if (anbt.isStroking) return mouseUp(event)
    if (checkPlayingAndStop()) return
    event.preventDefault()
    globals.rectangle = event.currentTarget.getBoundingClientRect()
    const x = event.pageX - globals.rectangle.left - pageXOffset
    const y = event.pageY - globals.rectangle.top - pageYOffset

    if (event.altKey) {
      setColor(event.button ? 1 : 0, eyedropper(x, y))
      updateColorIndicators()
    } else {
      // PointerType == 3 is pen tablet eraser
      const left = event.button === 0 && getPointerType() !== 3
      if (options.hideCross) ID('svgContainer').classList.add('hidecursor')
      strokeBegin(x, y, left)
      window.addEventListener('mouseup', mouseUp)
      window.addEventListener('mousemove', windowMouseMove)
    }
  }
}


