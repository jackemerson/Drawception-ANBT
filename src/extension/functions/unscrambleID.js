import base62ToDecimal from './base62ToDecimal'

const unscrambleID = string =>
  base62ToDecimal([...string].reverse().join('')) - 3521614606208

export default unscrambleID
