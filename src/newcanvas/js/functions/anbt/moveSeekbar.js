import anbt from '../../anbt'

const moveSeekbar = position => {
  if (anbt.seekbarMove) anbt.seekbarMove(position)
}

export default moveSeekbar
