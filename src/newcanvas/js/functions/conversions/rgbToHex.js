const rgbToHex = rgb =>
  '#' +
  rgb
    .map((value, index) =>
      index < 3 ? ('0' + value.toString(16)).slice(-2) : ''
    )
    .join('')

export default rgbToHex
