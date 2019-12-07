import { anbt } from '../../anbt'

export function unsavedStopAction() {
  return anbt.unsaved && !confirm("You haven't saved the drawing. Abandon?")
}
