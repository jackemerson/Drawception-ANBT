import { anbt } from '../../anbt'
import { moveCursor } from './moveCursor'
import { strokeEnd } from './strokeEnd'

export function lock() {
  if (anbt.isStroking) strokeEnd()
  anbt.locked = true
  moveCursor(-100, -100)
}
