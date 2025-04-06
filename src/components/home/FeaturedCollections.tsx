
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const collections = [
  {
    id: 1,
    name: "Juniors Drop",
    image: "/images/juniors.webp",
    link: "/collections/juniors"
  },
  {
    id: 2,
    name: "Senior Drip",
    image: "/images/seniors.webp",
    link: "/collections/seniors"
  },
  {
    id: 3,
    name: "Sneaker Heat",
    image: "/images/sneakers.webp",
    link: "/collections/sneakers"
  }
]

export function FeaturedCollections() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display mb-12 text-center text-foreground"
        >
          Featured Collections
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative h-[400px] group rounded-lg overflow-hidden"
            >
              <Link href={collection.link}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10"/>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-3xl font-display text-white">{collection.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
