export function createSvgElement(name, attributs) {
  const element = document.createElementNS('http://www.w3.org/2000/svg', name)
  if (attributs) {
    Object.keys(attributs).forEach(attribut => {
      if (attributs[attribut])
        element.setAttribute(attribut, attributs[attribut])
    })
  }
  return element
}
