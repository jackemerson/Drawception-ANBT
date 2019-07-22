import globals from '../../globals';
import setBackground from '../anbt/setBackground';
import setColor from '../anbt/setColor';
import getPointerType from './getPointerType';
import updateChooseBackground from './updateChooseBackground';
import updateColorIndicators from './updateColorIndicators';

const colorClick = event => {
  if (event.touches || event.button === 0 || event.button === 2) {
    event.preventDefault()
    const colorButton = event.currentTarget
    let color = colorButton.style.backgroundColor
    if (globals.chooseBackground) {
      if (colorButton.id !== 'eraser') setBackground(color)
      updateChooseBackground(false)
    } else {
      if (colorButton.id === 'eraser') color = 'eraser'
      // PointerType == 3 is pen tablet eraser
      if (event.button === 2 || getPointerType() === 3) setColor(1, color)
      else setColor(0, color)
      updateColorIndicators()
    }
  }
}

export default colorClick
