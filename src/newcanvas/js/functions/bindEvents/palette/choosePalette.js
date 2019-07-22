import setPaletteByName from './setPaletteByName'

const choosePalette = event => {
  if (event.touches || event.button === 0) {
    event.preventDefault()
    const name = event.currentTarget.childNodes[0].nodeValue
    setPaletteByName(name)
  }
}

export default choosePalette
