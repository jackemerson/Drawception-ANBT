const listOl = (
  value,
  length,
  selectionStart,
  selectionEnd,
  selection,
  textarea
) => {
  const selRegex = /^( {3})*\d+\. (.*)/gm
  if (selection.match(selRegex)) {
    selection = selection.match(/^ {3}/)
      ? selection.replace(/^ {3}/gm, '')
      : selection.replace(/^\d+\. /gm, '')
  } else if (
    !selectionStart ||
    value.substring(selectionStart - 1, selectionEnd).match(/^\n.*/)
  ) {
    let countOl = 0
    selection = `${
      value.substring(selectionStart - 1, selectionEnd).match(/\n^.*/gm) ||
      !selectionStart
        ? ''
        : '\n'
    }0. ${selection.replace(/\n/g, () => {
      countOl++
      return `\n${countOl}. `
    })}${
      value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/)
        ? ''
        : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
        ? '\n'
        : '\n\n'
    }`
  } else if (
    value.substring(selectionStart - 4, selectionEnd).match(/( {3})*\d+\. (.*)/)
  ) {
    selectionStart -= 4
    selection = value
      .substring(selectionStart, selectionEnd)
      .replace(/( {3})*(\d+\.) /g, '   $1$2 ')
  } else if (
    value.substring(selectionStart - 5, selectionEnd).match(/( {3})*\d+\. (.*)/)
  ) {
    selectionStart -= 5
    selection = value
      .substring(selectionStart, selectionEnd)
      .replace(/( {3})*(\d+\.) /g, '   $1$2 ')
  } else {
    let countOl = 0
    selection = `\n0. ${selection.replace(/\n/g, () => {
      countOl++
      return `\n${countOl}. `
    })}${
      value.substring(selectionEnd, selectionEnd + 2).match(/\n\n/) ||
      selectionEnd === length
        ? ''
        : value.substring(selectionEnd, selectionEnd + 1).match(/\n/)
        ? '\n'
        : '\n\n'
    }`
  }
  textarea.value =
    value.substring(0, selectionStart) +
    selection +
    value.substring(selectionEnd, length)
}

export default listOl
