import { anbt } from '../../anbt'

export function moveSeekbar(position) {
  if (anbt.seekbarMove) anbt.seekbarMove(position)
}
