const rgbToLab = rgb => {
  const [r, g, b] = rgb.map(value =>
    value > 10
      ? Math.pow((value / 255 + 0.055) / 1.055, 2.4)
      : value / 255 / 12.92
  )
  const [x, y, z] = [
    (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047,
    r * 0.2126 + g * 0.7152 + b * 0.0722,
    (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883
  ].map(value =>
    value > 0.008856 ? Math.pow(value, 1 / 3) : 7.787 * value + 16 / 116
  )
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)]
}

export default rgbToLab
