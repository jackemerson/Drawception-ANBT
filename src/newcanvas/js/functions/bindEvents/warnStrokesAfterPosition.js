import { anbt } from '../../anbt'
import { getSeekMax } from '../anbt/getSeekMax'

export function warnStrokesAfterPosition() {
  return (
    anbt.position < getSeekMax() &&
    !confirm('Strokes after current position will be discarded. Continue?')
  )
}
