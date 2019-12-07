import { moveCursor } from '../../anbt/moveCursor'

export function mouseLeave() {
  moveCursor(-100, -100) // Hide brush cursor
}
