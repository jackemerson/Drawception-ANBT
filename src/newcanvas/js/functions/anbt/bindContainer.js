import anbt from '../../anbt'
import createSvgElement from '../createSvgElement'

const bindContainer = element => {
  anbt.container = element
  anbt.canvas.width = 600
  anbt.canvas.height = 500
  anbt.canvas.style.background = anbt.background
  anbt.ctx = anbt.canvas.getContext('2d')
  anbt.ctx.lineJoin = anbt.ctx.lineCap = 'round'
  anbt.container.appendChild(anbt.canvas)
  if (!navigator.userAgent.match(/\bPresto\b/)) {
    anbt.canvasDisp.width = 600
    anbt.canvasDisp.height = 500
    anbt.ctxDisp = anbt.canvasDisp.getContext('2d')
    anbt.ctxDisp.lineJoin = anbt.ctxDisp.lineCap = 'round'
    anbt.container.appendChild(anbt.canvasDisp)
  } else anbt.DrawDispLine = anbt.DrawDispLinePresto // Opera Presto is faster with SVG redrawing
  anbt.container.appendChild(anbt.svgDisp)
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
