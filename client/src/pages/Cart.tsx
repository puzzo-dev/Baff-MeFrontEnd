import { Helmet } from 'react-helmet';
import { Link } from 'wouter';
import { useCartStore } from '@/store/cart';
import { motion } from 'framer-motion';

export default function Cart() {
  const { 
    items, 
    updateItemQuantity, 
    removeItem, 
    getTotalPrice, 
    getTotalItems 
  } = useCartStore();
  
  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Your Cart | Baff-Me</title>
        </Helmet>
        
        <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl md:text-3xl font-orbitron font-bold mb-12 text-[#111111] dark:text-white">
              YOUR BAG
            </h1>
            
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <i className="bx bx-shopping-bag text-5xl text-gray-300 mb-4"></i>
              <h2 className="text-xl font-medium mb-2">Your bag is empty</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Looks like you haven't added anything to your bag yet.
              </p>
              <Link href="/products">
                <a className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-md font-medium transition duration-200">
                  START SHOPPING
                </a>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Your Cart | Baff-Me</title>
      </Helmet>
      
      <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-orbitron font-bold mb-12 text-[#111111] dark:text-white">
            YOUR BAG ({getTotalItems()})
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="sm:w-32 h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-[#222222] flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium text-lg text-[#111111] dark:text-white">{item.name}</h3>
                      <span className="font-medium text-[#111111] dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Size: {item.size} | {item.color}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                        <button 
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-center text-[#111111] dark:text-white min-w-[40px]">
                          {item.quantity}
                        </span>
                        <button 
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-[#222222] p-6 rounded-lg">
                <h2 className="text-xl font-orbitron font-bold mb-6 text-[#111111] dark:text-white">
                  ORDER SUMMARY
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#111111] dark:text-white">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#111111] dark:text-white">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-[#111111] dark:text-white">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3"></div>
                  <div className="flex justify-between font-bold text-lg text-[#111111] dark:text-white">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                
                <Link href="/checkout">
                  <a className="block w-full bg-primary hover:bg-opacity-90 text-white py-3 rounded-md font-medium transition duration-200 text-center mb-4">
                    CHECKOUT
                  </a>
                </Link>
                
                <Link href="/products">
                  <a className="block text-center text-[#111111] dark:text-white hover:text-primary dark:hover:text-primary text-sm mt-4">
                    ← Continue Shopping
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
