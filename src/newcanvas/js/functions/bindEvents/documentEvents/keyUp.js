import showEyedropperCursor from '../../anbt/showEyedropperCursor'
import ID from '../../idSelector'

const keyUp = event => {
  if (event.keyCode !== 18) return // return if not Alt
  ID('svgContainer').classList.remove('hidecursor')
  showEyedropperCursor(false)
}

export default keyUp
