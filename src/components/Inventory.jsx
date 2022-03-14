import React, { useContext, useEffect, useState } from 'react';
import InventoryContext from '../context/InventoryContext';

const Inventory = (inventorySize) => {
  const {
    inventoryItems, setInventoryItems, setInventoryRect, cellSize, doItemsCollide, enoughWidthSpace, enoughHeightSpace
  } = useContext(InventoryContext);

  const [draggedItem, setDraggedItem] = useState({})
  const [position, setPosition] = useState({})

  useEffect(() => {
    setInventoryRect(document.querySelector('.inventory').getBoundingClientRect());
  }, [])

  const draggingOverCell = (e) => {
    // get position
    setPosition({
      left: e.target.offsetLeft,
      top: e.target.offsetTop,
      right: e.target.offsetLeft + draggedItem.size.width * cellSize,
      bottom: e.target.offsetTop + draggedItem.size.height * cellSize
    })
    // add shadow item with position
    const shadow = document.createElement('div')
    shadow.style = `position:absolute;top:${position.top}px;left:${position.left}px;width:${draggedItem.size.width * cellSize}px;height:${draggedItem.size.height * cellSize}px`
    // validate if item fits width and height
    // validate if it hits with other objects
    if (
      !enoughHeightSpace({ bottom: position.bottom })
      || !enoughWidthSpace({ right: position.right })
      || inventoryItems.find((item) => doItemsCollide(position, item.position))
      ) {
        shadow.classList.add('drag-over-unavailable')
      } else {
        shadow.classList.add('drag-over-available')
      }

    const inventory = document.querySelector('.inventory')
    inventory.appendChild(shadow)
  }

  const removeShadows = () => {
    const offShadow = document.querySelector('.drag-over-unavailable')
    const shadow = document.querySelector('.drag-over-available')
    if (shadow) shadow.remove()
    if (offShadow) offShadow.remove()
  }

  const draggingOffCell = () => removeShadows()
  
  const evaluateDrop = (e) => {
    console.log(inventoryItems);
    e.preventDefault()
    e.stopPropagation()
    console.log("position => ", position);
    
    // if the item fits
    if (
      enoughHeightSpace({ bottom: position.bottom })
      && enoughWidthSpace({ right: position.right })
      && !(inventoryItems.find((item) => doItemsCollide(position, item.position)))
    ) {
      inventoryItems.splice(draggedItem.index, 1, { ...inventoryItems[draggedItem.index], position })
      }
    removeShadows()
  }

  const renderCells = () => {
    const numberOfCells = inventorySize.width * inventorySize.height
    const arr = new Array(numberOfCells)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = (
        <div
          key={i}
          onDragOver={draggingOverCell}
          onDragLeaveCapture={draggingOffCell}
          onDragLeave={draggingOffCell}
          onDragExit={draggingOffCell}
          className={`cell cell-${i}`}
        >
        </div>
      )
    }
    return arr
  }

  const draggingInventoryItem = (item, index) => {
    setDraggedItem({ ...item, index })
  }

  const droppedInventoryItem = (e) => {
    evaluateDrop(e)
    setDraggedItem({})
  }

  const renderItems = () => {
    return (
      inventoryItems.map((item, index) => {
          return (
            <div
              type="button"
              key={index}
              className="item"
              id={`item-${index}`}
              draggable
              onDragStart={() => draggingInventoryItem(item, index)}
              onDragEnd={(e) => droppedInventoryItem(e)}
              style={
                {
                  left: item.position.left,
                  height: `${item.size.height * cellSize}px`,
                  top: item.position.top,
                  width: `${item.size.width * cellSize}px`,
                }
              }
            >
              {item.name}
            </div>
          )
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
