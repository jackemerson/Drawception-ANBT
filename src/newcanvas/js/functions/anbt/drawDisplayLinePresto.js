import anbt from '../../anbt';

const drawDisplayLinePresto = first => {
  if (first) anbt.svgDisplay.insertBefore(anbt.path, anbt.svgDisplay.firstChild)
}

export default drawDisplayLinePresto
