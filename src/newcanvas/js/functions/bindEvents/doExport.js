import makePng from '../anbt/makePng'
import requestSave from '../anbt/requestSave'
import warnStrokesAfterPosition from './warnStrokesAfterPosition'

const doExport = event => {
  event.preventDefault()
  if (warnStrokesAfterPosition()) return
  makePng(600, 500, true)
  requestSave()
}

export default doExport
