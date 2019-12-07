export function fadeIn(element, duration = 400) {
  element.style.display = 'inline'
  duration = duration === 'slow' ? 600 : duration
  element.style.opacity = element.style.opacity
    ? parseFloat(element.style.opacity) + 0.1
    : 0.2
  if (parseFloat(element.style.opacity) > 1) {
    element.style.opacity = 1
  } else {
    setTimeout(() => {
      fadeIn(element, duration)
    }, duration / 10)
  }
}
