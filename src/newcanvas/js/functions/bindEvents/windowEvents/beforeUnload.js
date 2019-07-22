import anbt from '../../../anbt'

const beforeUnload = event => {
  if (!anbt.unsaved) return
  const message = "You haven't saved the drawing. Abandon?"
  event.returnValue = message
  return message
}

export default beforeUnload
