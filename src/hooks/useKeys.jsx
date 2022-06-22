import { useEffect } from "react"
import { useInventoryContext } from "../context/InventoryProvider"
import { usePlayerContext } from "../context/PlayerProvider"

export default function useKeys() {
  const {
    viewInventory,
    setViewInventory,
    checkInventory,
    inventoryItems,
    setNoSpace,
    noSpace,
  } = useInventoryContext()

  const { nearObject, hover, setHover, setNearObject } = usePlayerContext()
  
  const handleUserKey = (evt) => {
    if (evt.key === 'f' && nearObject) {
      const objectAdded = checkInventory(nearObject)
      if (objectAdded) {
        setHover(null);
        setNearObject(null)
      } else {
        setNoSpace(true)
        setTimeout(() => setNoSpace(false), 2000)
      }
    }
    if (evt.key === 'e') setViewInventory(!viewInventory)
  }

  useEffect(() => {
    window.addEventListener('keyup', handleUserKey)
    return () => {
      window.removeEventListener('keyup', handleUserKey)
    }
  }, [viewInventory, hover, inventoryItems, noSpace])
}