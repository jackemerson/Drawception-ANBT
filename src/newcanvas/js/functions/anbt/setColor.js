import { anbt } from '../../anbt'

export function setColor(number, color) {
  anbt.colors[Number(number)] = color
}
