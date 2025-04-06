
import { motion } from 'framer-motion';

export default function OurStory() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      <div className="relative h-[50vh] overflow-hidden mb-16">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8" 
          alt="Urban fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white font-orbitron">Our Story</h1>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6 font-orbitron">Our Vision</h2>
            <p className="text-lg mb-6">
              Founded in 2023, BAFF-ME emerged from a vision to redefine urban fashion through 
              technological innovation and conscious design. Our journey began with a simple 
              question: How can we create clothing that adapts to the modern lifestyle while 
              respecting our planet?
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1527368746281-798b65e1ac6e"
              alt="Fashion design"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#222222] rounded-2xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold mb-8 font-orbitron text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "bx bx-bulb", title: "Innovation", desc: "Innovation in every thread" },
              { icon: "bx bx-leaf", title: "Sustainability", desc: "Sustainability at our core" },
              { icon: "bx bx-diamond", title: "Quality", desc: "Quality that endures" },
              { icon: "bx bx-palette", title: "Design", desc: "Design that adapts" }
            ].map((value, index) => (
              <div key={index} className="text-center">
                <i className={`${value.icon} text-4xl text-primary mb-4`}></i>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
