const listUl = (
  value,
  length,
  selectionStart,
  selectionEnd,
  selection,
  textarea
) => {
  const selRegex = /^( {3})*- (.*)/
  if (selection.match(selRegex))
    selection = selection.match(/^ {3}/)
      ? selection.replace(/^ {3}/gm, '')
      : selection.replace(/^- /gm, '')
  else if (
    !selectionStart ||
    value.substring(selectionStart - 1, selectionEnd).match(/^\n.*/)
  )
    selection = `${
      value.substring(selectionStart - 1, selectionEnd).match(/\n^.*/gm) ||
      !selectionStart
        ? ''
        : '\n'
    }- ${selection.replace(/\n/g, '\n- ')}${
      value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/)
        ? ''
        : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
        ? '\n'
        : '\n\n'
    }`
  else if (value.substring(selectionStart - 1, selectionEnd).match(selRegex)) {
    selectionStart--
    selection = value
      .substring(selectionStart, selectionEnd)
      .replace(/( {3})*- /g, '$1   - ')
  } else if (
    value.substring(selectionStart - 2, selectionEnd).match(selRegex)
  ) {
    selectionStart -= 2
    selection = value
      .substring(selectionStart, selectionEnd)
      .replace(/( {3})*- /g, '$1   - ')
  } else
    selection = `\n- ${selection.replace(/\n/g, '\n- ')}${
      value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/) ||
      selectionEnd === length
        ? ''
        : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
        ? '\n'
        : '\n\n'
    }`
  textarea.value =
    value.substring(0, selectionStart) +
    selection +
    value.substring(selectionEnd, length)
}

export default listUl
