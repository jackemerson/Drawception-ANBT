export function getLocalStorageItem(name, empty) {
  const item = localStorage.getItem(name)
  try {
    return item ? JSON.parse(item) : empty || ''
  } catch (e) {
    return item ? item : empty || ''
  }
}
