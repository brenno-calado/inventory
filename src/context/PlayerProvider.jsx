import PropTypes from 'prop-types'
import { createContext, useContext, useState } from 'react'

const PlayerContext = createContext()

export function PlayerProvider({ children }) {
  const [hover, setHover] = useState(null)
  const [nearObject, setNearObject] = useState(null)

  const context = {
    hover, setHover, nearObject, setNearObject
  }

  return (
    <PlayerContext.Provider value={context}>
      {children}
    </PlayerContext.Provider>
  )
}

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const usePlayerContext = () => {
  const value = useContext(PlayerContext)
  if (value === null) throw new Error('No Player Provider found')
  return value
}
