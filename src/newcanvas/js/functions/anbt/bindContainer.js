import anbt from '../../anbt'
import createSvgElement from '../createSvgElement'

const bindContainer = element => {
  anbt.container = element
  anbt.canvas.width = 600
  anbt.canvas.height = 500
  anbt.canvas.style.background = anbt.background
  anbt.context = anbt.canvas.getContext('2d')
  anbt.context.lineJoin = anbt.context.lineCap = 'round'
  anbt.container.appendChild(anbt.canvas)
  if (!navigator.userAgent.match(/\bPresto\b/)) {
    anbt.canvasDisplay.width = 600
    anbt.canvasDisplay.height = 500
    anbt.contextDisplay = anbt.canvasDisplay.getContext('2d')
    anbt.contextDisplay.lineJoin = anbt.contextDisplay.lineCap = 'round'
    anbt.container.appendChild(anbt.canvasDisplay)
  } else anbt.drawDisplayLine = anbt.drawDisplayLinePresto // Opera Presto is faster with SVG redrawing
  anbt.container.appendChild(anbt.svgDisplay)
  const rect = createSvgElement('rect', {
    class: 'eraser',
    x: 0,
    y: 0,
    width: 600,
    height: 500,
    fill: anbt.background
  })
  anbt.svg.appendChild(rect)
}

export default bindContainer
