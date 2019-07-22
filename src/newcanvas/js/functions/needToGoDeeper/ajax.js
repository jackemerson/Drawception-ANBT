const ajax = (type, url, params) => {
  const { options } = window
  const request = new XMLHttpRequest()
  request.open(type, url)
  if (params.header)
    request.setRequestHeader(params.header[0], params.header[1])
  params.retry = 5
  request.timeout = 15000
  request.ontimeout = () => {
    if (params.retry > 0) {
      if (!options.retryEnabled) return
      document.body.style.cursor = 'progress'
      params.retry--
      ajax(type, url, params)
    } else {
      document.body.style.cursor = ''
      params.error()
    }
  }
  request.onload = () => {
    if (
      url === '/play/skip.json' &&
      request.error === 'Sorry, but we couldn\u0027t find your current game.'
    ) {
      location.reload()
      return
    }
    if (
      url === '/play/exit.json' &&
      request.error === 'Sorry, but we couldn\u0027t find your current game.'
    ) {
      location.pathname = '/'
      return
    }
    params.load(request.responseText)
  }
  request.onerror = () => {
    if (params.error) params.error(request)
    else params.load(request)
  }
  if (params.obj) request.send(JSON.stringify(params.obj))
  else request.send()
  document.body.style.cursor = ''
  return
}

export default ajax
