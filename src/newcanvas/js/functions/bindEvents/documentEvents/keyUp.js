import { showEyedropperCursor } from '../../anbt/showEyedropperCursor'
import { ID } from '../../idSelector'
import { playerIsDrawing } from './trackFocus';

export function keyUp(event) {
  if (!(event.key === 'Alt' || event.code === 'KeyI')) return // return if not Alt or I - eyedropper
  ID('svgContainer').classList.remove('hidecursor')
  showEyedropperCursor(false)

  if (playerIsDrawing() && event.key === 'Alt') {
    
    event.preventDefault(); // Disable alt activating browser menu on firefox
  }

}
