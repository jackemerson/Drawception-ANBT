export function packUint16be(number) {
  return String.fromCharCode((number >> 8) & 0xff, number & 0xff)
}
