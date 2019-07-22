import anbt from '../../anbt'
import base64ToBytes from '../conversions/base64ToBytes'

const uploadToImgur = callback => {
  const request = new XMLHttpRequest()
  request.open('POST', 'https://api.imgur.com/3/image')
  request.onload = () => {
    let response = request.responseText
    try {
      response = JSON.parse(response)
    } catch (e) {}
    if (response.success) {
      // To set description
      const request2 = new XMLHttpRequest()
      request2.open(
        'POST',
        'https://api.imgur.com/3/image/' + response.data.deletehash
      )
      request2.setRequestHeader('Authorization', 'Client-ID 4809db83c8897af')
      const formData = new FormData()
      formData.append(
        'description',
        'Playback: http://grompe.org.ru/drawit/#' + response.data.id
      )
      request2.send(formData)
    }
    callback(response)
  }
  request.onerror = error => callback(`error: ${error}`)
  request.setRequestHeader('Authorization', 'Client-ID 4809db83c8897af')
  const formData = new FormData()
  formData.append(
    'image',
    new Blob([base64ToBytes(anbt.pngBase64.substr(22)).buffer], {
      type: 'image/png'
    })
  )
  formData.append('type', 'file')
  formData.append('title', 'Made with Drawing in Time')
  formData.append('description', 'http://grompe.org.ru/drawit/')
  request.send(formData)
}

export default uploadToImgur
