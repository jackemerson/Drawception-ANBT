import { getLocalStorageItem } from '../getLocalStorageItem'

export function setDarkMode() {
  const settings = getLocalStorageItem('gpe_anbtSettings', {})
  if (settings.anbtDarkMode || typeof settings.anbtDarkMode === 'undefined') {
    if (getLocalStorageItem('gpe_inDark', 0)) {
      const css = document.createElement('style')
      css.id = 'darkgraycss'
      css.type = 'text/css'
      css.appendChild(
        document.createTextNode(getLocalStorageItem('gpe_darkCSS'))
      )
      const darkLoad = setInterval(() => {
        if (!document.head) return
        document.head.appendChild(css)
        clearInterval(darkLoad)
      }, 100)
    }
  }
}
