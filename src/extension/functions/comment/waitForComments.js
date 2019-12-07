import { $ } from '../selector'
import { betterComments } from './betterComments'

export function waitForComments() {
  const comments = $('#comments')
    ? [...$('#comments').nextElementSibling.children].slice(1)
    : ''
  if (comments.length && !comments[0].classList.contains('spinner')) {
    betterComments()
  } else {
    if (comments.length === 0) return
    setTimeout(waitForComments, 1000)
  }
}
