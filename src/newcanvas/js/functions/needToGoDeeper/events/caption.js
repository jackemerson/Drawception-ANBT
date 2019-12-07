import { ID } from '../../idSelector'

export function caption(event) {
  if (event.keyCode !== 13) return
  event.preventDefault()
  ID('submitcaption').click()
}


