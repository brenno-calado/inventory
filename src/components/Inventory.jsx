import React from 'react';

const renderCells = (inventorySize) => (
  inventorySize.map((cell, index) => <div className="cell" key={ index }>A</div>)
);

const Inventory = (inventorySize) => {
  const toFill = Array(inventorySize).fill('A');
  console.log(toFill);
  return (
    <div className="inventory">
      { renderCells(toFill) }
    </div>
  )
}

export default Inventory;
