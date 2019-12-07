import { anbt } from '../../anbt'
import { pause } from '../anbt/pause'
import { play } from '../anbt/play'
import { ID } from '../idSelector'

export function playCommonDown(event) {
  event.stopPropagation()
  event.preventDefault()
  ID('play').classList.toggle('pause')
  if (anbt.isPlaying) {
    pause()
  } else {
    play()
  }
}
