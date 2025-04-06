import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function CollectionBanner() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div 
            className="lg:col-span-2 flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-[#111111] dark:text-white mb-6">
              QUANTUM <span className="text-primary">STREETWEAR</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              Our latest collection blends futuristic tech fabrics with urban silhouettes. Designed for movement, engineered for style.
            </p>
            <div>
              <Link href="/products?collection=quantum">
                <a className="inline-block bg-[#111111] dark:bg-white text-white dark:text-[#111111] px-8 py-3 rounded-md font-medium transition duration-200 hover:bg-opacity-90">
                  EXPLORE COLLECTION
                </a>
              </Link>
            </div>
          </motion.div>
          
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            <motion.div 
              className="aspect-[4/5] overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1566677379359-5ef1321fcb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" 
                alt="Urban Streetwear Collection" 
                className="object-cover w-full h-full" 
              />
            </motion.div>
            <motion.div 
              className="aspect-[4/5] overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" 
                alt="Urban Streetwear Collection" 
                className="object-cover w-full h-full" 
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
