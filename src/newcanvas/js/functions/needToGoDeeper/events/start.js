import { ID } from '../../idSelector'
import { getParametersFromPlay } from '../getParametersFromPlay'
import { unsavedStopAction } from '../unsavedStopAction'

export function start() {
  if (unsavedStopAction()) return
  ID('start').disabled = true
  getParametersFromPlay()
}


