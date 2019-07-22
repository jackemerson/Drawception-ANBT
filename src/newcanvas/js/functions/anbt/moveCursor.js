import anbt from '../../anbt'
import createSvgElement from '../createSvgElement'

const moveCursor = (x, y) => {
  if (anbt.locked) return
  if (!anbt.brushCursor) {
    anbt.brushCursor = createSvgElement('circle', {
      'stroke-width': '1',
      stroke: '#000',
      fill: 'none'
    })
    anbt.svgDisp.appendChild(anbt.brushCursor)
    anbt.brushCursor2 = createSvgElement('circle', {
      'stroke-width': '1',
      stroke: '#fff',
      fill: 'none'
    })
    anbt.svgDisp.appendChild(anbt.brushCursor2)
    anbt.eyedropperCursor = createSvgElement('image', {
      width: 16,
      height: 16,
      visibility: 'hidden'
    })
    anbt.eyedropperCursor.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'href',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAARklEQVR4XoXRwQoAIAgEUf//pzeGDgq5G3PrCQqVbIAqsDz9WM2qhTX4GZgPV+JpSFxAC0PwbeVZZIpMgXvAMwoj4U9B3wGySxvzk6ZjvwAAAABJRU5ErkJggg=='
    )
    anbt.svgDisp.appendChild(anbt.eyedropperCursor)
  }
  // Assume just size change if called with no parameters
  if (typeof x !== 'undefined') {
    anbt.brushCursor.setAttribute('cx', x)
    anbt.brushCursor.setAttribute('cy', y)
    anbt.brushCursor2.setAttribute('cx', x)
    anbt.brushCursor2.setAttribute('cy', y)
    anbt.eyedropperCursor.setAttribute('x', x - 1)
    anbt.eyedropperCursor.setAttribute('y', y - 15)
  }
  anbt.brushCursor.setAttribute('r', anbt.size / 2 + 0.5)
  anbt.brushCursor2.setAttribute('r', anbt.size / 2 - 0.5)
}

export default moveCursor
