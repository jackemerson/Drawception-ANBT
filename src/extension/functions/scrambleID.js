import { decimalToBase62 } from './decimalToBase62'

export function scrambleID(number) {
  if (isNaN(number)) throw new Error('Invalid panel ID')
  return [...decimalToBase62(parseInt(number, 10) + 3521614606208)]
    .reverse()
    .join('')
}
