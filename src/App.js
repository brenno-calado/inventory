import './App.css'
import Environment from './components/Environment'
import Inventory from './components/Inventory'
import { useInventoryContext } from './context/InventoryProvider'
import { usePlayerContext } from './context/PlayerProvider'
import useKeys from './hooks/useKeys'

function App() {
  const { viewInventory, items, noSpace } = useInventoryContext()

  const { setHover, nearObject, setNearObject } = usePlayerContext()
  useKeys()
  return (
    <main className="app">
      <Environment
        viewInventory={viewInventory}
        setHover={setHover}
        items={items}
        nearObject={nearObject}
        setNearObject={setNearObject}
      />
      <div className="modal">
        {nearObject && <p>Press F to take item</p>}
        {viewInventory && <p>Press E to toggle Inventory</p>}
        {noSpace && <p>No space</p>}
      </div>
      {viewInventory && <Inventory />}
      <div className="reticle"></div>
    </main>
  )
}

export default App
