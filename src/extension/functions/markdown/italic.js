const italic = (
  value,
  length,
  selectionStart,
  selectionEnd,
  selection,
  textarea
) => {
  const selRegex = new RegExp(
    `\\*(?=\\S*${selection.replace(
      /(.*)\*(.*)/g,
      ''
    )})((?:\\*\\*|\\\\[\\s\\S]|\\s+(?:\\\\[\\s\\S]|[^\\s\\*\\\\]|\\*\\*)|[^\\s\\*\\\\])+?)\\*(?!\\*)`
  )
  const italicRegex = /\*(?=\S)((?:\*\*|\\[\s\S]|\s+(?:\\[\s\S]|[^\s\*\\]|\*\*)|[^\s\*\\])+?)\*(?!\*)/g
  if (selection.match(selRegex)) selection = selection.replace(selRegex, '$1')
  else if (selectionStart > 0 && selectionEnd < length) {
    if (value.substring(selectionStart - 1, selectionEnd + 1).match(selRegex)) {
      selectionStart--
      selectionEnd++
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(selRegex, '$1')
    } else {
      selection = selection.match(italicRegex)
        ? selection.replace(italicRegex, '$1')
        : `*${selection.replace(/\n/g, '*\n*')}*`
    }
  } else {
    if (
      !selectionStart &&
      value.substring(selectionStart, selectionEnd + 1).match(selRegex)
    ) {
      selectionEnd++
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(selRegex, '$1')
    } else if (
      selectionEnd === length &&
      value.substring(selectionStart - 1, selectionEnd).match(selRegex)
    ) {
      selectionStart--
      selection = value
        .substring(selectionStart, selectionEnd)
        .replace(selRegex, '$1')
    } else
      selection = selection.match(italicRegex)
        ? selection.replace(italicRegex, '$1')
        : `*${selection.replace(/\n/g, '*\n*')}*`
  }
  textarea.value =
    value.substring(0, selectionStart) +
    selection +
    value.substring(selectionEnd, length)
}

export default italic
