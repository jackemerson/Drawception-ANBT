import { anbt } from '../../../anbt'
import { setPaletteByName } from './setPaletteByName'

export function choosePalette(event) {
  if (event.touches || event.button === 0) {
    event.preventDefault()
    const name = event.currentTarget.childNodes[0].nodeValue
    anbt.paletteID = event.currentTarget.getAttribute('palette')
    setPaletteByName(name)
  }
}
