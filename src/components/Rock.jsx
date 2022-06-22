import PropTypes from 'prop-types'

export const Rock = ({ position, rotation, size }) => {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry attach="geometry" args={size} />
      <meshLambertMaterial attach="material" color="darkgray" />
    </mesh>
  )
}

Rock.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  size: PropTypes.arrayOf(PropTypes.number),
}
