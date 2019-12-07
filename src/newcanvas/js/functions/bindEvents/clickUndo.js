import { undo } from '../anbt/undo'
import { ID } from '../idSelector'

export function clickUndo(event) {
  event.preventDefault()
  ID('play').classList.remove('pause')
  undo()
}
