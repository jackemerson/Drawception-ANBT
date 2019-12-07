export function setCookie(name, value, expire) {
  if (expire) {
    const time = new Date()
    time.setTime(time.getTime() + 24 * expire * 60 * 60 * 1e3)
    expire = time.toUTCString()
  }
  document.cookie = `${name}=${value ? JSON.stringify(value) : ''}; expires=${
    expire ? expire : 'Thu, 01 Jan 1970 00:00:00 UTC'
  }; path=/`
}
