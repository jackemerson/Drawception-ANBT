import { anbt } from '../../anbt'
import { pause } from '../anbt/pause'
import { ID } from '../idSelector'

export function checkPlayingAndStop() {
  if (!anbt.isPlaying) return false
  pause()
  ID('play').classList.remove('pause')
  return true
}
