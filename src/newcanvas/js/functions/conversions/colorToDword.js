import colorToRgba from './colorToRgba'

const colorToDword = color =>
  colorToRgba(color)
    .map(value => String.fromCharCode(value))
    .join('')

export default colorToDword
