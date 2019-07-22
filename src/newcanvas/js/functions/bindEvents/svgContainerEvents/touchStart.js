import anbt from '../../../anbt'
import globals from '../../../globals'
import strokeEnd from '../../anbt/strokeEnd'
import checkPlayingAndStop from '../checkPlayingAndStop'
import touchEnd from '../windowEvents/touchEnd'
import touchMove from '../windowEvents/touchMove'
import touchUndoRedo from '../windowEvents/touchUndoRedo'

const touchStart = event => {
  if (event.touches.length === 1) {
    if (checkPlayingAndStop()) return
    // Let two-finger scrolling, pinching, etc. work.
    // This requires moving dot-drawing to simulateSingleTouchStart()
    globals.rectangle = event.currentTarget.getBoundingClientRect()
    globals.touchSingle = true
    globals.lastTouch = event.touches[0]
    window.addEventListener('touchend', touchEnd)
    window.addEventListener('touchmove', touchMove)
  } else {
    // Enable two-finger undo and redo:
    // 1     o    o
    // 2   o o    o o
    // 3   . o    o .
    //     Undo   Redo
    if (globals.touchSingle && event.touches.length === 3) {
      globals.lastTouch = event.touches[1]
      window.addEventListener('touchend', touchUndoRedo)
    }
    globals.touchSingle = false
    window.removeEventListener('touchend', touchEnd)
    window.removeEventListener('touchmove', touchMove)
    if (anbt.isStroking) strokeEnd()
  }
}

export default touchStart
