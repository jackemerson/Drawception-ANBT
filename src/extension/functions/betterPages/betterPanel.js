import options from '../../options'
import getCookie from '../cookie/getCookie'
import setCookie from '../cookie/setCookie'
import getLocalStorageItem from '../getLocalStorageItem'
import getPanelId from '../getPanelId'
import checkForRecording from '../replay/checkForRecording'
import $ from '../selector'
import setupNewCanvas from '../setupNewCanvas'
import unscrambleID from '../unscrambleID'

const betterPanel = () => {
  let favoriteButton = $(
    '<button class="btn btn-info" style="margin-top: 20px"><span class="fas fa-heart"></span> <b>Favorite</b></button>'
  )
  const gamePanel = $(
    '.panel-caption-display>.flex,.gamepanel-holder>.gamepanel'
  )
  if (gamePanel)
    gamePanel.insertAdjacentHTML('afterend', favoriteButton.outerHTML)
  favoriteButton = $('.btn.btn-info')
  if (favoriteButton) {
    favoriteButton.addEventListener('click', event => {
      event.preventDefault()
      const panels = getLocalStorageItem('gpe_panelFavorites', {})
      const panel = {
        time: Date.now(),
        by: $('.lead a', true)[0].textContent,
        userLink: $('.lead a', true)[0].href.match(
          /\/player\/[^/]+\/[^/]+\//
        )[0]
      }
      const id = location.href.match(/\/panel\/[^/]+\/([^/]+)\//)[1]
      const img = $('.gamepanel img')
      if (img) {
        // Drawing panel
        panel.image = img.src
        panel.caption = img.alt
      } else {
        // Caption panel
        panel.caption = $('.gamepanel').textContent.trim()
      }
      panels[id] = panel
      localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels))
      favoriteButton.setAttribute('disabled', 'disabled')
      favoriteButton.querySelector('b').textContent = 'Favorited!'
    })
  }
  const panels = getLocalStorageItem('gpe_panelFavorites', {})
  if (
    location.href.match(/\/panel\/[^/]+\/([^/]+)\//) &&
    panels[location.href.match(/\/panel\/[^/]+\/([^/]+)\//)[1]]
  ) {
    favoriteButton.setAttribute('disabled', 'disabled')
    favoriteButton.querySelector('b').textContent = 'Favorited!'
  }
  const panelId = getPanelId(location.pathname)

  // Only panels after 14924553 might have a recording
  if (options.newCanvas && panelId && unscrambleID(panelId) >= 14924553) {
    const img = $('.gamepanel img')
    if (img)
      checkForRecording(img.src, () => {
        const replayLink = $(
          `<a class="btn btn-primary" style="margin-top: 20px" href="/sandbox/#${panelId}"><span class="fas fa-redo-alt"></span> <b>Replay</b></a> `
        )
        replayLink.addEventListener('click', event => {
          if (event.which === 2) return
          event.preventDefault()
          setupNewCanvas(true, `/sandbox/#${panelId}`)
        })
        $('.gamepanel').insertAdjacentHTML('afterend', replayLink.outerHTML)
      })
  }
  if (
    $('.btn-primary').length > 1 &&
    $('.btn-primary')[1].textContent === 'Play again'
  ) {
    // Allow adding to cover creator
    const coverButton = $(
      '<button class="btn btn-info" style="margin-top: 20px"><span class="fas fa-plus"></span> <b>Add to Cover Creator</b></button>'
    )
    coverButton.addEventListener('click', event => {
      event.preventDefault()
      const id = unscrambleID(panelId)
      const cookie = getCookie('covercreatorids')
      const idList = cookie ? JSON.parse(cookie) : []
      if (!idList.includes(id)) {
        if (idList.length > 98) {
          window.apprise(
            'Max cover creator drawings selected. Please remove some before adding more.'
          )
          return
        } else idList.push(id.toString())
      } else {
        coverButton
          .setAttribute('disabled', 'disabled')
          .querySelector('b').textContent = 'Already added!'
        return
      }
      setCookie('covercreatorids', JSON.stringify(idList))
      coverButton
        .setAttribute('disabled', 'disabled')
        .querySelector('b').textContent = 'Added!'
    })
    $('.gamepanel').insertAdjacentHTML('afterend', coverButton.outerHTML)
  }
}

export default betterPanel
