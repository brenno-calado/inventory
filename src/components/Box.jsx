import { useBox } from '@react-three/cannon'
import PropTypes from 'prop-types'
import React from 'react'

export const Box = ({ position, size }) => {
  const [ref] = useBox(() => ({ mass: 1, position }))

  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={size} />
      <meshLambertMaterial attach="material" color="coral" />
    </mesh>
  )
}

Box.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  size: PropTypes.arrayOf(PropTypes.number),
}
