import globals from '../../globals'
import unlock from '../anbt/unlock'
import ID from '../idSelector'
import updateTimer from '../updateTimer'
import ajax from './ajax'

const exitToSandbox = () => {
  const { incontest, gameInfo, drawing_aborted, vertitle } = window
  if (incontest && !drawing_aborted)
    ajax('POST', '/contests/exit.json', {
      load: () => alert('You have missed your contest.')
    })
  if (gameInfo.drawfirst && !drawing_aborted) {
    ajax('POST', '/play/abort-start.json', {
      obj: {
        game_token: gameInfo.gameid
      },
      load: () =>
        alert('You have missed your Draw First game.\nIt has been aborted.'),
      error: () =>
        alert(
          'You have missed your Draw First game.\nI tried aborting it, but an error occured. :('
        )
    })
  }
  globals.timerStart = Date.now()
  ID('newcanvasyo').className = 'sandbox'
  window.timerCallback = () => {}
  updateTimer()
  document.title = 'Sandbox - Drawception'
  ID('gamemode').innerHTML = 'Sandbox'
  ID('headerinfo').innerHTML = `Sandbox with ${vertitle}`
  try {
    history.replaceState({}, null, '/sandbox/')
  } catch (e) {}
  unlock()
}

export default exitToSandbox
