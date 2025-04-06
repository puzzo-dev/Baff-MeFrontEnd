import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10"></div>
      
      <video 
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-people-walking-in-an-urban-setting-42694-large.mp4" type="video/mp4" />
      </video>
      
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-white text-center">
        <motion.h1 
          className="font-orbitron text-4xl md:text-6xl font-bold tracking-wider mb-4 max-w-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-primary">FUTURE</span> IS URBAN
        </motion.h1>
        
        <motion.p 
          className="font-inter text-lg md:text-xl mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Elevate your style with our latest urban collection. Bold, edgy, unmistakably you.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link href="/products?category=men">
            <a className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-md font-medium transition duration-200">
              SHOP MEN
            </a>
          </Link>
          <Link href="/products?category=women">
            <a className="bg-white hover:bg-opacity-90 text-[#111111] px-8 py-3 rounded-md font-medium transition duration-200">
              SHOP WOMEN
            </a>
          </Link>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <a href="#featured" className="animate-bounce text-white opacity-70 hover:opacity-100 transition duration-200">
          <i className="bx bx-chevron-down text-3xl"></i>
        </a>
      </div>
    </section>
  );
}
