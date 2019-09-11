import scrambleID from '../scrambleID'
import $ from '../selector'
import setupNewCanvas from '../setupNewCanvas'
import checkForRecording from './checkForRecording'

const addReplayButton = drawing => {
  if (drawing.replayAdded) return
  drawing.replayAdded = true
  const { parentNode, src } = drawing
  checkForRecording(src, () => {
    const newId = $(`img[src='${src}']`)
      .parentNode.querySelector('a[href^="/panel/"]')
      .href.match(/\/panel\/[^/]+\/([^/]+)/)[1]
    const id = newId.length >= 8 ? newId : scrambleID(parentNode.id.slice(6))
    const replayButton = $(
      `<a href="/sandbox/#${id}" class="panel-number anbt_replaypanel fas fa-redo-alt text-muted" title="Replay"></a>`
    )
    replayButton.addEventListener('click', event => {
      if (event.which === 2) return
      event.preventDefault()
      setupNewCanvas(true, `/sandbox/#${id}`)
    })
    parentNode.insertAdjacentHTML('beforebegin', replayButton.outerHTML)
  })
}

export default addReplayButton
