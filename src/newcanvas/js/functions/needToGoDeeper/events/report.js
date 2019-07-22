import ID from '../../idSelector'
import ajax from '../ajax'
import getParametersFromPlay from '../getParametersFromPlay'

const report = () => {
  if (!confirm('Report this panel?')) return
  ajax('POST', '/play/flag.json', {
    obj: {
      game_token: window.gameInfo.gameid
    },
    load: () => {
      ID('report').disabled = false
      getParametersFromPlay()
    }
  })
}

export default report
