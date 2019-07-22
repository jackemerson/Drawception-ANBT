import globals from '../../globals'
import updateChooseBackground from './updateChooseBackground'

const clickSetBackground = event => {
  event.preventDefault()
  updateChooseBackground(!globals.chooseBackground)
}

export default clickSetBackground
