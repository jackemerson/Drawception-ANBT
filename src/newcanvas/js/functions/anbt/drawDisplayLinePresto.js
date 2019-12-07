import { anbt } from '../../anbt'

export function drawDisplayLinePresto(first) {
  if (first) anbt.svgDisplay.insertBefore(anbt.path, anbt.svgDisplay.firstChild)
}
