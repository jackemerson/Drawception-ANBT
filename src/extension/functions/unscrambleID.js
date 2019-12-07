import { base62ToDecimal } from './base62ToDecimal'

export function unscrambleID(string) {
  return base62ToDecimal([...string].reverse().join('')) - 3521614606208
}
