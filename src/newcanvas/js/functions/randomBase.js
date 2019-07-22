import random from '../random'
import randomItem from './randomItem'

const randomBase = () => {
  const randomNumber = Math.floor(Math.random() * 3)
  return `${randomItem(random.description)} ${randomItem(random.things)}${
    randomNumber >= 1
      ? ` ${randomItem(random.acts)} ${
          randomNumber === 2 ? `${randomItem(random.description)} ` : ''
        }${randomItem(random.things)}`
      : ''
  }`
}

export default randomBase
