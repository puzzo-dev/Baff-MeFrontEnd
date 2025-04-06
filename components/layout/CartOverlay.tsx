import { useCartStore } from '@/store/cart';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartOverlay() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateItemQuantity, 
    removeItem,
    getTotalPrice 
  } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          
          {/* Cart Panel */}
          <motion.div 
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-[#222222] shadow-2xl z-50"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
                <h2 className="font-orbitron text-xl font-medium">YOUR BAG ({items.length})</h2>
                <button onClick={closeCart} className="text-gray-500 hover:text-primary" aria-label="Close cart">
                  <i className="bx bx-x text-2xl"></i>
                </button>
              </div>
              
              <div className="flex-grow overflow-auto p-4 space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <i className="bx bx-shopping-bag text-4xl text-gray-300 mb-2"></i>
                    <p className="text-gray-500 dark:text-gray-400">Your bag is empty</p>
                    <button 
                      onClick={closeCart}
                      className="mt-4 text-primary hover:underline"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-20 w-20 object-cover rounded" 
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Size: {item.size} | {item.color}
                        </p>
                        <div className="flex justify-between mt-1">
                          <div className="flex items-center space-x-2">
                            <button 
                              className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-sm"
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="text-sm">{item.quantity}</span>
                            <button 
                              className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-sm"
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-medium">${item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {items.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Shipping & taxes calculated at checkout</span>
                  </div>
                  <Link 
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded font-medium transition duration-200 text-center"
                  >
                    CHECKOUT
                  </Link>
                  <Link 
                    href="/cart"
                    onClick={closeCart}
                    className="block w-full border border-[#111111] dark:border-white text-[#111111] dark:text-white py-2.5 rounded font-medium hover:bg-gray-50 dark:hover:bg-[#111111] transition duration-200 text-center"
                  >
                    VIEW BAG
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
