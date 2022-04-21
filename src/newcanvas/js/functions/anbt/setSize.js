import { anbt } from '../../anbt'
import { moveCursor } from './moveCursor'

export function setSize(size) {
  anbt.size = size
  moveCursor()
}
