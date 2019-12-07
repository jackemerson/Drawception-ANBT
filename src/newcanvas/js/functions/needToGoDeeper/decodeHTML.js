export function decodeHTML(html) {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = html
  return textArea.value
}


