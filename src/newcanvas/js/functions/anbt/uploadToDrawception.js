import { anbt } from '../../anbt'
import { formatDrawingData } from './formatDrawingData'

export function uploadToDrawception(callback) {
  const { pako } = window
  const pathList = [...anbt.svg.childNodes].filter(
    childNode => childNode.nodeName === 'path'
  )
  const base = {
    v: 1,
    w: 600,
    h: 500,
    t: 0,
    th: anbt.paletteID,
    bg: anbt.background,
    p: 1,
    s: 0.7,
    actions: formatDrawingData(pathList)
  }
  const drawdata = btoa(
    pako
      .gzip(JSON.stringify(base))
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  )

  const request = new XMLHttpRequest()
  request.open('POST', 'https://drawception.com/sandbox/upload.json')
  request.onload = () => {
    let response = request.responseText
    try {
      response = JSON.parse(response)
    } catch (e) {}
    callback(response)
  }
  request.onerror = error => callback(`error: ${error}`)
  request.send(JSON.stringify({ drawdata }))
}
