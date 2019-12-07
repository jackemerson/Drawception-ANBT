export function int16be(byte1, byte2) {
  const v = (byte1 << 8) | byte2
  return v > 32767 ? v - 65536 : v
}


