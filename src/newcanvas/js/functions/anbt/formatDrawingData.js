import colorToHex from '../conversions/colorToHex'

const formatDrawingData = drawingData => {
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

export default formatDrawingData

/*let y = {
  v: 1,
  w: 598,
  h: 498,
  t: 899,
  th: 'default',
  bg: '#fffdc9',
  p: 1,
  s: 0.7,
  actions: [
    {
      c: '#000',
      s: 2,
      p:
        'M134 81s-6 1 -8 3s-9 8 -13 14s-9 14 -11 22s-3 23 -3 29s0 13 0 16s1 7 2 8s2 3 3 3s2 0 2 0'
    },
    {
      c: '#000',
      s: 6,
      p:
        'M189 68s-4 3 -5 5s-7 9 -10 16s-9 19 -12 32s-7 35 -8 45s0 22 0 26s3 8 3 10'
    },
    {
      c: '#000',
      s: 14,
      p:
        'M283 41s-4 3 -6 4s-4 3 -5 5s-14 17 -21 29s-14 30 -19 41s-7 19 -9 28s-18 72 -21 86s-7 38 -7 40s0 6 0 7'
    },
    {
      c: '#000',
      s: 42,
      p:
        'M388 22s0 1 0 1s-19 14 -27 20s-12 9 -19 16s-14 15 -20 25s-25 47 -33 66s-10 32 -15 49s-10 35 -13 52s-3 33 -4 48s-2 29 -2 40s2 22 2 28s0 12 0 16s-2 8 -2 9'
    }
  ]
}*/

