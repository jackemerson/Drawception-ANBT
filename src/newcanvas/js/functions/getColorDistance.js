import rgbToLab from './conversions/rgbToLab'

const getColorDistance = (rgb1, rgb2) => {
  const lab1 = rgbToLab(rgb1)
  const lab2 = rgbToLab(rgb2)
  const l = lab2[0] - lab1[0]
  const a = lab2[1] - lab1[1]
  const b = lab2[2] - lab1[2]
  return Math.sqrt(l ** 2 * 2 + a ** 2 + b ** 2)
}

export default getColorDistance
