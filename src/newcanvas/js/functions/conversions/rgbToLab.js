const rgbToLab = rgb => {
  const [red, green, blue] = rgb.map(value =>
    value > 10
      ? Math.pow((value / 255 + 0.055) / 1.055, 2.4)
      : value / 255 / 12.92
  )
  const [x, y, z] = [
    (red * 0.4124 + green * 0.3576 + blue * 0.1805) / 0.95047,
    red * 0.2126 + green * 0.7152 + blue * 0.0722,
    (red * 0.0193 + green * 0.1192 + blue * 0.9505) / 1.08883
  ].map(value =>
    value > 0.008856 ? Math.pow(value, 1 / 3) : 7.787 * value + 16 / 116
  )
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)]
}

export default rgbToLab
