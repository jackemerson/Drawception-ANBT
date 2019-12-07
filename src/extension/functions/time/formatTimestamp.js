import { globals } from '../../globals'
import { options } from '../../options'

export function formatTimestamp(date) {
  if (typeof date === 'number') date = new Date(date)
  return options.localeTimestamp
    ? date.toLocaleString()
    : `${('0' + date.getDate()).slice(-2)} ${
        globals.months[date.getMonth()]
      } ${date.getFullYear()} ${('0' + date.getHours()).slice(-2)}:${(
        '0' + date.getMinutes()
      ).slice(-2)}`
}
