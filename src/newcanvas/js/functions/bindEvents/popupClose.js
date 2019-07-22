import ID from '../idSelector'

const popupClose = event => {
  event.preventDefault()
  ID('popup').classList.remove('show')
}

export default popupClose
