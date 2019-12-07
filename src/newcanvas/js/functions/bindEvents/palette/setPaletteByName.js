import { anbt } from '../../../anbt'
import { palettes } from '../../../palettes'
import { ID } from '../../idSelector'
import { colorClick } from '../colorClick'
import { noDefault } from '../noDefault'

export function setPaletteByName(name, customColors) {
  ID('palettename').childNodes[0].nodeValue = name
  const colors = palettes[name] || customColors
  anbt.palette = colors
  const palette = ID('palette')
  const elements = palette.querySelectorAll('b')
  // Remove all current colors except for the eraser
  elements.forEach(element => palette.removeChild(element))
  const eraser = elements[elements.length - 1]
  colors.forEach(color => {
    const bElement = document.createElement('b')
    bElement.style.backgroundColor = color
    bElement.addEventListener('mousedown', colorClick)
    bElement.addEventListener('touchend', colorClick)
    bElement.addEventListener('contextmenu', noDefault)
    palette.appendChild(bElement)
    // Eraser got on the front, put it on the back
    palette.appendChild(eraser)
  })
}


