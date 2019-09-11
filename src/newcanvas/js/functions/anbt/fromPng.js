import anbt from '../../anbt'
import packUint32be from '../pack/packUint32be'
import moveSeekbar from './moveSeekbar'
import setBackground from './setBackground'
import unpackPlayback from './unpackPlayback'
import updateView from './updateView'

const fromPng = buffer => {
  const dataView = new DataView(buffer)
  const magic = dataView.getUint32(0)
  if (magic !== 0x89504e47)
    throw new Error(`Invalid PNG format: ${packUint32be(magic)}`)
  for (let i = 8; i < buffer.byteLength; i += 4 /* Skip CRC */) {
    const chunkLength = dataView.getUint32(i)
    i += 4
    const chunkName = packUint32be(dataView.getUint32(i))
    i += 4
    if (chunkName === 'svGb') {
      anbt.svg = unpackPlayback(new Uint8Array(buffer, i, chunkLength))
      anbt.lastRect = 0
      anbt.rewindCache.length = 0
      anbt.position = anbt.svg.childNodes.length - 1
      updateView()
      moveSeekbar(1)
      // Here we assume first element of svg is background rect
      setBackground(anbt.svg.background)
      return
    } else {
      if (chunkName === 'IEND') break
      i += chunkLength
    }
  }
  throw new Error('No vector data found!')
}

export default fromPng
