export function $(selector, array = false) {
  const elements = selector.startsWith('<')
    ? [...new DOMParser().parseFromString(selector, 'text/html').body.children]
    : [...document.querySelectorAll(selector)]
  return elements.length > 1 || array ? elements : elements[0]
}
