import { globals } from '../../../globals'
import { ID } from '../../idSelector'
import { ajax } from '../ajax'
import { extractInfoFromHTML } from '../extractInfoFromHTML'

export function timePlus() {
  let { gameInfo } = window
  if (!gameInfo.friend) return
  ID('timeplus').disabled = true
  ajax('POST', '/play/exit.json', {
    obj: {
      game_token: gameInfo.gameId
    },
    load: () => {
      ajax('GET', `/play/${gameInfo.gameId}/?${Date.now()}`, {
        load: response => {
          ID('timeplus').disabled = false
          gameInfo = response
            ? extractInfoFromHTML(response)
            : {
                error: 'Server returned a blank response :('
              }
          globals.timerStart = Date.now() + 1000 * gameInfo.timeLeft
        },
        error: () => {
          ID('timeplus').disabled = false
          alert('Server error. :( Try again?')
        }
      })
    },
    error: () => {
      ID('timeplus').disabled = false
      alert('Server error. :( Try again?')
    }
  })
}


