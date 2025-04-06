import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Review } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { FiThumbsUp, FiUser, FiCheck } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

interface ReviewListProps {
  productId: string;
}

export default function ReviewList({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await apiRequest<Review[]>(`/api/products/${productId}/reviews`);
        setReviews(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleMarkHelpful = async (reviewId: number) => {
    try {
      const updatedReview = await apiRequest<Review>(`/api/reviews/${reviewId}/helpful`, {
        method: 'POST'
      });
      
      // Update the review in the list
      setReviews(reviews.map(review => 
        review.id === updatedReview.id ? updatedReview : review
      ));
    } catch (err) {
      console.error('Error marking review as helpful:', err);
    }
  };

  // Generate star rating display
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <AiFillStar 
        key={i} 
        className={`${i < rating ? 'text-[#FFC107]' : 'text-gray-300'} inline-block`}
        size={18}
      />
    ));
  };

  // Format date as "Month Day, Year"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="mt-8 text-center py-8">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="mt-8 text-center py-8 border border-gray-200 dark:border-gray-700 rounded-md">
        <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-[#111111] dark:text-white mb-4">
        Customer Reviews ({reviews.length})
      </h3>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300">
                  <FiUser />
                </div>
                <span className="font-medium text-[#111111] dark:text-white">
                  User {review.userId}
                </span>
                {review.isVerified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                    <FiCheck className="mr-1" /> Verified Purchase
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(review.createdAt.toString())}
              </span>
            </div>
            
            <div className="mb-2 flex items-center">
              <div className="mr-2">
                {renderStars(review.rating)}
              </div>
              <h4 className="font-medium text-[#111111] dark:text-white">
                {review.title}
              </h4>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {review.comment}
            </p>
            
            <button
              onClick={() => handleMarkHelpful(review.id)}
              className="flex items-center text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
            >
              <FiThumbsUp className="mr-1" />
              {review.helpfulCount ? `${review.helpfulCount} found this helpful` : 'Mark as helpful'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}