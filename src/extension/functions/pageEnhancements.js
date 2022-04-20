import { betterPages } from '../betterPages'
import { options } from '../options'
import { versions } from '../../versioninfo';
import { addMarkdownTools } from './addMarkdownTools'
import { addStyle } from './addStyle'
import { setCookie } from './cookie/setCookie'
import { toggleLight } from './darkMode/toggleLight'
import { getNotifications } from './getNotifications'
import { $ } from './selector'
import { loadScriptSettings } from './settings/loadScriptSettings'
import { setupNewCanvas } from './setupNewCanvas'

const { runtimeVersion, scriptVersion, siteVersion } = versions;

export function pageEnhancements() {
  loadScriptSettings()
  if (typeof DrawceptionPlay === 'undefined') return // Firefox Greasemonkey seems to call pageEnhancements() after document.write...
  if (document.getElementById('newcanvasyo')) return // Chrome, I'm looking at you too...
  try {
    const temporaryUserLink = $('.player-dropdown a[href^="/player/"]')
    const username = temporaryUserLink.querySelector('strong').textContent
    const userId = temporaryUserLink.href.match(/\/player\/(\d+)\//)[1]
    localStorage.setItem('gpe_lastSeenName', username)
    localStorage.setItem('gpe_lastSeenId', userId)
  } catch (e) {}
  const currentPage = location.href.match(/drawception\.com\/([^/]+)/)
  if (currentPage) {
    const page = currentPage[1]
    const pageName = `better${page.replace(page[0], page[0].toUpperCase())}`
    if (betterPages[pageName]) betterPages[pageName]()
  }

  addStyle(
    '.panel-user {width: auto} .panel-details img.loading {display: none}' +
      '.gpe-wide, .gpe-wide-block {display: none}' +
      '.gpe-btn {padding: 5px 8px; height: 28px}' +
      '.gpe-spacer {margin-right: 7px; float:left}' +
      '@media (min-width:992px) {.navbar-toggle,.btn-menu-player {display: none} .gpe-wide {display: inline} .gpe-wide-block {display: block}}' +
      '@media (min-width:1200px) {.gpe-btn {padding: 5px 16px;} .gpe-spacer {margin-right: 20px;} .panel-number {left: -30px}}' +
      '#anbtver {font-size: 10px; position:absolute; opacity:0.3; right:10px; top: 0;}' +
      '.anbt_paneldel {position:absolute; padding:1px 6px; color:#FFF; background:#d9534f; text-decoration: none !important; right: 18px; border-radius: 5px}' +
      '.anbt_paneldel:hover {background:#d2322d}' +
      '.anbt_favpanel {top: 20px; font-weight: normal; padding: 0 2px}' +
      '.anbt_favpanel:hover {color: #d9534f; cursor:pointer}' +
      '.anbt_favedpanel {color: #d9534f; border-color: #d9534f}' +
      '.anbt_replaypanel {top: 55px; font-weight: normal; padding: 0 8px}' +
      '.anbt_replaypanel:hover {color: #8af; text-decoration: none}' +
      ".anbt_owncaption:before {content: ''; display: inline-block; background: #5C5; border: 1px solid #080; width: 10px; height: 10px; border-radius: 10px; margin-right: 10px;}" +
      '.gamepanel, .thumbpanel, .comment-body {word-wrap: break-word}' +
      '.comment-body img {max-width: 100%}' +
      '.forum-thread.anbt_hidden {display: none}' +
      '.anbt_showt .forum-thread.anbt_hidden {display: block; opacity: 0.6}' +
      ".anbt_unhidet:after {content: ' threads hidden. Show'}" +
      ".anbt_showt .anbt_unhidet:after {content: ' threads hidden. Hide'}" +
      ".anbt_hft:after {content: '[hide]'}" +
      '.anbt_hft, .anbt_unhidet {padding-left: 0.4em; cursor:pointer}' +
      ".forum-thread.anbt_hidden .anbt_hft:after {content: '[show]'}" +
      '.anbt_threadtitle {margin: 0 0 10px}' +
      '.avatar {box-sizing: content-box}' +
      '.pagination {margin: 0px}' +
      '#nav-drag {position: fixed; width: 100%; z-index: 2000}' +
      '#header-bar-container {position: relative; width: 100%; top: 6.4rem}' +
      '.wrapper {position: relative; top: 6.4rem}' +
      'footer {position: relative; top: 6.4rem}' +
      '.option span:first-child {display: flex; flex-direction: row; justify-content: space-between}' +
      '.grid-settings div[class^="grid-"] label {display: inline-flex}' +
      'input[type="checkbox"], input[type="radio"] {margin:4px 4px 0 0}' +
      '@-moz-document url-prefix() {input[type="checkbox"], input[type="radio"] {margin:0 4px 0 0}}' +
      '.tooltip {z-index: 3000;}' +
      '.bg-color {position: relative; width: 100%; top: 6.4rem}' +
      '.text-right > a[href*="store"] {margin-top: 1rem}'
  )
  if (options.maxCommentHeight) {
    const maxHeight = options.maxCommentHeight
    addStyle(
      `.comment-holder[id]:not(:target) .comment-body {overflow-y: hidden; max-height: ${maxHeight}px; position:relative}.comment-holder[id]:not(:target) .comment-body:before{content: 'Click to read more'; position:absolute; width:100%; height:50px; left:0; top:${maxHeight -
        50}px;text-align: center; font-weight: bold; color: #fff; text-shadow: 0 0 2px #000; padding-top: 20px; background:linear-gradient(transparent, rgba(0,0,0,0.4))}`
    )
    $('.comment-body', true).forEach(comment =>
      comment.addEventListener('click', () => {
        if (
          comment.clientHeight > maxHeight - 50 &&
          location.hash.indexOf(comment) === -1
        )
          location.hash = `#${comment.parentNode.parentNode.id}`
      })
    )
  }
  if (options.useOldFontSize) document.body.style.fontSize = '15px'
  if (options.useOldFont) {
    const nunito = $("link[href*='Nunito']")
    nunito.parentNode.removeChild(nunito)
    addStyle(
      "@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap')"
    )
  }
  if (options.anbtDarkMode) {
    if (document.body.classList.contains('theme-night')) {
      document.body.classList.remove('theme-night')
      setCookie('theme-night')
    }
  }
  if (options.markdownTools) addMarkdownTools()
  if (options.newCanvas) {
    const inSandbox = location.href.match(/drawception\.com\/sandbox\/#?(.*)/)
    const inPlay = location.href.match(
      /drawception\.com\/(:?contests\/)?play\/(.*)/
    )
    const hasCanvas = document.getElementById('canvas-holder')
    // If created a friend game, the link won't present playable canvas
    const hasCanvasOrGameForm = document.querySelector('.playtimer')
    const captionContest = location.href.match(/contests\/play\//) && !hasCanvas
    if ((!captionContest && inSandbox) || (inPlay && hasCanvasOrGameForm)) {
      setTimeout(() => setupNewCanvas(inSandbox, location.href), 1)
      return
    }
    $('a[href^="/sandbox/"]', true).forEach(sandboxButton =>
      sandboxButton.addEventListener('click', event => {
        if (event.which === 2) return
        event.preventDefault()
        setupNewCanvas(true, event.currentTarget.href)
      })
    )
    $('a[href="/play/"]', true).forEach(playButton =>
      playButton.addEventListener('click', event => {
        if (event.which === 2) return
        event.preventDefault()
        setupNewCanvas(false, event.currentTarget.href)
      })
    )
  }
  // Enhance menu for higher resolutions
  const navToggle = $('.navbar-toggle')
  if (navToggle) {
    const navbarToggle = navToggle.parentNode
    const navbarButtonsList = [
      '<span class="gpe-wide gpe-spacer"></span>',
      '<a href="/sandbox/" title="Sandbox" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item" style="background:#5A5"><span class="fas fa-edit" style="color:#BFB" /></a>',
      '<a href="/browse/all-games/" title="Browse Games" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-folder-open" /></a>',
      '<a href="/contests/" title="Contests" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-trophy" /></a>',
      '<a href="#" title="Toggle light" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item toggle-light" style="background:#AA5"><span class="fas fa-eye" style="color:#FFB" /></a>',
      '<a href="/faq/" title="FAQ" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-question-circle " /></a>',
      '<a href="/forums/" title="Forums" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item" style="background:#55A"><span class="fas fa-comments" style="color:#BBF" /></a>',
      '<a href="/search/" title="Search" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-search" /></a>',
      '<a href="/dashboard/" title="Dashboard" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-bell" /></a>',
      `${
        $('a[href^="/secretus/"]')
          ? '<a href="/secretus/" title="Feed" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-mask" /></a>'
          : ''
      }`,
      '<a href="/settings/" id="menusettings" title="Settings" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item"><span class="fas fa-cog" /></a>',
      '<a href="/logout" title="Log Out" class="gpe-wide gpe-btn btn btn-menu navbar-btn navbar-user-item" style="background:#A55"><span class="fas fa-sign-out-alt" style="color:#FBB" /></a>'
    ]
    navbarButtonsList.forEach(button =>
      button.length > 0 ? navbarToggle.appendChild($(button)) : button
    )
    // Let users with screens narrow enough so top bar isn't visible still use toggle light function
    $('#main-menu').insertAdjacentHTML(
      'afterbegin',
      '<a href="#" class="list-group-item toggle-light"><span class="fas fa-eye"></span> Toggle light</a>'
    )
  }
  const lightButton = $('.toggle-light')
  if (lightButton)
    lightButton.forEach(button => button.addEventListener('click', toggleLight))

  const menuPlayer = $('.btn-menu-player')
  if (menuPlayer) {
    const userLink = $('.player-dropdown a[href^="/player/"]').href
    const userAvatar = $('.btn-menu-player').innerHTML
    const element = $(
      `<a href="${userLink}" title="View Profile" class="gpe-wide-block navbar-btn navbar-user-item" style="margin-top:8px">${userAvatar}</a>`
    )
    menuPlayer.parentNode.appendChild(element)
  }

  // Make new notifications actually discernable from the old ones
  const number =
    $('#user-notify-count') && $('#user-notify-count').textContent.trim()
  addStyle(
    `#user-notify-list .list-group .list-group-item .fas {color: #888}#user-notify-list .list-group .list-group-item:nth-child(-n+${number}) .fas {color: #2F5}a.wrong-order {color: #F99} div.comment-holder:target {background-color: #DFD}.comment-new a.text-muted:last-child:after {content: 'New'; color: #2F5; font-weight: bold; background-color: #183; border-radius: 9px; display: inline-block; padding: 0px 6px; margin-left: 10px;}`
  )

  // Show an error if it occurs instead of "loading forever"
  window.getNotifications = getNotifications

  let versionDisplay = `ANBT v${scriptVersion}`
  try {
    const appVersion = $('script[src^="/build/app"]').src.match(/(\w+)\.js$/)[1]
    const runtimeVer = $('script[src^="/build/runtime"]').src.match(
      /(\w+)\.js$/
    )[1]
    versionDisplay += ` | app ${appVersion}`
    if (appVersion !== siteVersion) versionDisplay += '*'
    versionDisplay += ` | runtime ${runtimeVer}`
    if (runtimeVer !== runtimeVersion) versionDisplay += '*!!!' // didn't break with one update, hurray
  } catch (e) {}
  const wrapperSection = $('.wrapper')
  if (wrapperSection)
    wrapperSection.appendChild($(`<div id="anbtver">${versionDisplay}</div>`))

  const linkList = [
    '<li><a href="/forums/-/11830/-/">ANBT script</a></li>',
    '<li><a href="http://drawception.wikia.com/">Wiki</a></li>',
    '<li><a href="http://chat.grompe.org.ru/#drawception">Chat</a> (<a href="https://discord.gg/CNd5KTJ">Discord</a>)</li>'
  ]
  const footerLists = $('.footer-main .list-unstyled')
  if (footerLists)
    footerLists.forEach((list, index) => list.appendChild($(linkList[index])))
}
