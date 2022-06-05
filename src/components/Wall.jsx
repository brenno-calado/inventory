import PropTypes from 'prop-types'
import React from 'react'

export const Wall = ({ position, rotation, size }) => {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry attach="geometry" args={size} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

Wall.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  size: PropTypes.arrayOf(PropTypes.number),
}
