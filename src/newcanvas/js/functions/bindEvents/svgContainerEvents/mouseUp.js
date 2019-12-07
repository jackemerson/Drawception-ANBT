import { anbt } from '../../../anbt'
import { strokeEnd } from '../../anbt/strokeEnd'
import { ID } from '../../idSelector'
import { windowMouseMove } from '../windowEvents/mouseMove'

export function mouseUp(event) {
  const { options } = window
  if (event.button === 0 || event.button === 2) {
    event.preventDefault()
    if (anbt.isStroking) strokeEnd()
    if (options.hideCross) ID('svgContainer').classList.remove('hidecursor')
    window.removeEventListener('mouseup', mouseUp)
    window.removeEventListener('mousemove', windowMouseMove)
  }
}
