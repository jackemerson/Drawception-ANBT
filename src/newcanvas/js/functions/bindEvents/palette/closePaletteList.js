import ID from '../../idSelector'

const closePaletteList = event => {
  if (event.touches || event.button === 0) {
    ID('palettechooser').classList.remove('open')
    window.removeEventListener('mousedown', closePaletteList)
    window.removeEventListener('touchend', closePaletteList)
  }
}

export default closePaletteList
