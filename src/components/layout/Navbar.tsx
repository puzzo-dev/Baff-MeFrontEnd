
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Menu, Sun, Moon, ShoppingCart, User, Search, Heart, Home, Store, Tag, Menu as MenuIcon, X, Newspaper } from 'lucide-react'
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
    { href: '/products/sale', label: 'Sale', icon: Tag },
    { href: '/collections', label: 'Collections', icon: MenuIcon },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping' },
    { href: '/contact', label: 'Contact' },
    { href: '/our-story', label: 'Our Story' },
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
                {isOpen ? <X size={20} /> : <MenuIcon size={20} />}
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
              <button className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors">
                <Search size={20} />
              </button>
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
              <Link href="/wishlist" className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors">
                <Heart size={20} />
              </Link>
              <Link href="/account" className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors">
                <User size={20} />
              </Link>
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 right-0 bg-white dark:bg-[#111111] border-b border-border"
            >
              <div className="container mx-auto py-4 px-4">
                <div className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="font-bebas-neue text-lg hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111111] border-t border-border z-50">
        <div className="grid grid-cols-5 py-2">
          <Link
            href="/"
            className="flex flex-col items-center justify-center space-y-1 text-sm"
          >
            <Home size={20} />
            <span className="font-bebas-neue">Home</span>
          </Link>
          <Link
            href="/cart"
            className="flex flex-col items-center justify-center space-y-1 text-sm relative"
          >
            <ShoppingCart size={24} className="text-primary" />
            <span className="font-bebas-neue">Cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-6 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/wishlist"
            className="flex flex-col items-center justify-center space-y-1 text-sm"
          >
            <Heart size={20} />
            <span className="font-bebas-neue">Wishlist</span>
          </Link>
          <Link
            href="/account"
            className="flex flex-col items-center justify-center space-y-1 text-sm"
          >
            <User size={20} />
            <span className="font-bebas-neue">Account</span>
          </Link>
          <Link
            href={usePathname() === '/products' ? '/journal' : '/products'}
            className="flex flex-col items-center justify-center space-y-1 text-sm"
          >
            {usePathname() === '/products' ? (
              <>
                <Newspaper size={20} />
                <span className="font-bebas-neue">Journal</span>
              </>
            ) : (
              <>
                <Store size={20} />
                <span className="font-bebas-neue">Shop</span>
              </>
            )}
          </Link>
        </div>
      </nav>
    </>
  )
}
