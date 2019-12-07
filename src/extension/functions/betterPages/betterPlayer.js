import { globals } from '../../globals'
import { options } from '../../options'
import { linkifyNodeText } from '../linkifyNodeText'
import { randomGreeting } from '../randomGreeting'
import { addReplaySign } from '../replay/addReplaySign'
import { $ } from '../selector'
import { formatTimestamp } from '../time/formatTimestamp'
import { viewMyGameBookmarks } from '../viewMyGameBookmarks'
import { viewMyPanelFavorites } from '../viewMyPanelFavorites'

export function betterPlayer() {
  // Linkify the links in location
  const publicInfo = $('.profile-header-info .text-muted > span:last-child')
  if (publicInfo) linkifyNodeText(publicInfo.parentNode)
  const currentLocation = location.href
  // If it's user's homepage, add new buttons in there
  if (currentLocation.match(new RegExp(`/player/${globals.userId}/[^/]+/(?:$|#)`))) {
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

    if (location.hash.includes('#anbt_panelfavorites')) viewMyPanelFavorites()
    if (location.hash.includes('#anbt_gamebookmarks')) viewMyGameBookmarks()

    // Show your exact registration date
    if (window.date) {
      const publicInfo = $('.profile-user-header>div.row>div>h1+p')
      if (publicInfo) {
        [...publicInfo.childNodes][4].nodeValue = ` ${formatTimestamp(
          window.date
        )} \xa0`
      }
    }
  } else {
    // Not the current user's profile or not profile homepage
    const drawings = $(
      'img[src^="https://cdn.drawception.com/images/panels/"],img[src^="https://cdn.drawception.com/drawings/"]',
      true
    )
    // Show replayable panels; links are not straightforward to make since there's no panel ID
    if (options.newCanvas) {
      drawings.forEach(drawing =>
        drawing.addEventListener('load', addReplaySign(drawing))
      )
    }

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
  if (currentLocation.match(/player\/\d+\/[^/]+\/(posts)|(comments)\//)) {
    // Show topic title at the top of the posts instead and display subforum
    // Show game title at the top of the posts
    $('.forum-thread-starter', true).forEach(threadStarter => {
      const vue = threadStarter.childNodes[0].__vue__
      if (vue) {
        const time = threadStarter.querySelector('a.text-muted').firstChild
        time.textContent = `${time.textContent.trim()}, ${formatTimestamp(
          vue.comment_date * 1000
        )}`
        if (vue.edit_date > 0) {
          const element = time.parentNode.parentNode.querySelector(
            'span[rel="tooltip"]'
          )
          const text = `${element.title}, ${formatTimestamp(
            vue.edit_date * 1000
          ).replace(/ /g, '\u00A0')}` // prevent the short tooltip width from breaking date apart
          element.setAttribute('title', text)
        }
      }
      const postLink = threadStarter.querySelector(
        '.add-margin-top small.text-muted'
      )
      const created = postLink.textContent.match(/^\s*Created/)
      const commented = postLink.textContent.match(/^\s*Commented/)
      const prefix = commented
        ? 'Comment in the game'
        : created
        ? 'New thread'
        : 'Reply in'
      const prefixeTitle = $(`<h4 class="anbt_threadtitle">${prefix}: </h4>`)
      const thread = postLink.querySelector('a')
      prefixeTitle.appendChild(thread)
      threadStarter.insertAdjacentHTML('afterbegin', prefixeTitle.outerHTML)
      postLink.parentNode.parentNode.removeChild(postLink.parentNode)
    })
  }
}
