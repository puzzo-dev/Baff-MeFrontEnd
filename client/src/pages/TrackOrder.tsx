
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  
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
            Track Your Order
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your order number to track its current status and location.
          </p>
        </motion.div>

        <div className="bg-white dark:bg-[#222222] p-6 rounded-lg shadow-sm">
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Enter order number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="flex-1"
            />
            <Button>Track</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
