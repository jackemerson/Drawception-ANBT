import { anbt } from '../../anbt'
import { createSvgElement } from '../createSvgElement'
import { addToSvg } from './addToSvg'

export function clearWithColor(color) {
  addToSvg(
    createSvgElement('rect', {
      class: color,
      x: 0,
      y: 0,
      width: 600,
      height: 500,
      fill: anbt.background
    })
  )
  anbt.lastRect = anbt.position
}
