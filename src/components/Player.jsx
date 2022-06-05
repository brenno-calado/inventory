import { useSphere } from '@react-three/cannon'
import { Sphere } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { FPVControls } from './FPVControls'

const SPEED = 6

export const Player = ({ viewInventory, ...props }) => {
  const { camera } = useThree()
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboardControls()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    ...props,
  }))

  const velocity = useRef([0, 0, 0])

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
    api.position.subscribe((v) => camera.position.set(v[0], v[1], v[2]))
  }, [])

  useFrame(() => {
    const direction = new Vector3()
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    )
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    )

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation)

    api.velocity.set(direction.x, velocity.current[1], direction.z)

    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 8, velocity.current[2])
    }
  })

  return (
    <>
      <FPVControls viewInventory={viewInventory} />
      <mesh ref={ref}>
        <Sphere args={[1, 100, 100]} scale={1}>
          <meshBasicMaterial color="indianred" attach="material" />
        </Sphere>
      </mesh>
    </>
  )
}

Player.propTypes = {
  viewInventory: PropTypes.bool,
}
