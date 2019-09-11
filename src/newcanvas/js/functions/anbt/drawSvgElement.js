import anbt from '../../anbt'

const drawSvgElement = (element, context) => {
  if (!context) context = anbt.context
  context.globalCompositeOperation =
    element.getAttribute('class') === 'eraser'
      ? 'destination-out'
      : 'source-over'
  if (element.nodeName === 'path') {
    //var c = el.getAttribute("stroke");
    //context.strokeStyle = el.pattern ? anbt.MakePattern(c, el.pattern) : c;
    context.strokeStyle = element.getAttribute('stroke')
    context.lineWidth = element.getAttribute('stroke-width')
    context.beginPath()
    for (let i = 0; i < element.pathSegList.numberOfItems; i++) {
      const segment = element.pathSegList.getItem(i)
      if (segment.pathSegTypeAsLetter === 'M')
        context.moveTo(segment.x, segment.y)
      else if (segment.pathSegTypeAsLetter === 'L')
        context.lineTo(segment.x, segment.y)
      else if (segment.pathSegTypeAsLetter === 'Q')
        context.quadraticCurveTo(segment.x1, segment.y1, segment.x, segment.y)
      else if (segment.pathSegTypeAsLetter === 'C')
        context.bezierCurveTo(
          segment.x1,
          segment.y1,
          segment.x2,
          segment.y2,
          segment.x,
          segment.y
        )
    }
    context.stroke()
  } else if (element.nodeName === 'rect') {
    context.fillStyle = element.getAttribute('fill')
    const x = element.getAttribute('x')
    const y = element.getAttribute('y')
    const width = element.getAttribute('width')
    const height = element.getAttribute('height')
    context.fillRect(x, y, width, height)
  }
}

export default drawSvgElement
