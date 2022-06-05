import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import PropTypes from 'prop-types'
import React from 'react'
import { Box, Plane, Rock, Wall, Wobble } from './index'
import { Player } from './Player'

const Environment = ({ viewInventory }) => {
  return (
    <Canvas>
      <Sky sunPosition={[20, 200, 30]} />
      <ambientLight intensity={0.4} />
      <pointLight castShadow intensity={0.6} position={[100, 100, 100]} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <Physics gravity={[0, -10, 0]}>
        <Player position={[0, 2, 10]} viewInventory={viewInventory} />
        <Rock
          position={[-5.5, -0.8, -3]}
          rotation={[90, 0, 20]}
          size={[3, 3, 3]}
        />
        <Box position={[-3, 1, -1]} size={[0.5, 0.5, 0.5]} />
        <Wall position={[0, 0, -12]} rotation={[0, 0, 0]} size={[25, 25]} />
        <Wall position={[-12, 0, 0]} rotation={[0, 1.5, 0]} size={[25, 25]} />
        <Wall position={[12, 0, 0]} rotation={[0, 1.5, 0]} size={[25, 25]} />
        <Wall position={[0, 0, 12]} rotation={[0, 0, 0]} size={[25, 25]} />
        <Wobble position={[0, 10, 0]} scale={1} size={[1, 100, 100]} />
        <Plane position={[0, -1, 0]} rotation={[-1.58, 0, 0]} size={[25, 25]} />
      </Physics>
    </Canvas>
  )
}

Environment.propTypes = {
  viewInventory: PropTypes.bool,
}

export default Environment
