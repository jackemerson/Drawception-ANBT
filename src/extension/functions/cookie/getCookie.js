export function getCookie(name) {
  const cookie = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))[2]
  return cookie || null
}
