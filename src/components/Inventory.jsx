import React, { useContext, useEffect, useState } from 'react';
import InventoryContext from '../context/InventoryContext';

const Inventory = (inventorySize) => {
  const { inventoryItems, setInventoryItems } = useContext(InventoryContext);

  const [inventoryRect, setInventoryRect] = useState({});

  let positions = []

  useEffect(() => {
    setInventoryRect(document.querySelector('.inventory').getBoundingClientRect());
  }, [])

  const cellSize = 50;

  const renderCells = () => {
    
  }

  const doItemsCollide = (item1, item2) => {
    return !(
      item1.right <= item2.left ||
      item1.left >= item2.right ||
      item1.bottom <= item2.top ||
      item1.top >= item2.bottom
      )
  }

  const enoughWidthSpace = (position) => {
    console.log("inventory Rect Right ", inventoryRect.width);
    return inventoryRect.width >= position.right
  }
  const enoughHeightSpace = (position) => {
    return inventoryRect.height >= position.top + position.bottom
  }

  const evaluatePosition = ({ item, index: itemIndex }) => {
    let position = {
      left: 0,
      top: 0,
      right: item.size.width * cellSize,
      bottom: item.size.height * cellSize
    }
    let index = 0
    console.log("itemIndex => ", itemIndex);
    if (itemIndex === 0) return position
    console.log("positions => ", positions);
    while (index < itemIndex) {
      console.log("item at => ", position);
      console.log("index at => ", positions[index]);
      if (doItemsCollide(positions[index], position)) {
        console.log("COLLISION!");
        // sweep to the left
        position.left = positions[index].right
        position.right = position.left + item.size.width * cellSize
        console.log("POSITION => ", position);
        // see if its width fits
        if (!enoughWidthSpace(position)) {

          console.log("not enough width space");
          // if it doesn't, get back to the leftmost position
          position.left = 0
          position.right = item.size.width * cellSize
          // restart index
          index = -1
          // sweep one cell height
          position.top += cellSize
          position.bottom += cellSize
          
          // see if its height fits
          if (!enoughHeightSpace(position)) {

            console.log("not enough height space");
            // if it doesn't then the item doesn't fit
            return index = itemIndex
          }
        }
      }
      index += 1
    }

    return position
  }

  const renderItems = () => {
    return (
    inventoryItems.map((item, index) => {
      // validate if is the first item in the inventory. If so
      // if it does, set initial position to 0
      // else, start evaluate position
      let position = evaluatePosition({ item, index })
      positions.push(position)
      console.log("positions ", positions);
      // after choosing the position, validate if the width fits

      // if the width fits, validate if the height fits
      // if it doesn't, validate if it can move lower

      // if it can't then there's no space left

      return (
      <div
        type="button"
        key={ index }
        className="item"
        id={`item-${index}`}
        draggable
        style={
          {
            left: position.left,
            height: `${item.size.height * cellSize}px`,
            top: position.top,
            width:`${item.size.width * cellSize}px`,
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
  // if cell is occupied shift 50px to the right, if no cell is available lower 50px and return to the leftmost of the inventory.
  // if no cell is available, don't insert item

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
