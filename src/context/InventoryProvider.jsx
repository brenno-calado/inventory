import PropTypes from 'prop-types'
import React, { createContext, useContext, useState } from 'react'

const InventoryContext = createContext()

export function InventoryProvider({ children }) {
  const cellSize = 50

  const [viewInventory, setViewInventory] = useState(false)
  const [hour, setHour] = useState(12)
  const [inventoryRect, setInventoryRect] = useState({})
  const [inventorySize, setInventorySize] = useState({ width: 5, height: 7 })
  const [inventoryItems, setInventoryItems] = useState([
    {
      amount: 1,
      name: 'red apple',
      size: {
        width: 1,
        height: 1,
      },
      weight: 100,
      validHours: 72,
      position: {
        left: 0,
        right: cellSize * 1,
        top: 0,
        bottom: cellSize * 1,
      },
    },
  ])

  const doItemsCollide = (item1, item2) => {
    return !(
      item1.right <= item2.left ||
      item1.left >= item2.right ||
      item1.bottom <= item2.top ||
      item1.top >= item2.bottom
    )
  }

  const enoughWidthSpace = (position) => inventoryRect.width >= position.right

  const enoughHeightSpace = (position) =>
    inventoryRect.height >= position.bottom

  const evaluatePosition = ({ item, index: itemIndex }) => {
    let position = {
      left: 0,
      top: 0,
      right: item.size.width * cellSize,
      bottom: item.size.height * cellSize,
    }
    let index = 0

    if (!enoughWidthSpace(position) || !enoughHeightSpace(position)) return null
    if (itemIndex === 0) return position

    while (index < itemIndex) {
      const collidedItem = inventoryItems.find((item) =>
        doItemsCollide(position, item.position)
      )
      if (collidedItem) {
        position.left = collidedItem.position.right
        position.right = position.left + item.size.width * cellSize
        if (!enoughWidthSpace(position)) {
          position.left = 0
          position.right = item.size.width * cellSize
          position.top += cellSize
          position.bottom += cellSize
          index = -1
          if (!enoughHeightSpace(position)) return null
        }
      }
      index += 1
    }
    return position
  }

  const checkInventory = (e, item) => {
    const mousePosition = {
      left: e.clientX,
      right: e.clientX,
      top: e.clientY,
      bottom: e.clientY,
    }
    if (doItemsCollide(mousePosition, inventoryRect)) {
      const position = evaluatePosition({ item, index: inventoryItems.length })
      if (position) {
        const itemToAdd = { ...item, position }
        return setInventoryItems([...inventoryItems, itemToAdd])
      }
      window.alert('No space')
    }
  }

  const context = {
    viewInventory,
    cellSize,
    hour,
    inventorySize,
    inventoryItems,
    inventoryRect,
    setViewInventory,
    doItemsCollide,
    enoughHeightSpace,
    enoughWidthSpace,
    setHour,
    setInventorySize,
    setInventoryItems,
    setInventoryRect,
    evaluatePosition,
    checkInventory,
  }

  return (
    <InventoryContext.Provider value={context}>
      {children}
    </InventoryContext.Provider>
  )
}

InventoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useInventoryContext = () => {
  const value = useContext(InventoryContext)
  if (value === null) throw new Error('No Inventory Provider found')
  return value
}
