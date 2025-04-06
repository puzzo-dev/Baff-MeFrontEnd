
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, Sun, Moon, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-orbitron text-xl text-foreground">
            BAFF-ME
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="nav-link">
              Shop
            </Link>
            <Link href="/our-story" className="nav-link">
              Our Story
            </Link>
            <Link href="/journal" className="nav-link">
              Journal
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-accent/10 rounded-full text-foreground"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
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
            className="block text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/our-story"
            className="block text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Our Story
          </Link>
          <Link
            href="/journal"
            className="block text-foreground hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Journal
          </Link>
        </div>
      </div>
    </nav>
  )
}
