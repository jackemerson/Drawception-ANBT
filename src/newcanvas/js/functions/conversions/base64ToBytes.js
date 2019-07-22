import stringToBytes from './stringToBytes'

const base64ToBytes = base64 => stringToBytes(atob(base64))

export default base64ToBytes
