import getLocalStorageItem from '../getLocalStorageItem'

const setDarkMode = () => {
  const settings = getLocalStorageItem('gpe_anbtSettings', {})
  if (settings.anbtDarkMode || typeof settings.anbtDarkMode === 'undefined') {
    if (getLocalStorageItem('gpe_inDark', 0)) {
      const css = document.createElement('style')
      css.id = 'darkgraycss'
      css.type = 'text/css'
      css.appendChild(
        document.createTextNode(getLocalStorageItem('gpe_darkCSS'))
      )
      if (document.head) document.head.appendChild(css)
      else {
        const darkLoad = setInterval(() => {
          if (!document.head) return
          document.head.appendChild(css)
          clearInterval(darkLoad)
        }, 100)
      }
    }
  }
}

export default setDarkMode
