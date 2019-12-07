import { anbt } from '../../anbt'

export function showEyedropperCursor(isEyedropper) {
  if (!anbt.brushCursor) return
  const visibility = isEyedropper ? 'hidden' : 'visible'
  const visibility2 = isEyedropper ? 'visible' : 'hidden'
  anbt.brushCursor.setAttribute('visibility', visibility)
  anbt.brushCursor2.setAttribute('visibility', visibility)
  anbt.eyedropperCursor.setAttribute('visibility', visibility2)
}
