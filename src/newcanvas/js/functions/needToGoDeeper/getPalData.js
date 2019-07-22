import palettemap from '../../palettemap';
import palettes from '../../palettes';

const getPalData = palette => {
  if (palette === 'theme_roulette') {
    // Since site update, the game reports already chosen palette,
    // but apparently this still happens sometimes. ???
    alert(
      "Warning: Drawception roulette didn't give a theme. ANBT will choose a random palette."
    )
    delete palettes.Roulette
    const keys = Object.keys(palettemap)
    const paletteName = keys[(keys.length * Math.random()) << 0]
    palettes.Roulette = palettes[palettemap[paletteName][0]]
    return ['Roulette', palettemap[paletteName][1]]
  } else {
    if (palette) return palettemap[palette.toLowerCase()]
  }
}

export default getPalData
