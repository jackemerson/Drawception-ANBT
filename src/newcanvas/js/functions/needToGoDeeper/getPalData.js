import paletteMap from '../../paletteMap'
import palettes from '../../palettes'

const getPalData = palette => {
  if (palette === 'theme_roulette') {
    // Since site update, the game reports already chosen palette,
    // but apparently this still happens sometimes. ???
    alert(
      "Warning: Drawception roulette didn't give a theme. ANBT will choose a random palette."
    )
    delete palettes.Roulette
    const keys = Object.keys(paletteMap)
    const paletteName = keys[(keys.length * Math.random()) << 0]
    palettes.Roulette = palettes[paletteMap[paletteName][0]]
    return ['Roulette', paletteMap[paletteName][1]]
  } else {
    if (palette) return paletteMap[palette.toLowerCase()]
  }
}

export default getPalData
