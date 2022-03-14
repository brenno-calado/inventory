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
    evaluatePosition
  } = useContext(InventoryContext);

  const checkInventory = (item) => {
    const position = evaluatePosition({ item, index: inventoryItems.length })
    if (position) {
      const itemToAdd = { ...item, position }
      setInventoryItems([...inventoryItems, itemToAdd])
    }
  }

  return (
    <div className="App">
      <main>
        {Inventory(inventorySize)}
        {items.map((item, index) => (
          <button
          key={index}
          type="button"
          onClick={() => checkInventory(item)}
          >
            { item.name }
          </button>
        ))}
      </main>
    </div>
  );
}

export default App;
