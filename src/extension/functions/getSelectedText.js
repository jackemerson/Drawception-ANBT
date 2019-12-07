import { markdown } from "../markdown"
import { $ } from "./selector"

export function getSelectedText(event) {
  const textarea = $('#input-comment')
  const { value, selectionStart, selectionEnd } = textarea
  const { length } = value
  const selection = value.substring(selectionStart, selectionEnd)
  markdown[`${event.currentTarget.id}`].execute(
    value,
    length,
    selectionStart,
    selectionEnd,
    selection,
    textarea
  )
}
