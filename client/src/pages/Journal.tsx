import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/types';
import { journalPosts, getJournalPostBySlug } from '@/lib/data';

export default function Journal() {
  const [, params] = useRoute('/journal/:slug');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load blog posts and categories
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        if (params?.slug) {
          // Single post view
          const post = getJournalPostBySlug(params.slug);
          if (post) {
            setCurrentPost(post);
          }
        } else {
          // Posts listing
          setPosts(journalPosts);
          
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(journalPosts.map(post => post.category))
          );
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching journal posts', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [params?.slug]);
  
  // Filter posts by category
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);
  
  // ######### SINGLE POST VIEW #########
  if (params?.slug) {
    if (loading) {
      return (
        <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 w-3/4 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-1/4 rounded"></div>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-2/3 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (!currentPost) {
      return (
        <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4 text-[#111111] dark:text-white">Post Not Found</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">The article you're looking for doesn't exist or has been removed.</p>
              <Link href="/journal">
                <a className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-md font-medium transition duration-200">
                  Back to Journal
                </a>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <>
        <Helmet>
          <title>{currentPost.title} | Baff-Me Journal</title>
          <meta name="description" content={currentPost.excerpt} />
          <meta property="og:title" content={`${currentPost.title} | Baff-Me Journal`} />
          <meta property="og:description" content={currentPost.excerpt} />
          <meta property="og:image" content={currentPost.image} />
          <meta property="og:type" content="article" />
        </Helmet>
        
        <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
              <Link href="/">
                <a className="hover:text-primary">Home</a>
              </Link>
              <span className="mx-2">/</span>
              <Link href="/journal">
                <a className="hover:text-primary">Journal</a>
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#111111] dark:text-white">{currentPost.title}</span>
            </div>
            
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-[#111111] dark:text-white">
                  {currentPost.title}
                </h1>
                
                <div className="flex items-center mb-6 text-sm text-gray-500 dark:text-gray-400">
                  <span className="uppercase text-primary font-medium">{currentPost.category}</span>
                  <span className="mx-2">•</span>
                  <span>{currentPost.publishDate}</span>
                  <span className="mx-2">•</span>
                  <span>By {currentPost.author}</span>
                </div>
              </header>
              
              <div className="mb-10 aspect-video overflow-hidden rounded-lg">
                <img 
                  src={currentPost.image} 
                  alt={currentPost.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div 
                className="prose max-w-none prose-headings:font-orbitron prose-headings:text-[#111111] dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg mb-10"
                dangerouslySetInnerHTML={{ __html: currentPost.content }}
              />
              
              {currentPost.tags && (
                <div className="mb-12">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentPost.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-[#111111] dark:text-white text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h3 className="text-xl font-orbitron font-bold mb-6 text-[#111111] dark:text-white">
                  More from the Journal
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {posts.filter(post => post.id !== currentPost.id).slice(0, 3).map((post) => (
                    <Link key={post.id} href={`/journal/${post.slug}`}>
                      <a className="group">
                        <div className="aspect-video overflow-hidden rounded-lg mb-3">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="font-medium text-[#111111] dark:text-white group-hover:text-primary transition-colors duration-200">
                          {post.title}
                        </h4>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </>
    );
  }
  
  // ######### POSTS LISTING VIEW #########
  return (
    <>
      <Helmet>
        <title>Style Journal | Baff-Me</title>
        <meta name="description" content="Explore the latest trends, style guides, and fashion insights from Baff-Me's Style Journal." />
      </Helmet>
      
      <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-[#111111] dark:text-white">
              STYLE <span className="text-primary">JOURNAL</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore the latest trends, style guides, and insights from the world of urban fashion. Our journal brings you the cutting edge of streetwear culture.
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              
              {categories.map((category) => (
                <button 
                  key={category}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors duration-200 ${
                    selectedCategory === category 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="animate-pulse bg-white dark:bg-[#222222] rounded-lg overflow-hidden shadow-sm">
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
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  className="bg-white dark:bg-[#222222] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <Link href={`/journal/${post.slug}`}>
                    <a>
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105" 
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 uppercase">{post.category}</div>
                        <h3 className="font-orbitron text-xl font-bold text-[#111111] dark:text-white mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="text-primary font-medium hover:text-opacity-80 transition duration-150 flex items-center">
                          READ MORE <i className="bx bx-right-arrow-alt ml-1"></i>
                        </div>
                      </div>
                    </a>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
