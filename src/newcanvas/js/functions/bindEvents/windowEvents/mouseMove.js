import anbt from '../../../anbt'
import globals from '../../../globals'
import strokeAdd from '../../anbt/strokeAdd'

const windowMouseMove = event => {
  event.preventDefault()
  if (!anbt.isStroking) return
  const x = event.pageX - globals.rectangle.left - pageXOffset
  const y = event.pageY - globals.rectangle.top - pageYOffset
  strokeAdd(x, y)
}

export default windowMouseMove
