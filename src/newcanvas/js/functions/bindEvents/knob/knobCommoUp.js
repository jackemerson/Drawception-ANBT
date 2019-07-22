import knobCommonMove from './knobCommonMove'

const knobCommonUp = event => {
  if (!event.button || (!event.touches && !event.touches.length)) {
    event.preventDefault()
    window.removeEventListener('mouseup', knobCommonUp)
    window.removeEventListener('touchend', knobCommonUp)
    window.removeEventListener('mousemove', knobCommonMove)
    window.removeEventListener('touchmove', knobCommonMove)
  }
}

export default knobCommonUp
