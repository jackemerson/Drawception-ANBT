import { globals } from '../../globals'
import { ID } from '../idSelector'

export function updateChooseBackground(chooseBackground) {
  globals.chooseBackground = chooseBackground
  ID('colors').classList.toggle('setbackground')
  ID('setbackground').classList.toggle('sel')
}


