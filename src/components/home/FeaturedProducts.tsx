
"use client"

import { ProductCard } from "@/components/products/ProductCard"

export function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Add product cards here once data fetching is set up */}
        </div>
      </div>
    </section>
  )
}
