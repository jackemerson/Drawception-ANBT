import $ from './selector'

const getNotifications = () => {
  if (!window.notificationsOpened) {
    $('#user-notify-list').innerHTML =
      '<img src="/img/loading.gif" alt="Loading...."/>'
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/notification/view/')
    xhr.onload = () => {
      if (xhr.status === 200) {
        $('#user-notify-list').innerHTML = xhr.responseText
        $('#user-notify-count').textContent = '0'
        window.notificationsOpened = true
      } else {
        $('#user-notify-list').innerHTML = xhr.responseText
        window.notificationsOpened = true
      }
    }
  }
}

export default getNotifications
