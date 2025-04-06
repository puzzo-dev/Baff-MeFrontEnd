import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/types';
import { apiRequest } from '@/lib/queryClient';

export default function Journal() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchJournalPosts = async () => {
      try {
        const response = await apiRequest('GET', '/api/journal/featured', undefined);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching journal posts', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJournalPosts();
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 w-56 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 w-24 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="animate-pulse bg-white dark:bg-[#111111] rounded-lg overflow-hidden shadow-sm">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 w-16 rounded"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 w-3/4 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 w-1/2 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-orbitron text-3xl font-bold text-[#111111] dark:text-white">
            STYLE <span className="text-primary">JOURNAL</span>
          </h2>
          <Link href="/journal">
            <a className="text-[#111111] dark:text-white font-medium hover:text-primary dark:hover:text-primary flex items-center transition duration-150">
              VIEW ALL <i className="bx bx-right-arrow-alt ml-1"></i>
            </a>
          </Link>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              className="bg-white dark:bg-[#111111] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200"
              variants={itemVariants}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="object-cover w-full h-full" 
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.category.toUpperCase()}</div>
                <h3 className="font-orbitron text-xl font-bold text-[#111111] dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link href={`/journal/${post.slug}`}>
                  <a className="text-primary font-medium hover:text-opacity-80 transition duration-150 flex items-center">
                    READ MORE <i className="bx bx-right-arrow-alt ml-1"></i>
                  </a>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
