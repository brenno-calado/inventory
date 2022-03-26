import React, { useContext } from 'react';
import Inventory from './components/Inventory';
import InventoryContext from './context/InventoryContext';
import './App.css';


function App() {
  const { items, checkInventory } = useContext(InventoryContext);

  return (
    <main className="App">
      {<Inventory />}
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
