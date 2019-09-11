const bytesToString = bytes =>
  [...bytes].map(byte => String.fromCharCode(byte)).join('')

export default bytesToString
