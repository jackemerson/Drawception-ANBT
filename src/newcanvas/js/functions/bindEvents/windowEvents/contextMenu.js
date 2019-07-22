import anbt from '../../../anbt'

const windowContextMenu = event => {
  if (anbt.isStroking) event.preventDefault()
}

export default windowContextMenu
