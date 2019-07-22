import ID from '../../idSelector'

const caption = event => {
  if (event.keyCode !== 13) return
  event.preventDefault()
  ID('submitcaption').click()
}

export default caption
