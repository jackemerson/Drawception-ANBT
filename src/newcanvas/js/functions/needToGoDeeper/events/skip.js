import { ID } from '../../idSelector'
import { ajax } from '../ajax'
import { getParametersFromPlay } from '../getParametersFromPlay'
import { unsavedStopAction } from '../unsavedStopAction'

export function skip() {
  if (unsavedStopAction()) return
  ID('skip').disabled = true
  ajax('POST', '/play/skip.json', {
    obj: {
      game_token: window.gameInfo.gameId
    },
    load: () => getParametersFromPlay(), // Postpone enabling skip until we get game info
    error: () => {
      ID('skip').disabled = false
      getParametersFromPlay()
    }
  })
}


