import anbt from '../../anbt'
import drawSvgElement from './drawSvgElement'
import moveSeekbar from './moveSeekbar'

const addToSvg = element => {
  if (anbt.rewindCache.length >= anbt.fastUndoLevels) anbt.rewindCache.pop()
  anbt.rewindCache.unshift(anbt.context.getImageData(0, 0, 600, 500))
  drawSvgElement(element)
  if (!anbt.timeEdit || anbt.position === anbt.svg.childNodes.length - 1) {
    // Remove everything past current position
    for (let i = anbt.svg.childNodes.length - 1; i > anbt.position; i--)
      anbt.svg.removeChild(anbt.svg.childNodes[i])
    anbt.svg.appendChild(element)
    anbt.position = anbt.svg.childNodes.length - 1
    moveSeekbar(1)
  } else anbt.svg.insertBefore(element, anbt.svg.childNodes[anbt.position + 1])
}

export default addToSvg
