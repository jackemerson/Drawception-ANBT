const addStyle = css => {
  const parent =
    document.getElementsByTagName('head')[0] || document.documentElement
  const style = document.createElement('style')
  style.type = 'text/css'
  style.appendChild(document.createTextNode(css))
  parent.appendChild(style)
}

export default addStyle
