import anbt from '../../anbt'
import drawSvgElement from './drawSvgElement'
import moveSeekbar from './moveSeekbar'
import playTimer from './playTimer'

const play = () => {
  if (anbt.locked) return
  anbt.rewindCache.length = 0 // TODO: make rewind data remember its position
  if (anbt.position === anbt.svg.childNodes.length - 1) {
    if (anbt.position === 0) return moveSeekbar(1) // To make button revert to play
    anbt.position = 0
    moveSeekbar(0)
    // Assume first svg child is background rect
    drawSvgElement(anbt.svg.childNodes[0])
  }
  anbt.isPlaying = true
  playTimer()
}

export default play
