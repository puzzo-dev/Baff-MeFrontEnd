import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { useCartStore } from '@/store/cart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add with default options
    const defaultSize = product.sizes ? product.sizes[0] : 'M';
    const defaultColor = product.colors ? product.colors[0].name : 'Default';
    
    addItem(product, 1, defaultSize, defaultColor);
    openCart();
  };
  
  return (
    <motion.div 
      className="product-card group relative rounded-lg overflow-hidden"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      <Link href={`/product/${product.id}`}>
        <a className="block">
          <div className="relative overflow-hidden aspect-[3/4]">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="object-cover w-full h-full" 
            />
            
            {product.isNew && (
              <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </div>
            )}
            
            {product.isTrending && (
              <div className="absolute top-3 left-3 bg-[#FFC107] text-white text-xs font-bold px-2 py-1 rounded">
                TRENDING
              </div>
            )}
            
            <div className="hover-info absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 text-white">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-300">
                    {product.subtitle} | {product.colors?.length || 0} Colors
                  </p>
                </div>
                <span className="font-bold">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-1">
              {product.colors?.slice(0, 3).map((color) => (
                <div 
                  key={color.name}
                  className="color-swatch w-4 h-4 rounded-full border border-gray-300 cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                  title={color.name}
                ></div>
              ))}
            </div>
            <motion.button 
              className="bg-[#111111] dark:bg-white text-white dark:text-[#111111] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-primary dark:hover:bg-primary dark:hover:text-white"
              onClick={handleQuickAdd}
              aria-label="Add to bag"
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -2 }}
            >
              <i className="bx bx-shopping-bag"></i>
            </motion.button>
          </div>
        </a>
      </Link>
    </motion.div>
  );
}
