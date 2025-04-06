
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRoute, Link } from 'wouter';
import { getBlogPostByName } from '../lib/erpnext';
import { getJournalPostBySlug } from '../lib/data';
import { Helmet } from 'react-helmet';

export default function JournalPost() {
  const [, params] = useRoute('/journal/:slug');
  const slug = params?.slug;

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      try {
        // Try to get from ERPNext first
        const erpPost = await getBlogPostByName(slug || '');
        if (erpPost) return erpPost;
        
        // Fallback to demo data
        const demoPost = getJournalPostBySlug(slug || '');
        return demoPost || null;
      } catch (error) {
        console.error('Error fetching post:', error);
        // Fallback to demo data on error
        const demoPost = getJournalPostBySlug(slug || '');
        return demoPost || null;
      }
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
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

  if (!post) {
    return (
      <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-[#111111] dark:text-white">Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/journal">
              <a className="inline-block bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-md font-medium transition duration-200">
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
        <title>{post.title} | Baff-Me Journal</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="bg-white dark:bg-[#111111] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
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
            <span className="text-[#111111] dark:text-white">{post.title}</span>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-[#111111] dark:text-white">
                {post.title}
              </h1>

              <div className="flex items-center mb-6 text-sm text-gray-500 dark:text-gray-400">
                <span className="uppercase text-primary font-medium">{post.category}</span>
                <span className="mx-2">•</span>
                <span>{post.publishDate}</span>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
              </div>
            </header>

            {post.image && (
              <div className="mb-10 aspect-video overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div
              className="prose max-w-none prose-headings:font-orbitron prose-headings:text-[#111111] dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg mb-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags && post.tags.length > 0 && (
              <div className="mb-12">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-[#111111] dark:text-white text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        </div>
      </div>
    </>
  );
}
