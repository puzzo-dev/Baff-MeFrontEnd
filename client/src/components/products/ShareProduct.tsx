import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFacebook, 
  FaTwitter, 
  FaPinterest, 
  FaLinkedinIn, 
  FaWhatsapp, 
  FaTelegram,
  FaLink,
  FaCheck
} from 'react-icons/fa';
import { Product } from '@/lib/types';

interface ShareProductProps {
  product: Product;
  currentUrl: string;
}

export default function ShareProduct({ product, currentUrl }: ShareProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // For dynamic sharing preview
  const shareTitle = `Check out ${product.name} from Baff-Me`;
  const shareDescription = product.description.substring(0, 120) + (product.description.length > 120 ? '...' : '');
  const shareImage = product.images[0]; // First image as the preview image

  // Generate share URLs for different platforms
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`;
  const sharePinterest = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(shareImage)}&description=${encodeURIComponent(shareTitle)}`;
  const shareLinkedIn = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareDescription)}`;
  const shareWhatsApp = `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + currentUrl)}`;
  const shareTelegram = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`;

  // Close menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    });
  };

  const toggleShareMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Share Button */}
      <motion.button 
        onClick={toggleShareMenu}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
        aria-label="Share product"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className="bx bx-share-alt text-xl"></i>
        <span className="text-sm font-medium">Share</span>
      </motion.button>

      {/* Share Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed sm:absolute right-4 sm:right-auto sm:left-0 mt-2 w-64 bg-white dark:bg-[#1A1A1A] rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-800 overflow-hidden"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Share Preview */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Share this product</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <img 
                    src={shareImage} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-[#111111] dark:text-white truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    ${product.price.toFixed(2)} - Baff-Me
                  </p>
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-3 gap-2 p-3">
              <motion.a 
                href={shareFacebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on Facebook"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebook className="text-[#1877F2] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Facebook</span>
              </motion.a>
              <motion.a 
                href={shareTwitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on Twitter"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter className="text-[#1DA1F2] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Twitter</span>
              </motion.a>
              <motion.a 
                href={sharePinterest} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on Pinterest"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPinterest className="text-[#E60023] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Pinterest</span>
              </motion.a>
              <motion.a 
                href={shareLinkedIn} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on LinkedIn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedinIn className="text-[#0A66C2] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">LinkedIn</span>
              </motion.a>
              <motion.a 
                href={shareWhatsApp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on WhatsApp"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="text-[#25D366] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">WhatsApp</span>
              </motion.a>
              <motion.a 
                href={shareTelegram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on Telegram"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTelegram className="text-[#0088CC] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Telegram</span>
              </motion.a>
            </div>
            
            {/* Copy Link */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800">
              <motion.button 
                onClick={handleCopyLink}
                className="flex items-center justify-center w-full gap-2 py-2 px-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#111111] dark:text-white rounded transition-colors"
                whileHover={{ 
                  backgroundColor: copiedToClipboard ? "rgba(34, 197, 94, 0.1)" : "rgba(0, 0, 0, 0.1)",
                  y: -2
                }}
                whileTap={{ y: 1 }}
                animate={copiedToClipboard ? 
                  { 
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    transition: { duration: 0.3 }
                  } : 
                  { backgroundColor: "rgba(0, 0, 0, 0.05)" }
                }
              >
                <AnimatePresence mode="wait">
                  {copiedToClipboard ? (
                    <motion.div 
                      className="flex items-center"
                      key="copied"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaCheck className="text-green-500 mr-2" />
                      <span className="text-sm text-green-500 font-medium">Copied!</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="flex items-center"
                      key="copy"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaLink className="mr-2" />
                      <span className="text-sm">Copy Link</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}