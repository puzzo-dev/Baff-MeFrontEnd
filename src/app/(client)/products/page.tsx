
'use client'

import { Metadata } from 'next'
import { getProducts } from '@/lib/actions'
import { ProductCard } from '@/components/products/ProductCard'

export const metadata: Metadata = {
  title: 'Products | BAFF-ME',
  description: 'Browse our collection of urban fashion and streetwear',
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Our Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
