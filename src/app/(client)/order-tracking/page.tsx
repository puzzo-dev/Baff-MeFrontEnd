
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState('')
  const [orderStatus, setOrderStatus] = useState<null | string>(null)

  const handleTrack = async () => {
    // TODO: Implement actual order tracking logic
    setOrderStatus('Processing')
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <h1 className="text-4xl font-orbitron font-bold mb-8">Track Your Order</h1>
      <div className="max-w-md mx-auto">
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your order number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
          <Button onClick={handleTrack} className="w-full">
            Track Order
          </Button>
        </div>
        
        {orderStatus && (
          <div className="mt-8 p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Order Status</h2>
            <p>{orderStatus}</p>
          </div>
        )}
      </div>
    </div>
  )
}
