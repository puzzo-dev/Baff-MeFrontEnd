
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function Products() {
  const [filters, setFilters] = useState({
    collection: '',
    category: '',
    price: '',
    sort: ''
  })

  const { data: products = [] } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const res = await fetch('/api/products?' + new URLSearchParams(filters))
      return res.json()
    }
  })

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Collections</h3>
            <div className="space-y-2">
              <button 
                className={`block w-full text-left py-1 ${filters.collection === '' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setFilters({ ...filters, collection: '' })}
              >
                All Collections
              </button>
              <button 
                className={`block w-full text-left py-1 ${filters.collection === 'quantum' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setFilters({ ...filters, collection: 'quantum' })}
              >
                Quantum Streetwear
              </button>
              <button 
                className={`block w-full text-left py-1 ${filters.collection === 'urban' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                onClick={() => setFilters({ ...filters, collection: 'urban' })}
              >
                Urban Tech
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id}>
              {/* Product Card Component */}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
