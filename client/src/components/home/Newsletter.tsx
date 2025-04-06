import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setErrorMessage('Please enter your email address');
      return;
    }
    
    try {
      setStatus('submitting');
      // This would be replaced with an actual API call
      // await apiRequest('POST', '/api/newsletter/subscribe', { email });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-[#111111] text-white">
      <motion.div 
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
          JOIN THE <span className="text-primary">MOVEMENT</span>
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Subscribe to get early access to drops, exclusive offers, and urban style inspiration directly to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 px-4 py-3 rounded-md bg-[#222222] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'submitting'}
          />
          <button 
            type="submit" 
            className="bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium transition duration-200 disabled:opacity-70"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
          </button>
        </form>
        
        {status === 'success' && (
          <motion.div 
            className="text-green-400 text-sm mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Thanks for subscribing! Check your email for confirmation.
          </motion.div>
        )}
        
        {status === 'error' && (
          <motion.div 
            className="text-red-400 text-sm mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errorMessage}
          </motion.div>
        )}
        
        <p className="text-gray-400 text-sm">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from Baff-Me.
        </p>
      </motion.div>
    </section>
  );
}
