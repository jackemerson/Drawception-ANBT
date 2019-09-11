import anbt from '../../../anbt'
import globals from '../../../globals'
import redo from '../../anbt/redo'
import setBackground from '../../anbt/setBackground'
import setColor from '../../anbt/setColor'
import showEyedropperCursor from '../../anbt/showEyedropperCursor'
import strokeBegin from '../../anbt/strokeBegin'
import strokeEnd from '../../anbt/strokeEnd'
import undo from '../../anbt/undo'
import ID from '../../idSelector'
import playCommonDown from '../playCommonDown'
import removeEyedropper from '../removeEyedropper'
import updateChooseBackground from '../updateChooseBackground'
import updateColorIndicators from '../updateColorIndicators'

const keyDown = event => {
  const { options } = window
  if (document.activeElement instanceof HTMLInputElement) return true
  // Alt
  if (event.keyCode === 18) {
    // Opera Presto refuses to hide cursor =(
    if (!navigator.userAgent.match(/\bPresto\b/))
      ID('svgContainer').classList.add('hidecursor')
    showEyedropperCursor(true)
    // The following is needed in case of Alt+Tab causing eyedropper to be stuck
    ID('svgContainer').addEventListener('mousemove', removeEyedropper)
  } else if (event.keyCode === 'Q'.charCodeAt(0)) {
    event.preventDefault()
    options.colorDoublePress = !options.colorDoublePress
  } else if (
    event.keyCode === 'Z'.charCodeAt(0) ||
    (event.keyCode === 8 && anbt.unsaved)
  ) {
    event.preventDefault()
    ID('play').classList.remove('pause')
    undo()
  } else if (event.keyCode === 'Y'.charCodeAt(0)) {
    event.preventDefault()
    ID('play').classList.remove('pause')
    redo()
  } else if (event.keyCode === 'X'.charCodeAt(0)) {
    event.preventDefault()
    const [color0, color1] = anbt.color
    setColor(0, color1)
    setColor(1, color0)
    updateColorIndicators()
  } else if (event.keyCode === 'B'.charCodeAt(0)) {
    if (ID('setbackground').hidden) return
    event.preventDefault()
    updateChooseBackground(!globals.chooseBackground)
  } else if (
    event.keyCode === 'E'.charCodeAt(0) &&
    !event.ctrlKey &&
    !event.metaKey
  ) {
    event.preventDefault()
    setColor(0, 'eraser')
    updateColorIndicators()
  } else if (
    event.keyCode >= 48 &&
    event.keyCode <= 57 &&
    !event.ctrlKey &&
    !event.metaKey &&
    options.colorNumberShortcuts
  ) {
    event.preventDefault()
    let index = event.keyCode === 48 ? 9 : event.keyCode - 49
    if (
      event.shiftKey ||
      (options.colorDoublePress && anbt.previousColorKey === index)
    )
      index += 8
    anbt.previousColorKey = index
    if (options.colorDoublePress) {
      if (anbt.previousColorKeyTimer) clearTimeout(anbt.previousColorKeyTimer)
      anbt.previousColorKeyTimer = setTimeout(() => (anbt.previousColorKey = -1), 500)
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
  } else if (
    (event.keyCode === 189 || event.keyCode === 219 || event.keyCode === 188) &&
    !event.ctrlKey &&
    !event.metaKey
  ) {
    // - or [ or ,
    event.preventDefault()
    for (let i = 1; i < globals.brushSizes.length; i++) {
      if (anbt.size - globals.brushSizes[i] < 0.01) {
        ID('brush' + (i - 1)).click()
        break
      }
    }
  } else if (
    (event.keyCode === 187 || event.keyCode === 221 || event.keyCode === 190) &&
    !event.ctrlKey &&
    !event.metaKey
  ) {
    // = or ] or .
    event.preventDefault()
    for (let i = 0; i < globals.brushSizes.length - 1; i++) {
      if (anbt.size - globals.brushSizes[i] < 0.01) {
        ID('brush' + (i + 1)).click()
        break
      }
    }
  } else if (
    event.keyCode >= 49 &&
    event.keyCode <= 52 &&
    (event.ctrlKey || event.metaKey)
  ) {
    // Ctrl+1,2,3,4
    event.preventDefault()
    ID('brush' + (event.keyCode - 49)).click()
  } else if (
    event.keyCode === 32 &&
    (event.ctrlKey || event.metaKey) &&
    !event.altKey &&
    !event.shiftKey
  )
    playCommonDown(event)
}

export default keyDown
