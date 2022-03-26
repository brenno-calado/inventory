import React, { useContext, useEffect } from 'react';
import Inventory from './components/Inventory';
import InventoryContext from './context/InventoryContext';
import './App.css';


function App() {
  const { items, checkInventory, viewInventory, setViewInventory } = useContext(InventoryContext);

  useEffect(() => {
    window.addEventListener('keypress', (evt) => {
      if (evt.key === 'f') setViewInventory(!viewInventory)
    }, [])
  })
  return (
    <main className="App">
      { viewInventory ? <Inventory /> : <p>Press F to toggle Inventory</p>}
      {items.map((item, index) => (
        <div
          key={index}
          draggable
          className='outside-item'
          type="button"
          onDragEnd={(e) => checkInventory(e, item)}
          style={
            {
              left: 0,
              height: `${item.size.height * 50}px`,
              top: 0,
              width: `${item.size.width * 50}px`,
            }
          }
        >
          { item.name }
        </div>
      ))}
    </main>
  );
}

export default App;
