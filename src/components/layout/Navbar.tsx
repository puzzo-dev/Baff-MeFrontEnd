'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon, ShoppingCart, User, Search, Heart, Home, Store, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Sheet } from "@/components/ui/sheet"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false) // Added cart open state
  const [hasScrolled, setHasScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [cartCount, setCartCount] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeTheme = () => {
    const hour = new Date().getHours()
    const isDay = hour >= 6 && hour < 18
    setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')
  }

  const navClasses = cn(
    "fixed top-0 z-[100] w-full transition-all duration-300",
    hasScrolled ? "bg-white/95 dark:bg-[#111111]/95 backdrop-blur-lg shadow-sm" : "bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md",
    "border-b border-border"
  )

  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Shop', icon: Store },
    { href: '/collections', label: 'Collections' },
    { href: '/journal', label: 'Journal' },
    { href: '/our-story', label: 'Our Story' },
    { href: '/order-tracking', label: 'Track Order' }
  ]

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <>
      <nav className={navClasses}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 md:space-x-8">
              <>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors md:hidden"
                >
                  <Menu size={24} />
                </button>
                <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)} side="left">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={menuVariants}
                    className="flex flex-col space-y-6 pt-8"
                  >
                    {menuItems.map((item) => (
                      <motion.div key={item.href} variants={itemVariants}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-3 font-bebas-neue text-xl hover:text-primary transition-colors",
                            pathname === item.href ? "text-primary" : "text-foreground"
                          )}
                        >
                          {item.icon && <item.icon size={20} />}
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </Sheet>
              </>

              <Link href="/" className="font-orbitron text-lg md:text-2xl font-bold text-foreground tracking-wider">
                BAFF-ME
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {menuItems.slice(0, 4).map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={cn(
                    "font-bebas-neue text-lg hover:text-primary transition-colors",
                    pathname === item.href ? "text-primary" : "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <button 
                onClick={changeTheme} // Use the new theme changing function
                className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors"
              >
                <div className="relative w-5 h-5">
                  <Sun
                    size={20}
                    className={cn(
                      "absolute transition-all duration-300",
                      theme === 'dark' ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                    )}
                  />
                  <Moon
                    size={20}
                    className={cn(
                      "absolute transition-all duration-300",
                      theme === 'dark' ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
                    )}
                  />
                </div>
              </button>
              <button onClick={() => setIsCartOpen(true)} className="p-2 hover:bg-accent/10 rounded-full text-foreground transition-colors relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <Sheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} side="right">
                {/* Cart content would go here */}
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111111] border-t border-border z-50">
        <div className="grid grid-cols-4 py-3">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center space-y-1",
              pathname === '/' ? "text-primary" : "text-foreground"
            )}
          >
            <Home size={20} />
            <span className="font-bebas-neue text-xs">Home</span>
          </Link>
          <Link
            href="/products"
            className={cn(
              "flex flex-col items-center justify-center space-y-1",
              pathname === '/products' ? "text-primary" : "text-foreground"
            )}
          >
            <Store size={20} />
            <span className="font-bebas-neue text-xs">Shop</span>
          </Link>
          <Link
            href="/wishlist"
            className={cn(
              "flex flex-col items-center justify-center space-y-1",
              pathname === '/wishlist' ? "text-primary" : "text-foreground"
            )}
          >
            <Heart size={20} />
            <span className="font-bebas-neue text-xs">Wishlist</span>
          </Link>
          <Link
            href="/account"
            className={cn(
              "flex flex-col items-center justify-center space-y-1",
              pathname === '/account' ? "text-primary" : "text-foreground"
            )}
          >
            <User size={20} />
            <span className="font-bebas-neue text-xs">Account</span>
          </Link>
        </div>
      </nav>
    </>
  )
}