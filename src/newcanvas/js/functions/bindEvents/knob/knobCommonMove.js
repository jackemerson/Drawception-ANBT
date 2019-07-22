import globals from '../../../globals'
import getSeekMax from '../../anbt/getSeekMax'
import seek from '../../anbt/seek'
import ID from '../../idSelector'

const knobCommonMove = event => {
  event.preventDefault()
  const length = getSeekMax()
  let x = event.touches
    ? event.touches[0].pageX - globals.rectangle.left /*- pageXOffset*/ - 34
    : event.pageX - globals.rectangle.left - pageXOffset - 34
  x = Math.min(Math.max(-10, x), 492)
  const position = Math.round(((x + 10) / 502) * length)
  x = (position / length) * 502 - 10
  ID('knob').classList.add('smooth')
  ID('knob').style.marginLeft = x + 'px'
  seek(position)
  ID('play').classList.remove('pause')
}

export default knobCommonMove
