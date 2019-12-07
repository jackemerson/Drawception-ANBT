import { anbt } from '../../anbt'
import { drawSvgElement } from './drawSvgElement'
import { findLastRect } from './findLastRect'
import { pause } from './pause'

export function seek(newPosition) {
  if (anbt.locked) return
  let start = -1
  pause(true)
  if (newPosition === anbt.position) return
  if (newPosition < anbt.position) {
    const rewindSteps = anbt.position - newPosition
    if (rewindSteps <= anbt.rewindCache.length) {
      // Draw from cached
      anbt.context.putImageData(anbt.rewindCache[rewindSteps - 1], 0, 0)
      anbt.rewindCache.splice(0, rewindSteps)
    } else {
      // Not cached; rebuild cache
      start =
        anbt.lastRect <= newPosition ? anbt.lastRect : findLastRect(newPosition)
      drawSvgElement(anbt.svg.childNodes[start])
    }
  } else if (newPosition > anbt.position) {
    start = anbt.position
  }
  if (start !== -1) {
    const forwardSteps = newPosition - start
    if (forwardSteps >= anbt.fastUndoLevels) {
      anbt.rewindCache.length = 0
    } else {
      // Ex: 3 cached, 10 max, 8 steps to play => delete 1 from the end
      const { length } = anbt.rewindCache
      const numRemove = Math.min(
        length,
        newPosition - start + length - anbt.fastUndoLevels
      )
      anbt.rewindCache.splice(length - numRemove, numRemove)
    }
    for (let i = start + 1; i <= newPosition; i++) {
      if (newPosition - i < anbt.fastUndoLevels)
        anbt.rewindCache.unshift(anbt.context.getImageData(0, 0, 600, 500))
      drawSvgElement(anbt.svg.childNodes[i])
    }
  }
  anbt.position = newPosition
}
