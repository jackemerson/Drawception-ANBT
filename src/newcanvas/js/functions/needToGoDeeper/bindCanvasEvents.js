import { ID } from '../idSelector'
import { backToForum } from './events/backToForum'
import { bookmark } from './events/bookmark'
import { caption } from './events/caption'
import { exit } from './events/exit'
import { quit } from './events/quit'
import { report } from './events/report'
import { skip } from './events/skip'
import { start } from './events/start'
import { submitCaption } from './events/submitCaption'
import { submitDrawing } from './events/submitDrawing'
import { timePlus } from './events/timePlus'
import { updateUsedChars } from './events/updateUsedChars'

export function bindCanvasEvents() {
  const { options, inForum } = window
  if (inForum) {
    ID('quit').addEventListener('click', quit)
    const backForum = document.createElement('button')
    backForum.href = '/'
    backForum.setAttribute('class', 'submit exit')
    backForum.title = 'Exit'
    backForum.textContent = 'Exit'
    backForum.addEventListener('click', backToForum)
    ID('submit').parentNode.insertBefore(backForum, ID('submit').nextSibling)
  }
  ID('exit').addEventListener('click', exit)
  ID('skip').addEventListener('click', skip)
  ID('start').addEventListener('click', start)
  ID('report').addEventListener('click', report)
  ID('bookmark').addEventListener('click', bookmark)
  ID('submit').addEventListener('click', submitDrawing)
  ID('submitcaption').addEventListener('click', submitCaption)
  if (options.enterToCaption) ID('caption').addEventListener('keydown', caption)
  ID('caption').addEventListener('change', updateUsedChars)
  ID('caption').addEventListener('keydown', updateUsedChars)
  ID('caption').addEventListener('input', updateUsedChars)
  ID('timeplus').addEventListener('click', timePlus)
}
