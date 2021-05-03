import Inventory from './components/Inventory';
import './App.css';

const inventorySize = 35;

function App() {
  return (
    <div className="App">
      <main>
        {Inventory(inventorySize)}
      </main>
    </div>
  );
}

export default App;
