import globals from '../../../globals'
import ID from '../../idSelector'
import ajax from '../ajax'
import extractInfoFromHTML from '../extractInfoFromHTML'

const timePlus = () => {
  let { gameInfo } = window
  if (!gameInfo.friend) return
  ID('timeplus').disabled = true
  ajax('POST', '/play/exit.json', {
    obj: {
      game_token: gameInfo.gameid
    },
    load: () => {
      ajax('GET', `/play/${gameInfo.gameid}/?${Date.now()}`, {
        load: response => {
          ID('timeplus').disabled = false
          gameInfo = response
            ? extractInfoFromHTML(response)
            : {
                error: 'Server returned a blank response :('
              }
          globals.timerStart = Date.now() + 1000 * gameInfo.timeleft
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

export default timePlus
