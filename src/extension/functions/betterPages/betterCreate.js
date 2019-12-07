import { options } from '../../options'
import { $ } from '../selector'

export function betterCreate() {
  if (options.enterToCaption) return
  const prompt = $('#prompt')
  if (prompt) {
    prompt.addEventListener('keydown', event => {
      if (event.keyCode === 13) event.preventDefault()
    })
  }
}
