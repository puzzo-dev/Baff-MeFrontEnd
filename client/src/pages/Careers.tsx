
import { motion } from 'framer-motion';

export default function Careers() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Careers</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Join us in shaping the future of fashion technology. We're always looking for 
            passionate individuals who share our vision for innovative, sustainable fashion.
          </p>
          <h2 className="text-2xl font-bold mt-12 mb-6">Open Positions</h2>
          <div className="space-y-8">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
              <h3 className="text-xl font-semibold mb-2">Senior Product Designer</h3>
              <p className="mb-4">Help us create the next generation of tech-enhanced clothing.</p>
              <button className="bg-primary text-white px-6 py-2 rounded-md">Apply Now</button>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
              <h3 className="text-xl font-semibold mb-2">Sustainability Manager</h3>
              <p className="mb-4">Lead our initiatives for sustainable fashion practices.</p>
              <button className="bg-primary text-white px-6 py-2 rounded-md">Apply Now</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
