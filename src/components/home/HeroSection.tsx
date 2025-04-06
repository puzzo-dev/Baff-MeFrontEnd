
"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold mb-6">Welcome to BAFF-ME</h1>
        <p className="text-xl mb-8">Discover the future of fashion</p>
        <Link 
          href="/products"
          className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Shop Now
        </Link>
      </motion.div>
    </section>
  )
}
