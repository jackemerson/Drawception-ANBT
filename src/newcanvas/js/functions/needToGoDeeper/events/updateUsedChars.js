import { ID } from '../../idSelector'

export function updateUsedChars() {
  ID('usedchars').textContent = 45 - ID('caption').value.length
}


