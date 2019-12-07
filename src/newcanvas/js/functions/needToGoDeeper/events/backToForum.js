export function backToForum(event) {
  event.preventDefault()
  window.frameElement.ownerDocument.querySelector(
    '.v--modal-overlay'
  ).outerHTML = ''
}


