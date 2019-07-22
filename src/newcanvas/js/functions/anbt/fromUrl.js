import fromPng from './fromPng'

const fromUrl = url => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  if ('responseType' in xhr) xhr.responseType = 'arraybuffer'
  else return alert('Your browser is too old for this')
  xhr.onload = () => fromPng(xhr.response)
  xhr.send()
}

export default fromUrl
