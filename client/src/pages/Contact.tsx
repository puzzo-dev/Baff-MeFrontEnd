
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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-orbitron">Contact Us</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 dark:bg-[#222222] rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form className="space-y-6" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              try {
                await submitContactForm({
                  doctype: "Communication",
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  message: formData.get('message') as string,
                  subject: 'Website Contact Form'
                });
                toast({
                  title: "Success",
                  description: "Your message has been sent successfully!",
                });
                (e.target as HTMLFormElement).reset();
              } catch (error) {
                toast({
                  title: "Error",
                  description: "Failed to send message. Please try again.",
                  variant: "destructive"
                });
              }
            }}>
              <div>
                <label className="block mb-2 font-medium">Name</label>
                <Input name="name" type="text" placeholder="Your name" className="w-full" required />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <Input name="email" type="email" placeholder="your@email.com" className="w-full" required />
              </div>
              <div>
                <label className="block mb-2 font-medium">Message</label>
                <Textarea name="message" placeholder="How can we help?" className="h-32 w-full" required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="bx bx-envelope text-2xl text-primary mr-4"></i>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">support@baff-me.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="bx bx-phone text-2xl text-primary mr-4"></i>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="bx bx-map text-2xl text-primary mr-4"></i>
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Fashion Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-[#222222] rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
