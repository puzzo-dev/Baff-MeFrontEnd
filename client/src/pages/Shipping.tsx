
import { motion } from 'framer-motion';

export default function Shipping() {
  return (
    <div className="bg-white dark:bg-[#111111] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-[#111111] dark:text-white">
            Shipping Information
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Free shipping on orders over $100
          </p>
        </motion.div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-[#222222] p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#111111] dark:text-white">Delivery Methods</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#111111] dark:text-white">Standard Shipping</h3>
                <p className="text-gray-600 dark:text-gray-300">3-5 business days - $5.99</p>
              </div>
              <div>
                <h3 className="font-medium text-[#111111] dark:text-white">Express Shipping</h3>
                <p className="text-gray-600 dark:text-gray-300">1-2 business days - $12.99</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#222222] p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#111111] dark:text-white">International Shipping</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We ship worldwide. International shipping rates and delivery times vary by location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
