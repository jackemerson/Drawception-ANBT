import getLocalStorageItem from '../getLocalStorageItem'

const loadScriptSettings = () => {
  const result = getLocalStorageItem('gpe_anbtSettings', null)
  if (!result) return
  for (const i in result) window.options[i] = result[i]
}

export default loadScriptSettings
