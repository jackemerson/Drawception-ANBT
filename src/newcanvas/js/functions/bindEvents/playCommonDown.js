import anbt from '../../anbt'
import pause from '../anbt/pause'
import play from '../anbt/play'
import ID from '../idSelector'

const playCommonDown = event => {
  event.stopPropagation()
  event.preventDefault()
  ID('play').classList.toggle('pause')
  if (anbt.isPlaying) pause()
  else play()
}

export default playCommonDown
