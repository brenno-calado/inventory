import { useSphere } from '@react-three/cannon'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import PropTypes from 'prop-types'

export const Wobble = ({ position, size, scale }) => {
  const [ref] = useSphere(() => ({ mass: 100, position }))
  return (
    <mesh ref={ref}>
      <Sphere args={size} scale={scale}>
        <MeshDistortMaterial
          color="indianred"
          attach="material"
          distort={0.4}
          speed={1}
          roughness={0.7}
        />
      </Sphere>
    </mesh>
  )
}

Wobble.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  size: PropTypes.arrayOf(PropTypes.number),
  scale: PropTypes.number,
}
