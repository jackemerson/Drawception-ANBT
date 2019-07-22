import anbt from '../../anbt'
import moveCursor from './moveCursor'
import strokeEnd from './strokeEnd'

const lock = () => {
  if (anbt.isStroking) strokeEnd()
  anbt.locked = true
  moveCursor(-100, -100)
}

export default lock
