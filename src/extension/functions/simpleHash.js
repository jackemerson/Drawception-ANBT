export function simpleHash(number) {
  return number
    .toString()
    .split('')
    .reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)
}
