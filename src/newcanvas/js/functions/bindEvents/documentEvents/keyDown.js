import { anbt } from '../../../anbt'
import { globals } from '../../../globals'
import { redo } from '../../anbt/redo'
import { setBackground } from '../../anbt/setBackground'
import { setColor } from '../../anbt/setColor'
import { showEyedropperCursor } from '../../anbt/showEyedropperCursor'
import { strokeBegin } from '../../anbt/strokeBegin'
import { strokeEnd } from '../../anbt/strokeEnd'
import { undo } from '../../anbt/undo'
import { ID } from '../../idSelector'
import { playCommonDown } from '../playCommonDown'
import { removeEyedropper } from '../removeEyedropper'
import { updateChooseBackground } from '../updateChooseBackground'
import { updateColorIndicators } from '../updateColorIndicators'



export function keyDown(event) {
  const { options } = window
  
  if (document.activeElement instanceof HTMLInputElement) return true;
  
  let codeMatch, keyMatch;
  codeMatch = keyMatch = false;

  
  codeMatch = true;

  
   
  switch (event.code) {

    /* EYEDROPPER */
    case 'AltLeft':
    case 'AltRight':
     /********************************
      * consider using modifiers, e.g.
      * `event.getModifierState('alt')` ...
      * or `event.altKey`
      ********************************/
      if (!navigator.userAgent.match(/\bPresto\b/)) {
        ID('svgContainer').classList.add('hidecursor');
        showEyedropperCursor(true);
        // The following is needed in case of Alt+Tab causing eyedropper to be stuck
        ID('svgContainer').addEventListener('mousemove', removeEyedropper);
      }

      break;

    /* Toggle colour double press? */  
    case 'KeyQ':
      options.colorDoublePress = !options.colorDoublePress;
      break;

    /* UNDO */
    case 'Backspace':
      if (!anbt.unsaved) return;
      // falls through
    case 'KeyZ':
      ID('play').classList.remove('pause');
      undo();
      break;

    /* REDO */
    case 'KeyY':
      ID('play').classList.remove('pause')
      redo()
      break;
    
    /* SWITCH COLOURS */
    case 'KeyX':
      const [color0, color1] = anbt.color;
      setColor(0, color1);
      setColor(1, color0);
      updateColorIndicators();
      break;
    
    /* Toggle Background Choice option? */
    case 'KeyB':
      if (ID('setbackground').hidden) return;
      updateChooseBackground(!globals.chooseBackground);
      break;

    /* Eraser */
    case 'E':
      if (event.ctrlKey || event.metaKey) return;
      setColor(0, 'eraser');
      updateColorIndicators();
      break;

   
    
    /* Decrease brush size */
    case 'BracketLeft':
    case 'NumpadSubtract':
    case 'Minus': 
    case 'Comma':
      if (event.ctrlKey || event.metaKey) return;
      for (let i = 1; i < globals.brushSizes.length; i++) { /* What's all this then? */
        if (anbt.size - globals.brushSizes[i] < 0.01) {
          ID('brush' + (i - 1)).click();
          break;
        }
      }
      break;

    /* Increase brush size */
    case 'BracketRight':
    case 'NumpadAdd':
    case 'Equal':
    case 'Period':
      if (event.ctrlKey || event.metaKey) return;
      for (let i = 0; i < globals.brushSizes.length - 1; i++) {
        if (anbt.size - globals.brushSizes[i] < 0.01) {
          ID('brush' + (i + 1)).click();
          break;
        }
      }
      break;
    
    case 'space':
      if (event.altKey || event.shiftKey) return;
      if (!event.ctrlKey && !event.metaKey) return;
      playCommonDown(event);
      break;

    default: {// no match
      codeMatch = false;
      break;
    }
  }
  

  // Handle Digit Inputs
  let regex = /^\d$/; // detects a singular digit, else won't match

  if (event.key.search(regex) === 0) { // returns index match, or -1 on no match

    const digit = Number(event.key);
    keyMatch = true;

    // if ( ctrlKey || metaKey || !options.colorNumberShortcuts) return;

    // Ctrl+1,2,3,4
    if ( 0 < digit & digit <= 4 && (event.ctrlKey || event.metaKey) ) {
      ID('brush' + (digit)).click();
    } else if (event.shiftKey ||
       (options.colorDoublePress && anbt.previousColorKey === digit )) {
      
      let index = digit + 8; // ???
      anbt.previousColorKey = index;

      if (options.colorDoublePress) {
        if (anbt.previousColorKeyTimer) clearTimeout(anbt.previousColorKeyTimer);
        anbt.previousColorKeyTimer = setTimeout(
          () => (anbt.previousColorKey = -1),
          500
        );
      }

      const elements = ID('colors').querySelectorAll('b')
      if (index < elements.length) {
        const color =
          elements[index].id === 'eraser'
            ? 'eraser'
            : elements[index].style.backgroundColor
        if (globals.chooseBackground) {
          if (color !== 'eraser') setBackground(color)
          updateChooseBackground(false)
        } else {
          setColor(0, color)
          updateColorIndicators()
        }
      }
      if (anbt.isStroking) {
        strokeEnd()
        const lastPoint = anbt.points[anbt.points.length - 1]
        strokeBegin(lastPoint.x, lastPoint.y)
      }

    } else {
      keyMatch = false;
    }


  }

  // switch (event.key) {
  //   /* TODO: Colour by Numbers */ /* handle this with event.key rather than event.code */
  //   /* COLOUR PICKER */
  //   case ''
  // }
  
  if (codeMatch || keyMatch) event.preventDefault();
  return;
}
