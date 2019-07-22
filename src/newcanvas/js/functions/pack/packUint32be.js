const packUint32be = number =>
  String.fromCharCode(
    (number >> 24) & 0xff,
    (number >> 16) & 0xff,
    (number >> 8) & 0xff,
    number & 0xff
  )

export default packUint32be
