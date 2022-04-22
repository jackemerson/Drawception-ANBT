import { anbt } from '../../anbt'
import { moveCursor } from './moveCursor'
import { ID } from '../idSelector'
import { globals } from '../../globals'

export function setSize(size) {
  anbt.size = size;

  const element = ID('tools').querySelector('.sel');
  if (element) element.classList.remove('sel');

  const index = globals.brushSizes.indexOf(size);
  ID(`brush${index}`)?.classList.add('sel');

  moveCursor()
}
