import { usePlane } from '@react-three/cannon'
import PropTypes from 'prop-types'
import React from 'react'

export const Plane = ({ position, rotation, size }) => {
  const [ref] = usePlane(() => ({ rotation, position }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={size} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  )
}

Plane.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  size: PropTypes.arrayOf(PropTypes.number),
}
