export function bytesToString(bytes) {
  return [...bytes].map(byte => String.fromCharCode(byte)).join('')
}
