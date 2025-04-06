import { Link, useLocation } from 'wouter';
import { useTheme } from '@/store/theme';
import { useCartStore } from '@/store/cart';

export default function MobileNav() {
  const [location] = useLocation();
  const { theme } = useTheme();
  const { openCart, getTotalItems } = useCartStore();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-gray-800 py-3 md:hidden z-40 shadow-lg">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link 
          href="/" 
          className={`flex flex-col items-center ${location === '/' 
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'}`}
        >
          <i className="bx bx-home-alt text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        
        <Link 
          href="/products" 
          className={`flex flex-col items-center ${location.startsWith('/products') 
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'}`}
        >
          <i className="bx bx-category text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Shop</span>
        </Link>
        
        <Link 
          href="/journal" 
          className={`flex flex-col items-center ${location.startsWith('/journal') 
            ? 'text-primary' 
            : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary'}`}
        >
          <i className="bx bx-book-open text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Journal</span>
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
