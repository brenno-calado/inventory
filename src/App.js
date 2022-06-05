import React from 'react'
import './App.css'
import Environment from './components/Environment'
import Inventory from './components/Inventory'
import { useInventoryContext } from './context/InventoryProvider'
import items from './data/items'

function App() {
  const { viewInventory, setViewInventory, checkInventory } =
    useInventoryContext()

  window.addEventListener('keyup', (evt) => {
    if (evt.key === 'e') setViewInventory(!viewInventory)
  })

  return (
    <main className="app">
      <Environment viewInventory={viewInventory} />
      {viewInventory ? null : (
        <p className="toggle-inventory">Press E to toggle Inventory</p>
      )}
      <Inventory />
      {items.map((item, index) => (
        <div
          key={index}
          draggable
          className="outside-item"
          type="button"
          onDragEnd={(e) => checkInventory(e, item)}
          style={{
            left: 0,
            height: `${item.size.height * 50}px`,
            top: 0,
            width: `${item.size.width * 50}px`,
          }}
        >
          {item.name}
        </div>
      ))}
    </main>
  )
}

export default App
