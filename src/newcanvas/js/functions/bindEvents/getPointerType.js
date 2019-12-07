import { ID } from '../idSelector'

export function getPointerType() {
  return ID('wacom') && ID('wacom').penAPI && ID('wacom').penAPI.isWacom
    ? ID('wacom').penAPI.pointerType
    : 0
}
