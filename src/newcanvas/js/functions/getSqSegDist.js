const getSqSegDist = (point, point1, point2) => {
  let { x, y } = point1
  let dx = point2.x - x
  let dy = point2.y - y
  if (dx !== 0 || dy !== 0) {
    var t = ((point.x - x) * dx + (point.y - y) * dy) / (dx * dx + dy * dy)
    if (t > 1) {
      x = point2.x
      y = point2.y
    } else if (t > 0) {
      x += dx * t
      y += dy * t
    }
  }
  dx = point.x - x
  dy = point.y - y
  return dx * dx + dy * dy
}

export default getSqSegDist
