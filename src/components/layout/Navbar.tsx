
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, Sun, Moon, ShoppingCart, User, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClasses = cn(
    "fixed top-0 z-50 w-full transition-all duration-300",
    hasScrolled ? "bg-white/95 dark:bg-[#111111]/95 backdrop-blur-lg" : "bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md",
    "border-b border-border"
  )

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-orbitron text-2xl font-bold text-foreground tracking-wider">
            BAFF-ME
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <Link href="/products" className="nav-link font-bebas-neue text-lg">
                Shop
              </Link>
              <div className="absolute hidden group-hover:block w-48 bg-background/95 backdrop-blur-lg border border-border rounded-md shadow-lg p-2 mt-2">
                <Link href="/products/new-arrivals" className="block px-4 py-2 hover:bg-accent/10 rounded-md transition-colors">
                  New Arrivals
                </Link>
                <Link href="/products/trending" className="block px-4 py-2 hover:bg-accent/10 rounded-md transition-colors">
                  Trending
                </Link>
                <Link href="/products/sale" className="block px-4 py-2 hover:bg-accent/10 rounded-md transition-colors">
                  Sale
                </Link>
              </div>
            </div>
            <Link href="/our-story" className="nav-link font-bebas-neue text-lg">
              Our Story
            </Link>
            <Link href="/journal" className="nav-link font-bebas-neue text-lg">
              Journal
            </Link>
            <div className="relative group">
              <Link href="/support" className="nav-link font-bebas-neue text-lg">
                Support
              </Link>
              <div className="absolute hidden group-hover:block w-48 bg-background/95 backdrop-blur-lg border border-border rounded-md shadow-lg p-2 mt-2">
                <Link href="/faq" className="block px-4 py-2 hover:bg-accent/10 rounded-md transition-colors">
                  FAQ
                </Link>
                <Link href="/shipping" className="block px-4 py-2 hover:bg-accent/10 rounded-md transition-colors">
                  Shipping
                </Link>
                <Link href="/order-tracking" className="block px-4 py-2 hover:bg-accent/10 rounded-md transition-colors">
                  Track Order
                </Link>
                <Link href="/contact" className="block px-4 py-2 hover:bg-accent/10 rounded-md transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors">
              <Search size={20} />
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link href="/account" className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors">
              <User size={20} />
            </Link>
            <Link 
              href="/cart" 
              className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors"
            >
              <ShoppingCart size={20} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-16 bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-bebas-neue text-xl text-foreground/60">Shop</h3>
                <div className="space-y-2 pl-4">
                  <Link
                    href="/products/new-arrivals"
                    className="block text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    New Arrivals
                  </Link>
                  <Link
                    href="/products/trending"
                    className="block text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Trending
                  </Link>
                  <Link
                    href="/products/sale"
                    className="block text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sale
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                <Link
                  href="/our-story"
                  className="block text-foreground hover:text-primary font-bebas-neue text-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Our Story
                </Link>
                <Link
                  href="/journal"
                  className="block text-foreground hover:text-primary font-bebas-neue text-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Journal
                </Link>
              </div>

              <div className="space-y-4">
                <h3 className="font-bebas-neue text-xl text-foreground/60">Support</h3>
                <div className="space-y-2 pl-4">
                  <Link
                    href="/faq"
                    className="block text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/shipping"
                    className="block text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Shipping
                  </Link>
                  <Link
                    href="/order-tracking"
                    className="block text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Track Order
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
