import { useBox } from '@react-three/cannon';
import PropTypes from 'prop-types';

export const Box = ({ position, size, setHover, item, nearObject, setNearObject }) => {
  const [ref] = useBox(() => ({ type: 'Dynamic', mass: 1, position }))

  return (
    <>
    <mesh
      castShadow
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation();
        setHover(Math.floor(e.faceIndex / 2));
        setNearObject(item)
      }}
      onPointerOut={() => {
        setHover(null);
        setNearObject(null)
      }}
    >
      
      <boxBufferGeometry attach="geometry" args={size} />
      <meshLambertMaterial attach="material" color={ nearObject === item ? "white" : "coral"} />
      </mesh>
      </>
  )
}

const itemShape = PropTypes.shape({
  id: PropTypes.number,
  amount: PropTypes.number,
  name: PropTypes.string,
  size: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number
  }),
  validHours: PropTypes.number,
  weight: PropTypes.number,
})

Box.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number),
  rotation: PropTypes.arrayOf(PropTypes.number),
  size: PropTypes.arrayOf(PropTypes.number),
  setHover: PropTypes.func,
  setNearObject: PropTypes.func,
  item: itemShape,
  nearObject: itemShape,
}
