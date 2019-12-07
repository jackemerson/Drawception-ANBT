import { anbt } from '../anbt'
import { fromPng } from './anbt/fromPng'
import { fromUrl } from './anbt/fromUrl'
import { setBackground } from './anbt/setBackground'
import { setPaletteByName } from './bindEvents/palette/setPaletteByName'
import { updateColorIndicators } from './bindEvents/updateColorIndicators'
import { base64ToBytes } from './conversions/base64ToBytes'
import { fixTabletPluginGoingAwol } from './fixTabletPluginGoingAwol'
import { ID } from './idSelector'
import { ajax } from './needToGoDeeper/ajax'
import { bindCanvasEvents } from './needToGoDeeper/bindCanvasEvents'
import { extractInfoFromHTML } from './needToGoDeeper/extractInfoFromHTML'
import { getParametersFromPlay } from './needToGoDeeper/getParametersFromPlay'
import { handleSandboxParameters } from './needToGoDeeper/handleSandboxParameters'

export function needToGoDeeper() {
  const { options, inSandbox, panelId, paletteInfo } = window
  window.onerror = (error, file, line) => {
    // Silence the bogus error message from the overwritten page's timer
    if (error.toString().includes('periodsToSeconds')) return
    // Silence the useless error message
    if (error.toString().match(/script error/i)) return
    alert(line ? `${error}\nline: ${line}` : error)
  }
  if (options.newCanvasCSS) {
    const parent =
      document.getElementsByTagName('head')[0] || document.documentElement
    const style = document.createElement('style')
    style.type = 'text/css'
    const textNode = document.createTextNode(options.newCanvasCSS)
    style.appendChild(textNode)
    parent.appendChild(style)
  }
  if (options.enableWacom) {
    const stupidPlugin = document.createElement('object')
    const container = ID('wacomContainer')
    stupidPlugin.setAttribute('id', 'wacom')
    stupidPlugin.setAttribute('type', 'application/x-wacomtabletplugin')
    stupidPlugin.setAttribute('width', '1')
    stupidPlugin.setAttribute('height', '1')
    container.appendChild(stupidPlugin)
    if (options.fixTabletPluginGoingAWOL) fixTabletPluginGoingAwol()
  }
  bindCanvasEvents()
  if (inSandbox) {
    if (panelId) {
      ajax('GET', `/panel/drawing/${panelId}/-/`, {
        load: response => {
          window.gameInfo = extractInfoFromHTML(response)
          fromUrl(`${window.gameInfo.drawingLink}?anbt`) // workaround for non-CORS cached image
          handleSandboxParameters()
        },
        error: () => {
          alert('Error loading the panel page. Please try again.')
        }
      })
    } else {
      ajax('GET', '/sandbox/', {
        load: response => {
          window.gameInfo = extractInfoFromHTML(response)
          handleSandboxParameters()
        },
        error: () => {}
      })
      if (options.backup) {
        const pngdata = localStorage.getItem('anbt_drawingbackup_newcanvas')
        if (pngdata) {
          fromPng(base64ToBytes(pngdata.substr(22)).buffer)
          localStorage.removeItem('anbt_drawingbackup_newcanvas')
        }
      }
    }
    if (paletteInfo) {
      const palette = paletteInfo.split(',').map(color => `#${color}`)
      setPaletteByName('Custom', palette)
      setBackground(palette[palette.length - 1])
      anbt.colors = [palette[0], 'eraser']
      updateColorIndicators()
    }
  } else {
    ID('newcanvasyo').className = 'play'
    getParametersFromPlay()
  }
  // Poor poor memory devices, let's save on memory to avoid them "crashing"...
  if (/iPad|iPhone/.test(navigator.userAgent)) anbt.fastUndoLevels = 3
  window.$ = () => {
    alert(
      'Some additional script conflicts with ANBT new canvas, please disable it.'
    )
    window.$ = null
    throw new Error('Script conflict with ANBT new canvas')
  }
}
