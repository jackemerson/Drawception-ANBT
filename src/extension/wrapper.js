import { pageEnhancements } from './functions/pageEnhancements'
import { options } from './options'

export function wrapper() {
  window.options = options
  const mark = document.createElement('b')
  mark.id = '_anbt_'
  mark.style.display = 'none'
  document.body.appendChild(mark)
  if (window.DrawceptionPlay) return pageEnhancements()
  // Fix for Chrome new loading algorithm, apparently
  const loader = setInterval(() => {
    if (!window.DrawceptionPlay) return
    pageEnhancements()
    clearInterval(loader)
  }, 100)
}
