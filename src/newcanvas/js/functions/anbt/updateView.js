import { anbt } from '../../anbt'
import { drawSvgElement } from './drawSvgElement'

export function updateView() {
  return [...anbt.svg.childNodes]
    .splice(anbt.lastRect < anbt.position ? anbt.lastRect : 0)
    .forEach(child => drawSvgElement(child))
}
