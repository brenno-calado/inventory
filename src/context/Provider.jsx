import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InventoryContext from './InventoryContext';
import items from '../data/items';

function Provider({ children }) {
  const [hour, setHour] = useState(12);
  const [inventorySize, setInventorySize] = useState({ width: 5, height: 7 });
  const [inventoryItems, setInventoryItems] = useState([{
    amount: 1,
    name: 'red apple',
    size: {
      width: 1,
      height: 1,
    },
    weight: 100,
    validHours: 72,
  }]);
  const context = {
    items,
    hour,
    inventorySize,
    inventoryItems,
    setHour,
    setInventorySize,
    setInventoryItems,
  };
  return (
    <InventoryContext.Provider value={context}>
      {children}
    </InventoryContext.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
