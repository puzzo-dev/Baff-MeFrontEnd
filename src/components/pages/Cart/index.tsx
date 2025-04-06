
"use client"

import { useCartStore } from "@/store/cart"
import { Button } from "@/components/ui/button"

export function Cart() {
  const cart = useCartStore()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart.items?.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {/* Cart items will be mapped here */}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg">${cart.total?.toFixed(2)}</span>
          </div>
          <Button className="w-full">Proceed to Checkout</Button>
        </div>
      )}
    </div>
  )
}
