
import { Metadata } from 'next'
import { ProductCard } from "@/components/products/ProductCard"

export const metadata: Metadata = {
  title: 'Products | BAFF-ME',
  description: 'Browse our collection of urban fashion and streetwear',
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product grid will be populated with data */}
      </div>
    </div>
  )
}
