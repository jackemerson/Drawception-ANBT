import { globals } from '../../globals'
import { clearWithColor } from '../anbt/clearWithColor'
import { ID } from '../idSelector'

export function clickTrash(event) {
  event.preventDefault()
  clearWithColor('eraser')
  if (ID('newcanvasyo').classList.contains('sandbox'))
    globals.timerStart = Date.now()
}
