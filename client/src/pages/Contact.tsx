
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <label className="block mb-2">Name</label>
                <Input type="text" placeholder="Your name" />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block mb-2">Message</label>
                <Textarea placeholder="How can we help?" className="h-32" />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <p><strong>Email:</strong> support@baff-me.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong><br />
                123 Fashion Street<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
