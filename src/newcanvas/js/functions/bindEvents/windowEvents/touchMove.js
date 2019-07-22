import anbt from '../../../anbt'
import globals from '../../../globals'
import simulateSingleTouchStart from '../simulateSingleTouchStart'

const touchMove = event => {
  if (event.touches.length !== 1) return
  simulateSingleTouchStart()
  event.preventDefault()
  if (!anbt.isStroking) return
  const x = event.touches[0].pageX - globals.rectangle.left /*- pageXOffset*/
  const y = event.touches[0].pageY - globals.rectangle.top /*- pageYOffset*/
  anbt.StrokeAdd(x, y)
}

export default touchMove
