import options from '../../options'
import $ from '../selector'

const betterCreate = () => {
  if (!options.enterToCaption) {
    if ($('#prompt'))
      $('#prompt').addEventListener('keydown', event => {
        if (event.keyCode === 13) event.preventDefault()
      })
  }
}

export default betterCreate
