export function buildSmoothPath(points, path) {
  const { length } = points
  if (length < 2) return
  path.pathSegList.initialize(
    path.createSVGPathSegMovetoAbs(points[0].x, points[0].y)
  )
  if (!window.options.smoothening) {
    for (let i = 1; i < points.length; i++) {
      path.pathSegList.appendItem(
        path.createSVGPathSegLinetoAbs(points[i].x, points[i].y)
      )
    }
    return
  }
  path.pathSegList.appendItem(
    path.createSVGPathSegLinetoAbs(points[1].x, points[1].y)
  )
  if (length < 3) return
  let previousTangent
  for (let i = 1; i < length - 1; i++) {
    const previousPoint = points[i - 1]
    const currentPoint = points[i]
    const nextPoint = points[i + 1]
    const dx1 = currentPoint.x - previousPoint.x
    const dy1 = currentPoint.y - previousPoint.y
    const angle1 = Math.atan2(dy1, dx1)
    const dist1 = Math.sqrt(dx1 ** 2 + dy1 ** 2)
    const dx2 = nextPoint.x - currentPoint.x
    const dy2 = nextPoint.y - currentPoint.y
    const angle2 = Math.atan2(dy2, dx2)
    const dist2 = Math.sqrt(dx2 ** 2 + dy2 ** 2)
    const tangent = (angle1 + angle2) / 2
    if (i > 1) {
      let good = false
      if (Math.abs(angle2 - angle1) >= Math.PI / 4) {
        path.pathSegList.appendItem(
          path.createSVGPathSegLinetoAbs(currentPoint.x, currentPoint.y)
        )
      } else {
        if (good && dist1 / dist2 >= 0.4 && dist1 / dist2 <= 2.5) {
          const t1 = {
            x: previousPoint.x + Math.cos(previousTangent) * dist1 * 0.4,
            y: previousPoint.y + Math.sin(previousTangent) * dist1 * 0.4
          }
          const t2 = {
            x: currentPoint.x - Math.cos(tangent) * dist2 * 0.4,
            y: currentPoint.y - Math.sin(tangent) * dist2 * 0.4
          }
          path.pathSegList.appendItem(
            path.createSVGPathSegCurvetoCubicAbs(
              currentPoint.x,
              currentPoint.y,
              t1.x,
              t1.y,
              t2.x,
              t2.y
            )
          )
        } else {
          path.pathSegList.appendItem(
            path.createSVGPathSegLinetoAbs(currentPoint.x, currentPoint.y)
          )
          good = true
        }
      }
    }
    previousTangent = tangent
  }
  const c = points[length - 1]
  path.pathSegList.appendItem(path.createSVGPathSegLinetoAbs(c.x, c.y))
}
