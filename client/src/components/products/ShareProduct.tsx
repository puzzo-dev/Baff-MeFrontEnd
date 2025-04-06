import { useState } from 'react';
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
    <div className="relative">
      {/* Share Button */}
      <button 
        onClick={toggleShareMenu}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
        aria-label="Share product"
      >
        <i className="bx bx-share-alt text-xl"></i>
        <span className="text-sm font-medium">Share</span>
      </button>

      {/* Share Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute left-0 mt-2 w-64 bg-white dark:bg-[#1A1A1A] rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-800"
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
              <a 
                href={shareFacebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on Facebook"
              >
                <FaFacebook className="text-[#1877F2] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Facebook</span>
              </a>
              <a 
                href={shareTwitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on Twitter"
              >
                <FaTwitter className="text-[#1DA1F2] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Twitter</span>
              </a>
              <a 
                href={sharePinterest} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on Pinterest"
              >
                <FaPinterest className="text-[#E60023] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Pinterest</span>
              </a>
              <a 
                href={shareLinkedIn} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedinIn className="text-[#0A66C2] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">LinkedIn</span>
              </a>
              <a 
                href={shareWhatsApp} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp className="text-[#25D366] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">WhatsApp</span>
              </a>
              <a 
                href={shareTelegram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center justify-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Share on Telegram"
              >
                <FaTelegram className="text-[#0088CC] text-xl mb-1" />
                <span className="text-xs text-gray-600 dark:text-gray-300">Telegram</span>
              </a>
            </div>
            
            {/* Copy Link */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800">
              <button 
                onClick={handleCopyLink}
                className="flex items-center justify-center w-full gap-2 py-2 px-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#111111] dark:text-white rounded transition-colors"
              >
                {copiedToClipboard ? (
                  <>
                    <FaCheck className="text-green-500" />
                    <span className="text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <FaLink />
                    <span className="text-sm">Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}