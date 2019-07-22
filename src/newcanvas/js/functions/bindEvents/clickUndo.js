import undo from '../anbt/undo'
import ID from '../idSelector'

const clickUndo = event => {
  event.preventDefault()
  ID('play').classList.remove('pause')
  undo()
}

export default clickUndo
