
"use client"

import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#222222] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-orbitron text-2xl font-bold text-primary">BAFF-ME</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Bold, edgy, and trend-forward streetwear for the urban explorer.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="bx bxl-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="bx bxl-twitter text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">SHOP</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 hover:text-white transition">All Products</Link></li>
              <li><Link href="/products?category=men" className="text-gray-400 hover:text-white transition">Men</Link></li>
              <li><Link href="/products?category=women" className="text-gray-400 hover:text-white transition">Women</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">HELP</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-white transition">Shipping</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li><Link href="/our-story" className="text-gray-400 hover:text-white transition">Our Story</Link></li>
              <li><Link href="/journal" className="text-gray-400 hover:text-white transition">Journal</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Baff-Me. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
