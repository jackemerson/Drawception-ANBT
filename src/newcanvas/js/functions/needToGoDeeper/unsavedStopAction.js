import anbt from '../../anbt'

const unsavedStopAction = () =>
  anbt.unsaved && !confirm("You haven't saved the drawing. Abandon?")

export default unsavedStopAction
