import { fromLocalFile } from '../anbt/fromLocalFile'
import { ID } from '../idSelector'

export function doImport(event) {
  event.preventDefault()
  ID('svgContainer').classList.add('loading')
  fromLocalFile()
  ID('svgContainer').classList.remove('loading')
}
