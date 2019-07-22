import decodeHTML from '../decodeHTML'
import ID from '../../idSelector'

const bookmark = () => {
  const { getLocalStorageItem } = window
  ID('bookmark').disabled = true
  const games = getLocalStorageItem('gpe_gameBookmarks', {})
  const caption = window.gameInfo.caption
  games[window.gameInfo.gameid] = {
    time: Date.now(),
    caption: caption ? decodeHTML(caption) : ''
  }
  localStorage.setItem('gpe_gameBookmarks', JSON.stringify(games))
}

export default bookmark
