import globals from '../../globals'
import options from '../../options'
import linkifyNodeText from '../linkifyNodeText'
import randomGreeting from '../randomGreeting'
import addReplaySign from '../replay/addReplaySign'
import $ from '../selector'
import formatTimestamp from '../time/formatTimestamp'
import viewMyGameBookmarks from '../viewMyGameBookmarks'
import viewMyPanelFavorites from '../viewMyPanelFavorites'

const betterPlayer = () => {
  // Linkify the links in location
  const pubinfo = $('.profile-header-info .text-muted > span:last-child')
  if (pubinfo) linkifyNodeText(pubinfo.parentNode)
  const loc = document.location.href
  // If it's user's homepage, add new buttons in there
  if (loc.match(new RegExp(`/player/${globals.userId}/[^/]+/(?:$|#)`))) {
    const anbtSection = $('<h2>ANBT stuff: </h2>')
    const panelFavoritesButton = $(
      '<a class="btn btn-primary viewFavorites" href="#anbt_panelfavorites">Panel Favorites</a>'
    )
    const gameBookmarks = $(
      '<a class="btn btn-primary viewBookmarks" href="#anbt_gamebookmarks">Game Bookmarks</a>'
    )
    anbtSection.appendChild(panelFavoritesButton)
    anbtSection.appendChild(gameBookmarks)
    const profilemain = $('.profile-layout-content').firstChild
    profilemain.insertAdjacentHTML(
      'afterbegin',
      `<h5 id="anbt_userpage">${randomGreeting()}</h5>`
    )
    profilemain.insertAdjacentHTML('afterbegin', anbtSection.outerHTML)
    $('.viewFavorites').addEventListener('click', event => {
      event.preventDefault()
      viewMyPanelFavorites()
    })
    $('.viewBookmarks').addEventListener('click', event => {
      event.preventDefault()
      viewMyGameBookmarks()
    })

    if (document.location.hash.includes('#anbt_panelfavorites'))
      viewMyPanelFavorites()
    if (document.location.hash.includes('#anbt_gamebookmarks'))
      viewMyGameBookmarks()

    // Show your exact registration date
    if (window.date) {
      const pubinfo = $('.profile-user-header>div.row>div>h1+p')
      if (pubinfo)
        [...pubinfo.childNodes][4].nodeValue = ` ${formatTimestamp(
          window.date
        )} \xa0`
    }
  } else {
    // Not the current user's profile or not profile homepage
    const drawings = $(
      'img[src^="https://cdn.drawception.com/images/panels/"],img[src^="https://cdn.drawception.com/drawings/"]',
      true
    )
    // Show replayable panels; links are not straightforward to make since there's no panel ID
    if (options.newCanvas)
      drawings.forEach(drawing =>
        drawing.addEventListener('load', addReplaySign(drawing))
      )

    // Detect Draw Firsts
    drawings.forEach(({ src, parentNode }) => {
      if (src.match(/-1\.png$/))
        parentNode.parentNode.appendChild(
          $(
            '<span class="pull-right" title="Draw First game"><img src="/img/icon-coins.png"></span>'
          )
        )
    })
  }

  // Convert timestamps in user profile's forum posts and game comments
  if (loc.match(/player\/\d+\/[^/]+\/(posts)|(comments)\//)) {
    // Show topic title at the top of the posts instead and display subforum
    // Show game title at the top of the posts
    $('.forum-thread-starter', true).forEach(threadStarter => {
      const vue = threadStarter.childNodes[0].__vue__
      if (vue) {
        const ts = threadStarter.querySelector('a.text-muted').firstChild
        ts.textContent = `${ts.textContent.trim()}, ${formatTimestamp(
          vue.comment_date * 1000
        )}`
        if (vue.edit_date > 0) {
          const el = ts.parentNode.parentNode.querySelector(
            'span[rel="tooltip"]'
          )
          const text = `${el.title}, ${formatTimestamp(
            vue.edit_date * 1000
          ).replace(/ /g, '\u00A0')}` // prevent the short tooltip width from breaking date apart
          el.setAttribute('title', text)
        }
      }
      const postlink = threadStarter.querySelector(
        '.add-margin-top small.text-muted'
      )
      const created = postlink.textContent.match(/^\s*Created/)
      const commented = postlink.textContent.match(/^\s*Commented/)
      const prefix = commented
        ? 'Comment in the game'
        : created
        ? 'New thread'
        : 'Reply in'
      const n = $(`<h4 class="anbt_threadtitle">${prefix}: </h4>`)
      const thread = postlink.querySelector('a')
      n.appendChild(thread)
      threadStarter.insertAdjacentHTML('afterbegin', n.outerHTML)
      postlink.parentNode.parentNode.removeChild(postlink.parentNode)
    })
  }
}

export default betterPlayer
