import palettes from '../../../palettes'
import ID from '../../idSelector'
import choosePalette from './choosePalette'
import closePaletteList from './closePaletteList'

const openPaletteList = event => {
  if (event.touches || event.button === 0) {
    event.preventDefault()
    const chooser = ID('palettechooser')
    chooser.classList.toggle('open')
    if (chooser.classList.contains('open')) {
      setTimeout(() => {
        window.addEventListener('mousedown', closePaletteList)
        window.addEventListener('touchend', closePaletteList)
      }, 1)
    }
    const keys = Object.keys(palettes)
    if (chooser.childNodes.length < keys.length) {
      const canvas = document.createElement('canvas')
      canvas.height = 10
      const ctx = canvas.getContext('2d')
      for (let i = chooser.childNodes.length; i < keys.length; i++) {
        canvas.width = 8 * palettes[keys[i]].length + 2
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 0.5
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1
        palettes[keys[i]].forEach((color, index) => {
          ctx.fillStyle = color
          ctx.fillRect(index * 8 + 1, 1, 8, 8)
        })
        const div = document.createElement('div')
        div.appendChild(document.createTextNode(keys[i]))
        div.style.backgroundImage = `url("${canvas.toDataURL()}")`
        div.style.backgroundRepeat = 'no-repeat'
        div.style.backgroundPosition = 'center 35px'
        div.addEventListener('mousedown', choosePalette)
        div.addEventListener('touchend', choosePalette)
        chooser.appendChild(div)
      }
    }
  }
}

export default openPaletteList
