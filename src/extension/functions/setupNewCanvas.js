import { options } from '../options'
import { getLocalStorageItem } from './getLocalStorageItem'
import { versions, git, environment } from '../../versioninfo';
const { user, repository, branch } = git;
const { scriptVersion, newCanvasVersion } = versions;

export function setupNewCanvas(inSandbox, url) {
  const canvasHTML = localStorage.getItem('anbt_canvasHTML')
  const canvasHTMLVersion = localStorage.getItem('anbt_canvasHTMLver')
  if ( environment === 'development' ||
    !canvasHTML ||
    canvasHTMLVersion < newCanvasVersion ||
    canvasHTML.length < 10000
  ) {
    const request = new XMLHttpRequest()
    const address = 
    `https://api.github.com/repos/${user}/${repository}/contents/build/index.html?ref=${branch}`;
    console.log(address);
    request.open(
      'GET',
      address
    )
    request.setRequestHeader('Accept', 'application/vnd.github.3.raw')
    request.onload = () => {
      if (request.responseText.length < 10000) {
        alert(
          `Error: instead of new canvas code, got this response from GitHub:\n${request.responseText}`
        )
        location.pathname = '/'
      } else {
        localStorage.setItem('anbt_canvasHTML', request.responseText)
        localStorage.setItem('anbt_canvasHTMLver', newCanvasVersion)
        setupNewCanvas(inSandbox, url)
      }
    }
    request.onerror = () => {
      alert('Error loading the new canvas code. Please try again.')
      location.pathname = '/'
    }
    request.send()
    return
  }
  const inForum = url.match(/forums\//)
  const friendGameId = url.match(/play\/(.+)\//) // Save friend game id if any
  const paletteInfo =
    url.includes('/sandbox/') && url.match(/\?palette=([^/]+)/)
  const panelId = url.match(/sandbox\/(?!\?palette=)#?([^/]+)\/?/)
  const inContest =
    url.match(/contests\/play\//) && document.getElementById('canvas-holder') // Handle drawing contests only
  const versionTitle = `ANBT v${scriptVersion}`

  // Disable built-in safety warning
  if (inContest) window.onbeforeunload = () => {}

  // Show normal address
  const normalUrl =
    inSandbox && !inForum
      ? `/sandbox/${panelId ? `#${panelId[1]}/` : ''}${
          paletteInfo ? `?palette=${paletteInfo[1]}` : ''
        }`
      : inContest
      ? '/contests/play/'
      : inForum
      ? url.match(/\/forums\/?.+/)
      : `/play/${friendGameId ? `${friendGameId[1]}/` : ''}`

  try {
    if (
      location.pathname + (panelId ? location.hash : paletteInfo[0]) !==
      normalUrl
    )
      history.pushState({}, document.title, normalUrl)
  } catch (e) {}

  const alarmSoundOgg =
    'data:audio/ogg;base64,T2dnUwACAAAAAAAAAABnHAAAAAAAAHQUSFoBHgF2b3JiaXMAAAAAAUSsAAAAAAAAYG0AAAAAAADJAU9nZ1MAAAAAAAAAAAAAZxwAAAEAAABq35G0DxD/////////////////NQN2b3JiaXMAAAAAAAAAAAEFdm9yYmlzH0JDVgEAAAEAFGNWKWaZUpJbihlzmDFnGWPUWoolhBRCKKVzVlurKbWaWsq5xZxzzpViUilFmVJQW4oZY1IpBhlTEltpIYQUQgehcxJbaa2l2FpqObacc62VUk4ppBhTiEromFJMKaQYU4pK6Jxz0DnmnFOMSgg1lVpTyTGFlFtLKXROQgephM5SS7F0kEoHJXRQOms5lRJTKZ1jVkJquaUcU8qtpphzjIHQkFUAAAEAwEAQGrIKAFAAABCGoSiKAoSGrAIAMgAABOAojuIokiI5kmM5FhAasgoAAAIAEAAAwHAUSZEUy9EcTdIszdI8U5ZlWZZlWZZlWZZd13VdIDRkFQAAAQBAKAcZxRgQhJSyEggNWQUAIAAAAIIowxADQkNWAQAAAQAIUR4h5qGj3nvvEXIeIeYdg9577yG0XjnqoaTee++99x5777n33nvvkWFeIeehk9577xFiHBnFmXLee+8hpJwx6J2D3nvvvfeec+451957752j3kHpqdTee++Vk14x6Z2jXnvvJdUeQuqlpN5777333nvvvffee++9955777333nvvrefeau+9995777333nvvvffee++9995777333nvvgdCQVQAAEAAAYRg2iHHHpPfae2GYJ4Zp56T3nnvlqGcMegqx9557773X3nvvvffeeyA0ZBUAAAgAACGEEFJIIYUUUkghhhhiyCGHHIIIKqmkoooqqqiiiiqqLKOMMsook4wyyiyjjjrqqMPOQgoppNJKC620VFtvLdUehBBCCCGEEEIIIYQQvvceCA1ZBQCAAAAwxhhjjEEIIYQQQkgppZRiiimmmAJCQ1YBAIAAAAIAAAAsSZM0R3M8x3M8x1M8R3RER3RER5RESbRETfREUTRFVbRF3dRN3dRNXdVN27VVW7ZlXdddXddlXdZlXdd1Xdd1Xdd1Xdd1XbeB0JBVAAAIAABhkEEGGYQQQkghhZRSijHGGHPOOSA0ZBUAAAgAIAAAAEBxFEdxHMmRJMmyLM3yLM8SNVMzNVNzNVdzRVd1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'

  if (inForum) {
    if (document.querySelector('.v--modal-overlay'))
      document.querySelector('.v--modal-overlay').outerHTML = ''
    const div = document.querySelector('.wrapper').children[1]
    const iframe = document.createElement('iframe')
    const modalOverlay = document.createElement('div')
    modalOverlay.setAttribute('class', 'v--modal-overlay')
    iframe.id = 'iframe'
    iframe.setAttribute('class', 'v--modal-background-click')
    modalOverlay.appendChild(iframe)
    div.appendChild(modalOverlay)
    iframe.contentWindow.document.open()
    iframe.contentWindow.anbtReady = () => {
      iframe.contentWindow.inForum = inForum
      iframe.contentWindow.inSandbox = inSandbox
      iframe.contentWindow.inContest = inContest
      iframe.contentWindow.options = options
      iframe.contentWindow.alarmSoundOgg = alarmSoundOgg
      iframe.contentWindow.versionTitle = versionTitle
      iframe.contentWindow.getLocalStorageItem = getLocalStorageItem
      iframe.contentWindow.needToGoDeeper()
    }
    iframe.contentWindow.document.write(canvasHTML)
    iframe.contentWindow.document.close()
    return
  }
  document.open()
  window.anbtReady = () => {
    if (friendGameId) window.friendGameId = friendGameId[1]
    if (panelId) window.panelId = panelId[1]
    if (paletteInfo) window.paletteInfo = paletteInfo[1]
    window.inForum = inForum
    window.inSandbox = inSandbox
    window.inContest = inContest
    window.options = options
    window.alarmSoundOgg = alarmSoundOgg
    window.versionTitle = versionTitle
    window.getLocalStorageItem = getLocalStorageItem
    window.needToGoDeeper()
  }
  document.write(canvasHTML)
  document.close()
}
