
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-black to-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40" />
        <img
          src="/hero-bg.jpg"
          alt="Hero background"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-6"
          >
            FUTURE OF FASHION
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Discover the latest in urban streetwear and cutting-edge fashion
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/products"
              className="bg-white text-black px-8 py-3 rounded-full font-bebas-neue text-lg hover:bg-primary hover:text-white transition-colors duration-300"
            >
              SHOP NOW
            </Link>
            <Link
              href="/collections"
              className="border border-white px-8 py-3 rounded-full font-bebas-neue text-lg hover:bg-white hover:text-black transition-colors duration-300"
            >
              COLLECTIONS
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 z-10 text-center"
      >
        <div className="flex justify-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-white"></span>
          <span className="h-2 w-2 rounded-full bg-white/50"></span>
          <span className="h-2 w-2 rounded-full bg-white/50"></span>
        </div>
      </motion.div>
    </section>
  )
}
