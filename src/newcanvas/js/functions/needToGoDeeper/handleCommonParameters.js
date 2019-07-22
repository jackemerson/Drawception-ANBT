import ID from '../idSelector'

const handleCommonParameters = () => {
  const { gameInfo, inforum } = window
  if (gameInfo.notloggedin)
    return (ID('start').parentNode.innerHTML =
      '<a href="/login" class="headerbutton active">Login</a> <a href="/register" class="headerbutton active">Register</a>')
  if (gameInfo.avatar) ID('infoavatar').src = gameInfo.avatar
  ID('infoprofile').href = gameInfo.playerurl
  ID('infocoins').innerHTML = gameInfo.coins
  ID('infogames').innerHTML = gameInfo.pubgames
  ID('infofriendgames').innerHTML = gameInfo.friendgames || 0
  ID('infonotifications').innerHTML = gameInfo.notifications
  if (inforum) document.querySelector('.headerright').hidden = true
}

export default handleCommonParameters
