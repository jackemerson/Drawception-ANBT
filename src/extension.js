import addDarkCSS from './extension/functions/darkMode/addDarkCSS'
import setDarkMode from './extension/functions/darkMode/setDarkMode'
import getLocalStorageItem from './extension/functions/getLocalStorageItem'
import wrapper from './extension/wrapper'

addDarkCSS()
setDarkMode()
if (document && document.body) {
  if (!document.getElementById('_anbt_')) wrapper()
  if (window.opera && !getLocalStorageItem('gpe_operaWarning', 0)) {
    const anbtTitle = document.createElement('h2')
    anbtTitle.innerHTML =
      'ANBT speaking:<br/>Rename your script file so it doesn\'t contain ".user." part for smoother loading!<br/>This warning is only shown once.'
    const mainSection = document.getElementById('main')
    mainSection.insertBefore(anbtTitle, mainSection.firstChild)
    localStorage.setItem('gpe_operaWarning', 1)
  }
}
document.addEventListener(
  'DOMContentLoaded',
  () => {
    if (!document.getElementById('_anbt_')) wrapper()
  },
  false
)
