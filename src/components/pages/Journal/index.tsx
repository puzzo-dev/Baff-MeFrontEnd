
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Journal() {
  return (
    <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-orbitron font-bold mb-12 text-[#111111] dark:text-white">
          STYLE <span className="text-primary">JOURNAL</span>
        </h1>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {/* Journal entries will be populated here */}
        </motion.div>
      </div>
    </div>
  )
}
