
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

export default function FAQ() {
  return (
    <div className="bg-white dark:bg-[#111111] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-[#111111] dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find answers to common questions about our products and services.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="sizing">
            <AccordionTrigger>How do I find my size?</AccordionTrigger>
            <AccordionContent>
              Check our size guide on each product page for detailed measurements. If you're between sizes, we recommend sizing up.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="shipping">
            <AccordionTrigger>What are the shipping options?</AccordionTrigger>
            <AccordionContent>
              We offer standard shipping (3-5 days) and express shipping (1-2 days). Free shipping on orders over $100.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="returns">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              We accept returns within 30 days of delivery. Items must be unworn with original tags attached.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="payment">
            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
            <AccordionContent>
              We accept all major credit cards, PayPal, and Apple Pay.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
