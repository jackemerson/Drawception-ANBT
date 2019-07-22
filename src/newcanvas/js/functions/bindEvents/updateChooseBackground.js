import globals from '../../globals';
import ID from '../idSelector';

const updateChooseBackground = chooseBackground => {
  globals.chooseBackground = chooseBackground
  if (chooseBackground) {
    ID('colors').classList.add('setbackground')
    ID('setbackground').classList.add('sel')
  } else {
    ID('colors').classList.remove('setbackground')
    ID('setbackground').classList.remove('sel')
  }
}

export default updateChooseBackground
