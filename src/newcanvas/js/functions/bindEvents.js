import { globals } from '../globals'
import { setSeekbarMove } from './anbt/setSeekbarMove'
import { changeBrushSize } from './bindEvents/changeBrushSize'
import { clickRedo } from './bindEvents/clickRedo'
import { clickSetBackground } from './bindEvents/clickSetBackground'
import { clickTrash } from './bindEvents/clickTrash'
import { clickUndo } from './bindEvents/clickUndo'
import { colorClick } from './bindEvents/colorClick'
import { keyDown } from './bindEvents/documentEvents/keyDown'
import { keyUp } from './bindEvents/documentEvents/keyUp'
import { doExport } from './bindEvents/doExport'
import { doImport } from './bindEvents/doImport'
import { exportToDrawception } from './bindEvents/exportToDrawception'
import { exportToImgur } from './bindEvents/exportToImgur'
import { knobCommonDown } from './bindEvents/knob/knobCommomDown'
import { knobMove } from './bindEvents/knob/knobMove'
import { noDefault } from './bindEvents/noDefault'
import { openPaletteList } from './bindEvents/palette/openPaletteList'
import { playCommonDown } from './bindEvents/playCommonDown'
import { popupClose } from './bindEvents/popupClose'
import { svgContextMenu } from './bindEvents/svgContainerEvents/contextMenu'
import { mouseDown } from './bindEvents/svgContainerEvents/mouseDown'
import { mouseLeave } from './bindEvents/svgContainerEvents/mouseLeave'
import { svgMouseMove } from './bindEvents/svgContainerEvents/mouseMove'
import { touchStart } from './bindEvents/svgContainerEvents/touchStart'
import { beforeUnload } from './bindEvents/windowEvents/beforeUnload'
import { windowContextMenu } from './bindEvents/windowEvents/contextMenu'
import { error } from './bindEvents/windowEvents/error'
import { ID } from './idSelector'

export function bindEvents() {
  ID('svgContainer').addEventListener('mousedown', mouseDown)
  ID('svgContainer').addEventListener('mousemove', svgMouseMove)
  ID('svgContainer').addEventListener('touchstart', touchStart)
  ID('svgContainer').addEventListener('mouseleave', mouseLeave)
  ID('svgContainer').addEventListener('contextmenu', svgContextMenu)
  ID('import').addEventListener('click', doImport)
  ID('export').addEventListener('click', doExport)
  ID('imgur').addEventListener('click', exportToImgur)
  ID('drawception').addEventListener('click', exportToDrawception)
  document.querySelectorAll('.brush').forEach((brush, index) => {
    brush.classList.add(`size-${globals.brushSizes[index]}`)
    brush.addEventListener('mousedown', changeBrushSize)
    brush.addEventListener('click', changeBrushSize)
  })
  ID('colors')
    .querySelectorAll('b')
    .forEach(color => {
      color.addEventListener('mousedown', colorClick)
      color.addEventListener('touchend', colorClick)
      color.addEventListener('contextmenu', noDefault)
    })
  ID('setbackground').addEventListener('click', clickSetBackground)
  ID('undo').addEventListener('click', clickUndo)
  ID('redo').addEventListener('click', clickRedo)
  ID('trash').addEventListener('click', clickTrash)
  setSeekbarMove(knobMove)
  ID('knob').addEventListener('mousedown', knobCommonDown)
  ID('knob').addEventListener('touchstart', knobCommonDown)
  ID('seekbar').addEventListener('mousedown', knobCommonDown)
  ID('seekbar').addEventListener('touchstart', knobCommonDown)
  ID('play').addEventListener('mousedown', playCommonDown)
  ID('play').addEventListener('touchstart', playCommonDown)
  ID('palettename').addEventListener('mousedown', openPaletteList)
  ID('palettename').addEventListener('touchend', openPaletteList)
  ID('imgurpopupclose').addEventListener('click', popupClose)
  ID('drawceptionpopupclose').addEventListener('click', popupClose)
  document.addEventListener('keyup', keyUp)
  document.addEventListener('keydown', keyDown)
  window.addEventListener('contextmenu', windowContextMenu)
  window.addEventListener('error', error)
  window.addEventListener('beforeunload', beforeUnload)
}
