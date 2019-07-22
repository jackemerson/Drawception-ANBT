import anbt from '../../anbt'
import moveSeekbar from './moveSeekbar'
import seek from './seek'

const redo = () => {
  if (anbt.locked) return
  var posmax = anbt.svg.childNodes.length - 1
  if (anbt.position < posmax) {
    seek(anbt.position + 1)
    moveSeekbar(anbt.position / posmax)
  }
}

export default redo
