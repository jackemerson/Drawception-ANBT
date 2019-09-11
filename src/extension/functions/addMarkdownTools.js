import markdown from '../markdown'
import getSelectedText from './getSelectedText'
import $ from './selector'

const addMarkdownTools = () => {
  const textarea = $('#input-comment')
  if (!textarea) return
  const markdownDiv = $('<div id="markdown-editor"></div>')
  Object.keys(markdown).forEach(toolName =>
    markdownDiv.appendChild(
      $(
        `<div id="${toolName}" class="test-markdown fas fa-${toolName} btn btn-default" title="${markdown[toolName].title}"></div>`
      )
    )
  )
  textarea.insertAdjacentHTML('beforebegin', markdownDiv.outerHTML)
  ;[...$('#markdown-editor').children].forEach(children =>
    children.addEventListener('click', getSelectedText)
  )
}

export default addMarkdownTools
