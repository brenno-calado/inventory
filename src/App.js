import React, { useContext } from 'react';
import Inventory from './components/Inventory';
import InventoryContext from './context/InventoryContext';
import './App.css';


function App() {
  const {
    inventorySize,
    items,
    inventoryItems,
    setInventoryItems,
    evaluatePosition,
    doItemsCollide,
    inventoryRect
  } = useContext(InventoryContext);

  const checkInventory = (e, item) => {
    const mousePosition = {
      left: e.clientX,
      right: e.clientX,
      top: e.clientY,
      bottom: e.clientY
    }
    if (doItemsCollide(mousePosition, inventoryRect)) {
      const position = evaluatePosition({ item, index: inventoryItems.length })
      if (position) {
        const itemToAdd = { ...item, position }
        return setInventoryItems([...inventoryItems, itemToAdd])
      }
      window.alert("No space")
    }
  }

  return (
    <div className="App">
      <main>
        {Inventory(inventorySize)}
        {items.map((item, index) => (
          <button
            key={index}
            draggable
            type="button"
            onDragEnd={(e) => checkInventory(e, item)}
          >
            { item.name }
          </button>
        ))}
      </main>
    </div>
  );
}

export default App;
