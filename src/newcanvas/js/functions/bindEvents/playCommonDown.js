import anbt from '../../anbt'
import pause from '../anbt/pause'
import play from '../anbt/play'
import ID from '../idSelector'

const playCommonDown = event => {
  event.stopPropagation()
  event.preventDefault()
  if (anbt.isPlaying) {
    ID('play').classList.remove('pause')
    pause()
  } else {
    ID('play').classList.add('pause')
    play()
  }
}

export default playCommonDown
