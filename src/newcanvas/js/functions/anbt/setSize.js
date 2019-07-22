import anbt from '../../anbt'
import moveCursor from './moveCursor'

const setSize = size => {
  anbt.size = size
  moveCursor()
}

export default setSize
