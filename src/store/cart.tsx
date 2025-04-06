
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { medusa } from '@/lib/medusa'

const CartContext = createContext<any>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState(null)

  useEffect(() => {
    const initCart = async () => {
      const existingCartId = localStorage.getItem('cartId')
      if (existingCartId) {
        try {
          const { cart } = await medusa.carts.retrieve(existingCartId)
          setCart(cart)
        } catch (error) {
          localStorage.removeItem('cartId')
        }
      }
    }
    initCart()
  }, [])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
