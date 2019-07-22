import formatTimestamp from './formatTimestamp'
import isFloridaDST from './isFloridaDST'

const convertForumTime = (year, month, day, hours, minutes) => {
  const date = new Date(year, month, day, hours, minutes)
  const tzo = date.getTimezoneOffset() * 60 * 1000
  const dst = isFloridaDST()
  return formatTimestamp(date.getTime() - tzo + (6 - dst) * 60 * 60 * 1000)
}

export default convertForumTime
