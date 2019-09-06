import anbt from '../../anbt'
import ID from '../idSelector'
import pause from '../anbt/pause'

const checkPlayingAndStop = () => {
  if (!anbt.isPlaying) return false
  pause()
  ID('play').classList.remove('pause')
  return true
}

export default checkPlayingAndStop
