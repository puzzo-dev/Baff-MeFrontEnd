
import { motion } from 'framer-motion';

export default function OurStory() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Our Story</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Founded in 2023, BAFF-ME emerged from a vision to redefine urban fashion through 
            technological innovation and conscious design. Our journey began with a simple 
            question: How can we create clothing that adapts to the modern lifestyle while 
            respecting our planet?
          </p>
          <h2 className="text-2xl font-bold mt-12 mb-6">Our Vision</h2>
          <p className="text-lg mb-6">
            We envision a future where style, technology, and sustainability converge. 
            Every piece we create is a step towards this vision, combining cutting-edge 
            materials with timeless design principles.
          </p>
          <h2 className="text-2xl font-bold mt-12 mb-6">Our Values</h2>
          <ul className="list-disc pl-6 space-y-4 mb-8">
            <li>Innovation in every thread</li>
            <li>Sustainability at our core</li>
            <li>Quality that endures</li>
            <li>Design that adapts</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
