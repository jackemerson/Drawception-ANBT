import { anbt } from '../../anbt'
import { moveSeekbar } from './moveSeekbar'
import { seek } from './seek'

export function redo() {
  if (anbt.locked) return
  const positionMax = anbt.svg.childNodes.length - 1
  if (anbt.position < positionMax) {
    seek(anbt.position + 1)
    moveSeekbar(anbt.position / positionMax)
  }
}
