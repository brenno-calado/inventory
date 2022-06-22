import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import { Box, Plane, Rock, Wall, Wobble } from './index'
import { Player } from './Player'

const plusOrMinus = () => Math.sign(Math.random()-0.5);
const randPos = () => plusOrMinus() * (Math.random() * 12)

const Environment = ({ viewInventory, setHover, items, nearObject, setNearObject }) => {
  const isLocked = useRef(false);

  const Boxes = items.map((item) =>
    <Box
      key={item.id}
      position={[randPos(), 1, randPos()]}
      size={[item.size.width, item.size.height, item.size.length]}
      item={item}
      setHover={setHover}
      nearObject={nearObject}
      setNearObject={setNearObject}
    />
  )

  return (
    <Canvas
      raycaster={{
        computeOffsets: (_, { size: { width, height } }) => {
          if (isLocked.current) {
            return ({
              offsetX: width / 2,
              offsetY: height / 2
            })
          } else {
            return null;
          }
        }
      }}
    >
      <Sky sunPosition={[20, 200, 30]} />
      <ambientLight intensity={0.4} />
      <pointLight castShadow intensity={0.6} position={[100, 100, 100]} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <Physics gravity={[0, -10, 0]}>
        <Player position={[0, 2, 10]} isLocked={isLocked} viewInventory={viewInventory} />
        <Rock
          position={[-5.5, -0.8, -3]}
          rotation={[90, 0, 20]}
          size={[3, 3, 3]}
        />
        {Boxes}
        <Wall position={[0, 0, -12]} rotation={[0, 0, 0]} size={[25, 25]} />
        <Wall position={[-12, 0, 0]} rotation={[0, 1.5, 0]} size={[25, 25]} />
        <Wall position={[12, 0, 0]} rotation={[0, 1.5, 0]} size={[25, 25]} />
        <Wall position={[0, 0, 12]} rotation={[0, 0, 0]} size={[25, 25]} />
        <Wobble position={[0, 10, 0]} scale={1} size={[1, 100, 100]} />
        <Plane position={[0, 0, 0]} rotation={[-1.568, 0, 0]} size={[25, 25]} />
      </Physics>
    </Canvas>
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

Environment.propTypes = {
  viewInventory: PropTypes.bool,
  hover: PropTypes.number,
  setHover: PropTypes.func,
  setNearObject: PropTypes.func,
  nearObject: itemShape,
  items: PropTypes.arrayOf(itemShape)
}

export default Environment
