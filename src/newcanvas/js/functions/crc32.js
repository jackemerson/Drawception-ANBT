import { makeCRCTable } from './makeCRCTable'

export function crc32(string, string2) {
  const crcTable = makeCRCTable()
  let crc = -1
  for (let i = 0; i < string.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ string.charCodeAt(i)) & 0xff]
  }
  if (string2) {
    for (let i = 0; i < string2.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ string2.charCodeAt(i)) & 0xff]
    }
  }
  return (crc ^ -1) >>> 0
}
