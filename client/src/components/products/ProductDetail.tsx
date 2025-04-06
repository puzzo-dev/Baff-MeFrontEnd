import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { useCartStore } from '@/store/cart';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeSize, setActiveSize] = useState(product.sizes?.[0] || 'M');
  const [activeColor, setActiveColor] = useState(product.colors?.[0]?.name || 'Default');
  const [activeImage, setActiveImage] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState({ details: false, shipping: false, care: false });
  
  const { addItem, openCart } = useCartStore();
  
  const handleAddToCart = () => {
    addItem(product, quantity, activeSize, activeColor);
    openCart();
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const toggleAccordion = (section: keyof typeof accordionOpen) => {
    setAccordionOpen({
      ...accordionOpen,
      [section]: !accordionOpen[section]
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      {/* Product Images */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-[#222222]">
          <img 
            src={product.images[activeImage]} 
            alt={product.name} 
            className="object-cover w-full h-full" 
          />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <button 
              key={index}
              className={`aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-[#222222] ${index === activeImage ? 'border-2 border-primary' : ''}`}
              onClick={() => setActiveImage(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img 
                src={image} 
                alt={`${product.name} view ${index + 1}`} 
                className="object-cover w-full h-full" 
              />
            </button>
          ))}
        </div>
      </motion.div>
      
      {/* Product Info */}
      <motion.div 
        className="flex flex-col"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-[#111111] dark:text-white mb-2">
          {product.name}
        </h1>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex text-[#FFC107]">
            <i className="bx bxs-star"></i>
            <i className="bx bxs-star"></i>
            <i className="bx bxs-star"></i>
            <i className="bx bxs-star"></i>
            <i className="bx bxs-star-half"></i>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{product.rating || 4.5} ({product.reviewCount || 128} reviews)</span>
        </div>
        
        <div className="text-xl md:text-2xl font-bold text-[#111111] dark:text-white mb-6">
          ${product.price.toFixed(2)}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {product.description}
        </p>
        
        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium text-[#111111] dark:text-white mb-2">
              Color: <span className="text-gray-500">{activeColor}</span>
            </h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => (
                <button 
                  key={color.name}
                  className={`color-swatch w-8 h-8 rounded-full ${activeColor === color.name ? 'border-2 border-primary shadow-md' : 'border border-gray-300 dark:border-gray-600'}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setActiveColor(color.name)}
                  aria-label={`Select ${color.name} color`}
                ></button>
              ))}
            </div>
          </div>
        )}
        
        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-[#111111] dark:text-white">Size</h3>
              <button className="text-primary text-sm font-medium">Size Guide</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button 
                  key={size}
                  className={`size-btn h-10 border ${activeSize === size ? 'active border-primary' : 'border-gray-300 dark:border-gray-600'} rounded-md font-medium hover:border-primary`}
                  onClick={() => setActiveSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Add to Cart */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex w-full sm:w-1/3 h-12 border border-gray-300 dark:border-gray-600 rounded-md">
            <button 
              className="w-12 flex items-center justify-center text-gray-500 hover:text-[#111111] dark:hover:text-white"
              onClick={decreaseQuantity}
              aria-label="Decrease quantity"
            >
              <i className="bx bx-minus"></i>
            </button>
            <input 
              type="text" 
              value={quantity} 
              readOnly
              className="w-full text-center bg-transparent border-0 text-[#111111] dark:text-white focus:ring-0"
              aria-label="Quantity"
            />
            <button 
              className="w-12 flex items-center justify-center text-gray-500 hover:text-[#111111] dark:hover:text-white"
              onClick={increaseQuantity}
              aria-label="Increase quantity"
            >
              <i className="bx bx-plus"></i>
            </button>
          </div>
          <button 
            className="flex-1 bg-primary hover:bg-opacity-90 text-white h-12 rounded-md font-medium transition duration-200"
            onClick={handleAddToCart}
          >
            ADD TO BAG
          </button>
        </div>
        
        {/* Product Details Accordion */}
        <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
            <button 
              className="flex justify-between items-center w-full text-left font-medium text-[#111111] dark:text-white"
              onClick={() => toggleAccordion('details')}
              aria-expanded={accordionOpen.details}
            >
              Product Details
              <i className={`bx ${accordionOpen.details ? 'bx-chevron-up' : 'bx-chevron-down'} text-xl`}></i>
            </button>
            <div className={`mt-2 text-gray-600 dark:text-gray-300 text-sm ${accordionOpen.details ? 'block' : 'hidden'}`}>
              <ul className="list-disc pl-5 space-y-1">
                {product.details?.map((detail, index) => (
                  <li key={index}>{detail}</li>
                )) || (
                  <>
                    <li>Weather-adaptive fabric technology</li>
                    <li>Water-resistant outer shell</li>
                    <li>Thermal regulation lining</li>
                    <li>4 exterior pockets, 2 interior pockets</li>
                    <li>Adjustable hood and cuffs</li>
                    <li>Reflective elements for visibility</li>
                  </>
                )}
              </ul>
            </div>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
            <button 
              className="flex justify-between items-center w-full text-left font-medium text-[#111111] dark:text-white"
              onClick={() => toggleAccordion('shipping')}
              aria-expanded={accordionOpen.shipping}
            >
              Shipping & Returns
              <i className={`bx ${accordionOpen.shipping ? 'bx-chevron-up' : 'bx-chevron-down'} text-xl`}></i>
            </button>
            <div className={`mt-2 text-gray-600 dark:text-gray-300 text-sm ${accordionOpen.shipping ? 'block' : 'hidden'}`}>
              <p>Free shipping on orders over $100. Free returns within 30 days of delivery.</p>
            </div>
          </div>
          
          <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
            <button 
              className="flex justify-between items-center w-full text-left font-medium text-[#111111] dark:text-white"
              onClick={() => toggleAccordion('care')}
              aria-expanded={accordionOpen.care}
            >
              Care Instructions
              <i className={`bx ${accordionOpen.care ? 'bx-chevron-up' : 'bx-chevron-down'} text-xl`}></i>
            </button>
            <div className={`mt-2 text-gray-600 dark:text-gray-300 text-sm ${accordionOpen.care ? 'block' : 'hidden'}`}>
              <p>Machine wash cold. Do not bleach. Tumble dry low. Do not iron.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
