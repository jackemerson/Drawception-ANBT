import globals from '../globals'
import rot13 from './rot13'
import simpleHash from './simpleHash'

const randomGreeting = () => {
  const change_every_half_day = Math.floor(Date.now() / (1000 * 60 * 60 * 12))
  const rnddata = simpleHash(
    change_every_half_day + parseInt(globals.userid, 10) + 178889
  )
  return rot13(globals.greetings[rnddata % globals.greetings.length])
}

export default randomGreeting
