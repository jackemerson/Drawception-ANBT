import anbt from '../../anbt'
import globals from '../../globals'
import palettes from '../../palettes'
import lock from '../anbt/lock'
import moveSeekbar from '../anbt/moveSeekbar'
import seek from '../anbt/seek'
import setBackground from '../anbt/setBackground'
import strokeEnd from '../anbt/strokeEnd'
import unlock from '../anbt/unlock'
import setPaletteByName from '../bindEvents/palette/setPaletteByName'
import updateColorIndicators from '../bindEvents/updateColorIndicators'
import ID from '../idSelector'
import updateTimer from '../updateTimer'
import exitToSandbox from './exitToSandbox'
import getPalData from './getPalData'
import handleCommonParameters from './handleCommonParameters'
import timerCallback from './timerCallback'

const handlePlayParameters = () => {
  const { options, gameInfo, incontest, vertitle } = window
  ID('skip').disabled = gameInfo.drawfirst || incontest
  ID('report').disabled = gameInfo.drawfirst || incontest
  ID('exit').disabled = false
  ID('start').disabled = false
  ID('bookmark').disabled = gameInfo.drawfirst || incontest
  ID('options').disabled = true // Not implemented yet!
  ID('timeplus').disabled = incontest
  ID('submit').disabled = false
  ID('headerinfo').innerHTML = `Playing with ${vertitle}`
  ID('drawthis').classList.add('onlyplay')
  ID('emptytitle').classList.remove('onlyplay')
  window.submitting = false
  window.drawing_aborted = false
  if (gameInfo.error) {
    alert(`Play Error:\n${gameInfo.error}`)
    return exitToSandbox()
  }
  if (gameInfo.limitreached) {
    alert('Play limit reached!')
    return exitToSandbox()
  }
  ID('gamemode').innerHTML = incontest
    ? 'Contest'
    : `${(gameInfo.friend ? 'Friend ' : 'Public ') +
        (gameInfo.nsfw ? 'Not Safe For Work (18+) ' : 'safe for work ') +
        (gameInfo.blitz ? 'BLITZ ' : '')}Game`
  ID('drawthis').innerHTML =
    gameInfo.caption || (gameInfo.drawfirst && '(Start your game!)') || ''
  ID('tocaption').src = ''
  const newcanvas = ID('newcanvasyo')
  newcanvas.className = 'play'
  if (gameInfo.friend) newcanvas.classList.add('friend')
  ID('palettechooser').className = gameInfo.friend ? '' : 'onlysandbox'
  if (gameInfo.nsfw) newcanvas.classList.add('nsfw')
  if (gameInfo.blitz) newcanvas.classList.add('blitz')
  newcanvas.classList.add(gameInfo.image ? 'captioning' : 'drawing')
  // Clear
  if (anbt.isStroking) strokeEnd()
  unlock()
  for (let i = anbt.svg.childNodes.length - 1; i > 0; i--)
    anbt.svg.removeChild(anbt.svg.childNodes[i])
  seek(0)
  moveSeekbar(1)
  anbt.unsaved = false
  const { palette } = gameInfo
  if (!gameInfo.image) {
    const paletteData = getPalData(palette)
    if (!paletteData) {
      if (!palette)
        alert(
          'Error, please report! Failed to extract the palette.\nAre you using the latest ANBT version?'
        )
      else
        alert(
          `Error, please report! Unknown palette: '${palette}'.\nAre you using the latest ANBT version?`
        )
      // Prevent from drawing with a wrong palette
      lock
      ID('submit').disabled = true
    } else {
      setPaletteByName(paletteData[0])
      setBackground(paletteData[1])
      anbt.color = [palettes[paletteData[0]][0], 'eraser']
      updateColorIndicators()
    }
    ID('setbackground').hidden = !gameInfo.bgbutton
  } else {
    // Check broken drawing
    ID('tocaption').src =
      gameInfo.image.length <= 30
        ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAD6AQMAAAAho+iwAAAABlBMVEWAQED///94jotxAAABiklEQVR4Xu3W0UrCUBjA8eOO5CLK7VxLzDWFrjK6Eaha8FHuppfwBRJvdjlMIK/K3qA3OZBBd/UIm9UL2O2inMJBptNuog/6/h4Q2Y8J387Y2KIoiqIoiqIoiuIxXnbI5cmXSiJjD3LmFyrGY46PqVAx/HPDv9/w3wsJTTgapuDkcEIQMFxzo937S8+F5OkWI2IKymQl3yiZ6j8zYsRY6vUYDcOfGkuMknE5/aQAMczX9O+iKIrKJWuSxliQqT61hOmMucsYK6uzLWfDenF34EXhOX+s377KLCZcs1bxhNXQqnAvrExWM8vvY3amORCNsplu2nZPWKdj1tecTHZZLA97ZnjBB/XrkWIZWT+bsmTowp+7FHSnyMi7CpuMrWcwNsMMxnJzrCUbwwq/2/MLJb8lP4L2zVHJ35Bp1rE8Uc2bALoNHQvcoNG3Yf5Pm6EnHG50Ye0YmiG4V08LmWD7wmF9gJwFgoHbnZzNSDE/Co3orSB2YGsbovAgaD9vlkB/WbkbdQVWMNxR1Ddnf4eSZpHZYAAAAABJRU5ErkJggg=='
        : gameInfo.image
    ID('caption').value = ''
    ID('caption').focus()
    ID('caption').setAttribute('maxlength', 45)
    ID('usedchars').textContent = '45'
  }
  if (
    (options.timeoutSound && !gameInfo.blitz) ||
    (options.timeoutSoundBlitz && gameInfo.blitz)
  ) {
    window.playedWarningSound = false
    window.alarm = new Audio(window.alarmSoundOgg)
    window.alarm.volume = options.timeoutSoundVolume / 100
  }
  globals.timerStart = Date.now() + 1000 * gameInfo.timeleft
  window.timerCallback = timerCallback
  handleCommonParameters()
  window.timesup = false
  updateTimer()
}

export default handlePlayParameters
