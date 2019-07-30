import anbt from '../../../anbt'
import globals from '../../../globals'
import makePng from '../../anbt/makePng'
import ID from '../../idSelector'
import ajax from '../ajax'

const submitDrawing = () => {
  const { incontest, gameInfo, options } = window
  const moreThanMinuteLeft = globals.timerStart - Date.now() > 60000
  if (
    options.submitConfirm &&
    moreThanMinuteLeft &&
    !confirm('Ready to submit this drawing?')
  )
    return
  ID('submit').disabled = true
  makePng(300, 250, true)
  if (options.backup)
    localStorage.setItem('anbt_drawingbackup_newcanvas', anbt.pngBase64)
  window.submitting = true
  const url = incontest ? '/contests/submit-drawing.json' : '/play/draw.json'
  ajax('POST', url, {
    obj: {
      game_token: gameInfo.gameid,
      panel: anbt.pngBase64
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
        if (typeof response.error === 'object')
          alert(
            `Error! Please report this data:\ngame: ${
              gameInfo.gameid
            }\n\nresponse:\n${JSON.stringify(response.error)}`
          )
        else alert(response.error)
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

export default submitDrawing
