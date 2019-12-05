const popupClose = event => {
  event.preventDefault()
  event.currentTarget.parentElement.classList.remove('show')
}

export default popupClose
