const extractInfoFromHTML = html => {
  const doc = document.implementation.createHTMLDocument('')
  doc.body.innerHTML = html
  const drawapp = doc.querySelector('draw-app-svg') ||
    doc.querySelector('describe') || {
      getAttribute: () => false
    }
  const getElement = query => doc.querySelector(query)
  return {
    error: (element => (element ? element.src : false))(getElement('.error')),
    gameId: drawapp.getAttribute('game_token'),
    blitz: drawapp.getAttribute(':blitz_mode') === 'true',
    nsfw: drawapp.getAttribute(':nsfw') === 'true',
    friend: drawapp.getAttribute(':game_public') !== 'true',
    drawFirst: drawapp.getAttribute(':draw_first') === 'true',
    timeLeft: parseInt(drawapp.getAttribute(':seconds'), 10),
    caption: drawapp.getAttribute('phrase'),
    image: drawapp.getAttribute('img_url'),
    palette: drawapp.getAttribute('theme_id'),
    backgroundButton: drawapp.getAttribute(':bg_layer') === 'true',
    playerUrl: '/profile/',
    avatar: null,
    coins: '-',
    publicGames: '-',
    friendGames: '-',
    notifications: '-',
    drawingLink: (element => (element ? element.src : false))(
      getElement('.gamepanel img')
    ),
    drawingByLink: (element =>
      element ? [element.textContent.trim(), element.href] : false)(
      getElement('#main p a')
    ),
    drawnCaption: (element => (element ? element.src : false))(
      getElement('h1.game-title')
    ),
    notLoggedIn: getElement('form.form-login') !== null,
    limitReached: false, // ??? appears to be redirecting to /play/limit/ which gives "game not found" error
    html
  }
}

export default extractInfoFromHTML
