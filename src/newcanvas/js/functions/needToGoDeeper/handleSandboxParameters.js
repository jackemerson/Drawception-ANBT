import play from '../anbt/play'
import ID from '../idSelector'
import handleCommonParameters from './handleCommonParameters'

const handleSandboxParameters = () => {
  const { gameInfo, versionTitle, options } = window
  if (gameInfo.drawingByLink) {
    const [playerName, playerLink] = gameInfo.drawingByLink
    const replayLink = `<a href="http://grompe.org.ru/drawit/#drawception/${location.hash.substr(
      1
    )}" title="Public replay link for sharing">Drawing</a>`
    ID(
      'headerinfo'
    ).innerHTML = `${replayLink} by <a href="${playerLink}">${playerName}</a>`
    document.title = `${playerName}'s drawing - Drawception`
    if (gameInfo.drawnCaption) {
      ID('drawthis').innerHTML = `"${gameInfo.drawnCaption}"`
      ID('drawthis').classList.remove('onlyplay')
      ID('emptytitle').classList.add('onlyplay')
    }
    if (options.autoPlay) play()
  } else {
    ID('headerinfo').innerHTML = `Sandbox with ${versionTitle}`
    ID('drawthis').classList.add('onlyplay')
  }
  handleCommonParameters()
}

export default handleSandboxParameters
