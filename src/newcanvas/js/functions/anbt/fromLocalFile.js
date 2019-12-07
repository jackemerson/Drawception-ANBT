import { anbt } from '../../anbt'
import { fromPng } from './fromPng'

export function fromLocalFile() {
  if (!anbt.fileInput) {
    anbt.fileInput = document.createElement('input')
    anbt.fileInput.style.position = 'absolute'
    anbt.fileInput.style.top = '-1000px'
    anbt.fileInput.type = 'file'
    anbt.fileInput.accept = '.png'
    document.body.appendChild(anbt.fileInput)
    anbt.fileInput.addEventListener(
      'change',
      event => {
        const reader = new FileReader()
        reader.onload = () => fromPng(reader.result)
        if (event.currentTarget.files[0])
          reader.readAsArrayBuffer(event.currentTarget.files[0])
      },
      false
    )
  }
  anbt.fileInput.click()
}
