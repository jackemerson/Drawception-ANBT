const packUint16be = number =>
  String.fromCharCode((number >> 8) & 0xff, number & 0xff)

export default packUint16be
