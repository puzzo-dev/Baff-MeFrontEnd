
import { motion } from 'framer-motion';

export default function Sustainability() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Sustainability</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            At BAFF-ME, sustainability isn't just a buzzword—it's woven into every decision 
            we make. From material selection to manufacturing processes, we're committed to 
            minimizing our environmental impact while maximizing product longevity.
          </p>
          <h2 className="text-2xl font-bold mt-12 mb-6">Our Initiatives</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Eco-Materials</h3>
              <p>We use recycled and biodegradable materials wherever possible, including 
                recycled polyester from ocean plastics and organic cotton.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Zero Waste</h3>
              <p>Our production processes are designed to minimize waste, and we're working 
                towards a zero-waste goal by 2025.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
