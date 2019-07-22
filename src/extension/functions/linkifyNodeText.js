const linkifyNodeText = node => {
  if (node.textContent.includes('://'))
    node.innerHTML = node.innerHTML.replace(
      /([^"]|^)(https?:\/\/(?:(?:(?:[^\s<()]*\([^\s<()]*\))+)|(?:[^\s<()]+)))/g,
      '$1<a href="$2">$2</a>'
    )
}

export default linkifyNodeText
