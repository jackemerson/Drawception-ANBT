import options from '../../options'
import $ from '../selector'
import escapeHTML from './escapeHTML'

const addGroup = (name, settings) => {
  const controlGroup = $('<div class="control-group"></div>')
  controlGroup.appendChild($(`<label class="control-label">${name}</label>`))
  settings.forEach(setting => {
    const value = options[setting[0]]
    const [name, type, description] = setting
    const controls = $('<div class="controls"></div>')
    if (type === 'boolean') {
      controls.appendChild(
        $(
          `<label><input type="checkbox" id="anbt_${name}" name="${name}" value="1" ${
            value ? 'checked="checked"' : ''
          }"> ${description}</label>`
        )
      )
    } else if (type === 'number') {
      $(
        `<b>${description}:</b><input class="form-control" type="text" data-subtype="number" name="${name}" value="${escapeHTML(
          value || 0
        )}">`
      ).forEach(node => controls.appendChild(node))
    } else if (type === 'longstr') {
      $(
        `<b>${description}:</b><textarea class="form-control" name="${name}">${escapeHTML(
          value
        )}</textarea>`
      ).forEach(node => controls.appendChild(node))
    } else {
      $(
        `<b>${description}:</b><input class="form-control" type="text" name="${name}" value="${escapeHTML(
          value
        )}">`
      ).forEach(node => controls.appendChild(node))
    }
    controlGroup.appendChild(controls)
  })
  return controlGroup
}

export default addGroup
