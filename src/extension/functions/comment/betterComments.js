import options from '../../options'
import getLocalStorageItem from '../getLocalStorageItem'
import $ from '../selector'
import formatTimestamp from '../time/formatTimestamp'

const betterComments = () => {
  // Linkify the links and add ability to address comment holders again
  const comments = [...$('#comments').nextElementSibling.children].slice(1)
  comments.forEach(x => {
    x.parentNode.parentNode.classList.add('comment-holder')
  })
  // Interlink game panels and comments
  const gamePlayers = []
  const playerdata = {}
  $('.gamepanel-holder', true).forEach((gamePanel, index) => {
    const detail = gamePanel.querySelector('.panel-details')
    const gamepanel = gamePanel.querySelector('.gamepanel')
    const playerLink = detail.querySelector('.panel-user a')
    if (!playerLink) return
    const id = playerLink.href.match(/\/player\/(\d+)\//)[1]
    playerdata[id] = {
      panel_number: index + 1,
      player_anchor: playerLink,
      panel_id: gamepanel.id,
      drew: gamepanel.querySelector('img') !== null,
      comments: 0
    }
    gamePlayers.push(id)
  })
  // Highlight new comments and remember seen comments
  const seenComments = getLocalStorageItem('gpe_seenComments', {})
  const gameid = document.location.href.match(/game\/([^/]+)\//)[1]
  if (comments) {
    // Clear old tracked comments
    const hour = Math.floor(Date.now() / (1000 * 60 * 60)) // timestamp with 1 hour precision
    // Store game entry for up to a week after last tracked comment
    for (const tempgame in seenComments)
      if (seenComments[tempgame].h + 24 * 7 < hour)
        delete seenComments[tempgame]
    let maxseenid = 0
    comments.forEach(holder => {
      const dateElement = holder.querySelector('a.text-muted')
      const vue = holder.__vue__
      if (vue) {
        const text = dateElement.textContent.trim()
        dateElement.textContent = `${text}, ${formatTimestamp(
          vue.comment_date * 1000
        )}`
        if (vue.edit_date > 0) {
          const element = dateElement.parentNode.querySelector(
            'span[rel="tooltip"]'
          )
          const title = `${element.title}, ${formatTimestamp(
            vue.edit_date * 1000
          ).replace(/ /g, '\u00A0')}` // prevent the short tooltip width from breaking date apart
          element.setAttribute('title', title)
        }
      }
      const ago = dateElement.textContent
      const commentid = parseInt(holder.id.slice(1), 10)
      // Also allow linking to specific comment
      dateElement.setAttribute('title', 'Link to comment')
      dateElement.textContent = `${dateElement.textContent.trim()} #${commentid}`
      // Track comments from up to week ago
      if (ago.match(/just now|min|hour|a day| [1-7] day/)) {
        if (!(seenComments[gameid] && seenComments[gameid].id >= commentid)) {
          holder.classList.add('comment-new')
          if (maxseenid < commentid) maxseenid = commentid
        }
      }
      // Add game perticipation info
      const link = holder.querySelector('.text-bold a')
        ? holder.querySelector('.text-bold a').href.match(/\/player\/(\d+)\//)
        : ''
      if (link) {
        const id = link[1]
        if (gamePlayers.includes(id)) {
          const drew = playerdata[id].drew ? 'drew' : 'wrote'
          dateElement.insertAdjacentHTML(
            'beforebegin',
            `<a href="#panel-${playerdata[id].panel_id}">(${drew} #${
              playerdata[id].panel_number
            })</a> `
          )
          playerdata[id].comments++
        }
      }
    })
    if (maxseenid)
      seenComments[gameid] = {
        h: hour,
        id: maxseenid
      }
    localStorage.setItem('gpe_seenComments', JSON.stringify(seenComments))
  }
  for (const playerId in gamePlayers) {
    const data = playerdata[playerId]
    if (data && data.comments) {
      const cmt2 = `Player left ${data.comments} comment${
        data.comments > 1 ? 's' : ''
      }`
      data.player_anchor.title = cmt2
      data.player_anchor.insertAdjacentHTML(
        'afterend',
        `<sup title="${cmt2}">${data.comments}</sup>`
      )
    }
  }
  if (options.maxCommentHeight) {
    const h = options.maxCommentHeight
    comments.forEach(comment =>
      comment.addEventListener('click', () => {
        if (
          comment.clientHeight > h - 50 &&
          !$(location.hash).has(comment).length
        )
          location.hash = `#${comment.parentNode.parentNode.id}`
      })
    )
  }
}

export default betterComments
