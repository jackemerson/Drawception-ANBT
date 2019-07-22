const backToForum = event => {
  event.preventDefault()
  window.frameElement.ownerDocument.querySelector(
    '.v--modal-overlay'
  ).outerHTML = ''
}

export default backToForum
