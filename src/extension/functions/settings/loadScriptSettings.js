import getLocalStorageItem from '../getLocalStorageItem'

const loadScriptSettings = () => {
  const localOptions = getLocalStorageItem('gpe_anbtSettings', null)
  if (!localOptions) return
  for (const option in localOptions)
    window.options[option] = localOptions[option]
}

export default loadScriptSettings
