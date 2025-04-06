
import { Link, useLocation } from 'wouter';
import { useTheme } from '@/store/theme';
import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';

export default function MobileNav() {
  const [location] = useLocation();
  const { theme } = useTheme();
  const { openCart, getTotalItems } = useCartStore();
  const [randomPage, setRandomPage] = useState({
    path: '/our-story',
    name: 'Our Story',
    icon: 'bx-store'
  });
  
  const pages = [
    { path: '/our-story', name: 'Our Story', icon: 'bx-store' },
    { path: '/sustainability', name: 'Eco', icon: 'bx-leaf' },
    { path: '/journal', name: 'Journal', icon: 'bx-book' },
    { path: '/careers', name: 'Careers', icon: 'bx-briefcase' },
    { path: '/contact', name: 'Contact', icon: 'bx-envelope' }
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * pages.length);
    setRandomPage(pages[randomIndex]);
  }, []);
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-gray-800 py-3 md:hidden z-40 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link 
          href="/products" 
          className={`flex flex-col items-center ${location.startsWith('/products') 
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'}`}
        >
          <i className="bx bx-shopping-bag text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Shop</span>
        </Link>
        
        <Link 
          href="/products?type=collection" 
          className={`flex flex-col items-center ${location.includes('collection') 
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'}`}
        >
          <i className="bx bx-collection text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Collections</span>
        </Link>
        
        <Link 
          href={randomPage.path}
          className={`flex flex-col items-center ${location === randomPage.path
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'}`}
        >
          <i className={`bx ${randomPage.icon} text-xl`}></i>
          <span className="text-[10px] mt-1 font-medium">{randomPage.name}</span>
        </Link>
        
        <Link 
          href="/account" 
          className={`flex flex-col items-center ${location === '/account' 
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'}`}
        >
          <i className="bx bx-user text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Account</span>
        </Link>
        
        <button 
          onClick={openCart}
          className={`flex flex-col items-center ${getTotalItems() > 0 
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'}`}
          aria-label="Open cart"
        >
          <div className="relative">
            <i className="bx bx-shopping-bag text-xl"></i>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-medium">Bag</span>
        </button>
      </div>
    </div>
  );
}
