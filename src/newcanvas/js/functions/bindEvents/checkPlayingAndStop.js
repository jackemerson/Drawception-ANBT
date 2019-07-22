import anbt from '../../anbt'
import ID from '../idSelector'

const checkPlayingAndStop = () => {
  if (anbt.isPlaying) {
    anbt.Pause()
    ID('play').classList.remove('pause')
    return true
  }
  return false
}

export default checkPlayingAndStop
