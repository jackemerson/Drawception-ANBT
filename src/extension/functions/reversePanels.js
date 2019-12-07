import { $ } from './selector'

export function reversePanels() {
  const element = $('.gamepanel-holder')[0].parentNode.parentNode
  ;[...element.childNodes]
    .reverse()
    .forEach(child => element.appendChild(child))
}
