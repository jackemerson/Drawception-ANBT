import $ from '../selector'
import checkForRecording from './checkForRecording'

const addReplaySign = drawing => {
  if (drawing.replayAdded) return
  drawing.replayAdded = true
  const panel = drawing.parentNode.parentNode
  const { src } = drawing
  checkForRecording(src, () => {
    const newid = src.match(/(\w+).png$/)[1]
    const replaySign =
      newid.length >= 8
        ? $(
            `<a href="/sandbox/#${newid}" class="pull-right fas fa-redo-alt" style="color:#8af;margin-right:4px" title="Replay!"></a>`
          )
        : $(
            '<span class="pull-right fas fa-redo-alt" style="color:#8af;margin-right:4px" title="Replayable!"></span>'
          )
    panel.appendChild(replaySign)
    // replaySign.tooltip();
  })
}

export default addReplaySign
