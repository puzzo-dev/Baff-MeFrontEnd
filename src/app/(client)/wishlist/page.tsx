
'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'

export default function WishlistPage() {
  const [wishlistItems] = useState([]) // TODO: Connect to wishlist store
  
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8">
            Start adding items you love to your wishlist
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wishlist items will be mapped here */}
        </div>
      )}
    </div>
  )
}
