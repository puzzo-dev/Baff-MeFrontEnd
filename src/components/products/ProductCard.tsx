
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="product-card"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={500}
            className="product-card-image"
          />
          <div className="product-card-content">
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-sm text-white/80 mb-4">{product.subtitle}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                ${product.price.toFixed(2)}
              </span>
              <button className="btn-primary text-sm">
                Quick Add
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
