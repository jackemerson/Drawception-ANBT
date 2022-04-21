import { anbt } from '../../anbt'
import { moveCursor } from './moveCursor'
import { resetIncrement } from '../bindEvents/changeBrushSize';

export function setSize(size) {
  anbt.size = size
  resetIncrement();
  moveCursor()
}
