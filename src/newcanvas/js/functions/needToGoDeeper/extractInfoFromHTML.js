const extractInfoFromHTML = html => {
  const doc = document.implementation.createHTMLDocument('')
  doc.body.innerHTML = html
  const drawapp = doc.querySelector('draw-app') ||
    doc.querySelector('describe') || {
      getAttribute: () => false
    }
  const getElement = query => doc.querySelector(query)
  return {
    error: (element => (element ? element.src : false))(getElement('.error')),
    gameid: drawapp.getAttribute('game_token'),
    blitz: drawapp.getAttribute(':blitz_mode') === 'true',
    nsfw: drawapp.getAttribute(':nsfw') === 'true',
    friend: drawapp.getAttribute(':game_public') !== 'true',
    drawfirst: drawapp.getAttribute(':draw_first') === 'true',
    timeleft: drawapp.getAttribute(':seconds') * 1,
    caption: drawapp.getAttribute('phrase'),
    image: drawapp.getAttribute('img_url'),
    palette: drawapp.getAttribute('theme_id'),
    bgbutton: drawapp.getAttribute(':bg_layer') === 'true',
    playerurl: '/profile/',
    avatar: null,
    coins: '-',
    pubgames: '-',
    friendgames: '-',
    notifications: '-',
    drawinglink: (element => (element ? element.src : false))(
      getElement('.gamepanel img')
    ),
    drawingbylink: (element =>
      element ? [element.textContent.trim(), element.href] : false)(
      getElement('#main p a')
    ),
    drawncaption: (element => (element ? element.src : false))(
      getElement('h1.game-title')
    ),
    notloggedin: getElement('form.form-login') !== null,
    limitreached: false, // ??? appears to be redirecting to /play/limit/ which gives "game not found" error
    html
  }
}

export default extractInfoFromHTML
