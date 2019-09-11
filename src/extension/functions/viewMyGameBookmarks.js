import fadeOut from './fade/fadeOut'
import getLocalStorageItem from './getLocalStorageItem'
import $ from './selector'
import formatTimestamp from './time/formatTimestamp'

const viewMyGameBookmarks = () => {
  const removeButtonHTML =
    '<a class="anbt_gamedel pull-right lead fas fa-times btn btn-sm btn-danger" href="#" title="Remove" style="margin-left: 10px"></a>'
  const games = getLocalStorageItem('gpe_gameBookmarks', {})
  const result = []
  for (let id in games) {
    const extraClass = games[id].own ? ' anbt_owncaption' : ''
    if (id.length > 10) {
      // token, seen lengths: 43, 32; just in case assuming everything > 10 is a token
      result.push(
        `<p class="well${extraClass}" id="${id}"><span>${id}</span>${removeButtonHTML}</p>`
      )
      const xhr = new XMLHttpRequest()
      xhr.open('GET', `/play/${id}`)
      xhr.onload = () => {
        const { responseText, status } = xhr
        if (status === 200) {
          const m =
            responseText.match(/Game is not private/) ||
            (responseText.match(/Problem loading game/) && 'del')
          if (m) {
            const gamename =
              `${
                games[id].own
                  ? ` with your caption${
                      games[id].caption ? ` ${games[id].caption}` : ''
                    }`
                  : ''
              }${
                games[id].time
                  ? ` bookmarked on ${formatTimestamp(games[id].time)}`
                  : ''
              }` || id
            const status = m === 'del' ? 'Deleted' : 'Unfinished public'
            $(`#${id}`).querySelector(
              'span'
            ).textContent = `${status} game${gamename}`
            return
          }
          const title = responseText.match(/<title>(.+)<\/title>/)[1]
          const [url, gameId] = responseText.match(/\/game\/([^/]+)\/[^/]+\//)
          delete games[id]
          games[gameId] = {
            title,
            url
          }
          $(`#${id}`).id = gameId
          const spanId = $(`#${gameId}`).querySelector('span')
          spanId.parentNode.replaceChild(
            $(`<a href="${url}">${title}</a>`),
            spanId
          )
          localStorage.setItem('gpe_gameBookmarks', JSON.stringify(games))
        } else {
          $(`#${id}`).querySelector(
            'span'
          ).textContent = `Error while retrieving game: ${responseText}`
        }
      }
      xhr.send()
    } else if (id.length === 10)
      result.push(
        `<p class="well${extraClass}" id="${id}"><a href="${games[id].url}">${games[id].title}</a>${removeButtonHTML}</p>`
      ) // game ID
  }
  $('#anbt_userpage').innerHTML = result.length
    ? result.join('')
    : "You don't have any bookmarked games."
  $('#anbt_userpage .anbt_gamedel', true).forEach(gameDelete =>
    gameDelete.addEventListener('click', event => {
      event.preventDefault()
      const { id } = gameDelete.parentNode
      fadeOut($(`#${id}`))
      delete games[id]
      localStorage.setItem('gpe_gameBookmarks', JSON.stringify(games))
    })
  )
}

export default viewMyGameBookmarks
