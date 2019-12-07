import { globals } from '../globals'
import { ID } from './idSelector'

export function updateTimer() {
  let seconds = (globals.timerStart - Date.now()) / 1000
  try {
    if (window.timerCallback) window.timerCallback(seconds)
  } catch (e) {}
  seconds = Math.abs(seconds)
  const minutes = `0${Math.floor(seconds / 60)}`.slice(-2)
  seconds = `0${Math.floor(seconds % 60)}`.slice(-2)
  ID('timer').childNodes[0].nodeValue = `${minutes}:${seconds}`
}
