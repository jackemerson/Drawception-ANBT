export function isFloridaDST() {
  const date = new Date(Date.now() - 6 * 60 * 60 * 1000)
  const month = date.getUTCMonth()
  const day = date.getUTCDate()
  const hours = date.getUTCHours()
  const dayOfWeef = date.getUTCDay()

  if (month < 2 || month > 10) return false
  if (month > 2 && month < 10) return true
  if (month === 2) {
    if (day < 8) return false
    if (day > 14) return true
    if (dayOfWeef === 7) return hours > 1
    return day > dayOfWeef + 7
  }
  if (month === 10) {
    if (day > 7) return false
    if (dayOfWeef === 7) return hours < 1
    return day <= dayOfWeef
  }
}
