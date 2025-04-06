import { Link, useLocation } from 'wouter';
import { useTheme } from '@/store/theme';
import { useCartStore } from '@/store/cart';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { openCart, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300
      ${scrolled 
        ? 'bg-white/95 dark:bg-[#111111]/95 shadow-sm' 
        : 'bg-white/90 dark:bg-[#111111]/90 border-b border-gray-100 dark:border-[#222222]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="font-orbitron text-xl sm:text-2xl font-bold text-primary">BAFF-ME</span>
            </Link>
          </div>
          
          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link 
              href="/products?category=new" 
              className={`nav-link relative text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary font-medium transition duration-150 py-2
                ${location === '/products?category=new' ? 'text-primary' : ''}`}>
              NEW
            </Link>
            <Link 
              href="/products?category=men" 
              className={`nav-link relative text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary font-medium transition duration-150 py-2
                ${location === '/products?category=men' ? 'text-primary' : ''}`}>
              MEN
            </Link>
            <Link 
              href="/products?category=women" 
              className={`nav-link relative text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary font-medium transition duration-150 py-2
                ${location === '/products?category=women' ? 'text-primary' : ''}`}>
              WOMEN
            </Link>
            <Link 
              href="/products" 
              className={`nav-link relative text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary font-medium transition duration-150 py-2
                ${location === '/products' ? 'text-primary' : ''}`}>
              COLLECTIONS
            </Link>
            <Link 
              href="/journal" 
              className={`nav-link relative text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary font-medium transition duration-150 py-2
                ${location === '/journal' ? 'text-primary' : ''}`}>
              JOURNAL
            </Link>
          </nav>
          
          {/* Right Side Icons */}
          <div className="flex items-center">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-6">
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
              <Link 
                href="/account" 
                className={`text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition duration-150
                  ${location === '/account' ? 'text-primary dark:text-primary' : ''}`}
              >
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
            </div>
            
            {/* Mobile Icons - Only show necessary ones */}
            <div className="flex md:hidden items-center space-x-4">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition duration-150"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <i className={`bx ${theme === 'dark' ? 'bx-moon' : 'bx-sun'} text-xl`}></i>
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition duration-150"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Slide down animation */}
      <div 
        className={`md:hidden bg-white dark:bg-[#111111] shadow-lg transform transition-all duration-300 ease-in-out overflow-hidden
          ${mobileMenuOpen ? 'max-h-screen border-t border-gray-100 dark:border-gray-800' : 'max-h-0'}`}
      >
        <div className="px-4 py-3 space-y-2">
          <Link 
            href="/products?category=new" 
            className={`block px-3 py-3 text-base font-medium rounded-md transition duration-150
              ${location === '/products?category=new' 
                ? 'bg-gray-50 dark:bg-gray-900 text-primary' 
                : 'text-[#111111] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-primary dark:hover:text-primary'}`}>
            NEW
          </Link>
          <Link 
            href="/products?category=men" 
            className={`block px-3 py-3 text-base font-medium rounded-md transition duration-150
              ${location === '/products?category=men' 
                ? 'bg-gray-50 dark:bg-gray-900 text-primary' 
                : 'text-[#111111] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-primary dark:hover:text-primary'}`}>
            MEN
          </Link>
          <Link 
            href="/products?category=women" 
            className={`block px-3 py-3 text-base font-medium rounded-md transition duration-150
              ${location === '/products?category=women' 
                ? 'bg-gray-50 dark:bg-gray-900 text-primary' 
                : 'text-[#111111] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-primary dark:hover:text-primary'}`}>
            WOMEN
          </Link>
          <Link 
            href="/products" 
            className={`block px-3 py-3 text-base font-medium rounded-md transition duration-150
              ${location === '/products' 
                ? 'bg-gray-50 dark:bg-gray-900 text-primary' 
                : 'text-[#111111] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-primary dark:hover:text-primary'}`}>
            COLLECTIONS
          </Link>
          <Link 
            href="/journal" 
            className={`block px-3 py-3 text-base font-medium rounded-md transition duration-150
              ${location === '/journal' 
                ? 'bg-gray-50 dark:bg-gray-900 text-primary' 
                : 'text-[#111111] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-primary dark:hover:text-primary'}`}>
            JOURNAL
          </Link>
        </div>
      </div>
    </header>
  );
}
