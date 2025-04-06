
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRoute } from 'wouter';
import { getBlogPostByName } from '../lib/erpnext';

export default function JournalPost() {
  const [, params] = useRoute('/journal/:id');
  const postId = params?.id;

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', postId],
    queryFn: () => getBlogPostByName(postId || ''),
    enabled: !!postId
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="bg-white dark:bg-[#111111] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-[#111111] dark:text-white">
            {post.title}
          </h1>
          
          {post.meta_image && (
            <img 
              src={post.meta_image} 
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />
          )}
          
          <div className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>
      </div>
    </div>
  );
}
