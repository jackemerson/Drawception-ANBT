import anbt from '../../anbt';

const drawDispLinePresto = first => {
  if (first) anbt.svgDisp.insertBefore(anbt.path, anbt.svgDisp.firstChild)
}

export default drawDispLinePresto
