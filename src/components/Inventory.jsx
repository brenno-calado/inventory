import React, { useContext } from 'react';
import InventoryContext from '../context/InventoryContext';

const Inventory = (inventorySize) => {
  const { inventoryItems, setInventoryItems } = useContext(InventoryContext);

  const renderItems = () => {
    return (
    inventoryItems.map((item, index) => {
      // const lastItem = index > 0 ? document.getElementById(`item-${index - 1}`).offsetLeft : null;
      // console.log(lastItem);
      return (
      <button
        type="button"
        key={ index }
        className="item"
        id={`item-${index}`}
        style={
          {
            width:`${item.size[0] * 50}px`,
            height: `${item.size[1] * 50}px`,
          }
        }
      >
        {item.name}
      </button>
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
      <div className="inventory" style={{width: `${inventorySize[0] * 50}px`, height: `${inventorySize[1] * 50}px`}}>
        { renderItems() }
      </div>
      { `Peso total: ${inventoryWeight()}g` }
      <button type="button" onClick={() => setInventoryItems([])}>Clean inventory</button>
    </>
  )
}

export default Inventory;
