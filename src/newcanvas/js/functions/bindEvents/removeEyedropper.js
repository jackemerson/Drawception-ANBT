import { showEyedropperCursor } from '../anbt/showEyedropperCursor'

export function removeEyedropper(event) {
  if (event.altKey) return
  event.currentTarget.classList.remove('hidecursor')
  showEyedropperCursor(false)
  event.currentTarget.removeEventListener('mousemove', removeEyedropper)
}
