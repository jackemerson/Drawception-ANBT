import { anbt } from '../../anbt'

export function cutHistoryBeforeClearAndAfterPosition() {
  let removing = false
  for (let i = anbt.svg.childNodes.length - 1; i > 0; i--) {
    const element = anbt.svg.childNodes[i]
    if (removing || i > anbt.position) {
      anbt.svg.removeChild(element)
    } else if (element.nodeName === 'rect' && i <= anbt.position) {
      removing = true
      // Optimize out two eraser rectangles next to each other
      if (element.getAttribute('class') === 'eraser')
        anbt.svg.removeChild(element)
    }
  }
}
