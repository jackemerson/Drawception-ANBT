import { getSqSegDist } from './getSqSegDist'

export function simplifyDouglasPeucker({ points, smoothening: sqTolerance }) {
  const length = points.length
  const MarkerArray = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
  const markers = new MarkerArray(length)
  let first = 0
  let last = length - 1
  const stack = []
  const newPoints = []
  markers[first] = markers[last] = 1
  while (last) {
    let maxSqDist = 0
    let index
    for (let i = first + 1; i < last; i++) {
      let sqDist = getSqSegDist(points[i], points[first], points[last])
      if (sqDist > maxSqDist) {
        index = i
        maxSqDist = sqDist
      }
    }
    if (maxSqDist > sqTolerance) {
      markers[index] = 1
      stack.push(first, index, index, last)
    }
    last = stack.pop()
    first = stack.pop()
  }
  for (let i = 0; i < length; i++) {
    if (markers[i]) newPoints.push(points[i])
  }
  return newPoints
}
