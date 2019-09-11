import fadeOut from './fade/fadeOut'
import getLocalStorageItem from './getLocalStorageItem'
import $ from './selector'
import formatTimestamp from './time/formatTimestamp'

const viewMyPanelFavorites = () => {
  const panels = getLocalStorageItem('gpe_panelFavorites', {})
  let result = ''
  let needsUpdate = false
  for (const id in panels) {
    if (panels[id].image && panels[id].image.match(/^\/pub\/panels\//)) {
      needsUpdate = true
      panels[id].image = panels[id].image.replace(
        '/pub/panels/',
        'https://cdn.drawception.com/images/panels/'
      )
    }
    result += `<div id="${id}" style="float: left; position: relative; min-width: 150px;"><div class="thumbpanel-holder" style="overflow:hidden"><a class="anbt_paneldel" href="#" title="Remove">X</a><a href="/panel/-/${id}/-/" class="thumbpanel" rel="tooltip" title="${
      panels[id].caption
    }">${
      panels[id].image
        ? `<img src="${panels[id].image}" width="125" height="104" alt="${panels[id].caption}" />`
        : panels[id].caption
    }</a><span class="text-muted" style="white-space:nowrap">by <a href="${
      panels[id].userLink
    }">${
      panels[id].by
    }</a></span><br><small class="text-muted"><span class="fas fa-heart text-danger"></span> ${formatTimestamp(
      panels[id].time
    )}</small></div></div>`
  }

  if (needsUpdate)
    localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels))
  result = result
    ? `${result}<div style="clear:left"></div>`
    : "You don't have any favorited panels."
  $('#anbt_userpage').innerHTML = result
  $('#anbt_userpage .anbt_paneldel', true).forEach(panelDelete =>
    panelDelete.addEventListener('click', event => {
      event.preventDefault()
      const { id } = panelDelete.parentNode.parentNode
      fadeOut($(`#${CSS.escape(id)}`))
      delete panels[id]
      localStorage.setItem('gpe_panelFavorites', JSON.stringify(panels))
    })
  )
}

export default viewMyPanelFavorites
