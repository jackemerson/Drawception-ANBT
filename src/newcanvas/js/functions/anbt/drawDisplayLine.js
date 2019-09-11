import anbt from '../../anbt'

const drawDisplayLine = (x1, y1, x2, y2) => {
  const { contextDisplay } = anbt
  // var c = this.lastColor;
  // context.strokeStyle = anbt.pattern ? anbt.MakePattern(c, anbt.pattern) : c;
  contextDisplay.strokeStyle = anbt.lastColor
  contextDisplay.lineWidth = anbt.size
  contextDisplay.beginPath()
  contextDisplay.moveTo(x1, y1)
  contextDisplay.lineTo(x2, y2)
  contextDisplay.stroke()
}

export default drawDisplayLine
