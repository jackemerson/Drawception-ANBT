import anbt from '../../anbt'

const drawDispLine = (x1, y1, x2, y2) => {
  const { ctxDisp } = anbt
  // var c = this.lastcolor;
  // ctx.strokeStyle = anbt.pattern ? anbt.MakePattern(c, anbt.pattern) : c;
  ctxDisp.strokeStyle = anbt.lastcolor
  ctxDisp.lineWidth = anbt.size
  ctxDisp.beginPath()
  ctxDisp.moveTo(x1, y1)
  ctxDisp.lineTo(x2, y2)
  ctxDisp.stroke()
}

export default drawDispLine
