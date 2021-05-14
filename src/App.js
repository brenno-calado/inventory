import React, { useContext } from 'react';
import Inventory from './components/Inventory';
import InventoryContext from './context/InventoryContext';
import './App.css';


function App() {
  const {
    inventorySize,
    items,
    inventoryItems, setInventoryItems,
  } = useContext(InventoryContext);

  const checkInventory = (item) => {
    console.log(item);
    item['amount'] = item.amount + 1;
    setInventoryItems([ ...inventoryItems, item ])
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
