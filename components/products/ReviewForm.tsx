import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiRequest } from '@/lib/queryClient';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { InsertReview, Review } from '@shared/schema';

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted: (review: Review) => void;
}

export default function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a review title');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please enter your review');
      return;
    }
    
    // Demo user ID (normally would come from authentication)
    const userId = 1;
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const reviewData: Partial<InsertReview> = {
        productId: parseInt(productId),
        userId,
        rating,
        title: title.trim(),
        comment: comment.trim(),
        isVerified: true, // For demo purposes
      };
      
      const createdReview = await apiRequest<Review>(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      
      // Reset form
      setRating(5);
      setTitle('');
      setComment('');
      
      // Notify parent component that a review was added
      onReviewSubmitted(createdReview);
      
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8 border border-gray-200 dark:border-gray-700 rounded-md p-6"
    >
      <h3 className="text-xl font-bold text-[#111111] dark:text-white mb-4">
        Write a Review
      </h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Rating
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="text-2xl mr-1 focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                {(hoverRating || rating) >= star ? (
                  <AiFillStar className="text-[#FFC107]" />
                ) : (
                  <AiOutlineStar className="text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="review-title" className="block text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            id="review-title"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            placeholder="Summarize your experience"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="review-comment" className="block text-gray-700 dark:text-gray-300 mb-2">
            Review
          </label>
          <textarea
            id="review-comment"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            placeholder="Share your experience with this product"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="px-6 py-3 bg-primary hover:bg-opacity-90 text-white font-medium rounded-md transition-colors duration-200 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </motion.div>
  );
}