import $ from '../selector'

const image = (
  value,
  length,
  selectionStart,
  selectionEnd,
  selection,
  textarea
) => {
  const selRegex = /!\[(.*)\]\((\S*)( ".*")?\)/
  if (selection.match(selRegex))
    textarea.value =
      value.substring(0, selectionStart) +
      selection.replace(selRegex, '$1 $2') +
      value.substring(selectionEnd, length)
  else {
    let link = ''
    if (!selection.match(/\[(.*)\]\((\S*)( ".*")?\)/)) {
      link = selection.match(/https?:\/\/\S*/) || ''
      selection = selection
        .replace(link[0], '')
        .replace(/ +/g, ' ')
        .trim()
    } else selection = ''
    const divModal = $(
      `<div class="v--modal-overlay scrollable overlay-fade-enter-active" style="opacity: 0" id="markdown"><div class="v--modal-background-click"><div class="v--modal-top-right"></div><div class="v--modal-box v--modal" style="top: 89px; left: 240px; width: 800px; height: auto;"><div style="padding: 30px;"><button type="button" class="close">×</button><h4 class="clear-top">Markdown informations box</h4><hr><div><h4 class="clear-top">Text:</h4><input id="markdown-text" type="text" placeholder="Insert text here" class="form-control input-lg input-prompt"><h4>Link:</h4><input id="markdown-link" type="text" placeholder="Insert link here" class="form-control input-lg input-prompt"><h4>Hover message:</h4><input id="markdown-hover" type="text" placeholder="Message when hover the link (optional)" class="form-control input-lg input-prompt"></div><hr><p class="text-center clear-bot"><button type="button" id="markdown-done" class="btn btn-default">Done</button></p></div></div></div></div>`
    )
    $('.navbar-header>div:last-child').append(divModal)
    setTimeout(() => {
      document.body.classList.add('v--modal-block-scroll')
      $('#markdown').style.opacity = 1
    }, 1)
    $('#markdown-text').value = selection ? selection : ''
    $('#markdown-link').value = link ? link[0] : ''
    $('.close').addEventListener('click', () => {
      document.body.classList.remove('v--modal-block-scroll')
      $('#markdown').outerHTML = ''
    })
    $('#markdown-done').addEventListener('click', () => {
      const tag = `![${$('#markdown-text').value}](${
        $('#markdown-link').value
      }${$('#markdown-hover').value ? ` "${$('#markdown-hover').value}"` : ''})`
      selection = value.substring(selectionStart, selectionEnd)
      textarea.value =
        value.substring(0, selectionStart) +
        (selection.match(/\[(.*)\]\((\S*)( ".*")?\)/)
          ? selection.replace(/\[.*\]/, `[${tag}]`)
          : tag) +
        value.substring(selectionEnd, length)
      document.body.classList.remove('v--modal-block-scroll')
      $('#markdown').outerHTML = ''
    })
  }
}

export default image
