import redo from '../anbt/redo'
import ID from '../idSelector'

const clickRedo = event => {
  event.preventDefault()
  ID('play').classList.remove('pause')
  redo()
}

export default clickRedo
