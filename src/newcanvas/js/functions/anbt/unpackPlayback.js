import buildSmoothPath from '../buildSmoothPath'
import stringToBytes from '../conversions/stringToBytes'
import createSvgElement from '../createSvgElement'
import int16be from '../int16be'

const unpackPlayback = bytes => {
  const { pako } = window
  const version = bytes[0]
  let start
  if (version === 4) {
    bytes = pako.inflate(bytes.subarray(1))
    start = 0
  } else if (version === 3) {
    bytes = stringToBytes(pako.inflate(bytes.subarray(1), { to: 'string' }))
    start = 0
  } else if (version === 2) start = 1
  else throw new Error(`Unsupported version: ${version}`)
  const svg = createSvgElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    version: '1.1',
    width: 600,
    height: 500
  })
  const last = {
    color: '#000000',
    size: 14,
    x: 0,
    y: 0,
    pattern: 0
  }
  const points = []
  // Ignore background alpha
  const background = `rgb(${bytes[start]}, ${bytes[start + 1]}, ${
    bytes[start + 2]
  })`
  svg.background = background

  svg.appendChild(
    createSvgElement('rect', {
      class: 'eraser',
      x: 0,
      y: 0,
      width: 600,
      height: 500,
      fill: background
    })
  )

  for (let i = start + 4; i < bytes.length; ) {
    let x = int16be(bytes[i], bytes[i + 1])
    i += 2
    let y = int16be(bytes[i], bytes[i + 1])
    i += 2
    if (points.length) {
      if (!x && !y) {
        const path = createSvgElement('path', {
          class: last.color === 'eraser' ? last.color : null,
          stroke: last.color === 'eraser' ? background : last.color,
          'stroke-width': last.size,
          'stroke-linejoin': 'round',
          'stroke-linecap': 'round',
          fill: 'none'
        })
        // Restore blots
        if (points.length === 1) {
          path.pathSegList.appendItem(
            path.createSVGPathSegMovetoAbs(last.x, last.y)
          )
          path.pathSegList.appendItem(
            path.createSVGPathSegLinetoAbs(last.x, last.y + 0.001)
          )
        } else buildSmoothPath(points, path)
        path.orig = points
        path.pattern = last.pattern
        svg.appendChild(path)
        points.length = 0
      } else {
        last.x = x += last.x
        last.y = y += last.y
        points.push({ x, y })
      }
    } else {
      if (x < 0) {
        if (x === -1 || x === -2) {
          last.color = `rgba(${bytes[i]}, ${bytes[i + 1]}, ${
            bytes[i + 2]
          }, ${bytes[i + 3] / 255}`
          // TODO: fix ugly code
          if (last.color === 'rgba(255,255,255,0)') last.color = 'eraser'
          i += 4
          if (x === -1) last.size = y / 100
          else
            svg.appendChild(
              createSvgElement('rect', {
                class: last.color === 'eraser' ? last.color : null,
                x: 0,
                y: 0,
                width: 600,
                height: 500,
                fill: last.color === 'eraser' ? background : last.color
              })
            )
        } else if (x === -3) {
          last.pattern = y
          i += 4
        }
      } else {
        points.push({ x, y })
        last.x = x
        last.y = y
      }
    }
  }
  return svg
}

export default unpackPlayback
