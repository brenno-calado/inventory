import { createRoot } from 'react-dom/client'
import App from './App'
import { InventoryProvider } from './context/InventoryProvider'
import { PlayerProvider } from './context/PlayerProvider'

createRoot(document.getElementById('root')).render(
  <InventoryProvider>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </InventoryProvider>
)
