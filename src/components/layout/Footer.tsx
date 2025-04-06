
'use client'

import Link from 'next/link'
import { Instagram, Twitter, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-orbitron text-lg mb-4">BAFF-ME</h3>
            <p className="text-muted-foreground">
              Premium streetwear for the future-forward generation.
            </p>
          </div>

          <div>
            <h4 className="font-bebas-neue text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products/new" className="text-muted-foreground hover:text-primary">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products/sale" className="text-muted-foreground hover:text-primary">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas-neue text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/our-story" className="text-muted-foreground hover:text-primary">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-muted-foreground hover:text-primary">
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bebas-neue text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BAFF-ME. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
