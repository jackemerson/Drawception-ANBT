import { anbt } from '../../anbt'

export function drawDisplayLine(x1, y1, x2, y2) {
  const { contextDisplay } = anbt
  contextDisplay.strokeStyle = anbt.lastColor
  contextDisplay.lineWidth = anbt.size
  contextDisplay.beginPath()
  contextDisplay.moveTo(x1, y1)
  contextDisplay.lineTo(x2, y2)
  contextDisplay.stroke()
}
