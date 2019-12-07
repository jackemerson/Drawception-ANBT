export function stringToBytes(binaryString) {
  return new Uint8Array(
    [...binaryString].map(character => character.charCodeAt(0))
  )
}
