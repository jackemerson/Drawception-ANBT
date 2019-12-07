import { ID } from '../../idSelector'

export function knobMove(fraction) {
  const x = Math.floor(fraction * 502 - 10)
  if (fraction > 0) {
    ID('knob').classList.add('smooth')
  } else {
    ID('knob').classList.remove('smooth')
  }
  ID('knob').style.marginLeft = x + 'px'
  if (fraction >= 1) {
    ID('play').classList.remove('pause')
  }
}


