import options from '../../options'
import addStyle from '../addStyle'
import getLocalStorageItem from '../getLocalStorageItem'
import linkifyDrawingPanels from '../linkifyDrawingPanels'
import linkifyNodeText from '../linkifyNodeText'
import $ from '../selector'
import setupNewCanvas from '../setupNewCanvas'
import formatTimestamp from '../time/formatTimestamp'

const betterForums = () => {
  // Linkify the links
  $('.comment-body *', true).forEach(comment => linkifyNodeText(comment))

  // Linkify drawing panels
  $('img', true).forEach(img => linkifyDrawingPanels(img))

  // Show posts IDs and link
  if (location.pathname.match(/\/forums\/(\w+|-)\/.+/)) {
    const hideUserIds = options.forumHiddenUsers
      ? options.forumHiddenUsers.split(',')
      : ''
    if (hideUserIds)
      addStyle(
        '.anbt_hideUserPost:not(:target) {opacity: 0.4; margin-bottom: 10px}' +
          '.anbt_hideUserPost:not(:target) .comment-body, .anbt_hideUserPost:not(:target) .avatar {display: none}' +
          ''
      )
    let lastId = 0
    $('.comment-avatar', true).forEach(({ parentNode }) => {
      const commentHolder = parentNode.parentNode.parentNode
      const anchor = commentHolder.id || ''
      commentHolder.classList.add('comment-holder') // No identification for these anymore, this is unhelpful!
      const textMuted = commentHolder.querySelector('a.text-muted')
      const vue = commentHolder.childNodes[0].__vue__
      if (vue) {
        textMuted.textContent = `${textMuted.textContent.trim()}, ${formatTimestamp(
          vue.comment_date * 1000
        )}`
        if (vue.edit_date > 0) {
          const element = textMuted.parentNode.querySelector(
            'span[rel="tooltip"]'
          )
          const text = `${element.title}, ${formatTimestamp(
            vue.edit_date * 1000
          ).replace(/ /g, '\u00A0')}` // prevent the short tooltip width from breaking date apart
          element.setAttribute('title', text)
        }
      }
      if (anchor) {
        const id = parseInt(anchor.substring(1), 10)
        const text = textMuted.textContent.trim()
        textMuted.textContent = `${text} #${id}`
        textMuted.setAttribute('title', 'Link to post')
        if (id < lastId) textMuted.classList.add('wrong-order')
        try {
          const { href } = commentHolder.querySelector('a[href^="/player/"]')
          if (href) {
            const userId = href.match(/\d+/)[0]
            if (hideUserIds.includes(userId))
              commentHolder.classList.add('anbt_hideUserPost')
          }
        } catch (e) {}
        lastId = id
      }
    })

    // Warn about posting to another page
    if (
      $('.comment-holder') &&
      $('.comment-holder').length === 20 &&
      $('#comment-form .btn-primary')
    )
      $('#comment-form .btn-primary').insertAdjacentHTML(
        'afterend',
        '<div>Note: posting to another page</div>'
      )
  }

  if (options.proxyImgur)
    $('img[src*="imgur.com/"]', true).forEach(img =>
      img.setAttribute(
        'src',
        img.src.replace('imgur.com', 'filmot.com').replace('https', 'http')
      )
    )

  const pagination = $('.pagination', true)
  if (pagination.length)
    $('.breadcrumb').insertAdjacentHTML(
      'afterend',
      `<div class="text-center">${pagination[0].outerHTML}</div>`
    )

  // For the topic list pages only
  if (location.pathname.match(/\/forums\/(\w+)\/$/)) {
    const hiddenTopics = getLocalStorageItem('gpe_forumHiddenTopics', [])
    let hidden = 0

    const tempUnhideLink = $('<a class="text-muted anbt_unhidet">')

    $('.forum-thread', true).forEach(thread => {
      const href = thread
        .querySelector('a:first-child')
        .href.match(/\/forums\/\w+\/(\d+)\//)
      // Don't let them hide the ANBT topic ;)
      if (!href || !href[1] || href[1] === '11830') return

      const id = href[1]
      if (hiddenTopics.includes(id)) {
        thread.classList.add('anbt_hidden')
        hidden++
      }
      const hideLink = $('<a class="text-muted anbt_hft">')
      hideLink.addEventListener('click', () => {
        const hiddenTopics = getLocalStorageItem('gpe_forumHiddenTopics', [])
        if (hiddenTopics.includes(id)) {
          if (hiddenTopics.includes(id))
            hiddenTopics.splice(hiddenTopics.indexOf(id), 1)
          hiddenTopics.splice(hiddenTopics.indexOf(id), 1)
          thread.classList.remove('anbt_hidden')
          hidden--
        } else {
          if (!hiddenTopics.includes(id)) hiddenTopics.push(id)
          hiddenTopics.push(id)
          thread.classList.add('anbt_hidden')
          hidden++
          tempUnhideLink.style.display = ''
        }
        tempUnhideLink.textContent = hidden
        localStorage.setItem(
          'gpe_forumHiddenTopics',
          JSON.stringify(hiddenTopics)
        )
      })
      thread.querySelector('p:nth-child(2)').appendChild(hideLink)
    })
    tempUnhideLink.textContent = hidden
    tempUnhideLink.addEventListener('click', () => {
      $('#main').classList.toggle('anbt_showt')
    })
    if (!hidden) tempUnhideLink.style.display = 'none'
    if ($('#js-btn-toggle-thread'))
      $('#js-btn-toggle-thread').parentNode.appendChild(tempUnhideLink)
  }
  $('.btn.btn-default', true).forEach(button =>
    button.addEventListener('click', () => {
      if (button.textContent === 'Draw') setupNewCanvas(true, location.href)
    })
  )
}

export default betterForums
