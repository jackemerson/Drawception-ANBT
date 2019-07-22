import anbt from '../../anbt'

const drawSvgElement = (element, ctx) => {
  if (!ctx) ctx = anbt.ctx
  ctx.globalCompositeOperation =
    element.getAttribute('class') === 'eraser'
      ? 'destination-out'
      : 'source-over'
  if (element.nodeName === 'path') {
    //var c = el.getAttribute("stroke");
    //ctx.strokeStyle = el.pattern ? anbt.MakePattern(c, el.pattern) : c;
    ctx.strokeStyle = element.getAttribute('stroke')
    ctx.lineWidth = element.getAttribute('stroke-width')
    ctx.beginPath()
    for (let i = 0; i < element.pathSegList.numberOfItems; i++) {
      const seg = element.pathSegList.getItem(i)
      if (seg.pathSegTypeAsLetter === 'M') ctx.moveTo(seg.x, seg.y)
      else if (seg.pathSegTypeAsLetter === 'L') ctx.lineTo(seg.x, seg.y)
      else if (seg.pathSegTypeAsLetter === 'Q')
        ctx.quadraticCurveTo(seg.x1, seg.y1, seg.x, seg.y)
      else if (seg.pathSegTypeAsLetter === 'C')
        ctx.bezierCurveTo(seg.x1, seg.y1, seg.x2, seg.y2, seg.x, seg.y)
    }
    ctx.stroke()
  } else if (element.nodeName === 'rect') {
    ctx.fillStyle = element.getAttribute('fill')
    const x = element.getAttribute('x')
    const y = element.getAttribute('y')
    const width = element.getAttribute('width')
    const height = element.getAttribute('height')
    ctx.fillRect(x, y, width, height)
  }
}

export default drawSvgElement
