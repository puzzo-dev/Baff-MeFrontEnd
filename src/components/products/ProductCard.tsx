'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/lib/types'
import { useCartStore } from '@/store/cart'
import Image from 'next/image'

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    openCart()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-lg"
    >
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0] || "https://via.placeholder.com/150"}
            alt={product.title}
            className="object-cover transition-transform group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.title}</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">${product.price}</p>
        </div>
      </Link>
      <button
        onClick={handleQuickAdd}
        className="absolute bottom-4 right-4 rounded-full bg-black dark:bg-white text-white dark:text-black p-3 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
      >
        Quick Add
      </button>
    </motion.div>
  )
}