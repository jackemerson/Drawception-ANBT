import { anbt } from '../../../anbt'

export function windowContextMenu(event) {
  if (anbt.isStroking) event.preventDefault()
}


