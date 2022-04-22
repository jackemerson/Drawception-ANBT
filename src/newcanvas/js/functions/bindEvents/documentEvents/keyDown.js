import { anbt } from '../../../anbt'
import { globals } from '../../../globals'
import { redo } from '../../anbt/redo'
import { setBackground } from '../../anbt/setBackground'
import { getColor, setColor } from '../../anbt/setColor'
import { showEyedropperCursor } from '../../anbt/showEyedropperCursor'
import { strokeBegin } from '../../anbt/strokeBegin'
import { strokeEnd } from '../../anbt/strokeEnd'
import { undo } from '../../anbt/undo'
import { ID } from '../../idSelector'
import { playCommonDown } from '../playCommonDown'
import { removeEyedropper } from '../removeEyedropper'
import { updateChooseBackground } from '../updateChooseBackground'
import { updateColorIndicators } from '../updateColorIndicators'
import { environment } from '../../../../../versionInfo'



export function keyDown(event) {
  const { options } = window
  if (document.activeElement instanceof HTMLInputElement) return true;
  
  if (environment === 'development') {

    switch (event.code) {
      case 'KeyP': // debug print out
        console.log(anbt);
        return;
      case 'KeyR': // reload
        if (!event.ctrlKey) {
          localStorage.removeItem('anbt_canvasHTML_last_cached');
          location.reload();
          return;
        }
        break;
    }

  } 
  let codeMatch, keyMatch;
  codeMatch = keyMatch = false;
  

  codeMatch = true; // set to false if no match
  switch (event.code) {

    
    /* EYEDROPPER - Alt keys, I*/
    case 'AltLeft':
    case 'AltRight':
      if (!navigator.userAgent.match(/\bPresto\b/)) {
        // The following is needed in case of Alt+Tab causing eyedropper to be stuck
        ID('svgContainer').addEventListener('mousemove', removeEyedropper);
      }
    // falls through
    case 'KeyI': {
        const active = anbt.eyedropperActive; // get eyedropper state

        const activate = (!active || event.altKey); // should we activate?
        anbt.eyedropperActive = activate;
        // do activate if not active or alt key
        ID('svgContainer').classList.toggle('hidecursor', activate);
        showEyedropperCursor(activate);
      
      break;
    }
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
    
    
    case 'KeyX': { /* SWITCH COLOURS */
      const [color0, color1] = anbt.colors;
      setColor(0, color1);
      setColor(1, color0);
      updateColorIndicators();

      if (anbt.isStroking) {
        strokeEnd()
        const lastPoint = anbt.points[anbt.points.length - 1];
        strokeBegin(lastPoint.x, lastPoint.y)
      }

      break;
    }

    
    /* Toggle Background Choice option? */
    case 'KeyB':
      if (ID('setbackground').hidden) return;
      updateChooseBackground(!globals.chooseBackground);
      break;

    /* Eraser */
    case 'KeyE': {
      if (event.ctrlKey || event.metaKey) return;
      
      const whichColor = !anbt.lastPalette; // left == 1, but its related color is at index 0
      setColor(whichColor, 'eraser');
      updateColorIndicators();

      console.log(`Eraser Key, ${getColor(whichColor)}`);

      if (anbt.isStroking) {
        strokeEnd()
        const lastPoint = anbt.points[anbt.points.length - 1];
        strokeBegin(lastPoint.x, lastPoint.y)
      }

      break;
    }
   
    
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
    
    case 'Space':
      if (event.altKey || event.shiftKey) return;
      if (!event.ctrlKey && !event.metaKey) return;
      playCommonDown(event);
      break;

    default: // no match
      codeMatch = false;
      break;
  }
  

  // Handle Digit Inputs
  let keyRegex = /^\d$/; // detects a singular digit, else won't match
  let codeRegex = /^(Numpad|Digit)([\d])$/; // Numpad or Digit
  let capture;
  let digit = -1;

  if (event.shiftKey) { // the modifier will change the key value, fall back to code
    capture = event.code.search(codeRegex);
    if (capture !== -1) { digit = Number(event.code[event.code.length - 1]); }
  } else {
    capture = event.key.search(keyRegex);
    if (capture !== -1) { digit = Number(event.key); }
  }

  if (digit !== -1 && options.colorNumberShortcuts) { // returns index match, or -1 on no match

    keyMatch = true;

    // if ( ctrlKey || metaKey || !options.colorNumberShortcuts) return;

    // Ctrl+1,2,3,4 - change brush size
    if ( (event.ctrlKey || event.metaKey) ) {

      if (0 < digit & digit <= 4) {
        ID(`brush${digit - 1}`).click();
      } else {
        return;
      }

    } else {
      // javascript doesn't treat % as modulo, just remainder
      const mod = (a, n) => ((a % n ) + n ) % n;
      let index = mod((digit - 1), 10); // offset and normalise (-1 -> 9)
      // shift modifier
      if (event.shiftKey ||
         (options.colorDoublePress && anbt.previousColorKey === index )) {
        
        index += 8; // ??? (oh shift modifier -> to access colours beyond 1-9 )
        anbt.previousColorKey = index;
        console.log(`Shift modifier: ${event.code}, ${index-8} -> ${index}`);
      }

      if (options.colorDoublePress) {
        if (anbt.previousColorKeyTimer) clearTimeout(anbt.previousColorKeyTimer);
        anbt.previousColorKeyTimer = setTimeout(
          () => (anbt.previousColorKey = -1),
          500
        );
      }

      const elements = ID('colors').querySelectorAll('b');
      if (index < elements.length) {
        const color =
          elements[index].id === 'eraser'
            ? 'eraser'
            : elements[index].style.backgroundColor
        if (globals.chooseBackground) {
          if (color !== 'eraser') setBackground(color)
          updateChooseBackground(false)
        } else {
          let colorIndex = 0; // left
          // if either button is still pressed
          if (event.buttons & 3) { colorIndex = !(anbt.lastPalette); } // ! so Left click matches index 0 colour
          
          setColor(colorIndex, color);
          updateColorIndicators();
        }
      }

      if (anbt.isStroking) { // refresh colour in use
        strokeEnd()
        const lastPoint = anbt.points[anbt.points.length - 1]
        strokeBegin(lastPoint.x, lastPoint.y)
      }

    }
    

  }
  
  if (codeMatch || keyMatch) event.preventDefault();
  
  return;
}
