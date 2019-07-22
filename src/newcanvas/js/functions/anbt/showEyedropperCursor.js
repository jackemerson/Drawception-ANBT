import anbt from '../../anbt'

const showEyedropperCursor = isEyedropper => {
  if (!anbt.brushCursor) return
  const vis = isEyedropper ? 'hidden' : 'visible'
  const vis2 = isEyedropper ? 'visible' : 'hidden'
  anbt.brushCursor.setAttribute('visibility', vis)
  anbt.brushCursor2.setAttribute('visibility', vis)
  anbt.eyedropperCursor.setAttribute('visibility', vis2)
}

export default showEyedropperCursor
