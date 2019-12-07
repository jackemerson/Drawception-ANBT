import { globals } from '../../globals'
import { updateChooseBackground } from './updateChooseBackground'

export function clickSetBackground(event) {
  event.preventDefault()
  updateChooseBackground(!globals.chooseBackground)
}
