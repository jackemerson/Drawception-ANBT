import { anbt } from '../../../anbt'
import { globals } from '../../../globals'
import { formatDrawingData } from '../../anbt/formatDrawingData'
import { makePng } from '../../anbt/makePng'
import { ID } from '../../idSelector'
import { ajax } from '../ajax'

export function submitDrawing() {
  const { inContest, gameInfo, options, pako } = window
  const moreThanMinuteLeft = globals.timerStart - Date.now() > 60000
  if (
    options.submitConfirm &&
    moreThanMinuteLeft &&
    !confirm('Ready to submit this drawing?')
  )
    return
  ID('submit').disabled = true
  makePng(300, 250, true)
  if (options.backup) {
    localStorage.setItem('anbt_drawingbackup_newcanvas', anbt.pngBase64)
  }
  window.submitting = true
  const url = inContest ? '/contests/submit-drawing.json' : '/play/draw.json'
  const pathList = [...anbt.svg.childNodes].filter(
    childNode => childNode.nodeName === 'path'
  )
  const base = {
    v: 1,
    w: 600,
    h: 500,
    t: 0,
    th: gameInfo.palette,
    bg: anbt.background,
    p: 1,
    s: 0.7,
    actions: formatDrawingData(pathList)
  }
  const drawdata = btoa(
    pako
      .gzip(JSON.stringify(base))
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  )
  ajax('POST', url, {
    obj: {
      game_token: gameInfo.gameId,
      drawdata
    },
    load: response => {
      try {
        response = JSON.parse(response)
      } catch (e) {
        response = {
          error: response
        }
      }
      if (response.error) {
        ID('submit').disabled = false
        if (typeof response.error === 'object') {
          alert(
            `Error! Please report this data:\ngame: ${
              gameInfo.gameId
            }\n\nresponse:\n${JSON.stringify(response.error)}`
          )
        } else {
          alert(response.error)
        }
      } else if (response.message) {
        ID('submit').disabled = false
        alert(response.message)
      } else if (response.url) {
        window.onbeforeunload = () => {}
        anbt.unsaved = false
        location.replace(response.url)
      }
    },
    error: () => {
      ID('submit').disabled = false
      alert('Server error. :( Try again?')
    }
  })
}
