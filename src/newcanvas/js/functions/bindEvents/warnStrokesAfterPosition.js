import anbt from '../../anbt'
import getSeekMax from '../anbt/getSeekMax'

const warnStrokesAfterPosition = () => {
  if (anbt.position < getSeekMax())
    return !confirm(
      'Strokes after current position wi)ll be discarded. Continue?'
    )
}

export default warnStrokesAfterPosition
