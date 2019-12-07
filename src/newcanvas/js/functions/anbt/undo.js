import { anbt } from '../../anbt'
import { moveSeekbar } from './moveSeekbar'
import { seek } from './seek'

export function undo() {
  if (anbt.locked) return
  // Prevent "undoing" the background rectangle
  if (anbt.position === 0) return
  seek(anbt.position - 1)
  moveSeekbar(anbt.position / (anbt.svg.childNodes.length - 1))
}
