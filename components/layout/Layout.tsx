import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartOverlay from './CartOverlay';
import MobileNav from './MobileNav';
import { useCartStore } from '@/store/cart';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isOpen } = useCartStore();
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#111111] text-[#111111] dark:text-white transition-colors duration-300">
      <Navbar />
      <CartOverlay />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
