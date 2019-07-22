import colorToHex from './conversions/colorToHex'
import colorToRgba from './conversions/colorToRgba'
import rgbToHex from './conversions/rgbToHex'
import getColorDistance from './getColorDistance'
import ID from './idSelector'

const getClosestColor = (rgb, palette) => {
  // Allow any color in sandbox and friend games
  if (
    ID('newcanvasyo').classList.contains('sandbox') ||
    (window.gameInfo && window.gameInfo.friend)
  )
    return rgbToHex([...rgb])
  const distances = palette
    .slice(0)
    .map(color => getColorDistance([...rgb], colorToRgba(color)))
  const minimum = Math.min(...distances)
  const closestColor = palette[distances.indexOf(minimum)]
  return colorToHex(closestColor)
}

export default getClosestColor
