import anbt from '../../anbt'
import moveSeekbar from './moveSeekbar'
import seek from './seek'

const undo = () => {
  if (anbt.locked) return
  // Prevent "undoing" the background rectangle
  if (anbt.position > 0) {
    seek(anbt.position - 1)
    moveSeekbar(anbt.position / (anbt.svg.childNodes.length - 1))
  }
}

export default undo
