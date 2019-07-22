const getCookie = name =>
  document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))[2] || null

export default getCookie
