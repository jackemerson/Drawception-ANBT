import { anbt } from '../../../anbt'

export function beforeUnload(event) {
  if (!anbt.unsaved) return
  const message = "You haven't saved the drawing. Abandon?"
  event.returnValue = message
  return message
}


