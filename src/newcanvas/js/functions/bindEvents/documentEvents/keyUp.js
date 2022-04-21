import { showEyedropperCursor } from '../../anbt/showEyedropperCursor'
import { ID } from '../../idSelector'
import { playerIsDrawing } from './trackFocus';

export function keyUp(event) {
  if (!(event.altKey || event.code === 'KeyI')) return // return if not Alt or I - eyedropper
  ID('svgContainer').classList.remove('hidecursor')
  showEyedropperCursor(false)

  if (playerIsDrawing() && event.altKey) {
    event.preventDefault(); // disable alt activating menu on firefox?
  }

}
