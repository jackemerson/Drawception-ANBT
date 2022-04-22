import { anbt } from '../../../anbt'
import { globals } from '../../../globals'
import { eyedropper } from '../../anbt/eyedropper'
import { setColor } from '../../anbt/setColor'
import { strokeBegin } from '../../anbt/strokeBegin'
import { showEyedropperCursor } from '../../anbt/showEyedropperCursor'
import { ID } from '../../idSelector'
import { checkPlayingAndStop } from '../checkPlayingAndStop'
import { getPointerType } from '../getPointerType'
import { updateColorIndicators } from '../updateColorIndicators'
import { windowMouseMove } from '../windowEvents/mouseMove'
import { mouseUp } from './mouseUp'
import { strokeEnd } from '../../anbt/strokeEnd'

const MOUSE = {LEFT: 0, MIDDLE: 1, RIGHT: 2};

export function mouseDown(event) {
  const { options } = window
  if (event.button === MOUSE.LEFT || event.button === MOUSE.RIGHT) {

    if (checkPlayingAndStop()) return
    
    globals.rectangle = event.currentTarget.getBoundingClientRect()
    const x = event.pageX - globals.rectangle.left - pageXOffset
    const y = event.pageY - globals.rectangle.top - pageYOffset

    if (!anbt.eyedropperActive && anbt.isStroking && (event.buttons & 3)) { // if already drawing and both buttons pressed
      
      event.preventDefault()
      const isLeft = (event.button === MOUSE.LEFT);
      const eraser = !(getPointerType() !== 3);

      if (anbt.lastPalette !== isLeft) {
        strokeEnd();
        strokeBegin(x, y, isLeft, eraser);    
        if (options.hideCross) ID('svgContainer').classList.add('hidecursor')
      }
      // return mouseUp(event)
      return;
    } 

    
    event.preventDefault()
    if (anbt.eyedropperActive) {
      let primary = event.button === MOUSE.LEFT ? 0 : 1;
      setColor(primary, eyedropper(x, y))
      updateColorIndicators()

      if (!event.altKey) {
        anbt.eyedropperActive = false;
        ID('svgContainer').classList.remove('hidecursor');
        showEyedropperCursor(false);
      }

    } else {
      // PointerType == 3 is pen tablet eraser
      const left = (event.button === MOUSE.LEFT);
      const eraser = !(getPointerType() !== 3);
      if (options.hideCross) ID('svgContainer').classList.add('hidecursor')
      strokeBegin(x, y, left, eraser);
      window.addEventListener('mouseup', mouseUp)
      window.addEventListener('mousemove', windowMouseMove)
    }
  }
}


