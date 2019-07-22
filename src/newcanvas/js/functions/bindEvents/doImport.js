import fromLocalFile from '../anbt/fromLocalFile'
import ID from '../idSelector'

const doImport = event => {
  event.preventDefault()
  ID('svgContainer').classList.add('loading')
  fromLocalFile()
  ID('svgContainer').classList.remove('loading')
}

export default doImport
