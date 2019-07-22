import randomBase from './randomBase'

const randomPhrase = () => {
  const s = randomBase()
  return s.charAt(0).toUpperCase() + s.substr(1)
}

export default randomPhrase
