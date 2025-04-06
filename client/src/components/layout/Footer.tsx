import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-[#222222] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-orbitron text-2xl font-bold text-primary">BAFF-ME</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Bold, edgy, and trend-forward streetwear for the urban explorer. Redefining fashion one drop at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-150" aria-label="Instagram">
                <i className="bx bxl-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150" aria-label="Twitter">
                <i className="bx bxl-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150" aria-label="TikTok">
                <i className="bx bxl-tiktok text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-150" aria-label="YouTube">
                <i className="bx bxl-youtube text-xl"></i>
              </a>
            </div>
          </div>
          
          {/* Shop Column */}
          <div>
            <h3 className="font-medium text-white mb-4">SHOP</h3>
            <ul className="space-y-2">
              <li><Link href="/products?category=new" className="text-gray-400 hover:text-white transition duration-150">New Arrivals</Link></li>
              <li><Link href="/products?category=men" className="text-gray-400 hover:text-white transition duration-150">Men</Link></li>
              <li><Link href="/products?category=women" className="text-gray-400 hover:text-white transition duration-150">Women</Link></li>
              <li><Link href="/products?category=accessories" className="text-gray-400 hover:text-white transition duration-150">Accessories</Link></li>
              <li><Link href="/products?sale=true" className="text-gray-400 hover:text-white transition duration-150">Sale</Link></li>
            </ul>
          </div>
          
          {/* Help Column */}
          <div>
            <h3 className="font-medium text-white mb-4">HELP</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-150">Customer Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-150">Track Order</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-150">Returns & Exchanges</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-150">Shipping Info</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-150">FAQ</Link></li>
            </ul>
          </div>
          
          {/* About Column */}
          <div>
            <h3 className="font-medium text-white mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-150">Our Story</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-150">Sustainability</Link></li>
              <li><Link href="/journal" className="text-gray-400 hover:text-white transition duration-150">Style Journal</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-150">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition duration-150">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Baff-Me. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition duration-150">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition duration-150">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition duration-150">Accessibility</Link>
            <Link href="#" className="hover:text-white transition duration-150">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
