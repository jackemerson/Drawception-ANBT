import { anbt } from '../../anbt'
import { crc32 } from '../crc32'
import { packUint32be } from '../pack/packUint32be'
import { cutHistoryBeforeClearAndAfterPosition } from './cutHistoryBeforeClearAndAfterPosition'
import { drawSvgElement } from './drawSvgElement'
import { moveSeekbar } from './moveSeekbar'
import { packPlayback } from './packPlayback'

export function makePng(width, height, fromBuffer) {
  // Cut all needless SVG data that comes before clearing whole canvas
  cutHistoryBeforeClearAndAfterPosition()
  moveSeekbar(1)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!anbt.transparent) {
    context.fillStyle = anbt.background
    context.fillRect(0, 0, width, height)
  }
  if (fromBuffer) {
    context.drawImage(anbt.canvas, 0, 0, width, height)
  } else {
    context.lineJoin = context.lineCap = 'round'
    context.scale(width / 600, height / 500)
    for (let i = 0; i < anbt.svg.childNodes.length; i++) {
      drawSvgElement(anbt.svg.childNodes[i], context)
    }
  }
  anbt.pngBase64 = canvas.toDataURL('image/png')

  const version = 'svGb'
  const svgString = packPlayback(anbt.svg)
  const padding = anbt.pngBase64.substr(-2)
  // To append the custom chunk, we need to decode the end of the base64-encoded PNG
  // and then reattach as btoa((prepend) + (custom data) + (iend)).
  // As base64 encoding chunks are 3 bytes, iend chunk can start in the middle of those,
  // so (prepend) contains the data before iend chunk that we had to cut.
  const cut = padding === '==' ? 1 : padding[1] === '=' ? 2 : 3
  const indexEnd = atob(anbt.pngBase64.substr(-20)).substr(cut)
  const prepend = atob(anbt.pngBase64.substr(-20)).substr(0, cut)
  const custom = [
    prepend,
    packUint32be(svgString.length),
    version,
    svgString,
    packUint32be(crc32(version, svgString)),
    indexEnd
  ].join('')
  anbt.pngBase64 =
    anbt.pngBase64.substr(0, anbt.pngBase64.length - 20) + btoa(custom)
}
