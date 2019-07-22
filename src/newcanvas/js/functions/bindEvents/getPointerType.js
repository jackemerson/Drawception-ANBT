import ID from '../idSelector';

const getPointerType = () =>
  ID('wacom') && ID('wacom').penAPI && ID('wacom').penAPI.isWacom
    ? ID('wacom').penAPI.pointerType
    : 0

export default getPointerType
