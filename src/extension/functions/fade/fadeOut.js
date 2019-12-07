export function fadeOut(element, duration = 400) {
  duration = duration === 'slow' ? 600 : duration
  element.style.opacity = element.style.opacity
    ? parseFloat(element.style.opacity) - 0.1
    : 1
  if (parseFloat(element.style.opacity) < 0) {
    element.style.opacity = 0
    element.style.display = 'none'
  } else {
    setTimeout(() => {
      fadeOut(element, duration)
    }, duration / 10)
  }
}
