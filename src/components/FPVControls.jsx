import { extend, useThree } from '@react-three/fiber'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls'

extend({ PointerLockControlsImpl })

export const FPVControls = ({ viewInventory }) => {
  const { camera, gl } = useThree()
  const controls = useRef()

  useEffect(() => {
    if (!viewInventory) controls.current.lock()
    if (viewInventory) controls.current.unlock()
  }, [viewInventory])

  return (
    <pointerLockControlsImpl ref={controls} args={[camera, gl.domElement]} />
  )
}

FPVControls.propTypes = {
  viewInventory: PropTypes.bool,
}
