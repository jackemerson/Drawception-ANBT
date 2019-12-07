import { options } from '../../options'
import { waitForComments } from '../comment/waitForComments'
import { getLocalStorageItem } from '../getLocalStorageItem'
import { addReplayButton } from '../replay/addReplayButton'
import { reversePanels } from '../reversePanels'
import { $ } from '../selector'

export function betterGame() {
  if (document.title === 'Not Safe For Work (18+) Gate') {
    if (options.autoBypassNSFW) window.DrawceptionPlay.bypassNsfwGate()
    return
  }
  const drawings = $(
    'img[src^="https://cdn.drawception.com/images/panels/"],img[src^="https://cdn.drawception.com/drawings/"]'
  )

  // Reverse panels button
  const copyButton = $('#btn-copy-url')
  if (copyButton) {
    copyButton.insertAdjacentHTML(
      'afterend',
      ' <a href="#" class="btn btn-default reversePanels" title="Reverse panels"><span class="fas fa-sort-amount-up"></span> Reverse</a>'
    )
  }

  $('.reversePanels').addEventListener('click', reversePanels)

  // Panel favorite buttons
  const favoriteButton = $(
    '<span class="panel-number anbt_favpanel fas fa-heart text-muted" title="Favorite"></span>'
  )
  $('.panel-number', true).forEach(panelNumber =>
    panelNumber.insertAdjacentHTML('afterend', favoriteButton.outerHTML)
  )
  $('.gamepanel', true).forEach(({ parentNode }) => {
    if (parentNode.querySelector('.gamepanel-tools>a:last-child') === null)
      return
    const panels = getLocalStorageItem('gpe_panelFavorites', {})
    const id = parentNode
      .querySelector('.gamepanel-tools>a:last-child')
      .href.match(/\/panel\/[^/]+\/([^/]+)\/[^/]+\//)[1]
    if (panels[id]) {
      parentNode
        .querySelector('.anbt_favpanel')
        .classList.add('anbt_favedpanel')
    }
  })
  $('.anbt_favpanel', true).forEach(favoritePanelButton => {
    favoritePanelButton.addEventListener('click', () => {
      if (favoritePanelButton.classList.contains('anbt_favedpanel')) return
      const { parentNode } = favoritePanelButton
      const id = parentNode
        .querySelector('.gamepanel-tools>a:last-child')
        .href.match(/\/panel\/[^/]+\/([^/]+)\/[^/]+\//)[1]
      const panels = getLocalStorageItem('gpe_panelFavorites', {})
      const panel = {
        time: Date.now(),
        by: parentNode.querySelector('.panel-user a').textContent
      }
      panel.userLink = parentNode
        .querySelector('.panel-user a')
        .href.match(/\/player\/[^/]+\/[^/]+\//)[0]
      const img = parentNode.querySelector('.gamepanel img')
      if (img) {
        // Drawing panel
        panel.image = img.src
        panel.caption = img.alt
      } else {
        // Caption panel
        panel.caption = parentNode
          .querySelector('.gamepanel')
          .textContent.trim()
      }
      panels[id] = panel
      localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels))
      favoritePanelButton.classList.add('anbt_favedpanel')
    })
  })

  // Panel replay button
  if (options.newCanvas) {
    if (drawings) {
      drawings.forEach(drawing =>
        drawing.addEventListener('load', addReplayButton(drawing))
      )
    }
  }

  setTimeout(waitForComments, 200)
}
