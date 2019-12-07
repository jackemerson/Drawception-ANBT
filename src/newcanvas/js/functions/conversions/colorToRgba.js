export function colorToRgba(color) {
  return color[0] === '#'
    ? color.length === 4
      ? [...(color.substr(1, 3) + 'F')].map(rgb => parseInt(rgb + rgb, 16))
      : (color + 'FF')
          .substr(1, 8)
          .match(/.{2}/g)
          .map(rgb => parseInt(rgb, 16))
    : color.substr(0, 4) === 'rgba'
    ? color
        .match(/[\d\.]+/g)
        .map((rgba, index) =>
          index === 3 ? Math.floor(parseFloat(rgba) * 255) : parseInt(rgba, 10)
        )
    : color.substr(0, 3) === 'rgb'
    ? (color + 255).match(/[\d\.]+/g).map(rgba => parseInt(rgba, 10))
    : [0, 0, 0, 255]
}
