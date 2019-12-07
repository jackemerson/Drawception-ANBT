import { formatTimestamp } from './formatTimestamp'
import { isFloridaDST } from './isFloridaDST'

export function convertForumTime(year, month, day, hours, minutes) {
  const date = new Date(year, month, day, hours, minutes)
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000
  return formatTimestamp(
    date.getTime() - timezoneOffset + (6 - isFloridaDST()) * 60 * 60 * 1000
  )
}
