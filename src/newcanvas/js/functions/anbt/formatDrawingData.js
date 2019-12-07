import { colorToHex } from '../conversions/colorToHex'

export function formatDrawingData(drawingData) {
  const formattedData = []
  drawingData.forEach(line => {
    const lastFormattedData = formattedData[formattedData.length - 1]
    const lineColor = colorToHex(line.getAttribute('stroke'))
    const lineWidth = parseInt(line.getAttribute('stroke-width'), 10)
    const linePath = line.getAttribute('d')
    if (
      lastFormattedData &&
      lastFormattedData.c === lineColor &&
      lastFormattedData.s === lineWidth
    ) {
      formattedData[formattedData.length - 1].p += linePath
    } else {
      const data = {
        c: lineColor,
        s: lineWidth,
        p: linePath
      }
      formattedData.push(data)
    }
  })
  return formattedData
}
