import { anbt } from '../../anbt'
import { drawSvgElement } from './drawSvgElement'
import { moveSeekbar } from './moveSeekbar'
import { pause } from './pause'

export function playTimer() {
  if (!anbt.isPlaying) return
  const positionMax = anbt.svg.childNodes.length - 1
  let { delay } = anbt
  let indexMax = 0
  if (anbt.position < positionMax || anbt.isAnimating) {
    if (anbt.isAnimating) {
      indexMax = anbt.animatePath.pathSegList.numberOfItems - 1
      if (anbt.animateIndex < indexMax) {
        // There doesn't seem to be a simplier way to copy the pathSeg
        const segment = anbt.animatePath.pathSegList.getItem(anbt.animateIndex)
        const newSegment =
          segment.pathSegTypeAsLetter === 'L'
            ? anbt.path.createSVGPathSegLinetoAbs(segment.x, segment.y)
            : segment.pathSegTypeAsLetter === 'Q'
            ? anbt.path.createSVGPathSegCurvetoQuadraticAbs(
                segment.x,
                segment.y,
                segment.x1,
                segment.y1
              )
            : segment.pathSegTypeAsLetter === 'C' &&
              anbt.path.createSVGPathSegCurvetoCubicAbs(
                segment.x,
                segment.y,
                segment.x1,
                segment.y1,
                segment.x2,
                segment.y2
              )
        anbt.path.pathSegList.appendItem(newSegment)
        anbt.animateIndex++
      } else {
        anbt.isAnimating = false
        anbt.svgDisplay.removeChild(anbt.path)
        drawSvgElement(anbt.animatePath)
        anbt.position++
        anbt.animateIndex = 0
      }
      delay /= 6
    } else {
      const element = anbt.svg.childNodes[anbt.position + 1]
      if (element.nodeName === 'path') {
        anbt.isAnimating = true
        anbt.animatePath = element
        anbt.animateIndex = 1
        anbt.path = element.cloneNode(true)
        const segment = element.pathSegList.getItem(0)
        anbt.path.pathSegList.initialize(
          anbt.path.createSVGPathSegMovetoAbs(segment.x, segment.y)
        )
        anbt.svgDisplay.insertBefore(anbt.path, anbt.svgDisplay.firstChild)
      } else {
        drawSvgElement(element)
        anbt.position++
      }
    }
  }
  moveSeekbar(
    (anbt.position + (indexMax ? anbt.animateIndex / indexMax : 0)) /
      positionMax
  )
  if (anbt.position < positionMax) {
    setTimeout(anbt.playTimer, delay)
  } else {
    pause()
  }
}
