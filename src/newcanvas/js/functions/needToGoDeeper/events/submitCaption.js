import ID from '../../idSelector'
import ajax from '../ajax'
import onCaptionSuccess from '../onCaptionSuccess'

const submitCaption = () => {
  const { incontest, gameInfo } = window
  const title = ID('caption').value
  if (!title) {
    ID('caption').focus()
    return alert("You haven't entered a caption!")
  }
  window.submitting = true
  ID('submitcaption').disabled = true
  const url = incontest
    ? '/contests/submit-caption.json'
    : '/play/describe.json'
  ajax('POST', url, {
    obj: {
      game_token: gameInfo.gameid,
      title
    },
    load: response => {
      try {
        response = JSON.parse(response)
      } catch (e) {
        response = {
          error: response
        }
      }
      if (response.error) {
        ID('submitcaption').disabled = false
        if (typeof response.error === 'object')
          alert(
            `Error! Please report this data:\ngame: ${
              gameInfo.gameid
            }\n\nresponse: \n${JSON.stringify(response.error)}`
          )
        else alert(response.error)
      } else if (response.message) {
        ID('submitcaption').disabled = false
        alert(response.message)
      } else if (response.url) {
        onCaptionSuccess(title)
        location.replace(response.url)
      }
    },
    error: () => {
      ID('submitcaption').disabled = false
      alert('Server error. :( Try again?')
    }
  })
}

export default submitCaption
