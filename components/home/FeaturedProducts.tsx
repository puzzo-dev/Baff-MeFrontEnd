import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import ProductCard from '../products/ProductCard';
import { Product } from '@/lib/types';
import { apiRequest } from '@/lib/queryClient';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await apiRequest('GET', '/api/products/featured', undefined);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching featured products', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <section id="featured" className="py-16 md:py-24 bg-white dark:bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-orbitron text-3xl font-bold text-[#111111] dark:text-white">
            FEATURED <span className="text-primary">DROPS</span>
          </h2>
          <Link href="/products">
            <a className="text-[#111111] dark:text-white font-medium hover:text-primary dark:hover:text-primary flex items-center transition duration-150">
              VIEW ALL <i className="bx bx-right-arrow-alt ml-1"></i>
            </a>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 aspect-[3/4] rounded-lg"></div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="bg-gray-200 dark:bg-gray-700 h-4 w-32 rounded"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-8 w-8 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
