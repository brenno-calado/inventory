import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Provider from './context/Provider';

createRoot(document.getElementById('root')).render(
  <Provider>
    <App />
  </Provider>
)
