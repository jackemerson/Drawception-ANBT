import { showEyedropperCursor } from '../../anbt/showEyedropperCursor'
import { ID } from '../../idSelector'
import { playerIsDrawing } from './trackFocus';

export function keyUp(event) {
  if (event.key !== 'Alt') return // return if not Alt
  ID('svgContainer').classList.remove('hidecursor')
  showEyedropperCursor(false)

  if (playerIsDrawing()) {
    event.preventDefault(); // Disable alt activating browser menu on firefox
  }

}
