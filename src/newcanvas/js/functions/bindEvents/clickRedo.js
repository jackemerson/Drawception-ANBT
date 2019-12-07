import { redo } from '../anbt/redo'
import { ID } from '../idSelector'

export function clickRedo(event) {
  event.preventDefault()
  ID('play').classList.remove('pause')
  redo()
}
