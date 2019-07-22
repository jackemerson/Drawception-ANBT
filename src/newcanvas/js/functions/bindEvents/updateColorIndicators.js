import anbt from '../../anbt';
import ID from '../idSelector';

const updateColorIndicators = () => {
  const { colors } = anbt
  ;['primary', 'secondary'].forEach((id, index) => {
    if (colors[index] === 'eraser') {
      ID(id).style.backgroundColor = 'pink'
      ID(id).classList.add('eraser')
    } else {
      ID(id).style.backgroundColor = colors[index]
      ID(id).classList.remove('eraser')
    }
  })
}

export default updateColorIndicators
