import { strokeEnd } from '../../anbt/strokeEnd'
import { simulateSingleTouchStart } from '../simulateSingleTouchStart'
import { touchMove } from './touchMove'

export function touchEnd(event) {
  if (event.touches.length !== 0) return
  simulateSingleTouchStart()
  event.preventDefault()
  window.removeEventListener('touchend', touchEnd)
  window.removeEventListener('touchmove', touchMove)
  strokeEnd()
}


