import anbt from '../../anbt'
import drawSvgElement from './drawSvgElement'

const updateView = () =>
  [...anbt.svg.childNodes]
    .splice(anbt.lastRect < anbt.position ? anbt.lastRect : 0)
    .forEach(child => drawSvgElement(child))

export default updateView
