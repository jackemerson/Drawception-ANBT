import { globals } from '../../../globals'
import { ID } from '../../idSelector'
import { knobCommonMove } from './knobCommonMove'
import { knobCommonUp } from './knobCommoUp'

export function knobCommonDown(event) {
  if (event.button === 0 || (event.touches && event.touches.length === 1)) {
    globals.rectangle = ID('seekbar').getBoundingClientRect()
    knobCommonMove(event)
    window.addEventListener('mouseup', knobCommonUp)
    window.addEventListener('touchend', knobCommonUp)
    window.addEventListener('mousemove', knobCommonMove)
    window.addEventListener('touchmove', knobCommonMove)
  }
}
