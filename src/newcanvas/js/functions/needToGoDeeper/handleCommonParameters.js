import { ID } from '../idSelector'

export function handleCommonParameters() {
  const { gameInfo, inForum } = window
  if (gameInfo.notLoggedIn) {
    return (ID('start').parentNode.innerHTML =
      '<a href="/login" class="headerbutton active">Login</a> <a href="/register" class="headerbutton active">Register</a>')
  }
  if (gameInfo.avatar) ID('infoavatar').src = gameInfo.avatar
  ID('infoprofile').href = gameInfo.playerUrl
  ID('infocoins').innerHTML = gameInfo.coins
  ID('infogames').innerHTML = gameInfo.publicGames
  ID('infofriendgames').innerHTML = gameInfo.friendGames || 0
  ID('infonotifications').innerHTML = gameInfo.notifications
  if (inForum) document.querySelector('.headerright').hidden = true
}
