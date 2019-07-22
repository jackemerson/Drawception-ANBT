import anbt from '../../anbt'
import drawSvgElement from './drawSvgElement'

const updateView = () =>
  [...anbt.svg.childNodes]
    .splice(anbt.lastrect < anbt.position ? anbt.lastrect : 0)
    .forEach(child => drawSvgElement(child))

export default updateView
