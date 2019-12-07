import { options } from '../../options'
import { setCookie } from '../cookie/setCookie'
import { getLocalStorageItem } from '../getLocalStorageItem'

export function toggleLight() {
  if (options.anbtDarkMode) {
    const inDark = getLocalStorageItem('gpe_inDark', 0)
    if (!inDark) {
      const css = document.createElement('style')
      css.id = 'darkgraycss'
      css.type = 'text/css'
      css.appendChild(
        document.createTextNode(getLocalStorageItem('gpe_darkCSS'))
      )
      document.head.appendChild(css)
    } else {
      document.head.removeChild(document.getElementById('darkgraycss'))
    }
    localStorage.setItem('gpe_inDark', `${inDark ? 0 : 1}`)
  } else {
    if (document.body.classList.contains('theme-night')) {
      document.body.classList.remove('theme-night')
      setCookie('theme-night')
    } else {
      document.body.classList.add('theme-night')
      setCookie('theme-night', 1, 365)
    }
  }
}
