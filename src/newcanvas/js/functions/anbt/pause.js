import { anbt } from '../../anbt'
import { drawSvgElement } from './drawSvgElement'
import { moveSeekbar } from './moveSeekbar'

export function pause(noSeekbar) {
  if (!anbt.isPlaying) return
  if (anbt.isAnimating) {
    anbt.isAnimating = false
    anbt.svgDisplay.removeChild(anbt.path)
    drawSvgElement(anbt.animatePath)
    anbt.position++
    if (!noSeekbar)
      moveSeekbar(anbt.position / (anbt.svg.childNodes.length - 1))
  }
  anbt.isPlaying = false
}
