
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-background">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 to-black/40">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero background"
          fill
          className="object-cover mix-blend-overlay"
          priority
        />
      </div>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <motion.h1 
            className="font-bebas-neue text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            ELEVATE YOUR
            <br />
            STREET GAME
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 font-inter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Premium streetwear for the bold and fearless
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-6"
          >
            <Link href="/products" className="btn-primary text-lg font-medium py-4 px-8">
              Shop Now
            </Link>
            <Link href="/collections/new-arrivals" className="btn-secondary text-lg">
              New Arrivals
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
