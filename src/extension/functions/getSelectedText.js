import markdown from '../markdown'
import $ from './selector'

const getSelectedText = event => {
  const textarea = $('#input-comment')
  const { value, selectionStart, selectionEnd } = textarea
  const { length } = value
  const selection = value.substring(selectionStart, selectionEnd)
  markdown[`${event.currentTarget.id}`].replaceFunc(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  )
}

export default getSelectedText
