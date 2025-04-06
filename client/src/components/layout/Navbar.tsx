import { Link } from 'wouter';
import { useTheme } from '@/store/theme';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { openCart, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md border-b border-gray-100 dark:border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="font-orbitron text-2xl font-bold text-primary">BAFF-ME</span>
            </Link>
          </div>
          
          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products?category=new" className="nav-link relative text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary font-medium transition duration-150">NEW</Link>
            <Link href="/products?category=men" className="nav-link relative text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary font-medium transition duration-150">MEN</Link>
            <Link href="/products?category=women" className="nav-link relative text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary font-medium transition duration-150">WOMEN</Link>
            <Link href="/products" className="nav-link relative text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary font-medium transition duration-150">COLLECTIONS</Link>
            <Link href="/journal" className="nav-link relative text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary font-medium transition duration-150">JOURNAL</Link>
          </nav>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <button className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition duration-150" aria-label="Search">
              <i className="bx bx-search text-xl"></i>
            </button>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition duration-150"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <i className={`bx ${theme === 'dark' ? 'bx-moon' : 'bx-sun'} text-xl`}></i>
            </button>
            
            {/* User Account */}
            <Link href="/account" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition duration-150">
              <i className="bx bx-user text-xl"></i>
            </Link>
            
            {/* Cart */}
            <button 
              onClick={openCart}
              className="relative text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition duration-150"
              aria-label="Open cart"
            >
              <i className="bx bx-shopping-bag text-xl"></i>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition duration-150"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden bg-white dark:bg-[#222222] border-t border-gray-100 dark:border-gray-800 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/products?category=new" className="block px-3 py-2 text-base font-medium text-primary">NEW</Link>
          <Link href="/products?category=men" className="block px-3 py-2 text-base font-medium text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary">MEN</Link>
          <Link href="/products?category=women" className="block px-3 py-2 text-base font-medium text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary">WOMEN</Link>
          <Link href="/products" className="block px-3 py-2 text-base font-medium text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary">COLLECTIONS</Link>
          <Link href="/journal" className="block px-3 py-2 text-base font-medium text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary">JOURNAL</Link>
        </div>
      </div>
    </header>
  );
}
