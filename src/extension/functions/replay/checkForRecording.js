export function checkForRecording(url, success, retrying) {
  const request = new XMLHttpRequest()
  request.open('GET', `${url}?anbt`, true)
  request.responseType = 'arraybuffer'
  request.onload = () => {
    const buffer = request.response
    const dataView = new window.DataView(buffer)
    const magic = dataView.getUint32(0)
    if (magic != 0x89504e47) return request.onerror() // Drawception started hijacking XHR errors and putting HTML in there
    for (let i = 8; i < buffer.byteLength; i += 4 /* Skip CRC */) {
      const chunkLength = dataView.getUint32(i)
      i += 4
      const chunkName = dataView.getUint32(i)
      i += 4
      if (chunkName === 0x73764762) {
        return success()
      } else {
        if (chunkName === 0x49454e44) break
        i += chunkLength
      }
    }
  }
  request.onerror = () => {
    console.log(
      'checkForRecording fail (likely due to cache without CORS), retrying'
    )
    if (!retrying) checkForRecording(`${url}?anbt`, success, true)
  }
  request.send()
}
