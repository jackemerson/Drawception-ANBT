import ID from '../../idSelector'
import ajax from '../ajax'
import exitToSandbox from '../exitToSandbox'

const exit = () => {
  const { gameInfo, incontest } = window
  if (incontest) {
    if (!confirm('Quit the contest? Entry coins will be lost!')) return
    ID('exit').disabled = true
    ajax('POST', '/contests/exit.json', {
      load: () => {
        ID('exit').disabled = false
        window.drawing_aborted = true
        exitToSandbox()
        document.location.pathname = '/contests/'
      },
      error: () => {
        ID('exit').disabled = false
        alert('Server error. :( Try again?')
      }
    })
    return
  }
  if (gameInfo.drawfirst) {
    if (!confirm('Abort creating a draw first game?')) return
    ID('exit').disabled = true
    ajax('POST', '/play/abort-start.json', {
      obj: {
        game_token: gameInfo.gameid
      },
      load: () => {
        ID('exit').disabled = false
        window.drawing_aborted = true
        exitToSandbox()
        document.location.pathname = '/create/'
      },
      error: () => {
        ID('exit').disabled = false
        alert('Server error. :( Try again?')
      }
    })
    return
  }
  if (!confirm('Really exit?')) return
  ID('exit').disabled = true
  ajax('POST', '/play/exit.json', {
    obj: {
      game_token: gameInfo.gameid
    },
    load: () => {
      ID('exit').disabled = false
      exitToSandbox()
    }
  })
}

export default exit
