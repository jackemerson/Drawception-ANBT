import ID from '../../idSelector'
import getParametersFromPlay from '../getParametersFromPlay'
import unsavedStopAction from '../unsavedStopAction'

const start = () => {
  if (unsavedStopAction()) return
  ID('start').disabled = true
  getParametersFromPlay()
}

export default start
