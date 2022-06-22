import { PointerLockControls } from '@react-three/drei'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'


export const FPVControls = ({ viewInventory }) => {
  const controls = useRef()

  useEffect(() => {
    if (!viewInventory) controls.current.lock()
    if (viewInventory) controls.current.unlock()
  }, [viewInventory])

  return (
    <PointerLockControls ref={controls} />
  )
}

FPVControls.propTypes = {
  isLocked: PropTypes.shape({ current: PropTypes.bool }),
  viewInventory: PropTypes.bool,
}
