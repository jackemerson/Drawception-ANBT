import pageEnhancements from './functions/pageEnhancements'
import options from './options'

const wrapper = () => {
  window.options = options
  const mark = document.createElement('b')
  mark.id = '_anbt_'
  mark.style.display = 'none'
  document.body.appendChild(mark)

  if (!window.DrawceptionPlay) {
    // Fix for Chrome new loading algorithm, apparently
    const loader = setInterval(() => {
      if (!window.DrawceptionPlay) return
      pageEnhancements()
      clearInterval(loader)
    }, 100)
  } else pageEnhancements()
}

export default wrapper
