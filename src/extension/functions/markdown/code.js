export function code(
  value,
  length,
  selectionStart,
  selectionEnd,
  selection,
  textarea
) {
  const selRegex = /^ {4}(.*)/gm
  if (selection.match(selRegex)) {
    selection = selection.replace(/^ {4}/gm, '')
  } else if (
    selectionStart === 0 ||
    value.substring(selectionStart - 1, selectionEnd).match(/\n.*/gm)
  ) {
    if (selection.match(/^ {4}/gm)) {
      selection = selection.replace(/^ {4}/gm, '')
    } else {
      selection = `${
        selectionStart === 0
          ? ''
          : value.substring(selectionStart - 1, selectionEnd).match(/^\n/)
          ? '\n'
          : '\n\n'
      }    ${selection.replace(/\n/g, '\n    ')}`
    }
  } else {
    selection = `${
      value.substring(selectionStart - 1, selectionEnd).match(/^\n/)
        ? '\n'
        : '\n\n'
    }    ${selection.replace(/\n^(.*)/gm, '\n    $1')}${
      value.substring(selectionEnd, selectionEnd + 1).match(/\n/) ? '' : '\n'
    }`
  }
  textarea.value =
    value.substring(0, selectionStart) +
    selection +
    value.substring(selectionEnd, length)
}
