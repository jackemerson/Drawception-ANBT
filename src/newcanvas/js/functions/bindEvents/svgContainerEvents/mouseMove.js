import anbt from '../../../anbt'
import globals from '../../../globals'
import eyedropper from '../../anbt/eyedropper'
import moveCursor from '../../anbt/moveCursor'
import ID from '../../idSelector'

const svgMouseMove = event => {
  const { options } = window
  globals.rectangle = event.currentTarget.getBoundingClientRect()
  const x = event.pageX - globals.rectangle.left - pageXOffset
  const y = event.pageY - globals.rectangle.top - pageYOffset
  moveCursor(x, y)
  // Highlight color we're pointing at
  if (options.colorUnderCursorHint && !anbt.isStroking) {
    const color = eyedropper(x, y)
    if (globals.stSeenColorToHighlight !== color) {
      const element = ID('colors').querySelector('b.hint')
      if (element) element.classList.remove('hint')
      const colorIndex = anbt.palette.indexOf(color)
      if (colorIndex >= 0) {
        const elements = ID('colors').querySelectorAll('b')
        elements[colorIndex].classList.add('hint')
      }
    }
    globals.lastSeenColorToHighlight = color
  }
}

export default svgMouseMove
