const stringToBytes = binaryString =>
  new Uint8Array([...binaryString].map(character => character.charCodeAt(0)))

export default stringToBytes
