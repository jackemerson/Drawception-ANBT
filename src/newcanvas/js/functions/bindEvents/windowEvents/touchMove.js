import { anbt } from '../../../anbt'
import { globals } from '../../../globals'
import { strokeAdd } from '../../anbt/strokeAdd'
import { simulateSingleTouchStart } from '../simulateSingleTouchStart'

export function touchMove(event) {
  if (event.touches.length !== 1) return
  simulateSingleTouchStart()
  event.preventDefault()
  if (!anbt.isStroking) return
  const x = event.touches[0].pageX - globals.rectangle.left /*- pageXOffset*/
  const y = event.touches[0].pageY - globals.rectangle.top /*- pageYOffset*/
  strokeAdd(x, y)
}


