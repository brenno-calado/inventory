import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { InventoryProvider } from './context/InventoryProvider'

createRoot(document.getElementById('root')).render(
  <InventoryProvider>
    <App />
  </InventoryProvider>
)
