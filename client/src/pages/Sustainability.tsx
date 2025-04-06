
import { motion } from 'framer-motion';

export default function Sustainability() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      <div className="relative h-[50vh] overflow-hidden mb-16">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" 
          alt="Sustainable fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white font-orbitron">Sustainability</h1>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="col-span-2 prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              At BAFF-ME, sustainability isn't just a buzzword—it's woven into every decision 
              we make. From material selection to manufacturing processes, we're committed to 
              minimizing our environmental impact while maximizing product longevity.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              title: "Eco-Materials",
              icon: "bx bx-leaf",
              description: "We use recycled and biodegradable materials wherever possible, including recycled polyester from ocean plastics and organic cotton."
            },
            {
              title: "Zero Waste",
              icon: "bx bx-recycle",
              description: "Our production processes are designed to minimize waste, and we're working towards a zero-waste goal by 2025."
            },
            {
              title: "Community Impact",
              icon: "bx bx-world",
              description: "We ensure ethical labor practices, fair wages, and maintain community investment programs throughout our supply chain."
            }
          ].map((initiative, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-[#222222] rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <i className={`${initiative.icon} text-4xl text-primary mb-4`}></i>
              <h3 className="text-xl font-bold mb-3">{initiative.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{initiative.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
