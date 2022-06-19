import { useEffect } from 'react'
import './App.css'
import Environment from './components/Environment'
import Inventory from './components/Inventory'
import { useInventoryContext } from './context/InventoryProvider'
import { usePlayerContext } from './context/PlayerProvider'
import items from './data/items'

function App() {
  const { viewInventory, setViewInventory, checkInventory, inventoryItems } =
    useInventoryContext()

  const { hover, setHover, nearObject, setNearObject } = usePlayerContext()

  const handleUserKey = (evt) => {
    if (evt.key === 'f' && hover) checkInventory(evt, nearObject)
    if (evt.key === 'e') setViewInventory(!viewInventory)
  }

  useEffect(() => {
    window.addEventListener('keyup', handleUserKey)
    return () => {
      window.removeEventListener('keyup', handleUserKey)
    }
  }, [viewInventory, hover, inventoryItems])

  return (
    <main className="app">
      <Environment
        viewInventory={viewInventory}
        hover={hover}
        setHover={setHover}
        items={items}
        nearObject={nearObject}
        setNearObject={setNearObject}
      />
      {hover && <span className="toggle-inventory">Press F to take item</span>}
      {viewInventory && (
        <p className="toggle-inventory">Press E to toggle Inventory</p>
      )}
      <Inventory />
    </main>
  )
}

export default App
