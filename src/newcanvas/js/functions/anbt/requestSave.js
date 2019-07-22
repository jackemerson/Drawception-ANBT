import anbt from '../../anbt'

const requestSave = (dataUrl, extension) => {
  if (!dataUrl) {
    dataUrl = anbt.pngBase64
    extension = '.png'
    anbt.unsaved = false
  }
  if (!anbt.saveLink) {
    anbt.saveLink = document.createElement('a')
    document.body.appendChild(anbt.saveLink)
  }
  if ('download' in anbt.saveLink) {
    anbt.saveLink.href = dataUrl
    const date = new Date()
    anbt.saveLink.download = [
      'DrawingInTime_',
      date.getFullYear(),
      '_',
      (101 + date.getMonth() + '').slice(-2),
      (100 + date.getDate() + '').slice(-2),
      '_',
      (100 + date.getHours() + '').slice(-2),
      (100 + date.getMinutes() + '').slice(-2),
      (100 + date.getSeconds() + '').slice(-2),
      extension
    ].join('')
    anbt.saveLink.click()
  } else window.open(dataUrl)
  return true
}

export default requestSave
