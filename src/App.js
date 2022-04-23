import { FirstPersonControls, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useContext } from 'react';
import './App.css';
import Inventory from './components/Inventory';
import InventoryContext from './context/InventoryContext';

function App() {
  window.addEventListener('keyup', (evt) => {
      if (evt.key === 'f') setViewInventory(!viewInventory)
  })

  const args = {
    activeLook: true,
    autoForward: false,
    constrainVertical: false,
    enabled: true,
    heightCoef: 1,
    heightMax: 1,
    heightMin: 0,
    heightSpeed: false,
    lookVertical: true,
    lookSpeed: 0.005,
    movementSpeed: 1,
    verticalMax: Math.PI,
    verticalMin: 0,
  }

  const { viewInventory, setViewInventory } = useContext(InventoryContext);
  return (
    <main className="App">
      <Canvas>
        <FirstPersonControls {...args} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Suspense fallback={null} >
          <mesh position={[-6, 0, -2]} rotation={[90, 0, 20]}>
            <boxBufferGeometry attach="geometry" args={[3, 3, 3]} />
            <meshLambertMaterial attach="material" color="lightcyan" />
          </mesh>
          <mesh position={[6, 0, -1]}>
            <boxBufferGeometry attach="geometry" args={[4, 2, 2]} />
            <meshNormalMaterial attach="material" />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <Sphere visible args={[1, 100, 100]} scale={1.2}>
              <MeshDistortMaterial
                color="white"
                attach="material"
                distort={0.4}
                speed={1}
                roughness={0.7}
              />
            </Sphere>
          </mesh>
        </Suspense>
      </Canvas>
      {viewInventory ? <Inventory /> : <p className='toggle-inventory'>Press F to toggle Inventory</p>}
    </main>
  );
}

export default App;
