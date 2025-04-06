
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, Sun, Moon, ShoppingCart, User, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
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
              <div className="absolute hidden group-hover:block w-48 bg-background border border-border rounded-md shadow-lg p-2 mt-2">
                <Link href="/products/new-arrivals" className="block px-4 py-2 hover:bg-accent/10 rounded-md">
                  New Arrivals
                </Link>
                <Link href="/products/trending" className="block px-4 py-2 hover:bg-accent/10 rounded-md">
                  Trending
                </Link>
                <Link href="/products/sale" className="block px-4 py-2 hover:bg-accent/10 rounded-md">
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
              <div className="absolute hidden group-hover:block w-48 bg-background border border-border rounded-md shadow-lg p-2 mt-2">
                <Link href="/faq" className="block px-4 py-2 hover:bg-accent/10 rounded-md">
                  FAQ
                </Link>
                <Link href="/shipping" className="block px-4 py-2 hover:bg-accent/10 rounded-md">
                  Shipping
                </Link>
                <Link href="/order-tracking" className="block px-4 py-2 hover:bg-accent/10 rounded-md">
                  Track Order
                </Link>
                <Link href="/contact" className="block px-4 py-2 hover:bg-accent/10 rounded-md">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-accent/10 rounded-full text-foreground">
              <Search size={20} />
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-accent/10 rounded-full text-foreground"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link href="/account" className="p-2 hover:bg-accent/10 rounded-full text-foreground">
              <User size={20} />
            </Link>
            <Link 
              href="/cart" 
              className="p-2 hover:bg-accent/10 rounded-full text-foreground"
            >
              <ShoppingCart size={20} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-accent/10 rounded-full text-foreground"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden absolute w-full bg-background border-b border-border',
          isOpen ? 'block' : 'hidden'
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <Link
            href="/products"
            className="block text-foreground hover:text-primary font-bebas-neue text-xl"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/our-story"
            className="block text-foreground hover:text-primary font-bebas-neue text-xl"
            onClick={() => setIsOpen(false)}
          >
            Our Story
          </Link>
          <Link
            href="/journal"
            className="block text-foreground hover:text-primary font-bebas-neue text-xl"
            onClick={() => setIsOpen(false)}
          >
            Journal
          </Link>
          <Link
            href="/faq"
            className="block text-foreground hover:text-primary font-bebas-neue text-xl"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/shipping"
            className="block text-foreground hover:text-primary font-bebas-neue text-xl"
            onClick={() => setIsOpen(false)}
          >
            Shipping
          </Link>
          <Link
            href="/order-tracking"
            className="block text-foreground hover:text-primary font-bebas-neue text-xl"
            onClick={() => setIsOpen(false)}
          >
            Track Order
          </Link>
          <Link
            href="/contact"
            className="block text-foreground hover:text-primary font-bebas-neue text-xl"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}
