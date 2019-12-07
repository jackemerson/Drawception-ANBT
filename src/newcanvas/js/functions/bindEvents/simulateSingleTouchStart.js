import { globals } from '../../globals'
import { strokeBegin } from '../anbt/strokeBegin'

export function simulateSingleTouchStart() {
  if (!globals.touchSingle) return
  const x = globals.lastTouch.pageX - globals.rectangle.left /*- pageXOffset*/
  const y = globals.lastTouch.pageY - globals.rectangle.top /*- pageYOffset*/
  strokeBegin(x, y, true)
  globals.touchSingle = false
}


