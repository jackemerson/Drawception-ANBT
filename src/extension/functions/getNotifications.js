import $ from './selector'

const getNotifications = () => {
  if (!window.notificationsOpened) {
    $('#user-notify-list').innerHTML =
      '<img src="/img/loading.gif" alt="Loading...."/>'
    const request = new XMLHttpRequest()
    request.open('GET', '/notification/view/')
    request.onload = () => {
      if (request.status === 200) $('#user-notify-count').textContent = '0'
      $('#user-notify-list').innerHTML = request.responseText
      window.notificationsOpened = true
    }
  }
}

export default getNotifications
