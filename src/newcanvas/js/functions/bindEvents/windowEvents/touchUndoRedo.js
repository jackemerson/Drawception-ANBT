import { globals } from '../../../globals'
import { redo } from '../../anbt/redo'
import { undo } from '../../anbt/undo'
import { ID } from '../../idSelector'

export function touchUndoRedo(event) {
  if (event.changedTouches.length === 1 && event.touches.length === 1) {
    const { pageX, pageY } = event.changedTouches[0]
    if (
      Math.abs(pageX - globals.lastTouch.pageX) < 10 &&
      Math.abs(pageY - globals.lastTouch.pageY) < 10
    ) {
      ID('play').classList.remove('pause')
      if (pageX < event.touches[0].pageX) undo()
      else redo()
    }
  }
  window.removeEventListener('touchend', touchUndoRedo)
}


