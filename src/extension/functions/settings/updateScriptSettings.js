import fadeIn from '../fade/fadeIn'
import fadeOut from '../fade/fadeOut'
import $ from '../selector'
import loadScriptSettings from './loadScriptSettings'

const updateScriptSettings = ({ currentTarget: theForm }) => {
  const result = {}
  theForm.querySelectorAll('input,textarea').forEach(fromField => {
    if (fromField.type === 'checkbox')
      result[fromField.name] = fromField.checked ? 1 : 0
    else if (fromField.getAttribute('data-subtype') === 'number')
      result[fromField.name] = parseFloat(fromField.value) || 0
    else result[fromField.name] = fromField.value
  })
  localStorage.setItem('gpe_anbtSettings', JSON.stringify(result))
  loadScriptSettings()
  fadeIn($('#anbtSettingsOK'), 'slow')
  setTimeout(() => {
    fadeOut($('#anbtSettingsOK'), 'slow')
  }, 800)
}

export default updateScriptSettings
