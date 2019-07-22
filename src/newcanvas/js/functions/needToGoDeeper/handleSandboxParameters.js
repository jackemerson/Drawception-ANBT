import play from '../anbt/play'
import ID from '../idSelector'
import handleCommonParameters from './handleCommonParameters'

const handleSandboxParameters = () => {
  const { gameInfo, vertitle, options } = window
  if (gameInfo.drawingbylink) {
    const [playername, playerlink] = gameInfo.drawingbylink
    const replaylink = `<a href="http://grompe.org.ru/drawit/#drawception/${location.hash.substr(
      1
    )}" title="Public replay link for sharing">Drawing</a>`
    ID(
      'headerinfo'
    ).innerHTML = `${replaylink} by <a href="${playerlink}">${playername}</a>`
    document.title = `${playername}'s drawing - Drawception`
    if (gameInfo.drawncaption) {
      ID('drawthis').innerHTML = `"${gameInfo.drawncaption}"`
      ID('drawthis').classList.remove('onlyplay')
      ID('emptytitle').classList.add('onlyplay')
    }
    if (options.autoplay) play()
  } else {
    ID('headerinfo').innerHTML = `Sandbox with ${vertitle}`
    ID('drawthis').classList.add('onlyplay')
  }
  handleCommonParameters()
}

export default handleSandboxParameters
