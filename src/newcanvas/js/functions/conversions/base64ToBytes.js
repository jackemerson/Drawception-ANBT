import { stringToBytes } from './stringToBytes'

export function base64ToBytes(base64) {
  return stringToBytes(atob(base64))
}
