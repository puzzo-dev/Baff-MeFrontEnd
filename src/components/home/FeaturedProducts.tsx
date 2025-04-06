
"use client"

import { ProductCard } from "@/components/products/ProductCard"

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-display mb-12 text-center text-foreground">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Add product cards here once data fetching is set up */}
        </div>
      </div>
    </section>
  )
}
