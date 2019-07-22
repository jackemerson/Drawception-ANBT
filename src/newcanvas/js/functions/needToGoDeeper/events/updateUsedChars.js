import ID from '../../idSelector'

const updateUsedChars = () => {
  ID('usedchars').textContent = 45 - ID('caption').value.length
}

export default updateUsedChars
