
"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"
import { useCartStore } from "@/store/cart"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { openCart, getTotalItems } = useCartStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showThemeOptions, setShowThemeOptions] = useState(false)
  const themeMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowThemeOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [themeMenuRef])

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300
      ${scrolled 
        ? "bg-white/95 dark:bg-[#111111]/95 shadow-sm" 
        : "bg-white/90 dark:bg-[#111111]/90 border-b border-gray-100 dark:border-[#222222]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <span className="font-orbitron text-xl sm:text-2xl font-bold text-primary">BAFF-ME</span>
          </Link>

          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link href="/products" className="nav-link relative hover:text-primary transition">
              SHOP
            </Link>
            <Link href="/products?category=men" className="nav-link relative hover:text-primary transition">
              MEN
            </Link>
            <Link href="/products?category=women" className="nav-link relative hover:text-primary transition">
              WOMEN
            </Link>
            <Link href="/journal" className="nav-link relative hover:text-primary transition">
              JOURNAL
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            <Link 
              href="/account" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary transition"
            >
              <i className="bx bx-user text-xl"></i>
            </Link>

            <button 
              onClick={openCart}
              className="relative text-gray-600 dark:text-gray-300 hover:text-primary transition"
            >
              <i className="bx bx-shopping-bag text-xl"></i>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-primary transition"
            >
              <i className={`bx ${mobileMenuOpen ? "bx-x" : "bx-menu"} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-[#111111] border-t border-gray-100 dark:border-gray-800"
          >
            <div className="px-4 py-3 space-y-2">
              <Link href="/products" className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md">
                SHOP
              </Link>
              <Link href="/products?category=men" className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md">
                MEN
              </Link>
              <Link href="/products?category=women" className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md">
                WOMEN
              </Link>
              <Link href="/journal" className="block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md">
                JOURNAL
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
