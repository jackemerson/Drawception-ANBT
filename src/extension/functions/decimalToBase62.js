import globals from '../globals'

const decimalToBase62 = number => {
  let result = ''
  while (number !== 0) {
    const quotient = number % 62
    result = globals.alphabet[quotient] + result
    number = (number - quotient) / 62
  }
  return result
}

export default decimalToBase62
