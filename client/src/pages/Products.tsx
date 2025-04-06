import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/lib/types';
import { apiRequest } from '@/lib/queryClient';

export default function Products() {
  const [location] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    collection: '',
    priceRange: [0, 1000],
    sortBy: 'newest',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Parse query params from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1]);
    
    const newFilters = { ...filters };
    if (searchParams.has('category')) {
      newFilters.category = searchParams.get('category') || '';
    }
    if (searchParams.has('collection')) {
      newFilters.collection = searchParams.get('collection') || '';
    }
    
    setFilters(newFilters);
  }, [location]);
  
  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Build query string from filters
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.collection) params.append('collection', filters.collection);
        params.append('minPrice', filters.priceRange[0].toString());
        params.append('maxPrice', filters.priceRange[1].toString());
        params.append('sortBy', filters.sortBy);
        
        const response = await apiRequest('GET', `/api/products?${params.toString()}`, undefined);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [filters]);
  
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };
  
  // Get title based on filters
  const getPageTitle = () => {
    if (filters.category) {
      return filters.category.charAt(0).toUpperCase() + filters.category.slice(1);
    }
    if (filters.collection) {
      return filters.collection.charAt(0).toUpperCase() + filters.collection.slice(1) + ' Collection';
    }
    return 'All Products';
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  
  return (
    <>
      <Helmet>
        <title>{getPageTitle()} | Baff-Me</title>
        <meta name="description" content={`Shop ${getPageTitle().toLowerCase()} at Baff-Me. Bold, edgy streetwear for the urban explorer.`} />
      </Helmet>
      
      <div className="py-8 md:py-12 bg-white dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-orbitron font-bold text-[#111111] dark:text-white">
              {getPageTitle()}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <select 
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="bg-transparent border border-gray-300 dark:border-gray-700 rounded-md text-sm p-2"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
              
              <button 
                onClick={toggleMobileFilters}
                className="md:hidden flex items-center space-x-1 text-[#111111] dark:text-white font-medium"
              >
                <i className="bx bx-filter"></i>
                <span>Filters</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-full md:w-64 space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-3 text-[#111111] dark:text-white">Categories</h3>
                <div className="space-y-1">
                  <button 
                    className={`block w-full text-left py-1 ${filters.category === '' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                    onClick={() => setFilters({ ...filters, category: '' })}
                  >
                    All
                  </button>
                  <button 
                    className={`block w-full text-left py-1 ${filters.category === 'men' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                    onClick={() => setFilters({ ...filters, category: 'men' })}
                  >
                    Men
                  </button>
                  <button 
                    className={`block w-full text-left py-1 ${filters.category === 'women' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                    onClick={() => setFilters({ ...filters, category: 'women' })}
                  >
                    Women
                  </button>
                  <button 
                    className={`block w-full text-left py-1 ${filters.category === 'accessories' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                    onClick={() => setFilters({ ...filters, category: 'accessories' })}
                  >
                    Accessories
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3 text-[#111111] dark:text-white">Collections</h3>
                <div className="space-y-1">
                  <button 
                    className={`block w-full text-left py-1 ${filters.collection === '' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                    onClick={() => setFilters({ ...filters, collection: '' })}
                  >
                    All Collections
                  </button>
                  <button 
                    className={`block w-full text-left py-1 ${filters.collection === 'quantum' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                    onClick={() => setFilters({ ...filters, collection: 'quantum' })}
                  >
                    Quantum Streetwear
                  </button>
                  <button 
                    className={`block w-full text-left py-1 ${filters.collection === 'urban' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                    onClick={() => setFilters({ ...filters, collection: 'urban' })}
                  >
                    Urban Tech
                  </button>
                  <button 
                    className={`block w-full text-left py-1 ${filters.collection === 'neon' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                    onClick={() => setFilters({ ...filters, collection: 'neon' })}
                  >
                    Neon Nights
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3 text-[#111111] dark:text-white">Price Range</h3>
                <div className="px-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="50"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ 
                      ...filters, 
                      priceRange: [0, parseInt(e.target.value)] 
                    })}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-1">
                    <span>$0</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 bg-black/50 z-40 md:hidden">
                <motion.div 
                  className="fixed bottom-0 inset-x-0 bg-white dark:bg-[#111111] rounded-t-xl p-4 h-2/3 overflow-auto"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-[#111111] dark:text-white">Filters</h2>
                    <button 
                      onClick={toggleMobileFilters}
                      className="text-gray-500 dark:text-gray-400"
                    >
                      <i className="bx bx-x text-2xl"></i>
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2 text-[#111111] dark:text-white">Sort By</h3>
                      <select 
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                        className="w-full bg-transparent border border-gray-300 dark:border-gray-700 rounded-md p-2"
                      >
                        <option value="newest">Newest</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="popular">Most Popular</option>
                      </select>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2 text-[#111111] dark:text-white">Categories</h3>
                      <div className="space-y-1">
                        <button 
                          className={`block w-full text-left py-2 ${filters.category === '' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                          onClick={() => setFilters({ ...filters, category: '' })}
                        >
                          All
                        </button>
                        <button 
                          className={`block w-full text-left py-2 ${filters.category === 'men' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                          onClick={() => setFilters({ ...filters, category: 'men' })}
                        >
                          Men
                        </button>
                        <button 
                          className={`block w-full text-left py-2 ${filters.category === 'women' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                          onClick={() => setFilters({ ...filters, category: 'women' })}
                        >
                          Women
                        </button>
                        <button 
                          className={`block w-full text-left py-2 ${filters.category === 'accessories' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                          onClick={() => setFilters({ ...filters, category: 'accessories' })}
                        >
                          Accessories
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2 text-[#111111] dark:text-white">Collections</h3>
                      <div className="space-y-1">
                        <button 
                          className={`block w-full text-left py-2 ${filters.collection === '' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                          onClick={() => setFilters({ ...filters, collection: '' })}
                        >
                          All Collections
                        </button>
                        <button 
                          className={`block w-full text-left py-2 ${filters.collection === 'quantum' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                          onClick={() => setFilters({ ...filters, collection: 'quantum' })}
                        >
                          Quantum Streetwear
                        </button>
                        <button 
                          className={`block w-full text-left py-2 ${filters.collection === 'urban' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                          onClick={() => setFilters({ ...filters, collection: 'urban' })}
                        >
                          Urban Tech
                        </button>
                        <button 
                          className={`block w-full text-left py-2 ${filters.collection === 'neon' ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-300'}`}
                          onClick={() => setFilters({ ...filters, collection: 'neon' })}
                        >
                          Neon Nights
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2 text-[#111111] dark:text-white">Price Range</h3>
                      <div className="px-2">
                        <input 
                          type="range" 
                          min="0" 
                          max="1000" 
                          step="50"
                          value={filters.priceRange[1]}
                          onChange={(e) => setFilters({ 
                            ...filters, 
                            priceRange: [0, parseInt(e.target.value)] 
                          })}
                          className="w-full accent-primary"
                        />
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-1">
                          <span>$0</span>
                          <span>${filters.priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={toggleMobileFilters}
                      className="w-full bg-primary text-white py-3 rounded-md font-medium"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
            
            {/* Product Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 dark:bg-gray-700 aspect-[3/4] rounded-lg"></div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="bg-gray-200 dark:bg-gray-700 h-4 w-32 rounded"></div>
                        <div className="bg-gray-200 dark:bg-gray-700 h-8 w-8 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                  <i className="bx bx-search text-5xl mb-4"></i>
                  <p className="text-lg mb-1">No products found</p>
                  <p className="text-sm">Try adjusting your filters or search for something else</p>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
