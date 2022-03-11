import React, { useContext, useEffect, useState } from 'react';
import InventoryContext from '../context/InventoryContext';

const Inventory = (inventorySize) => {
  const { inventoryItems, setInventoryItems } = useContext(InventoryContext);

  const [inventoryRect, setInventoryRect] = useState({});
  const [draggedItem, setDraggedItem] = useState({})

  let positions = []

  useEffect(() => {
    setInventoryRect(document.querySelector('.inventory').getBoundingClientRect());
  }, [])

  const cellSize = 50;

  const draggingOnCell = (e) => {
    e.preventDefault()
    if (draggedItem.size) e.target.classList.add('drag-over-cell')
  }

  const draggingOffCell = (e) => {
    e.preventDefault()
    e.target.classList.remove('drag-over-cell')
  }

  const renderCells = () => {
    const numberOfCells = inventorySize.width * inventorySize.height
    const arr = new Array(numberOfCells).fill(
      <div
        className='cell' onDragEnter={draggingOnCell} onDragLeave={draggingOffCell} onDragExit={draggingOffCell}
      >
      </div>
    )
    return arr
  }

  const doItemsCollide = (item1, item2) => {
    return !(
      item1.right <= item2.left ||
      item1.left >= item2.right ||
      item1.bottom <= item2.top ||
      item1.top >= item2.bottom
      )
  }

  const enoughWidthSpace = (position) => inventoryRect.width >= position.right

  const enoughHeightSpace = (position) => inventoryRect.height >= position.bottom

  const evaluatePosition = ({ item, index: itemIndex }) => {
    let position = {
      left: 0,
      top: 0,
      right: item.size.width * cellSize,
      bottom: item.size.height * cellSize
    }
    let index = 0

    if (itemIndex === 0) return position

    while (index < itemIndex) {
      const collidedObject = positions.find((pos) => doItemsCollide(position, pos))
        if (collidedObject) {
        position.left = collidedObject.right
        position.right = position.left + item.size.width * cellSize
        if (!enoughWidthSpace(position)) {
          position.left = 0
          position.right = item.size.width * cellSize
          position.top += cellSize
          position.bottom += cellSize
          index = -1
          if (!enoughHeightSpace(position)) return position = null
        }
      }
      index += 1
    }
    return position
  }

  const renderItems = () => {
    return (
      inventoryItems.map((item, index) => {
        let position = evaluatePosition({ item, index })
        if (position) {
          positions.push(position)
          return (
            <div
              type="button"
              key={index}
              className="item"
              id={`item-${index}`}
              draggable
              onDragStart={() => setDraggedItem(item)}
              onDragEnd={() => setDraggedItem({})}
              style={
                {
                  left: position.left,
                  height: `${item.size.height * cellSize}px`,
                  top: position.top,
                  width: `${item.size.width * cellSize}px`,
                }
              }
            >
              {item.name}
            </div>
          )
        }
      }
    )
  )
  }

  const inventoryWeight = () => inventoryItems.reduce((acc, item) => acc + item.weight, 0)

  return (
    <>
      <div
        className="inventory"
        style={{
          width: `${inventorySize.width * cellSize}px`,
          height: `${inventorySize.height * cellSize}px`
        }}>
        { renderCells() }
        { renderItems() }
      </div>
      { `Peso total: ${inventoryWeight()}g ` }
      <button type="button" onClick={() => setInventoryItems([])}>Clean inventory</button>
    </>
  )
}

export default Inventory;
