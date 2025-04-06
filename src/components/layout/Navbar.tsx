
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon, ShoppingCart, User, Search, Heart, Home, Store } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClasses = cn(
    "fixed top-0 z-[100] w-full transition-all duration-300",
    hasScrolled ? "bg-white/95 dark:bg-[#111111]/95 backdrop-blur-lg" : "bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md",
    "border-b border-border"
  )

  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Shop', icon: Store },
    { href: '/collections', label: 'Collections' },
    { href: '/journal', label: 'Journal' },
    { href: '/our-story', label: 'Our Story' }
  ]

  return (
    <>
      <nav className={navClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between w-full md:w-auto">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors md:hidden"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block h-0.5 w-full bg-current transform transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-0.5 w-full bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 w-full bg-current transform transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>

              <Link href="/" className="font-orbitron text-lg md:text-2xl font-bold text-foreground tracking-wider mx-auto md:mx-0">
                BAFF-ME
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                {menuItems.slice(0, 4).map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="font-bebas-neue text-lg hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors"
                >
                  <div className="relative w-5 h-5">
                    <Sun
                      size={20}
                      className={`absolute transition-opacity ${
                        theme === 'dark' ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <Moon
                      size={20}
                      className={`absolute transition-opacity ${
                        theme === 'dark' ? 'opacity-0' : 'opacity-100'
                      }`}
                    />
                  </div>
                </button>
                <Link href="/cart" className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors relative">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 left-0 right-0 bg-white dark:bg-[#111111] border-b border-border overflow-hidden"
              >
                <div className="container mx-auto py-6 px-4">
                  <div className="flex flex-col space-y-6">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 font-bebas-neue text-xl hover:text-primary transition-colors"
                      >
                        {item.icon && <item.icon size={20} />}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <div className="pt-4 border-t border-border">
                      <Link
                        href="/account"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 font-bebas-neue text-xl hover:text-primary transition-colors"
                      >
                        <User size={20} />
                        <span>Account</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111111] border-t border-border z-50">
        <div className="grid grid-cols-4 py-3">
          <Link
            href="/"
            className="flex flex-col items-center justify-center space-y-1"
          >
            <Home size={20} />
            <span className="font-bebas-neue text-xs">Home</span>
          </Link>
          <Link
            href="/products"
            className="flex flex-col items-center justify-center space-y-1"
          >
            <Store size={20} />
            <span className="font-bebas-neue text-xs">Shop</span>
          </Link>
          <Link
            href="/wishlist"
            className="flex flex-col items-center justify-center space-y-1"
          >
            <Heart size={20} />
            <span className="font-bebas-neue text-xs">Wishlist</span>
          </Link>
          <Link
            href="/account"
            className="flex flex-col items-center justify-center space-y-1"
          >
            <User size={20} />
            <span className="font-bebas-neue text-xs">Account</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
