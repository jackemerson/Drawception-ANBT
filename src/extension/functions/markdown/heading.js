const heading = (
  value,
  length,
  selectionStart,
  selectionEnd,
  selection,
  textarea
) => {
  const selRegex = /^#+ .*/gm
  if (selection.match(selRegex)) {
    selection = selection.replace(/^# /gm, '')
    if (selection.match(/^#{2,} /gm)) selection.replace(/(^#*)# /gm, '$1 ')
  } else if (
    !selectionStart ||
    value.substring(selectionStart - 1, selectionEnd).match(/\n.*/gm)
  )
    selection = `${
      value.substring(selectionStart - 1, selectionEnd).match(/\n^.*/gm) ||
      !selectionStart
        ? ''
        : '\n'
    }###### ${selection.replace(/\n/g, '\n###### ')}`
  else if (value.substring(selectionStart - 1, selectionEnd).match(selRegex)) {
    selectionStart -= 4
    selection = value
      .substring(selectionStart, selectionEnd)
      .replace(/(^#*)# /gm, '$1 ')
  } else if (
    value.substring(selectionStart - 2, selectionEnd).match(selRegex)
  ) {
    selectionStart -= 5
    selection = value
      .substring(selectionStart, selectionEnd)
      .replace(/(^#*)# /gm, '$1 ')
  } else selection = `\n###### ${selection.replace(/\n/g, '\n###### ')}`
  textarea.value =
    value.substring(0, selectionStart) +
    selection +
    value.substring(selectionEnd, length)
}

export default heading
